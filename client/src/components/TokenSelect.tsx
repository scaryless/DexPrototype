import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Token } from "@shared/schema";
import type { ChainId } from "@/lib/constants";

interface TokenSelectProps {
  chainId: ChainId;
  value: string;
  onChange: (value: string) => void;
}

export function TokenSelect({ chainId, value, onChange }: TokenSelectProps) {
  const { data: tokens } = useQuery<Token[]>({
    queryKey: [`/api/tokens/${chainId}`],
  });

  const selectedToken = tokens?.find((token) => token.symbol === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between w-[200px]">
          <div className="flex items-center gap-2">
            {selectedToken && (
              <img src={selectedToken.logoUrl} alt={selectedToken.name} className="h-4 w-4" />
            )}
            {selectedToken?.symbol || "Select token"}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandEmpty>No token found.</CommandEmpty>
          <CommandGroup>
            {tokens?.map((token) => (
              <CommandItem
                key={token.id}
                onSelect={() => onChange(token.symbol)}
                className="flex items-center gap-2"
              >
                <img src={token.logoUrl} alt={token.name} className="h-4 w-4" />
                {token.symbol}
                <span className="text-muted-foreground ml-auto">
                  ${token.price.toFixed(2)}
                </span>
                {value === token.symbol && (
                  <Check className="h-4 w-4" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
