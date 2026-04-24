const mockFunds = [
  { id: "MF101", name: "HDFC Equity Fund", type: "equity", returns_1y: "18%", risk: "Moderate" },
  { id: "MF104", name: "HDFC Equity Fund", type: "equity", returns_1y: "28%", risk: "Moderate" },
  { id: "MF102", name: "SBI Bluechip Fund", type: "equity", returns_1y: "15%", risk: "Moderate" },
  { id: "MF103", name: "ICICI Prudential Debt Fund", type: "debt", returns_1y: "7%", risk: "Low" },
];

export async function fetchFunds(typeQuery) {
  if (!typeQuery) return mockFunds;
  const lower = typeQuery.toLowerCase();
  return mockFunds.filter(f => f.type.toLowerCase().includes(lower) || f.name.toLowerCase().includes(lower));
}