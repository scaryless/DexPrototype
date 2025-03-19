import { SUPPORTED_TOKENS } from "./tokens";

// Simule des variations de prix pour le développement
function getRandomPriceVariation(basePrice: number): number {
  const variation = (Math.random() - 0.5) * 0.01; // ±0.5% variation
  return basePrice * (1 + variation);
}

const BASE_PRICES = {
  ETH: 3500,
  USDT: 1,
  USDC: 1,
  BNB: 420,
  CAKE: 3,
  BUSD: 1,
  SOL: 125,
  RAY: 0.5,
  SRM: 0.15
};

// Mise à jour des prix pour tous les tokens
export async function updateTokenPrices(): Promise<void> {
  SUPPORTED_TOKENS.forEach(token => {
    const basePrice = BASE_PRICES[token.symbol as keyof typeof BASE_PRICES] || 1;
    token.price = getRandomPriceVariation(basePrice);
  });
}

// Initialise les prix et les met à jour toutes les 10 secondes
export function initializePriceService(): void {
  updateTokenPrices();
  setInterval(updateTokenPrices, 10000);
}
