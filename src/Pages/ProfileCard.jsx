import { useState, useEffect, useRef } from "react";
import { useUploadAvatar } from "@/features/useUploadAvatar";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import toast from "react-hot-toast";
import { Edit2, Camera, ChevronDown, X, Plus, Check } from "lucide-react";
import { useUser } from "@/features/useUsers";
import { Badge } from "@/components/ui/Badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useStudentSkills } from "@/modules/student/features/team-offers/useStudentSkills";
import { useSpecialities } from "@/features/specialities/useSpecialities";
import { useTeamOffer } from "@/modules/student/features/team-offers/useTeamOffer";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty
} from "@/components/ui/Command";

export default function ProfileCard() {
  const { user, isLoading, error, updateUser, isUpdating } = useUser();
  const { uploadAvatar, isLoading: isUploading } = useUploadAvatar();
  const fileInputRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    department: "",
    bio: "",
    speciality: "",
    year: "",
    customSkills: []
  });
  const [customSkillInput, setCustomSkillInput] = useState("");
  const { studentSkills, isLoading: isGettingStudentSkills } = useStudentSkills();
  const { specialities, isLoading: isGettingSpecialities } = useSpecialities();
  
  const teamOfferId = user?.Student?.TeamMember?.[0]?.teamOfferId;
  const { teamOfferDetails } = useTeamOffer(teamOfferId);

  const getOrdinalSuffix = (year) => {
    if (!year) return '';
    const j = year % 10;
    const k = year % 100;
    if (j === 1 && k !== 11) {
      return year + "st";
    }
    if (j === 2 && k !== 12) {
      return year + "nd";
    }
    if (j === 3 && k !== 13) {
      return year + "rd";
    }
    return year + "th";
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        title: user.Teacher?.title || "",
        department: user.Teacher?.department || "",
        bio: user.Teacher?.bio || "",
        year: user.Student?.year?.toString() || user.Student?.speciality?.year?.toString() || "",
        speciality: user.Student?.speciality?.id || "",
        customSkills: user.Student?.customSkills || []
      });
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for immediate UI feedback
      const previewUrl = URL.createObjectURL(file);
      setAvatarFile({
        file,
        previewUrl
      });
    }
  };
  

  const handleUpload = async () => {
    if (!avatarFile?.file) return;
    try {
      await uploadAvatar(avatarFile.file);
      setAvatarFile(null);
    } catch {
      toast.error("Upload failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    const currentSpeciality = specialities?.find(s => s.id === formData.speciality);
    
    setFormData(prev => ({
      ...prev,
      year: newYear,
      speciality: currentSpeciality?.year.toString() === newYear ? prev.speciality : ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateUser({
        ...formData,
        // Ensure these fields are properly sent
        year: formData.year ? parseInt(formData.year) : null,
        speciality: formData.speciality || null
      });
      setEditMode(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed");
    }
  };
  const addSkill = (skill) => {
    if (!formData.customSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        customSkills: [...prev.customSkills, skill]
      }));
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      customSkills: prev.customSkills.filter(s => s !== skill)
    }));
  };

  if (isLoading) return <Skeleton className="w-full h-64" />;
  if (error) return <div className="p-4 text-red-600 bg-red-50 rounded-md">Error: {error.message}</div>;
  if (!user) return <div className="p-4 text-red-600 bg-red-50 rounded-md">No user data</div>;

  const isStudent = user?.role === "student";
  const teamRole = user?.Student?.id === teamOfferDetails?.leader_id 
    ? "Leader" 
    : "Member";

  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const cardVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-6">
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={titleVariants}
        className="bg-white rounded-xl px-6 py-5 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl text-blue-900 font-bold tracking-tight">Profile Management</h1>
            <p>
              {isStudent ? "Student Profile" : "Teacher Profile"}
            </p>
          </div>
          {!editMode && (
            <Button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 transition-all"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <span className="animate-spin">↻</span>
              ) : (
                <>
                  Edit Profile <Edit2 className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </motion.section>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative group mb-4">
              <Avatar className="w-40 h-40 border-4 border-white shadow-lg hover:shadow-xl transition-shadow">
  <AvatarImage 
    src={avatarFile?.previewUrl || user?.avatarUrl || (isStudent ? "/assets/std1.png" : "/assets/teacher.png")} 
    alt="Profile"
    className="hover:scale-105 transition-transform"
  />
</Avatar>
                {editMode && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white hover:bg-opacity-20"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Change
                    </Button>
                  </div>
                )}
              </div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {avatarFile && (
  <div className="flex gap-3 w-full justify-center animate-fade-in">
    <Button
      type="button"
      variant="outline"
      onClick={() => setAvatarFile(null)}
    >
      Cancel
    </Button>
    <Button
      type="button"
      onClick={handleUpload}
      disabled={isUploading}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      {isUploading ? "Uploading..." : "Save Photo"}
    </Button>
  </div>
)}
            </div>

            <div className="w-full md:w-2/3">
              <CardHeader className="pb-4 px-0">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center"
                >
                  <div className="w-2 h-6 bg-blue-600 rounded-full mr-3"></div>
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Personal Information
                  </CardTitle>
                </motion.div>
              </CardHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-600">First Name</Label>
                  {editMode ? (
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user?.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-600">Last Name</Label>
                  {editMode ? (
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user?.lastName}</p>
                  )}
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-gray-600">Email</Label>
                  {editMode ? (
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user?.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-gray-100" />

          <div>
            <CardHeader className="pb-4 px-0">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <div className="w-2 h-6 bg-indigo-600 rounded-full mr-3"></div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {isStudent ? "Academic Information" : "Professional Information"}
                </CardTitle>
              </motion.div>
            </CardHeader>

            {isStudent ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-600">Enrollment</Label>
                    <p className="text-gray-800 font-medium">{user?.Student?.enrollmentNumber || "-"}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-600">Speciality</Label>
                    {editMode ? (
                 // In your ProfileCard component's speciality Popover:
<Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className="w-full justify-between"
      disabled={isGettingSpecialities}
    >
      {formData.speciality
        ? specialities?.find(s => s.id === formData.speciality)?.name
        : "Select speciality"}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[300px] p-0">
    <Command>
      <CommandInput placeholder="Search speciality..." />
      <CommandList>
        <CommandEmpty>
          No specialities found
        </CommandEmpty>
        <CommandGroup>
          {specialities?.map((speciality) => (
            <CommandItem
              key={speciality.id}
              value={speciality.name}
              onSelect={() => {
                setFormData(prev => ({
                  ...prev,
                  speciality: speciality.id,
                  year: speciality.year.toString()
                }));
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  formData.speciality === speciality.id ? "opacity-100" : "opacity-0"
                )}
              />
              {speciality.name} (Year {speciality.year})
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
                    ) : (
                      <p className="text-gray-800 font-medium">
                        {user?.Student?.speciality?.name || "-"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    {editMode ? (
                      <Input
                        id="year"
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleYearChange}
                        min={1}
                        max={5}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">
                        {formData.year ? `${getOrdinalSuffix(parseInt(formData.year))} Year` : '-'}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-600">Team</Label>
                    <p className="text-gray-800 font-medium">
                      {teamOfferDetails?.title || "No team assigned"}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-gray-600">Team Role <br/> </Label>
                    <Badge 
                      variant={teamRole === "Leader" ? "default" : "secondary"}
                      className="animate-pulse"
                    >
                      {teamRole}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-700">Skills</Label>
                    {editMode ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className="w-full justify-between"
                                >
                                  Select skills
                                  <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
                                    {formData.customSkills.length}
                                  </span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0" align="start">
                                {isGettingStudentSkills ? (
                                  <div className="p-4 text-center">Loading...</div>
                                ) : (
                                  <Command>
                                    <CommandInput placeholder="Search skills..." />
                                    <CommandList>
                                      <CommandEmpty>No skills found.</CommandEmpty>
                                      <CommandGroup>
                                        {studentSkills?.map((skill) => {
                                          const isSelected = formData.customSkills.includes(skill.name);
                                          return (
                                            <CommandItem
                                              key={skill.id}
                                              onSelect={() => {
                                                if (isSelected) {
                                                  removeSkill(skill.name);
                                                } else {
                                                  addSkill(skill.name);
                                                }
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  isSelected ? "opacity-100" : "opacity-0"
                                                )}
                                              />
                                              {skill.name}
                                            </CommandItem>
                                          );
                                        })}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                )}
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add custom skill"
                                value={customSkillInput}
                                onChange={(e) => setCustomSkillInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    const trimmedValue = customSkillInput.trim();
                                    if (trimmedValue && !formData.customSkills.includes(trimmedValue)) {
                                      addSkill(trimmedValue);
                                      setCustomSkillInput("");
                                    }
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                  const trimmedValue = customSkillInput.trim();
                                  if (trimmedValue && !formData.customSkills.includes(trimmedValue)) {
                                    addSkill(trimmedValue);
                                    setCustomSkillInput("");
                                  }
                                }}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {formData.customSkills.length > 0 && (
                          <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-gray-50">
                            {formData.customSkills.map((skillValue) => (
                              <Badge
                                key={skillValue}
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                {skillValue}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skillValue)}
                                  className="rounded-full p-0.5 hover:bg-gray-100"
                                >
                                  <X className="h-3 w-3 text-gray-500" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {formData.customSkills.length > 0 ? (
                          formData.customSkills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-gray-500">No skills added</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-600">Title</Label>
                    {editMode ? (
                      <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Professor"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{user?.Teacher?.title || "-"}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600">Department</Label>
                    {editMode ? (
                      <Input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{user?.Teacher?.department || "-"}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-600">Bio</Label>
                  {editMode ? (
                    <Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="min-h-[100px]"
                    />
                  ) : (
                    <p className="text-gray-800 whitespace-pre-line">{user?.Teacher?.bio || "-"}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {editMode && (
            <CardFooter className="flex justify-end gap-4 pt-8 mt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditMode(false)}
                className="hover:bg-gray-100 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
                className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          )}
        </form>
      </motion.div>
    </div>
  );
}