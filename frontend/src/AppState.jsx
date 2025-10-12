import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AppStateContext = createContext(null);

const seedPickups = [
  {
    id: "p1",
    donor: {
      name: "GreenBite Cafe",
      lat: 37.7749,
      lng: -122.4194,
      address: "123 Market St, SF",
    },
    ngo: {
      name: "Hope Foundation",
      lat: 37.7849,
      lng: -122.4094,
      address: "789 Mission St, SF",
    },
    items: [
      { name: "Sandwiches", qty: 24 },
      { name: "Salads", qty: 12 },
    ],
    expiry: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "p2",
    donor: {
      name: "Sunset Bakery",
      lat: 37.763,
      lng: -122.478,
      address: "455 Irving St, SF",
    },
    ngo: {
      name: "Meals for All",
      lat: 37.768,
      lng: -122.431,
      address: "2400 Fulton St, SF",
    },
    items: [{ name: "Bread Loaves", qty: 18 }],
    expiry: new Date(Date.now() + 1.5 * 60 * 60 * 1000).toISOString(),
  },
];

const defaultProfile = (email) => ({
  name:
    (email?.split("@")[0] || "Volunteer").replace(/\W/g, " ").trim() ||
    "Volunteer",
  email,
  phone: "",
  serviceArea: "San Francisco",
  vehicle: "Car",
  rating: 4.8,
  level: "Silver",
});

export function AppStateProvider({ children }) {
  const email = useMemo(
    () => window.__APP_USER_EMAIL__ || "nohijo1720@movfull.com",
    []
  );
  const [pendingPickups, setPendingPickups] = useState(seedPickups);
  const [deliveries, setDeliveries] = useState([]);
  const [profile, setProfile] = useState(defaultProfile(email));

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("app_state");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.pendingPickups) setPendingPickups(parsed.pendingPickups);
        if (parsed.deliveries) setDeliveries(parsed.deliveries);
        if (parsed.profile) setProfile(parsed.profile);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "app_state",
        JSON.stringify({ pendingPickups, deliveries, profile })
      );
    } catch {}
  }, [pendingPickups, deliveries, profile]);

  const acceptPickup = (p) => {
    setPendingPickups((arr) => arr.filter((x) => x.id !== p.id));
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    setDeliveries((arr) => [
      ...arr,
      { id: `d-${p.id}`, route: p, status: "Picked up", otp },
    ]);
  };

  const rejectPickup = (p) => {
    setPendingPickups((arr) => arr.filter((x) => x.id !== p.id));
  };

  const advanceDelivery = (d) => {
    setDeliveries((arr) =>
      arr.map((x) =>
        x.id === d.id
          ? {
              ...x,
              status: x.status === "Picked up" ? "In Transit" : "Delivered",
            }
          : x
      )
    );
  };

  const confirmOtp = (deliveryId, code) => {
    setDeliveries((arr) =>
      arr.map((d) =>
        d.id === deliveryId && d.otp === code
          ? { ...d, status: "Delivered" }
          : d
      )
    );
  };

  const value = {
    email,
    profile,
    setProfile,
    pendingPickups,
    deliveries,
    acceptPickup,
    rejectPickup,
    advanceDelivery,
    confirmOtp,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
