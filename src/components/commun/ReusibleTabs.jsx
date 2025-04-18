import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addSpacesBeforeCapitals } from "@/utils/helpers";
import { Link } from "react-router";

function ReusibleTabs({
  defaultValue,
  secondaryValue,
  defaultComponent,
  secondaryComponent,
  defaultLink = "",
  secondaryLink = "",
}) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-white lg:h-14 h-12 rounded-lg shadow-md lg:p-2 p-1.5 mb-4">
        <TabsTrigger
          value={defaultValue}
          className="h-full data-[state=active]:text-white  data-[state=active]:bg-primary rounded-lg data-[state=active]:shadow-sm transition-all duration-300 ease-in-out text-primary"
          asChild
        >
          <Link to={defaultLink}>{addSpacesBeforeCapitals(defaultValue)}</Link>
        </TabsTrigger>
        <TabsTrigger
          value={secondaryValue}
          className="h-full data-[state=active]:text-white data-[state=active]:bg-primary rounded-lg data-[state=active]:shadow-sm transition-all duration-300 ease-in-out text-primary"
          asChild
        >
          <Link to={secondaryLink}>
            {addSpacesBeforeCapitals(secondaryValue)}
          </Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value={defaultValue}>{defaultComponent}</TabsContent>
      <TabsContent value={secondaryValue}>{secondaryComponent}</TabsContent>
    </Tabs>
  );
}

export default ReusibleTabs;
