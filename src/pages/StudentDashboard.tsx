import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import AttendanceTable, { AttendanceRecord } from "@/components/AttendanceTable";
import GradesTable, { GradeRecord } from "@/components/GradesTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const sidebarItems = [
    { title: "Tableau de bord", href: "/student?tab=dashboard" },
    { title: "Mes absences", href: "/student?tab=absences" },
    { title: "Mes notes", href: "/student?tab=grades" },
    { title: "Justifications", href: "/student?tab=justifications" },
    { title: "Emploi du temps", href: "/student?tab=schedule" },
  ];

  // Données fictives pour la démo
  const attendanceData: AttendanceRecord[] = [
    { id: "1", date: "2025-05-20", course: "Mathématiques", status: "present", duration: 2 },
    { id: "2", date: "2025-05-19", course: "Physique", status: "absent", duration: 2 },
    { id: "3", date: "2025-05-18", course: "Français", status: "present", duration: 2 },
    { id: "4", date: "2025-05-18", course: "Histoire", status: "present", duration: 1 },
    { id: "5", date: "2025-05-17", course: "Anglais", status: "excused", duration: 2, justification: "Rendez-vous médical" },
    { id: "6", date: "2025-05-16", course: "SVT", status: "present", duration: 3 },
    { id: "7", date: "2025-05-16", course: "Philosophie", status: "late", duration: 2, justification: "Retard de transport" },
    { id: "8", date: "2025-05-15", course: "Mathématiques", status: "present", duration: 2 },
  ];

  // Données fictives pour les notes de l'étudiant
  const studentGrades: GradeRecord[] = [
    { id: "1", date: "2025-05-20", course: "Mathématiques", student: "Alex Dupont", class: "Terminale S", professor: "Prof. Dupont", grade: 16.5, coefficient: 2, type: "exam", comment: "Excellent travail" },
    { id: "2", date: "2025-05-19", course: "Mathématiques", student: "Alex Dupont", class: "Terminale S", professor: "Prof. Dupont", grade: 14.0, coefficient: 1, type: "homework" },
    { id: "3", date: "2025-05-18", course: "Français", student: "Alex Dupont", class: "Terminale S", professor: "Prof. Martin", grade: 12.5, coefficient: 2, type: "quiz" },
    { id: "4", date: "2025-05-17", course: "Histoire", student: "Alex Dupont", class: "Terminale S", professor: "Prof. Leroy", grade: 15.0, coefficient: 1, type: "homework" },
    { id: "5", date: "2025-05-16", course: "Anglais", student: "Alex Dupont", class: "Terminale S", professor: "Prof. Smith", grade: 17.5, coefficient: 2, type: "exam" },
    { id: "6", date: "2025-05-15", course: "SVT", student: "Alex Dupont", class: "Terminale S", professor: "Prof. Dubois", grade: 13.0, coefficient: 1, type: "homework" },
    { id: "7", date: "2025-05-14", course: "Philosophie", student: "Alex Dupont", class: "Terminale S", professor: "Prof. Bernard", grade: 14.5, coefficient: 3, type: "project" },
  ];

  // Calcul du total d'absences
  const totalAbsences = attendanceData.filter(record => record.status === "absent").reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalExcused = attendanceData.filter(record => record.status === "excused").reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalLate = attendanceData.filter(record => record.status === "late").reduce((acc, curr) => acc + (curr.duration || 0), 0);
  
  // Calcul du taux de présence
  const totalHours = attendanceData.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const absentHours = totalAbsences + totalExcused + (totalLate / 2); // On compte la moitié des heures de retard
  const attendanceRate = Math.round(((totalHours - absentHours) / totalHours) * 100);

  // Calcul des moyennes par matière
  const subjectAverages = studentGrades.reduce((acc, grade) => {
    if (!acc[grade.course]) {
      acc[grade.course] = { total: 0, coefficients: 0, count: 0 };
    }
    acc[grade.course].total += grade.grade * grade.coefficient;
    acc[grade.course].coefficients += grade.coefficient;
    acc[grade.course].count++;
    return acc;
  }, {} as Record<string, { total: number; coefficients: number; count: number }>);

  const overallAverage = Object.values(subjectAverages).reduce((acc, subject) => {
    const avg = subject.total / subject.coefficients;
    return acc + avg;
  }, 0) / Object.keys(subjectAverages).length;

  const filteredGrades = studentGrades.filter(grade => {
    if (selectedCourse !== "all" && grade.course !== selectedCourse) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header userRole="student" userName="Alex Dupont" />
      <div className="flex flex-1">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                <TabsTrigger value="absences">Mes absences</TabsTrigger>
                <TabsTrigger value="grades">Mes notes</TabsTrigger>
                <TabsTrigger value="justifications">Justifications</TabsTrigger>
                <TabsTrigger value="schedule">Emploi du temps</TabsTrigger>
              </TabsList>
              
              <div className="flex space-x-2">
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Toutes les matières" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les matières</SelectItem>
                    <SelectItem value="Mathématiques">Mathématiques</SelectItem>
                    <SelectItem value="Français">Français</SelectItem>
                    <SelectItem value="Histoire">Histoire</SelectItem>
                    <SelectItem value="Anglais">Anglais</SelectItem>
                    <SelectItem value="SVT">SVT</SelectItem>
                    <SelectItem value="Philosophie">Philosophie</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="trimester">Ce trimestre</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                  title="Total d'absences"
                  value={`${totalAbsences}h`}
                  description="Ce mois-ci"
                />
                <DashboardCard
                  title="Absences justifiées"
                  value={`${totalExcused}h`}
                  description={`${Math.round((totalExcused / (totalAbsences + totalExcused)) * 100)}% du total`}
                />
                <DashboardCard
                  title="Retards"
                  value={`${totalLate}h`}
                  description="Ce mois-ci"
                />
                <DashboardCard
                  title="Taux de présence"
                  value={`${attendanceRate}%`}
                  description="Ce mois-ci"
                />
                <DashboardCard
                  title="Moyenne générale"
                  value={`${overallAverage.toFixed(1)}/20`}
                  description="Toutes matières"
                  trend={overallAverage >= 14 ? "up" : overallAverage >= 10 ? "neutral" : "down"}
                  trendValue={overallAverage >= 14 ? "Très bon niveau" : overallAverage >= 10 ? "Niveau satisfaisant" : "À améliorer"}
                />
                <DashboardCard
                  title="Notes ce mois"
                  value={studentGrades.length.toString()}
                  description="Évaluations"
                />
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Mon assiduité</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Mathématiques</div>
                        <div className="text-sm text-muted-foreground">90%</div>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Physique</div>
                        <div className="text-sm text-muted-foreground">76%</div>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Français</div>
                        <div className="text-sm text-muted-foreground">98%</div>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Histoire</div>
                        <div className="text-sm text-muted-foreground">85%</div>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Anglais</div>
                        <div className="text-sm text-muted-foreground">82%</div>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Mes moyennes par matière</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(subjectAverages).map(([subject, data]) => {
                        const average = data.total / data.coefficients;
                        return (
                          <div key={subject} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">{subject}</div>
                              <div className="text-sm text-muted-foreground">{average.toFixed(1)}/20</div>
                            </div>
                            <Progress value={(average / 20) * 100} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <DashboardCard
                  title="Progression"
                  value={`${attendanceRate}%`}
                  description="Ce mois-ci"
                />
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Dernières absences</h2>
                <AttendanceTable data={attendanceData.filter(record => record.status !== "present").slice(0, 5)} userRole="student" />
              </div>
            </TabsContent>
            
            <TabsContent value="absences" className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Mes absences</h2>
              <AttendanceTable data={attendanceData} userRole="student" />
            </TabsContent>
            
            <TabsContent value="grades" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Mes notes</h2>
                <div className="text-sm text-muted-foreground">
                  Moyenne générale: {overallAverage.toFixed(1)}/20
                </div>
              </div>
              <GradesTable data={filteredGrades} userRole="student" />
            </TabsContent>
            
            <TabsContent value="justifications" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Justifications</h2>
                <Button>Soumettre une justification</Button>
              </div>
              
              <div className="border rounded-lg divide-y">
                {attendanceData
                  .filter(record => record.status === "absent" || record.status === "excused" || record.status === "late")
                  .map(record => (
                    <div key={record.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{record.course} - {record.date}</h3>
                          <p className="text-sm text-muted-foreground">
                            Statut: {
                              record.status === "absent" ? "Absent" : 
                              record.status === "excused" ? "Justifié" : 
                              record.status === "late" ? "En retard" : ""
                            }
                          </p>
                          {record.justification && (
                            <p className="text-sm mt-2">Justification: {record.justification}</p>
                          )}
                        </div>
                        <div>
                          {record.status === "excused" ? (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Approuvé
                            </span>
                          ) : record.justification ? (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              En attente
                            </span>
                          ) : (
                            <Button variant="outline" size="sm">
                              Justifier
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Mon emploi du temps</h2>
              <div className="border rounded-lg grid grid-cols-6 divide-x">
                <div className="p-2 font-medium text-center">Horaire</div>
                <div className="p-2 font-medium text-center">Lundi</div>
                <div className="p-2 font-medium text-center">Mardi</div>
                <div className="p-2 font-medium text-center">Mercredi</div>
                <div className="p-2 font-medium text-center">Jeudi</div>
                <div className="p-2 font-medium text-center">Vendredi</div>
                
                <div className="p-2 text-center border-t">8h - 10h</div>
                <div className="p-2 text-center border-t bg-blue-50">Mathématiques</div>
                <div className="p-2 text-center border-t bg-green-50">SVT</div>
                <div className="p-2 text-center border-t"></div>
                <div className="p-2 text-center border-t bg-purple-50">Anglais</div>
                <div className="p-2 text-center border-t bg-blue-50">Mathématiques</div>
                
                <div className="p-2 text-center border-t">10h - 12h</div>
                <div className="p-2 text-center border-t bg-yellow-50">Histoire</div>
                <div className="p-2 text-center border-t bg-red-50">Physique</div>
                <div className="p-2 text-center border-t bg-orange-50">Français</div>
                <div className="p-2 text-center border-t bg-red-50">Physique</div>
                <div className="p-2 text-center border-t bg-pink-50">Philosophie</div>
                
                <div className="p-2 text-center border-t">14h - 16h</div>
                <div className="p-2 text-center border-t bg-purple-50">Anglais</div>
                <div className="p-2 text-center border-t"></div>
                <div className="p-2 text-center border-t bg-blue-50">Mathématiques</div>
                <div className="p-2 text-center border-t bg-orange-50">Français</div>
                <div className="p-2 text-center border-t"></div>
                
                <div className="p-2 text-center border-t">16h - 18h</div>
                <div className="p-2 text-center border-t"></div>
                <div className="p-2 text-center border-t bg-pink-50">Philosophie</div>
                <div className="p-2 text-center border-t"></div>
                <div className="p-2 text-center border-t bg-green-50">SVT</div>
                <div className="p-2 text-center border-t bg-yellow-50">Histoire</div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
