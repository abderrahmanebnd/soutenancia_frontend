import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check, ChevronDown, X, CheckCircle, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaReact, FaAngular, FaVuejs, FaDocker, FaFigma, FaCode, FaCogs } from "react-icons/fa";
import { SiSvelte, SiEmberdotjs, SiExpress, SiDjango, SiSpring, SiLaravel, SiFlask, SiSketch, SiAdobexd, SiInvision } from "react-icons/si";
import { Code, Cog, Database, Server, Smartphone, Wrench } from "lucide-react";

const technologyIcons = {
  React: <FaReact className="mr-2 h-4 w-4" />,
  Angular: <FaAngular className="mr-2 h-4 w-4" />,
  Vue: <FaVuejs className="mr-2 h-4 w-4" />,
  Svelte: <SiSvelte className="mr-2 h-4 w-4" />,
  Ember: <SiEmberdotjs className="mr-2 h-4 w-4" />,
  Express: <SiExpress className="mr-2 h-4 w-4" />,
  Django: <SiDjango className="mr-2 h-4 w-4" />,
  Spring: <SiSpring className="mr-2 h-4 w-4" />,
  Laravel: <SiLaravel className="mr-2 h-4 w-4" />,
  Flask: <SiFlask className="mr-2 h-4 w-4" />,
  Figma: <FaFigma className="mr-2 h-4 w-4" />,
  Sketch: <SiSketch className="mr-2 h-4 w-4" />,
  "Adobe XD": <SiAdobexd className="mr-2 h-4 w-4" />,
  InVision: <SiInvision className="mr-2 h-4 w-4" />,
  Axure: <Wrench className="mr-2 h-4 w-4" />,
  Flutter: <Smartphone className="mr-2 h-4 w-4" />,
  Swift: <Code className="mr-2 h-4 w-4" />,
  Kotlin: <Code className="mr-2 h-4 w-4" />,
  Ionic: <Smartphone className="mr-2 h-4 w-4" />,
};

export const MultiSelect = ({ options = [], onSelect, placeholder = "Select options" }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const safeOptions = Array.isArray(options)
    ? options.map((option) => ({
        value: option.value || `fallback-${Math.random()}`,
        label: option.label || "Unknown",
      }))
    : [];

  const handleSelectAll = () => {
    const allValues = safeOptions.map((option) => option.value);
    setSelectedValues(allValues);

    const selectedOptions = safeOptions.map((opt) => ({
      value: opt.value,
      label: opt.label,
    }));

    onSelect(selectedOptions);
  };

  const handleClearAll = () => {
    setSelectedValues([]);
    onSelect([]); 
  };

  const handleSelect = (value) => {
    if (!value) return;

    const option = safeOptions.find((o) => o.value === value);
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    const selectedOptions = newSelectedValues.map((val) => {
      const opt = safeOptions.find((o) => o.value === val);
      return { value: opt.value, label: opt.label };
    });

    onSelect(selectedOptions);
  };

  const handleRemove = (value) => {
    const newSelectedValues = selectedValues.filter((v) => v !== value);
    setSelectedValues(newSelectedValues);

    // Renvoyer un tableau d'objets { value, label }
    const selectedOptions = newSelectedValues.map((val) => {
      const opt = safeOptions.find((o) => o.value === val);
      return { value: opt.value, label: opt.label };
    });

    onSelect(selectedOptions);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between ${selectedValues.length > 2 ? "h-auto min-h-[40px] py-2" : "h-10"}`}
        >
          <div className="flex flex-wrap gap-1">
            {selectedValues.length > 0 ? (
              selectedValues.map((val) => {
                const option = safeOptions.find((o) => o.value === val);
                return (
                  <Badge key={val} variant="secondary" className="flex items-center gap-1">
                    {technologyIcons[option.label] || technologyIcons.Unknown}
                    {option?.label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(val);
                      }}
                    />
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandGroup>
            <CommandItem onSelect={handleSelectAll}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Select All
            </CommandItem>
            {safeOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value || ""}
                onSelect={() => handleSelect(option.value)}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                  }`}
                />
                {technologyIcons[option.label] || technologyIcons.Unknown}
                {option.label}
              </CommandItem>
            ))}
            <CommandItem onSelect={handleClearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};