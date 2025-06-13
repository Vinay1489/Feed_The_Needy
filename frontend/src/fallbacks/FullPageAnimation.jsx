// src/fallbacks/FullPageAnimation.jsx
import { motion, AnimatePresence } from "framer-motion";
import { FaHandsHelping, FaDonate, FaUsers } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

export default function FullPageAnimation() {
  const roles = [
    {
      icon: <FaDonate size={40} className="text-orange-500" />,
      title: "Donors",
      description: "Your generosity fills plates and hearts.",
    },
    {
      icon: <FaUsers size={40} className="text-blue-500" />,
      title: "Volunteers",
      description: "You are the hands that deliver hope.",
    },
    {
      icon: <FaHandsHelping size={40} className="text-green-600" />,
      title: "NGOs",
      description: "You connect compassion with those in need.",
    },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 text-center p-6 z-[10000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <ImSpinner9 size={50} className="text-orange-600" />
        </motion.div>

        <h1 className="text-2xl font-bold text-orange-800 mb-8">
          Empowering Communities Through Food
        </h1>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.4,
              },
            },
          }}
        >
          {roles.map((role, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">{role.icon}</div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {role.title}
              </h2>
              <p className="text-gray-600">{role.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
