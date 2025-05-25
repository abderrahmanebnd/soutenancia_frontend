import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Folder, Upload } from "lucide-react";
import SprintDescription from "../features/sprints/SprintDescription";

import SprintUploads from "../features/sprints/SprintUploads";
import SprintDeliverablesAndNotes from "../features/sprints/SprintDeliverablesAndNotes";

function SprintTabs({ idSprint }) {
  return (
    <Tabs defaultValue="sprintDescription" className="w-full">
      <TabsList className="w-full bg-white h-12 p-0 flex justify-start overflow-hidden">
        <TabsTrigger
          value="sprintDescription"
          className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-primary data-[state=active]:shadow-none data-[state=active]:h-12 data-[state=active]:text-white rounded-none "
        >
          <FileText className="h-4 w-4" />
          <span>Sprint Description</span>
        </TabsTrigger>
        <TabsTrigger
          value="uploadFiles"
          className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-primary data-[state=active]:shadow-none data-[state=active]:h-12 data-[state=active]:text-white rounded-none"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Deliverables</span>
        </TabsTrigger>
        <TabsTrigger
          value="deliverablesNotes"
          className="flex items-center gap-2 py-2 px-4 data-[state=active]:bg-primary data-[state=active]:shadow-none data-[state=active]:h-12 data-[state=active]:text-white rounded-none"
        >
          <Folder className="h-4 w-4" />
          <span>Deliverables & Notes</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sprintDescription">
        <SprintDescription idSprint={idSprint} />
      </TabsContent>
      <TabsContent value="uploadFiles">
        <SprintUploads idSprint={idSprint} />
      </TabsContent>
      <TabsContent value="deliverablesNotes">
        <SprintDeliverablesAndNotes idSprint={idSprint} />
      </TabsContent>
    </Tabs>
  );
}

export default SprintTabs;
