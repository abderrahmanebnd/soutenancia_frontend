import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function TeacherAndCoSupervisorsCard({ teacherObject, coSupervisorsArray }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-primary">
          Supervisor & Co-Supervisors
        </CardTitle>
        <CardDescription>Project supervisor and co-supervisors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold mb-2 text-primary">
            Project Supervisor:
          </h3>
          <div className="flex items-center gap-3 p-3 rounded-md border">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">
                {teacherObject.user.firstName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {teacherObject.user.firstName} {teacherObject.user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">
                {teacherObject.user.email}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 text-primary">
            Project Co-Supervisors:
          </h3>
          {coSupervisorsArray?.length > 0 ? (
            <div className="space-y-2">
              {coSupervisorsArray.map((teacher) => (
                <div
                  key={teacher.user.id}
                  className="flex items-center gap-3 p-3 rounded-md border"
                >
                  <Avatar>
                    <AvatarFallback>
                      {teacher.user?.firstName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {teacher.user.firstName} {teacher.user.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {teacher.user.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No Co-Supervisors for this project
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TeacherAndCoSupervisorsCard;
