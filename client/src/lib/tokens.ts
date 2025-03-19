import { type Token } from "@shared/schema";

export const SUPPORTED_TOKENS: Token[] = [
  // Ethereum Tokens
  {
    id: 1,
    symbol: "ETH",
    name: "Ethereum",
    chain: "ETH",
    price: 0, // Will be updated from API
    logoUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
  },
  {
    id: 2,
    symbol: "USDT",
    name: "Tether USD",
    chain: "ETH",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/tether-usdt-logo.svg"
  },
  {
    id: 3,
    symbol: "USDC",
    name: "USD Coin",
    chain: "ETH",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg"
  },
  {
    id: 4,
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    chain: "ETH",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg"
  },
  {
    id: 5,
    symbol: "LINK",
    name: "Chainlink",
    chain: "ETH",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/chainlink-link-logo.svg"
  },

  // BSC Tokens
  {
    id: 6,
    symbol: "BNB",
    name: "Binance Coin",
    chain: "BSC",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/bnb-bnb-logo.svg"
  },
  {
    id: 7,
    symbol: "CAKE",
    name: "PancakeSwap",
    chain: "BSC",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/pancakeswap-cake-logo.svg"
  },
  {
    id: 8,
    symbol: "BUSD",
    name: "Binance USD",
    chain: "BSC",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/binance-usd-busd-logo.svg"
  },
  {
    id: 9,
    symbol: "XRP",
    name: "XRP Token",
    chain: "BSC",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/xrp-xrp-logo.svg"
  },
  {
    id: 10,
    symbol: "ADA",
    name: "Cardano Token",
    chain: "BSC",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/cardano-ada-logo.svg"
  },

  // Solana Tokens
  {
    id: 11,
    symbol: "SOL",
    name: "Solana",
    chain: "SOL",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg"
  },
  {
    id: 12,
    symbol: "RAY",
    name: "Raydium",
    chain: "SOL",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/raydium-ray-logo.svg"
  },
  {
    id: 13,
    symbol: "SRM",
    name: "Serum",
    chain: "SOL",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/serum-srm-logo.svg"
  },
  {
    id: 14,
    symbol: "ORCA",
    name: "Orca",
    chain: "SOL",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/orca-orca-logo.svg"
  },
  {
    id: 15,
    symbol: "BONK",
    name: "Bonk",
    chain: "SOL",
    price: 0,
    logoUrl: "https://cryptologos.cc/logos/bonk-bonk-logo.svg"
  }
];

// Map pour retrouver rapidement les tokens par chaîne
export const getTokensByChain = (chain: string): Token[] => {
  return SUPPORTED_TOKENS.filter(token => token.chain === chain);
};

// Map pour retrouver rapidement un token par symbole et chaîne
export const getToken = (symbol: string, chain: string): Token | undefined => {
  return SUPPORTED_TOKENS.find(token => token.symbol === symbol && token.chain === chain);
};