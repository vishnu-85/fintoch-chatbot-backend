import { fetchStocks } from "../api/stocks.js";
import { fetchFunds } from "../api/funds.js";
import { fetchIndustry } from "../api/industry.js";
import { fetchMarketSummary } from "../api/market.js";

export async function fetchDataByIntent(category, filters, searchTerm) {
  switch (category) {
    case "stock":
      const sector = filters.sector || searchTerm;
      return await fetchStocks(sector);
    case "fund":
      const fundType = filters.type || searchTerm;
      return await fetchFunds(fundType);
    case "industry":
      const industryName = filters.name || searchTerm;
      return await fetchIndustry(industryName);
    case "market":
      return await fetchMarketSummary();
    default:
      return [];
  }
}