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
import { SUPPORTED_CHAINS, type ChainId } from "@/lib/constants";

interface ChainSelectProps {
  value: ChainId;
  onChange: (value: ChainId) => void;
}

export function ChainSelect({ value, onChange }: ChainSelectProps) {
  const selectedChain = SUPPORTED_CHAINS.find((chain) => chain.id === value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between w-[200px]">
          <div className="flex items-center gap-2">
            {selectedChain && (
              <img src={selectedChain.logo} alt={selectedChain.name} className="h-4 w-4" />
            )}
            {selectedChain?.name}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search chain..." />
          <CommandEmpty>No chain found.</CommandEmpty>
          <CommandGroup>
            {SUPPORTED_CHAINS.map((chain) => (
              <CommandItem
                key={chain.id}
                onSelect={() => onChange(chain.id)}
                className="flex items-center gap-2"
              >
                <img src={chain.logo} alt={chain.name} className="h-4 w-4" />
                {chain.name}
                {value === chain.id && (
                  <Check className="h-4 w-4 ml-auto" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
