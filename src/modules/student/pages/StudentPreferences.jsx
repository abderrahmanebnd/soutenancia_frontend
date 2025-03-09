import React, { useState } from "react";
import { Popup } from "../components/Popup";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const skillsData = {
  frontend: ["React", "Angular", "Vue", "Svelte", "Ember"],
  backend: ["Express", "Django", "Spring", "Laravel", "Flask"],
  design: ["Figma", "Sketch", "Adobe XD", "InVision", "Axure"],
  mobile: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"],
  others: [],
};

export const StudentPreferences = ({ isOpen, onClose }) => {
  const [skillType, setSkillType] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [customValue, setCustomValue] = useState("");

  const handleSkillTypeChange = (value) => {
    setSkillType(value);
    const techs = skillsData[value]?.map((tech) => ({ value: tech, label: tech })) || [];
    setTechnologies(techs);
    setSelectedTechnologies([]);
  };

  const handleSelectTechnologies = (selectedOptions) => {
    setSelectedTechnologies(selectedOptions);
  };

  const handleCustomInputChange = (e) => {
    setCustomValue(e.target.value);
  };

  const handleSubmit = () => {
    if (skillType === "others" && !customValue.trim()) {
      alert("Please enter a custom value.");
      return;
    }
    if (skillType !== "others" && selectedTechnologies.length === 0) {
      alert("Please select at least one technology.");
      return;
    }
    const generalSkills = skillType === "others" ? [] : selectedTechnologies.map((tech) => tech.value);
    const customSkill = skillType === "others" ? customValue : "";
    console.log("Données envoyées :", { generalSkills, customSkill });
    onClose({ generalSkills, customSkill }); 
  };

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Add Preferences</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">Tell us about your skills so people can see you.</p>

        <div className="mb-6">
          <Label className="block text-sm font-bold text-gray-700 mb-2">Select Skills</Label>
          <Select onValueChange={handleSkillTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a skill type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(skillsData).map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {skillType !== "others" && technologies.length > 0 && (
          <div className="mb-6">
            <Label className="block text-sm font-bold text-gray-700 mb-2">Select Frameworks</Label>
            
              <MultiSelect options={technologies} onSelect={handleSelectTechnologies} placeholder="Select frameworks" />
          
          </div>
        )}

        {skillType === "others" && (
          <div className="mb-6">
            <Label className="block text-sm font-bold text-gray-700 mb-2">Other Skills</Label>
            <Input 
              value={customValue} 
              onChange={handleCustomInputChange}  
              placeholder="Enter other skills here"  
              className="w-full custom-input"  
            />
          </div>
        )}
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Popup>
  );
};