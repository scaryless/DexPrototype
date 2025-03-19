import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowDownUp, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ChainSelect } from "./ChainSelect";
import { TokenSelect } from "./TokenSelect";
import { apiRequest } from "@/lib/queryClient";
import type { ChainId } from "@/lib/constants";
import type { SwapRequest } from "@shared/schema";

const SLIPPAGE_PRESETS = [0.5, 1, 2, 3];

export function TokenSwap() {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [fromChain, setFromChain] = useState<ChainId>("ETH");
  const [toChain, setToChain] = useState<ChainId>("BSC");
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("WBNB");
  const [slippage, setSlippage] = useState(0.5);
  const [customSlippage, setCustomSlippage] = useState("");

  const { mutate: getQuote, data: quote, isPending } = useMutation({
    mutationFn: async (data: SwapRequest) => {
      const res = await apiRequest("POST", "/api/swap/quote", data);
      return res.json();
    }
  });

  const handleSwap = () => {
    if (!amount) {
      toast({
        title: "Enter amount",
        description: "Please enter an amount to swap",
        variant: "destructive",
      });
      return;
    }

    getQuote({
      fromChain,
      toChain,
      fromToken,
      toToken,
      amount: parseFloat(amount),
      slippage,
    });
  };

  const handleSlippageChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 50) {
      setSlippage(numValue);
      setCustomSlippage(value);
    }
  };

  const handleFlip = () => {
    setFromChain(toChain);
    setToChain(fromChain);
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings2 className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Slippage Tolerance</h4>
                <div className="flex gap-2">
                  {SLIPPAGE_PRESETS.map((preset) => (
                    <Button
                      key={preset}
                      variant={slippage === preset ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => {
                        setSlippage(preset);
                        setCustomSlippage("");
                      }}
                    >
                      {preset}%
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={customSlippage}
                    onChange={(e) => handleSlippageChange(e.target.value)}
                    placeholder="Custom"
                    className="w-24"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <ChainSelect value={fromChain} onChange={setFromChain} />
              <TokenSelect
                chainId={fromChain}
                value={fromToken}
                onChange={setFromToken}
              />
            </div>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFlip}
              className="rounded-full"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <ChainSelect value={toChain} onChange={setToChain} />
              <TokenSelect
                chainId={toChain}
                value={toToken}
                onChange={setToToken}
              />
            </div>
            <Input
              type="number"
              placeholder="0.0"
              value={quote?.estimatedOutput?.toFixed(6) || ""}
              disabled
            />
          </div>

          {quote && (
            <div className="text-sm space-y-2 p-4 bg-muted/50 rounded-lg">
              <div className="flex justify-between text-muted-foreground">
                <span>Exchange Rate</span>
                <span>1 {fromToken} = {quote.exchangeRate.toFixed(6)} {toToken}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Minimum Received</span>
                <span>{quote.minOutput.toFixed(6)} {toToken}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Price Impact</span>
                <span className={quote.priceImpact > 2 ? "text-destructive" : ""}>
                  {quote.priceImpact}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Network Fee</span>
                <span>{quote.fee} {toToken}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Slippage Tolerance</span>
                <span>{slippage}%</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handleSwap}
          disabled={isPending}
        >
          {isPending ? "Getting Quote..." : "Swap"}
        </Button>
      </CardFooter>
    </Card>
  );
}