import { tokens, type Token, type InsertToken } from "@shared/schema";

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

const DEFAULT_PRICES: Record<string, number> = {
  ETH: 3500,
  USDT: 1,
  USDC: 1,
  WBTC: 65000,
  LINK: 15,
  BNB: 420,
  CAKE: 3,
  BUSD: 1,
  XRP: 0.6,
  ADA: 0.5,
  SOL: 125,
  RAY: 0.5,
  SRM: 0.15,
  ORCA: 0.8,
  BONK: 0.000001
};

async function fetchPricesFromCoingecko(): Promise<Record<string, number>> {
  try {
    const ids = Object.values(COINGECKO_IDS).join(',');
    console.log('Fetching prices from CoinGecko for:', ids);
    
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
    );
    
    if (!response.ok) {
      console.error('CoinGecko API error:', response.status, response.statusText);
      console.log('Using default prices due to API error');
      return DEFAULT_PRICES;
    }

    const data = await response.json();
    console.log('CoinGecko response:', data);
    
    const prices: Record<string, number> = {};
    Object.entries(COINGECKO_IDS).forEach(([symbol, id]) => {
      if (data[id]?.usd) {
        prices[symbol] = data[id].usd;
      } else {
        // Utiliser le prix par défaut si pas de données de l'API
        prices[symbol] = DEFAULT_PRICES[symbol] || 0;
      }
    });
    
    console.log('Processed prices:', prices);
    return prices;
  } catch (error) {
    console.error('Error fetching prices:', error);
    console.log('Using default prices due to error');
    return DEFAULT_PRICES;
  }
}

export interface IStorage {
  getTokens(): Promise<Token[]>;
  getTokensByChain(chain: string): Promise<Token[]>;
  getTokenPrice(symbol: string, chain: string): Promise<number>;
}

export class MemStorage implements IStorage {
  private tokens: Token[];
  private prices: Record<string, number>;
  private lastPriceUpdate: number;

  constructor() {
    this.tokens = [
      // Ethereum Tokens
      {
        id: 1,
        symbol: "ETH",
        name: "Ethereum",
        chain: "ETH",
        price: DEFAULT_PRICES.ETH,
        logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
      },
      {
        id: 2,
        symbol: "USDT",
        name: "Tether USD",
        chain: "ETH",
        price: DEFAULT_PRICES.USDT,
        logoUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg"
      },
      {
        id: 3,
        symbol: "USDC",
        name: "USD Coin",
        chain: "ETH",
        price: DEFAULT_PRICES.USDC,
        logoUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg"
      },
      {
        id: 4,
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        chain: "ETH",
        price: DEFAULT_PRICES.WBTC,
        logoUrl: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg"
      },
      {
        id: 5,
        symbol: "LINK",
        name: "Chainlink",
        chain: "ETH",
        price: DEFAULT_PRICES.LINK,
        logoUrl: "https://cryptologos.cc/logos/chainlink-link-logo.svg"
      },

      // BSC Tokens
      {
        id: 6,
        symbol: "BNB",
        name: "Binance Coin",
        chain: "BSC",
        price: DEFAULT_PRICES.BNB,
        logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg"
      },
      {
        id: 7,
        symbol: "CAKE",
        name: "PancakeSwap",
        chain: "BSC",
        price: DEFAULT_PRICES.CAKE,
        logoUrl: "https://cryptologos.cc/logos/pancakeswap-cake-logo.svg"
      },
      {
        id: 8,
        symbol: "BUSD",
        name: "Binance USD",
        chain: "BSC",
        price: DEFAULT_PRICES.BUSD,
        logoUrl: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg"
      },
      {
        id: 9,
        symbol: "XRP",
        name: "XRP Token",
        chain: "BSC",
        price: DEFAULT_PRICES.XRP,
        logoUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.svg"
      },
      {
        id: 10,
        symbol: "ADA",
        name: "Cardano Token",
        chain: "BSC",
        price: DEFAULT_PRICES.ADA,
        logoUrl: "https://cryptologos.cc/logos/cardano-ada-logo.svg"
      },

      // Solana Tokens
      {
        id: 11,
        symbol: "SOL",
        name: "Solana",
        chain: "SOL",
        price: DEFAULT_PRICES.SOL,
        logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg"
      },
      {
        id: 12,
        symbol: "RAY",
        name: "Raydium",
        chain: "SOL",
        price: DEFAULT_PRICES.RAY,
        logoUrl: "https://cryptologos.cc/logos/raydium-ray-logo.svg"
      },
      {
        id: 13,
        symbol: "SRM",
        name: "Serum",
        chain: "SOL",
        price: DEFAULT_PRICES.SRM,
        logoUrl: "https://cryptologos.cc/logos/serum-srm-logo.svg"
      },
      {
        id: 14,
        symbol: "ORCA",
        name: "Orca",
        chain: "SOL",
        price: DEFAULT_PRICES.ORCA,
        logoUrl: "https://cryptologos.cc/logos/orca-orca-logo.svg"
      },
      {
        id: 15,
        symbol: "BONK",
        name: "Bonk",
        chain: "SOL",
        price: DEFAULT_PRICES.BONK,
        logoUrl: "https://cryptologos.cc/logos/bonk-bonk-logo.svg"
      }
    ];
    this.prices = { ...DEFAULT_PRICES };
    this.lastPriceUpdate = 0;
    this.updatePrices();
    // Mise à jour toutes les 2 minutes pour éviter les limites de l'API
    setInterval(() => this.updatePrices(), 120000);
  }

  private async updatePrices(): Promise<void> {
    const now = Date.now();
    if (now - this.lastPriceUpdate < 120000) {
      console.log('Skipping price update - too soon');
      return;
    }
    
    console.log('Updating prices...');
    this.prices = await fetchPricesFromCoingecko();
    this.lastPriceUpdate = now;
    
    // Mettre à jour les prix des tokens
    this.tokens.forEach(token => {
      if (this.prices[token.symbol]) {
        token.price = this.prices[token.symbol];
        console.log(`Updated price for ${token.symbol}: ${token.price}`);
      } else {
        console.log(`No price found for ${token.symbol}`);
      }
    });
  }

  async getTokens(): Promise<Token[]> {
    await this.updatePrices();
    return this.tokens;
  }

  async getTokensByChain(chain: string): Promise<Token[]> {
    await this.updatePrices();
    return this.tokens.filter(token => token.chain === chain);
  }

  async getTokenPrice(symbol: string, chain: string): Promise<number> {
    await this.updatePrices();
    const token = this.tokens.find(t => t.symbol === symbol && t.chain === chain);
    if (!token) throw new Error(`Token ${symbol} not found on chain ${chain}`);
    return token.price;
  }
}

export const storage = new MemStorage();
