import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { analyticsAPI, userAPI, foodAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    overview: {
      totalUsers: 0,
      totalDonations: 0,
      totalVolunteers: 0,
      totalNGOs: 0,
      activeDonations: 0,
      completedDonations: 0,
      totalImpact: 0
    },
    trends: {
      dailyDonations: [],
      weeklyImpact: [],
      userGrowth: []
    },
    distribution: {
      byCategory: [],
      byLocation: [],
      byStatus: []
    },
    performance: {
      topDonors: [],
      topVolunteers: [],
      topNGOs: []
    }
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch overview stats
      const [usersResponse, donationsResponse] = await Promise.all([
        userAPI.getAllUsers(),
        foodAPI.getAllFood()
      ]);

      const users = usersResponse.data || [];
      const donations = donationsResponse.data || [];

      // Calculate analytics
      const overview = {
        totalUsers: users.length,
        totalDonations: donations.length,
        totalVolunteers: users.filter(u => u.role === 'volunteer').length,
        totalNGOs: users.filter(u => u.role === 'admin').length,
        activeDonations: donations.filter(d => ['available', 'picked', 'in_transit'].includes(d.status)).length,
        completedDonations: donations.filter(d => d.status === 'delivered').length,
        totalImpact: donations.filter(d => d.status === 'delivered').length * 10 // 10 people per donation
      };

      // Mock trend data
      const trends = {
        dailyDonations: generateMockTrendData(7, 0, 20),
        weeklyImpact: generateMockTrendData(4, 50, 200),
        userGrowth: generateMockTrendData(6, 5, 30)
      };

      // Mock distribution data
      const distribution = {
        byCategory: [
          { name: 'Fresh Food', value: 45, color: '#10B981' },
          { name: 'Packaged Food', value: 30, color: '#3B82F6' },
          { name: 'Beverages', value: 15, color: '#F59E0B' },
          { name: 'Others', value: 10, color: '#EF4444' }
        ],
        byStatus: [
          { name: 'Available', value: 25, color: '#10B981' },
          { name: 'Picked', value: 15, color: '#3B82F6' },
          { name: 'In Transit', value: 10, color: '#F59E0B' },
          { name: 'Delivered', value: 50, color: '#8B5CF6' }
        ],
        byLocation: [
          { name: 'Hyderabad', value: 35, color: '#10B981' },
          { name: 'Secunderabad', value: 25, color: '#3B82F6' },
          { name: 'Cyberabad', value: 20, color: '#F59E0B' },
          { name: 'Others', value: 20, color: '#EF4444' }
        ]
      };

      // Mock performance data
      const performance = {
        topDonors: users.filter(u => u.role === 'donor').slice(0, 5).map(donor => ({
          name: donor.name,
          donations: Math.floor(Math.random() * 20) + 5,
          impact: Math.floor(Math.random() * 200) + 50
        })),
        topVolunteers: users.filter(u => u.role === 'volunteer').slice(0, 5).map(volunteer => ({
          name: volunteer.name,
          deliveries: Math.floor(Math.random() * 30) + 10,
          distance: Math.floor(Math.random() * 500) + 100
        })),
        topNGOs: users.filter(u => u.role === 'admin').slice(0, 5).map(ngo => ({
          name: ngo.organizationName || ngo.name,
          recipients: Math.floor(Math.random() * 100) + 20,
          satisfaction: Math.floor(Math.random() * 20) + 80
        }))
      };

      setAnalytics({ overview, trends, distribution, performance });
      
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const generateMockTrendData = (days, min, max) => {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: Math.floor(Math.random() * (max - min + 1)) + min
    }));
  };

  const StatCard = ({ title, value, icon, color, trend, delay = 0 }) => (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value.toLocaleString()}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${color.replace('text-', 'bg-').replace('-600', '-100')} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const ChartCard = ({ title, children, delay = 0 }) => (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </motion.div>
  );

  const SimpleBarChart = ({ data, height = 200 }) => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-20 text-sm text-gray-600 truncate">{item.name}</div>
          <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              className={`h-full rounded-full`}
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            />
          </div>
          <div className="w-12 text-sm font-medium text-gray-900">{item.value}%</div>
        </div>
      ))}
    </div>
  );

  const LineChart = ({ data, height = 200 }) => (
    <div className="relative" style={{ height }}>
      <svg viewBox="0 0 300 200" className="w-full h-full">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        
        {/* Area under the curve */}
        <path
          d={`M 0,200 ${data.map((item, index) => 
            `L ${(index / (data.length - 1)) * 300},${200 - (item.value / Math.max(...data.map(d => d.value))) * 180}`
          ).join(' ')} L 300,200 Z`}
          fill="url(#gradient)"
        />
        
        {/* Line */}
        <path
          d={`M 0,200 ${data.map((item, index) => 
            `L ${(index / (data.length - 1)) * 300},${200 - (item.value / Math.max(...data.map(d => d.value))) * 180}`
          ).join(' ')}`}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
        />
        
        {/* Points */}
        {data.map((item, index) => (
          <circle
            key={index}
            cx={(index / (data.length - 1)) * 300}
            cy={200 - (item.value / Math.max(...data.map(d => d.value))) * 180}
            r="4"
            fill="#3B82F6"
          />
        ))}
      </svg>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor platform performance and impact metrics</p>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={analytics.overview.totalUsers}
            icon={<svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="currentColor" strokeWidth="2"/></svg>}
            color="text-blue-600"
            trend={12}
            delay={0.1}
          />
          <StatCard
            title="Total Donations"
            value={analytics.overview.totalDonations}
            icon={<svg viewBox="0 0 24 24" className="w-6 h-6 text-green-600"><path d="M3 7h13l5 5v5a2 2 0 0 1-2 2H3z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="7.5" cy="19.5" r="1.5"/><circle cx="18.5" cy="19.5" r="1.5"/></svg>}
            color="text-green-600"
            trend={8}
            delay={0.2}
          />
          <StatCard
            title="Active Volunteers"
            value={analytics.overview.totalVolunteers}
            icon={<svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-600"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>}
            color="text-purple-600"
            trend={15}
            delay={0.3}
          />
          <StatCard
            title="Total Impact"
            value={analytics.overview.totalImpact}
            icon={<svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-600"><path d="M22 12h-4l-3 9L9 3l-3 9H2" fill="none" stroke="currentColor" strokeWidth="2"/></svg>}
            color="text-orange-600"
            trend={25}
            delay={0.4}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Donations Trend (Last 7 Days)" delay={0.5}>
            <LineChart data={analytics.trends.dailyDonations} />
          </ChartCard>
          
          <ChartCard title="Impact Distribution by Category" delay={0.6}>
            <SimpleBarChart data={analytics.distribution.byCategory} />
          </ChartCard>
          
          <ChartCard title="Donation Status Distribution" delay={0.7}>
            <SimpleBarChart data={analytics.distribution.byStatus} />
          </ChartCard>
          
          <ChartCard title="Geographic Distribution" delay={0.8}>
            <SimpleBarChart data={analytics.distribution.byLocation} />
          </ChartCard>
        </div>

        {/* Performance Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Top Donors" delay={0.9}>
            <div className="space-y-3">
              {analytics.performance.topDonors.map((donor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{donor.name}</p>
                    <p className="text-sm text-gray-600">{donor.donations} donations</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{donor.impact}</p>
                    <p className="text-xs text-gray-500">people fed</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
          
          <ChartCard title="Top Volunteers" delay={1.0}>
            <div className="space-y-3">
              {analytics.performance.topVolunteers.map((volunteer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{volunteer.name}</p>
                    <p className="text-sm text-gray-600">{volunteer.deliveries} deliveries</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{volunteer.distance}km</p>
                    <p className="text-xs text-gray-500">distance</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
          
          <ChartCard title="Top NGOs" delay={1.1}>
            <div className="space-y-3">
              {analytics.performance.topNGOs.map((ngo, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{ngo.name}</p>
                    <p className="text-sm text-gray-600">{ngo.recipients} recipients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-600">{ngo.satisfaction}%</p>
                    <p className="text-xs text-gray-500">satisfaction</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
