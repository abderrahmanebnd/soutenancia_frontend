<CommandItem
  key={option.value}
  value={option.value || ""} // Fallback to an empty string if value is undefined
  onSelect={() => handleSelect(option.value)}
>
  <Check
    className={`mr-2 h-4 w-4 ${
      selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
    }`}
  />
  {option.label}
</CommandItem>