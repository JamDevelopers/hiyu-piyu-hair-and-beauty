export const timeSlots: string[] = [
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
  "06:30 PM"
];

export const defaultDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() + 1); // Default to tomorrow for realistic home-service appointments
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};
