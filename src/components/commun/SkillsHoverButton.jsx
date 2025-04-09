import { Badge } from "../ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

function SkillsHoverButton({ 
  generalSkills = [], 
  customSkills = [],
  emptyMessage = "No skills required"
}) {
  const hasGeneralSkills = generalSkills.length > 0;
  const hasCustomSkills = customSkills.length > 0;

  if (!hasGeneralSkills && !hasCustomSkills) {
    return <p className="text-muted-foreground text-sm">{emptyMessage}</p>;
  }

  return (
    <div>
      {hasGeneralSkills && generalSkills.length > 1 ? (
        <HoverCard>
          <HoverCardTrigger>
            <Badge className="cursor-pointer">
              {generalSkills[0].name} ...
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-4">
              {hasGeneralSkills && (
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-semibold">
                      General Skills{" "}
                      <Badge variant="outline">{generalSkills.length}</Badge>
                    </h4>
                    <h5 className="text-xs text-muted-foreground">
                      General Skills required for the project
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {generalSkills.map((skill) => (
                      <Badge key={skill.name}>{skill.name}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {hasCustomSkills && (
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-semibold">
                      Custom Skills{" "}
                      <Badge variant="outline">{customSkills.length}</Badge>
                    </h4>
                    <h5 className="text-xs text-muted-foreground">
                      Custom Skills required for the project
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {customSkills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : hasGeneralSkills ? (
        <Badge>{generalSkills[0].name}</Badge>
      ) : hasCustomSkills ? (
        <Badge variant="outline">{customSkills[0]}</Badge>
      ) : null}
    </div>
  );
}

export default SkillsHoverButton;