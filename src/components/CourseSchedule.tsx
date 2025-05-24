
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface CourseSession {
  id: string;
  course: string;
  professor: string;
  class: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  duration: number;
}

interface CourseScheduleProps {
  sessions: CourseSession[];
  userRole: "admin" | "professor" | "student";
  professorName?: string;
}

const CourseSchedule = ({ sessions, userRole, professorName }: CourseScheduleProps) => {
  const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
  
  const filteredSessions = userRole === "professor" && professorName 
    ? sessions.filter(session => session.professor === professorName)
    : sessions;

  const getSessionsForDay = (day: string) => {
    return filteredSessions
      .filter(session => session.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getStatusColor = (course: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500", 
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500"
    ];
    return colors[course.length % colors.length];
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {daysOfWeek.map(day => (
          <Card key={day} className="min-h-[400px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-center">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {getSessionsForDay(day).map(session => (
                <div
                  key={session.id}
                  className="border rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`text-white ${getStatusColor(session.course)}`}>
                      {session.course}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {session.startTime} - {session.endTime}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    {userRole !== "professor" && (
                      <div className="font-medium">{session.professor}</div>
                    )}
                    <div className="text-muted-foreground">{session.class}</div>
                    <div className="text-muted-foreground">Salle: {session.room}</div>
                    <div className="text-xs text-muted-foreground">
                      {session.duration}h
                    </div>
                  </div>
                </div>
              ))}
              
              {getSessionsForDay(day).length === 0 && (
                <div className="text-center text-muted-foreground text-sm pt-8">
                  Aucun cours prévu
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseSchedule;
