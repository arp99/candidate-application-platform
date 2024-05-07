export const engineeringRoles = [
  { value: "Backend", label: "Backend" },
  { value: "Frontend", label: "Frontend" },
  { value: "Fullstack", label: "Fullstack" },
  { value: "IOS", label: "IOS" },
  { value: "Flutter", label: "Flutter" },
  { value: "React Native", label: "React Native" },
  { value: "Frontend", label: "Frontend" },
];

export const designOptions = [
  { value: "Designer", label: "Designer" },
  { value: "Design Manager", label: "Design Manager" },
  { value: "Graphics Designer", label: "Graphics Designer" },
  { value: "Product Designer", label: "Product Designer" },
];

export const groupedRoleOptions = [
  {
    label: "ENGINEERING",
    options: engineeringRoles,
  },
  {
    label: "DESIGN",
    options: designOptions,
  },
];

export const EmployeesOptions = [
  { value: { min: 1, max: 10 }, label: "1-10" },
  { value: { min: 11, max: 20 }, label: "11-20" },
  { value: { min: 21, max: 50 }, label: "21-50" },
  { value: { min: 51, max: 100 }, label: "51-100" },
  { value: { min: 101, max: 200 }, label: "101-200" },
  { value: { min: 201, max: 500 }, label: "201-500" },
  { value: { min: 500 }, label: "500+" },
];

export const ExperienceOptions = "0"
  .repeat(10)
  .split("")
  .map((val, index) => ({
    value: index + 1,
    label: `${index + 1}`,
  }));

export const LocationOptions = [
  {
    value: "Remote",
    label: "Remote",
  },

  {
    value: "Hybrid",
    label: "Hybrid",
  },
  {
    value: "In-Office",
    label: "In-Office",
  },
];

export const BasePayOptions = [0, 10, 20, 30, 40, 50, 60, 70].map((value) => ({
  value,
  label: `${value}L`,
}));
