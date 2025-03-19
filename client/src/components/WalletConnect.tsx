import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  
  const simulateConnect = () => {
    setIsConnected(true);
  };

  if (isConnected) {
    return (
      <Button variant="outline" className="gap-2">
        <Wallet className="h-4 w-4" />
        0x1234...5678
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={simulateConnect} className="w-full gap-2">
            <img src="https://metamask.io/images/metamask-fox.svg" alt="MetaMask" className="h-5 w-5" />
            MetaMask
          </Button>
          <Button onClick={simulateConnect} className="w-full gap-2">
            <img src="https://phantom.app/img/logo.svg" alt="Phantom" className="h-5 w-5" />
            Phantom
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
