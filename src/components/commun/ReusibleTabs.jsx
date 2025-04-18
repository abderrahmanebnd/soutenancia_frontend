import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addSpacesBeforeCapitals } from "@/utils/helpers";
import { Link } from "react-router";

function ReusibleTabs({ tabs }) {
  return (
    <Tabs defaultValue={tabs.at(0).value} className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-white lg:h-14 h-12 rounded-lg shadow-md lg:p-2 p-1.5 mb-4">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="h-full data-[state=active]:text-white data-[state=active]:bg-primary rounded-lg data-[state=active]:shadow-sm transition-all duration-300 ease-in-out text-primary"
            {...(tab.link ? { asChild: true } : {})}
          >
            {tab.link ? (
              <Link to={tab.link}>{addSpacesBeforeCapitals(tab.value)}</Link>
            ) : (
              addSpacesBeforeCapitals(tab.value)
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default ReusibleTabs;
