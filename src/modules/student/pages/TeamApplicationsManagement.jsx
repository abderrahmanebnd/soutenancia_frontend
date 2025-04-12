import TeamApplications from "./TeamApplications";
import MyApplications from "./MyApplications";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

export default function TeamApplicationsManagement() {
  const { currentUser } = useAuth();
  const isLeader = currentUser?.user?.Student?.isLeader;
  if (isLeader) return <TeamApplications />;
  return (
    <Tabs defaultValue="teamApplications" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-white lg:h-14 h-12 rounded-xl shadow-sm lg:p-2 p-1.5 mb-4">
        <TabsTrigger
          value="teamApplications"
          className="h-full data-[state=active]:text-white data-[state=active]:bg-[#002545fc] rounded-lg data-[state=active]:shadow-sm transition-all duration-300 ease-in-out text-primary"
        >
          Team Applications
        </TabsTrigger>
        <TabsTrigger
          value="myApplications"
          className="h-full data-[state=active]:text-white data-[state=active]:bg-[#002545fc] rounded-lg data-[state=active]:shadow-sm transition-all duration-300 ease-in-out text-primary"
        >
          My Applications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="teamApplications">
        <TeamApplications />
      </TabsContent>
      <TabsContent value="myApplications">
        <MyApplications />
      </TabsContent>
      {/* <div className="space-y-8">
      <TeamApplications />
      <MyApplications />
    </div> */}
    </Tabs>
  );
}
