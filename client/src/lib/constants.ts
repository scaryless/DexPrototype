export const SUPPORTED_CHAINS = [
  {
    id: "ETH",
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg"
  },
  {
    id: "BSC",
    name: "BNB Smart Chain",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg"
  },
  {
    id: "SOL",
    name: "Solana",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.svg"
  }
] as const;

export type ChainId = typeof SUPPORTED_CHAINS[number]["id"];
