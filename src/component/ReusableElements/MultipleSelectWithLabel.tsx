import * as React from 'react';
import { X } from 'lucide-react';

import { Command as CommandPrimitive } from 'cmdk';
import { Command, CommandGroup, CommandItem, CommandList } from '../ui/Command';
import { Badge } from '../ui/Badge';
import { Label } from '../ui/Label';

export interface MultipleSelectItem {
  value: string;
  label: string;
}

export interface MultipleSelectWithLabelProps {
  options: MultipleSelectItem[];
  label: string;
  value: string[];
  error?: string;
  onChange: (value: string[]) => void;
}

export default function MultipleSelectWithLabel({
  options,
  label,
  error,
  onChange,
}: MultipleSelectWithLabelProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<MultipleSelectItem[]>([
    options[1],
  ]);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((item: MultipleSelectItem) => {
    setSelected((prev) => {
      const newSelected = prev.filter((s) => s.value !== item.value);
      onChange(newSelected.map((s) => s.value));
      return newSelected;
    });
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              onChange(newSelected.map((s) => s.value));
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = options.filter((item) => !selected.includes(item));

  return (
    <div className="mb-3 grid w-full items-center">
      <Label className="font-bold pb-2">{label}</Label>
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex flex-wrap gap-1">
            {selected.map((item) => {
              return (
                <Badge key={item.value} variant="secondary">
                  {item.label}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
            {/* Avoid having the "Search" Icon */}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Wybierz typ nieruchomości"
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          <CommandList>
            {open && selectables.length > 0 ? (
              <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((item) => {
                    return (
                      <CommandItem
                        key={item.value}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue('');
                          setSelected((prev) => {
                            const newSelected = [...prev, item];
                            onChange(newSelected.map((s) => s.value));
                            return newSelected;
                          });
                        }}
                        className={'cursor-pointer'}
                      >
                        {item.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </div>
            ) : null}
          </CommandList>
        </div>
      </Command>
      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
