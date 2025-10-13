export const usersSeed = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Donor",
    email: "alice@example.com",
    status: "Active",
    activity: 12,
  },
  {
    id: 2,
    name: "Ben Carter",
    role: "Volunteer",
    email: "ben@example.com",
    status: "Active",
    activity: 25,
  },
  {
    id: 3,
    name: "Clara Singh",
    role: "Donor",
    email: "clara@example.com",
    status: "Inactive",
    activity: 3,
  },
  {
    id: 4,
    name: "Diego Morales",
    role: "Volunteer",
    email: "diego@example.com",
    status: "Active",
    activity: 17,
  },
  {
    id: 5,
    name: "Emma Brown",
    role: "Donor",
    email: "emma@example.com",
    status: "Active",
    activity: 8,
  },
];

export const donationsSeed = [
  {
    id: 101,
    donor: "Alice Johnson",
    type: "Canned Food",
    date: "2025-10-08",
    status: "Pending",
    quantity: 40,
  },
  {
    id: 102,
    donor: "Emma Brown",
    type: "Fresh Produce",
    date: "2025-10-09",
    status: "Collected",
    quantity: 25,
  },
  {
    id: 103,
    donor: "Alice Johnson",
    type: "Bakery",
    date: "2025-10-10",
    status: "Distributed",
    quantity: 15,
  },
  {
    id: 104,
    donor: "Clara Singh",
    type: "Dairy",
    date: "2025-10-11",
    status: "Pending",
    quantity: 10,
  },
  {
    id: 105,
    donor: "Emma Brown",
    type: "Frozen Meals",
    date: "2025-10-12",
    status: "Collected",
    quantity: 20,
  },
];

export const volunteersSeed = [
  { id: 201, name: "Ben Carter", assigned: 3, completed: 21, active: true },
  { id: 202, name: "Diego Morales", assigned: 1, completed: 14, active: true },
  { id: 203, name: "Fatima Noor", assigned: 2, completed: 9, active: false },
];

export const inventorySeed = [
  { id: 301, item: "Rice (kg)", qty: 120 },
  { id: 302, item: "Beans (kg)", qty: 90 },
  { id: 303, item: "Milk (L)", qty: 40 },
  { id: 304, item: "Bread (packs)", qty: 55 },
];
