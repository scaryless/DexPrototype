import { SUPPORTED_TOKENS } from "./tokens";

const COINGECKO_IDS: Record<string, string> = {
  ETH: 'ethereum',
  USDT: 'tether',
  USDC: 'usd-coin',
  WBTC: 'wrapped-bitcoin',
  LINK: 'chainlink',
  BNB: 'binancecoin',
  CAKE: 'pancakeswap-token',
  BUSD: 'binance-usd',
  XRP: 'ripple',
  ADA: 'cardano',
  SOL: 'solana',
  RAY: 'raydium',
  SRM: 'serum',
  ORCA: 'orca',
  BONK: 'bonk'
};

async function fetchPricesFromCoingecko(): Promise<Record<string, number>> {
  try {
    const ids = Object.values(COINGECKO_IDS).join(',');
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch prices from CoinGecko');
    }

    const data = await response.json();
    
    // Convertir la réponse de CoinGecko en notre format
    const prices: Record<string, number> = {};
    Object.entries(COINGECKO_IDS).forEach(([symbol, id]) => {
      if (data[id]) {
        prices[symbol] = data[id].usd;
      }
    });
    
    return prices;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return {};
  }
}

// Mise à jour des prix pour tous les tokens
export async function updateTokenPrices(): Promise<void> {
  const prices = await fetchPricesFromCoingecko();
  
  SUPPORTED_TOKENS.forEach(token => {
    if (prices[token.symbol]) {
      token.price = prices[token.symbol];
    }
  });
}

// Initialise les prix et les met à jour toutes les 60 secondes
// Note: CoinGecko a une limite de rate de 10-50 appels par minute pour l'API gratuite
export function initializePriceService(): void {
  updateTokenPrices();
  setInterval(updateTokenPrices, 60000); // Mise à jour toutes les 60 secondes
}