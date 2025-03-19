import { WalletConnect } from "@/components/WalletConnect";
import { TokenSwap } from "@/components/TokenSwap";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Cross-Chain DEX</h1>
          <WalletConnect />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Swap Tokens Across Chains
          </h2>
          <p className="text-muted-foreground">
            Seamlessly exchange tokens between Ethereum, BSC, and Solana networks
          </p>
        </div>

        <TokenSwap />
      </main>
    </div>
  );
}
