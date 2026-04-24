// Mock database
const mockStocks = [
  { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", price: 3845, change: "+1.2%" },
  { symbol: "INFY", name: "Infosys", sector: "IT", price: 1520, change: "-0.5%" },
  { symbol: "HDFC", name: "HDFC Bank", sector: "Banking", price: 1680, change: "+0.8%" },
  { symbol: "ICICIBANK", name: "ICICI Bank", sector: "Banking", price: 1120, change: "+1.5%" },
  { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy", price: 2850, change: "-0.2%" },
];

export async function fetchStocks(query) {
  if (!query) return mockStocks;
  const lower = query.toLowerCase();
  return mockStocks.filter(s =>
    s.symbol.toLowerCase().includes(lower) ||
    s.name.toLowerCase().includes(lower) ||
    s.sector.toLowerCase().includes(lower)
  );
}