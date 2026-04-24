export async function fetchMarketSummary() {
  return {
    indices: [
      { name: "NIFTY 50", value: 22300, change: "+0.45%" },
      { name: "SENSEX", value: 73500, change: "+0.38%" },
    ],
    market_status: "Open",
    advanced_decline_ratio: "1.2:1",
  };
}