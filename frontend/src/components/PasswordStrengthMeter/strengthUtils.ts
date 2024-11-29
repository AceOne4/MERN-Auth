export const strengthLevels = [
  { label: "Very Weak", color: "bg-gray-500" }, // No bar filled
  { label: "Weak", color: "bg-red-500" }, // 1 bar filled
  { label: "Fair", color: "bg-yellow-500" }, // 2 bars filled
  { label: "Good", color: "bg-blue-500" }, // 3 bars filled
  { label: "Strong", color: "bg-green-500" }, // 4 bars filled
];

// Calculate strength (0 to 4)
export const calculateStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z\d]/.test(password)) strength++;
  return strength;
};
