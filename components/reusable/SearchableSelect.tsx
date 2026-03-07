import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  selectHeight?: string; // e.g., "max-h-[200px]"
  disabled?: boolean;
  searchable?: boolean; // New prop to enable/disable search
  required?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found",
  className,
  selectHeight = "max-h-[200px]",
  disabled = false,
  searchable = false, // Default to false for normal select behavior
  required = false,
}: SearchableSelectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // Filter options only if search is enabled
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  // Reset search when dropdown closes
  React.useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  return (
    <Select
      value={value}
      onValueChange={onChange}
      open={open}
      onOpenChange={setOpen}
      disabled={disabled}
      required={required}
    >
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder}>
          {selectedLabel || placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {/* Search Input - Only shown when searchable is true */}
        {searchable && (
          <div 
            className="flex items-center px-3 pb-2 pt-2 border-b" 
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Options List with Scroll */}
        <div className={cn("overflow-y-auto", selectHeight)}>
          <SelectGroup>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="py-2 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            )}
          </SelectGroup>
        </div>
      </SelectContent>
    </Select>
  );
}