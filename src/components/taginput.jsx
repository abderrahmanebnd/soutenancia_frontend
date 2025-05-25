// components/TagInput.jsx
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function TagInput({ tags = [], onChange, disabled }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
      setInput("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    onChange(newTags);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="flex items-center gap-1">
            {tag}
            {!disabled && (
              <button type="button" onClick={() => removeTag(index)}>
                <X className="h-3 w-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>
      <Input
        type="text"
        placeholder="Ajouter une compétence et appuyer sur Entrée"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
    </div>
  );
}
