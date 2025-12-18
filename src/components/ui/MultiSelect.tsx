/**
 * Multi-Select Component
 * Select multiple items with search, tags display, and suggestions
 */

import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Search, Plus } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";

interface MultiSelectProps {
  selected: string[];
  suggestions?: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  allowCustom?: boolean;
  maxItems?: number;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  selected,
  suggestions = [],
  onChange,
  placeholder = "Select items...",
  label,
  allowCustom = true,
  maxItems,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter suggestions based on search and exclude already selected
  const filteredSuggestions = suggestions.filter(
    (item) =>
      !selected.includes(item) &&
      item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add item to selected
  const addItem = (item: string) => {
    if (!selected.includes(item) && (!maxItems || selected.length < maxItems)) {
      onChange([...selected, item]);
      setSearchQuery("");
      setInputValue("");
      inputRef.current?.focus();
    }
  };

  // Remove item from selected
  const removeItem = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  // Handle custom item input
  const handleAddCustom = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !selected.includes(trimmed)) {
      addItem(trimmed);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (allowCustom && inputValue.trim()) {
        handleAddCustom();
      } else if (filteredSuggestions.length > 0) {
        addItem(filteredSuggestions[0]);
      }
    }
  };

  const canAddMore = !maxItems || selected.length < maxItems;

  return (
    <div className={`space-y-2 ${className}`} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}

      {/* Selected Items */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="pl-3 pr-1 py-1 flex items-center gap-1"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Input Field */}
      {canAddMore && (
        <div className="relative">
          <div className="flex items-center gap-2 border rounded-md p-2 focus-within:ring-2 focus-within:ring-ring">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            {allowCustom && inputValue.trim() && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleAddCustom}
                className="shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            )}
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown */}
          {isOpen && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-60 overflow-y-auto">
              <div className="p-1">
                {filteredSuggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => addItem(item)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results message */}
          {isOpen && searchQuery && filteredSuggestions.length === 0 && (
            <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-lg p-3">
              <p className="text-sm text-muted-foreground text-center">
                {allowCustom
                  ? 'No suggestions found. Press Enter or click "Add" to create custom.'
                  : "No matching suggestions found"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Max items message */}
      {maxItems && selected.length >= maxItems && (
        <p className="text-xs text-muted-foreground">
          Maximum {maxItems} items selected
        </p>
      )}
    </div>
  );
};
