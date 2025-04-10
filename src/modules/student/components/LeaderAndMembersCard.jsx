import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function LeaderAndMembersCard({ leaderObject, teamMembersArray }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-primary">
          Team Leader & Members
        </CardTitle>
        <CardDescription>Team leadership and current members</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2 text-primary">
            Team Leader:
          </h3>
          <div className="flex items-center gap-3 p-3 rounded-md border">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">
                {leaderObject.user.firstName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {leaderObject.user.firstName} {leaderObject.user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {leaderObject.user.email}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 text-primary">
            Team Members:
          </h3>
          {teamMembersArray.length > 1 ? (
            <div className="space-y-2">
              {teamMembersArray.slice(1).map((member) => (
                <div
                  key={member.student.user.email}
                  className="flex items-center gap-3 p-3 rounded-md border"
                >
                  <Avatar>
                    <AvatarFallback>
                      {member.student.user?.firstName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {member.student.user.firstName}{" "}
                      {member.student.user.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.student.user.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No team members yet</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default LeaderAndMembersCard;