import { useState, useEffect, useRef, useCallback } from "react";
import { useUploadAvatar } from "@/features/useUploadAvatar";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { CardHeader, CardTitle} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Skeleton } from "@/components/ui/Skeleton";
import toast from "react-hot-toast";
import { Edit2, Camera, ChevronDown, X, Plus, Check, Save, Ban, Info, Loader2 } from "lucide-react";
import { useUser } from "@/features/useUsers";
import { Badge } from "@/components/ui/Badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useStudentSkills } from "@/modules/student/features/team-offers/useStudentSkills";
import { useSpecialities } from "@/features/specialities/useSpecialities";
import { useTeamOffer } from "@/modules/student/features/team-offers/useTeamOffer";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/Command";

// Centralize common string constants for better maintainability
const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
};

export default function ProfileCard() {
  const { user, isLoading, error, updateUser, isUpdating } = useUser();
  const { uploadAvatar, isLoading: isUploading } = useUploadAvatar();
  const fileInputRef = useRef(null);

  // State for form data, derived from user initially. This will hold the "staged" changes.
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    title: "",
    department: "",
    bio: "",
    speciality: "",
    year: "",
    customSkills: [],
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Data fetching hooks
  const { studentSkills, isLoading: isGettingStudentSkills } = useStudentSkills();
  const { specialities, isLoading: isGettingSpecialities } = useSpecialities();

  const isStudent = user?.role === USER_ROLES.STUDENT;
  const teamOfferId = isStudent ? user?.Student?.TeamMember?.[0]?.teamOfferId : null;
  const { teamOfferDetails } = useTeamOffer(teamOfferId);
  const teamRole = isStudent && user?.Student?.id === teamOfferDetails?.leader_id ? "Leader" : "Member";

  // Initialize profileData when user data loads or changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        title: user.Teacher?.title || "",
        department: user.Teacher?.department || "",
        bio: user.Teacher?.bio || "",
        year: user.Student?.year?.toString() || user.Student?.speciality?.year?.toString() || "",
        speciality: user.Student?.speciality?.id || "",
        customSkills: user.Student?.customSkills || [],
      });
    }
  }, [user]);


  // Helper function to handle updating the user data in the backend
  const handleUpdateField = useCallback(async (fieldName, value) => {
    // Only save if the value has actually changed from the last saved state
    let originalValue;
    if (isStudent && fieldName === 'customSkills') {
      originalValue = user?.Student?.customSkills;
    } else if (!isStudent && (fieldName === 'title' || fieldName === 'department' || fieldName === 'bio')) {
      originalValue = user?.Teacher?.[fieldName];
    } else {
      originalValue = user?.[fieldName];
    }

    if (JSON.stringify(value) === JSON.stringify(originalValue)) {
      // No change, no need to save
      return;
    }

    toast.loading(`Saving ${fieldName}...`, { id: `save-${fieldName}` });

    try {
      const dataToUpdate = {};
      if (isStudent && fieldName === 'customSkills') {
        dataToUpdate.customSkills = value;
      } else if (!isStudent && (fieldName === 'title' || fieldName === 'department' || fieldName === 'bio')) {
        dataToUpdate.Teacher = { [fieldName]: value }; // For nested teacher fields
      } else {
        dataToUpdate[fieldName] = value;
      }

      await updateUser(dataToUpdate); // `updateUser` needs to handle partial updates
      toast.success(`${fieldName} updated successfully!`, { id: `save-${fieldName}` });
    } catch (err) {
      console.error(`Error saving ${fieldName}:`, err);
      toast.error(`Failed to update ${fieldName}.`, { id: `save-${fieldName}` });
      // Revert to original value if save fails
      setProfileData(prev => ({ ...prev, [fieldName]: originalValue }));
      throw err; // Re-throw to allow InlineEditableField to handle its state
    }
  }, [user, updateUser, isStudent]);

  // Handle avatar file selection
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size too large. Max 5MB allowed.");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setAvatarFile({ file, previewUrl });
    }
  }, []);

  // Handle avatar upload
  const handleAvatarUpload = useCallback(async () => {
    if (!avatarFile?.file) return;
    toast.loading("Uploading avatar...", { id: "avatarUpload" });
    try {
      await uploadAvatar(avatarFile.file);
      setAvatarFile(null);
      toast.success("Avatar uploaded successfully!", { id: "avatarUpload" });
    } catch (err) {
      console.error("Avatar upload error:", err);
      toast.error("Failed to upload avatar. Please try again.", { id: "avatarUpload" });
    }
  }, [avatarFile, uploadAvatar]);

  // Handle year change for students (not inline editable in this new logic)
  const handleYearChange = useCallback((e) => {
    const newYear = e.target.value;
    const currentSpeciality = specialities?.find(s => s.id === profileData.speciality);

    setProfileData(prev => ({
      ...prev,
      year: newYear,
      speciality: currentSpeciality?.year.toString() === newYear ? prev.speciality : "",
    }));
  }, [profileData.speciality, specialities]);

  // Add a skill to the custom skills array
  const addSkill = useCallback(async (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !profileData.customSkills.includes(trimmedSkill)) {
      const newSkills = [...profileData.customSkills, trimmedSkill];
      setProfileData(prev => ({
        ...prev,
        customSkills: newSkills,
      }));
      setCustomSkillInput("");
      setIsPopoverOpen(false);
      await handleUpdateField('customSkills', newSkills); // Save immediately
    }
  }, [profileData.customSkills, handleUpdateField]);

  // Remove a skill from the custom skills array
  const removeSkill = useCallback(async (skill) => {
    const newSkills = profileData.customSkills.filter(s => s !== skill);
    setProfileData(prev => ({
      ...prev,
      customSkills: newSkills,
    }));
    await handleUpdateField('customSkills', newSkills); // Save immediately
  }, [profileData.customSkills, handleUpdateField]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Skeleton className="w-full max-w-4xl h-[600px] rounded-2xl shadow-xl" />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 text-red-700 bg-red-100 rounded-2xl shadow-lg flex flex-col items-center gap-4 max-w-2xl mx-auto mt-12"
      >
        <X className="h-12 w-12 text-red-500" />
        <p className="text-xl font-semibold">Error loading profile</p>
        <p className="text-center">Please try again later. Details: {error.message}</p>
        <Button onClick={() => window.location.reload()} className="mt-4 bg-red-600 hover:bg-red-700 text-white">
          Reload Page
        </Button>
      </motion.div>
    );
  }

  // Render no user data state
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 text-orange-700 bg-orange-100 rounded-2xl shadow-lg flex flex-col items-center gap-4 max-w-2xl mx-auto mt-12"
      >
        <Info className="h-12 w-12 text-orange-500" />
        <p className="text-xl font-semibold">No user data available</p>
        <p className="text-center">It looks like you're not logged in or your user data could not be fetched. Please log in to view your profile.</p>
      </motion.div>
    );
  }

  // Animation variants for Framer Motion
  const sectionVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut", delay: 0.2 } },
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Helper component for inline editable fields
  const InlineEditableField = ({ id, label, value, name, type = "text", isTextarea = false, disabled = false, className = "" }) => {
    const [isEditingThisField, setIsEditingThisField] = useState(false);
    const [fieldValue, setFieldValue] = useState(value);
    const [isSavingField, setIsSavingField] = useState(false); // Local saving state for this field
    const initialValueRef = useRef(value); // To store the value when editing starts

    // Update local state if the prop `value` changes (e.g., after a successful save from parent, or initial load)
    useEffect(() => {
      setFieldValue(value);
      initialValueRef.current = value;
    }, [value]);

    const Component = isTextarea ? Textarea : Input;

    const handleEditClick = () => {
      if (!disabled) {
        setIsEditingThisField(true);
        initialValueRef.current = fieldValue; // Store current value as the "original" for cancel
      }
    };

    const handleSave = async () => {
      setIsSavingField(true);
      try {
        await handleUpdateField(name, fieldValue);
        setIsEditingThisField(false);
        // FieldValue is already updated by the parent's useEffect from user data
      } catch (err) {
        // Error handled by handleUpdateField, but we need to reset editing state here
        setFieldValue(initialValueRef.current); // Revert to original if save fails
      } finally {
        setIsSavingField(false);
      }
    };

    const handleCancel = () => {
      setFieldValue(initialValueRef.current); // Revert to value before editing started
      setIsEditingThisField(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !isTextarea) {
        e.preventDefault();
        handleSave();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    };

    return (
      <motion.div variants={itemFadeIn} className="space-y-2 relative">
        <Label htmlFor={id} className="text-gray-700 font-medium text-base">{label}</Label>
        {!isEditingThisField && !disabled ? (
          <div
            className={cn(
              "p-3.5 border border-gray-300 rounded-md text-gray-800 text-base cursor-pointer hover:border-blue-500 transition-colors flex justify-between items-center",
              className
            )}
            onClick={handleEditClick}
          >
            <span className="truncate">{value || `Click to add ${label.toLowerCase()}`}</span>
            <Edit2 className="h-4 w-4 text-gray-500 ml-2 flex-shrink-0" />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Component
              id={id}
              name={name}
              type={type}
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled || isSavingField}
              autoFocus={isEditingThisField} // Auto-focus when it becomes an input
              className={cn(
                "flex-grow border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-base px-4 py-2.5",
                disabled ? "disabled:opacity-90 disabled:cursor-not-allowed bg-gray-100 text-gray-600" : "hover:border-blue-400 focus:border-blue-500",
                className
              )}
            />
            {!disabled && (
              <AnimatePresence mode="wait">
                {isSavingField ? (
                  <motion.div
                    key="saving"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex-shrink-0"
                  >
                    <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex-shrink-0 flex gap-1"
                  >
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={handleSave}
                      className="text-green-600 hover:bg-green-100 hover:text-green-700"
                      aria-label="Save"
                      disabled={fieldValue === initialValueRef.current} // Disable if no change
                    >
                      <Check className="h-5 w-5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={handleCancel}
                      className="text-red-600 hover:bg-red-100 hover:text-red-700"
                      aria-label="Cancel"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 lg:p-12 font-sans antialiased">
      {/* Page Header Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-white rounded-3xl px-8 py-6 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border border-gray-100 mb-10"
      >
        <div>
          <h1 className="text-4xl text-blue-800 font-extrabold tracking-tight mb-2">
            Manage Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            {isStudent ? "Update your student profile details and skills." : "Manage your professional information as a teacher."}
          </p>
        </div>
      </motion.section>

      {/* Profile Card Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-2xl"
      >
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          {/* Avatar Section */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-start pt-6">
            <div className="relative group mb-8">
              <Avatar className="w-52 h-52 border-5 border-blue-300 shadow-2xl transition-all duration-300 transform group-hover:scale-105 rounded-full overflow-hidden ring-4 ring-blue-100">
                <AvatarImage
                  src={avatarFile?.previewUrl || user?.avatarUrl || (isStudent ? "/assets/std1.png" : "/assets/teacher.png")}
                  alt="Profile Avatar"
                  className="object-cover w-full h-full"
                />
              </Avatar>
              <div
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white hover:bg-opacity-30 backdrop-blur-sm text-base font-semibold px-6 py-3"
                >
                  <Camera className="h-6 w-6 mr-3" /> Change Photo
                </Button>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <AnimatePresence>
              {avatarFile && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex gap-4 w-full justify-center mt-4"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAvatarFile(null)}
                    className="text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors px-6 py-3 border-gray-300"
                  >
                    <Ban className="h-5 w-5 mr-2" /> Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleAvatarUpload}
                    disabled={isUploading}
                    className="bg-green-600 hover:bg-green-700 text-white transition-colors px-6 py-3 shadow-md hover:shadow-lg"
                  >
                    {isUploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                    {isUploading ? "Uploading..." : "Save Photo"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Personal Information Section */}
          <div className="w-full md:w-2/3">
            <CardHeader className="pb-8 px-0">
              <motion.div whileHover={{ x: 10 }} className="flex items-center">
                <div className="w-3 h-8 bg-blue-600 rounded-full mr-4"></div>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  Personal Information
                </CardTitle>
              </motion.div>
            </CardHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <InlineEditableField
                id="firstName"
                label="First Name"
                name="firstName"
                value={profileData.firstName}
              />
              <InlineEditableField
                id="lastName"
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
              />
              <motion.div variants={itemFadeIn} className="md:col-span-2 space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium text-base">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="disabled:opacity-90 disabled:cursor-not-allowed bg-gray-100 border-gray-200 text-gray-600 text-base px-4 py-2.5"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-gray-200 h-px" />

        {/* Academic/Professional Information Section */}
        <div>
          <CardHeader className="pb-8 px-0">
            <motion.div whileHover={{ x: 10 }} className="flex items-center">
              <div className="w-3 h-8 bg-indigo-600 rounded-full mr-4"></div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {isStudent ? "Academic Information" : "Professional Information"}
              </CardTitle>
            </motion.div>
          </CardHeader>

          {isStudent ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <motion.div variants={itemFadeIn} className="space-y-2">
                  <Label htmlFor="enrollment" className="text-gray-700 font-medium text-base">Enrollment Number</Label>
                  <Input
                    id="enrollment"
                    value={user?.Student?.enrollmentNumber || "N/A"}
                    disabled
                    className="disabled:opacity-90 disabled:cursor-not-allowed bg-gray-100 border-gray-200 text-gray-600 text-base px-4 py-2.5"
                  />
                </motion.div>

                <motion.div variants={itemFadeIn} className="space-y-2">
                  <Label htmlFor="speciality" className="text-gray-700 font-medium text-base">Speciality</Label>
                  <Input
                    id="speciality"
                    value={user?.Student?.speciality?.name || "N/A"}
                    disabled
                    className="disabled:opacity-90 disabled:cursor-not-allowed bg-gray-100 border-gray-200 text-gray-600 text-base px-4 py-2.5"
                  />
                </motion.div>

                <motion.div variants={itemFadeIn} className="space-y-2">
                  <Label htmlFor="year" className="text-gray-700 font-medium text-base">Year of Study</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={profileData.year}
                    onChange={handleYearChange}
                    min={1}
                    max={5}
                    disabled
                    className="disabled:opacity-90 disabled:cursor-not-allowed bg-gray-100 border-gray-200 text-gray-600 text-base px-4 py-2.5"
                  />
                </motion.div>

                <motion.div variants={itemFadeIn} className="space-y-2">
                  <Label className="text-gray-700 font-medium text-base">Current Team</Label>
                  <p className="text-gray-900 text-lg font-semibold flex items-center gap-2 bg-gray-50 p-2.5 rounded-md border border-gray-100">
                    {teamOfferDetails?.title || "No team assigned"}
                    {teamOfferDetails?.title && (
                      <Badge
                        variant={teamRole === "Leader" ? "default" : "secondary"}
                        className={cn(
                          "ml-2 px-3.5 py-1.5 text-xs font-semibold rounded-full",
                          teamRole === "Leader" ? "bg-blue-100 text-blue-800 animate-pulse" : "bg-gray-100 text-gray-700",
                        )}
                      >
                        {teamRole}
                      </Badge>
                    )}
                  </p>
                </motion.div>
              </div>

              <motion.div variants={itemFadeIn} className="space-y-4">
                <Label className="text-gray-700 font-medium text-base">Skills</Label>
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between border-gray-300 hover:border-blue-500 transition-colors text-gray-800 text-base px-4 py-2.5"
                          >
                            Select from existing skills
                            <span className="ml-3 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 font-semibold">
                              {profileData.customSkills.length} selected
                            </span>
                            <ChevronDown className="h-4 w-4 opacity-70 ml-auto" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[calc(100vw-2rem)] md:w-[400px] p-0 shadow-lg z-50" align="start">
                          {isGettingStudentSkills ? (
                            <div className="p-4 text-center text-gray-500 flex items-center justify-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" /> Loading skills...
                            </div>
                          ) : (
                            <Command>
                              <CommandInput placeholder="Search or add skills..." className="px-4 py-2.5 text-base" />
                              <CommandList className="max-h-60 overflow-y-auto">
                                <CommandEmpty>No skills found.</CommandEmpty>
                                <CommandGroup>
                                  {studentSkills?.map((skill) => {
                                    const isSelected = profileData.customSkills.includes(skill.name);
                                    return (
                                      <CommandItem
                                        key={skill.id}
                                        onSelect={() => {
                                          isSelected ? removeSkill(skill.name) : addSkill(skill.name);
                                        }}
                                        className="flex items-center justify-between text-base px-4 py-2"
                                      >
                                        {skill.name}
                                        <Check
                                          className={cn(
                                            "h-4 w-4",
                                            isSelected ? "opacity-100 text-blue-600" : "opacity-0",
                                          )}
                                        />
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
                      <div className="flex gap-3">
                        <Input
                          placeholder="Add a new skill..."
                          value={customSkillInput}
                          onChange={(e) => setCustomSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkill(customSkillInput);
                            }
                          }}
                          className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-base px-4 py-2.5"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="default"
                          onClick={() => addSkill(customSkillInput)}
                          disabled={!customSkillInput.trim()}
                          className="bg-blue-600 hover:bg-blue-700 text-white transition-colors h-11 w-11 flex-shrink-0 shadow-sm hover:shadow-md"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {profileData.customSkills.length > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-3 p-5 border border-blue-200 rounded-xl bg-blue-50 shadow-inner mt-4"
                      >
                        {profileData.customSkills.map((skillValue) => (
                          <motion.div
                            key={skillValue}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <Badge
                              variant="secondary"
                              className="flex items-center gap-2 px-4 py-2 rounded-full text-blue-900 bg-blue-200 hover:bg-blue-300 cursor-pointer transition-colors text-sm font-medium"
                            >
                              {skillValue}
                              <button
                                type="button"
                                onClick={() => removeSkill(skillValue)}
                                className="rounded-full p-0.5 hover:bg-blue-400 text-blue-800 hover:text-white transition-colors"
                                aria-label={`Remove skill ${skillValue}`}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <p className="text-gray-500 italic p-2">No skills added yet.</p>
                    )}
                  </AnimatePresence>
                </>
              </motion.div>
            </div>
          ) : (
            // Teacher specific fields
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InlineEditableField
                  id="title"
                  label="Title"
                  name="title"
                  value={profileData.title}
                  placeholder="e.g. Professor, Lecturer"
                />
                <InlineEditableField
                  id="department"
                  label="Department"
                  name="department"
                  value={profileData.department}
                />
              </div>
              <InlineEditableField
                id="bio"
                label="Bio"
                name="bio"
                value={profileData.bio}
                isTextarea={true}
                className="min-h-[120px]"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}