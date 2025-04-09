import { Badge } from "../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function SkillsHoverButton({ generalSkillsArray, customSkillsArray }) {
  return (
    <div>
      {generalSkillsArray.length > 1 ? (
        <HoverCard>
          <HoverCardTrigger>
            <Badge className="cursor-pointer">
              {generalSkillsArray.at(0)} ...
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-semibold ">
                    General Skills{" "}
                    <Badge variant="outline">{generalSkillsArray.length}</Badge>
                  </h4>
                  <h5 className="text-xs text-muted-foreground">
                    General Skills specific to the student
                  </h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {generalSkillsArray.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-semibold ">
                    Custom Skills{" "}
                    <Badge variant="outline">
                      {customSkillsArray.at(0).length}
                    </Badge>
                  </h4>
                  <h5 className="text-xs text-muted-foreground">
                    Custom Skills specific to the student
                  </h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customSkillsArray.at(0).length > 0 ? (
                    customSkillsArray.at(0).map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">
                      No custom skills required
                    </p>
                  )}
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <Badge>{generalSkillsArray.at(0)}</Badge>
      )}
    </div>
  );
}

export default SkillsHoverButton;
