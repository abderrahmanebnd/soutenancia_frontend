import { Badge } from "../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function SkillsHoverButton({ skillsArray }) {
  return (
    <div>
      {skillsArray.length > 1 ? (
        <HoverCard>
          <HoverCardTrigger>
            <Badge className="cursor-pointer">{skillsArray.at(0)} ...</Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-semibold ">
                    General Skills{" "}
                    <Badge variant="outline">{skillsArray.length}</Badge>
                  </h4>
                  <h5 className="text-xs text-muted-foreground">
                    General Skills specific to the student
                  </h5>
                </div>
                <div className="space-x-1">
                  {skillsArray.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-semibold ">
                    Custom Skills{" "}
                    <Badge variant="outline">{skillsArray.length}</Badge>
                  </h4>
                  <h5 className="text-xs text-muted-foreground">
                    Custom Skills specific to the student
                  </h5>
                </div>
                <div className="space-x-1">
                  {skillsArray.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Badge>{skillsArray.at(0)}</Badge>
      )}
    </div>
  );
}

export default SkillsHoverButton;
