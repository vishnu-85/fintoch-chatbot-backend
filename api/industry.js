const mockIndustries = [
  { name: "IT", growth_rate: "12%", top_stocks: ["TCS", "INFY"], description: "Technology sector growing fast" },
  { name: "Banking", growth_rate: "7.2%", top_stocks: ["HDFC", "ICICIBANK"], description: "Credit growth driven" },
  { name: "Pharma", growth_rate: "9%", top_stocks: ["SUNPHARMA", "DRREDDY"], description: "Steady demand" },
];

export async function fetchIndustry(query) {
  if (!query) return mockIndustries;
  const lower = query.toLowerCase();
  return mockIndustries.filter(i => i.name.toLowerCase().includes(lower));
}