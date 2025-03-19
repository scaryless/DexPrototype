import { tokens, type Token, type InsertToken } from "@shared/schema";

export interface IStorage {
  getTokens(): Promise<Token[]>;
  getTokensByChain(chain: string): Promise<Token[]>;
  getTokenPrice(symbol: string, chain: string): Promise<number>;
}

export class MemStorage implements IStorage {
  private tokens: Token[];

  constructor() {
    this.tokens = [
      {
        id: 1,
        symbol: "ETH",
        name: "Ethereum",
        chain: "ETH",
        price: 3500.00,
        logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
      },
      {
        id: 2,
        symbol: "WBNB",
        name: "Wrapped BNB",
        chain: "BSC",
        price: 420.00,
        logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg"
      },
      {
        id: 3,
        symbol: "SOL",
        name: "Solana",
        chain: "SOL",
        price: 125.00,
        logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg"
      },
      {
        id: 4,
        symbol: "USDT",
        name: "Tether",
        chain: "ETH",
        price: 1.00,
        logoUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg"
      },
      {
        id: 5,
        symbol: "USDT",
        name: "Tether",
        chain: "BSC",
        price: 1.00,
        logoUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg"
      },
      {
        id: 6,
        symbol: "USDC",
        name: "USD Coin",
        chain: "SOL",
        price: 1.00,
        logoUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg"
      }
    ];
  }

  async getTokens(): Promise<Token[]> {
    return this.tokens;
  }

  async getTokensByChain(chain: string): Promise<Token[]> {
    return this.tokens.filter(token => token.chain === chain);
  }

  async getTokenPrice(symbol: string, chain: string): Promise<number> {
    const token = this.tokens.find(t => t.symbol === symbol && t.chain === chain);
    if (!token) throw new Error(`Token ${symbol} not found on chain ${chain}`);
    return token.price;
  }
}

export const storage = new MemStorage();
