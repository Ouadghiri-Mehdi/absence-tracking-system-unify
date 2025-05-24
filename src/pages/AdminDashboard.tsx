import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import AttendanceTable, { AttendanceRecord } from "@/components/AttendanceTable";
import GradesTable, { GradeRecord } from "@/components/GradesTable";
import CourseSchedule, { CourseSession } from "@/components/CourseSchedule";
import ScheduleManagement from "@/components/ScheduleManagement";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const sidebarItems = [
    { title: "Tableau de bord", href: "/admin?tab=dashboard" },
    { title: "Gestion des absences", href: "/admin?tab=absences" },
    { title: "Gestion des notes", href: "/admin?tab=grades" },
    { title: "Planning des cours", href: "/admin?tab=schedule" },
    { title: "Rapports", href: "/admin?tab=reports" },
    { title: "Paramètres", href: "/admin?tab=settings" },
  ];

  // Données fictives pour la démo
  const attendanceData: AttendanceRecord[] = [
    { id: "1", date: "2025-05-20", course: "Mathématiques", student: "Sophie Martin", class: "Terminale S", status: "absent", duration: 2, justification: "Rendez-vous médical" },
    { id: "2", date: "2025-05-19", course: "Physique", student: "Lucas Dubois", class: "Terminale S", status: "present", duration: 2 },
    { id: "3", date: "2025-05-18", course: "Français", student: "Emma Bernard", class: "Première L", status: "late", duration: 1, justification: "Retard de transport" },
    { id: "4", date: "2025-05-18", course: "Histoire", student: "Thomas Leroy", class: "Seconde A", status: "excused", duration: 2, justification: "Certificat médical" },
    { id: "5", date: "2025-05-17", course: "Anglais", student: "Léa Moreau", class: "Première ES", status: "absent", duration: 2 },
    { id: "6", date: "2025-05-16", course: "SVT", student: "Hugo Petit", class: "Terminale S", status: "present", duration: 3 },
    { id: "7", date: "2025-05-16", course: "Philosophie", student: "Chloé Robert", class: "Terminale L", status: "absent", duration: 2, justification: "Compétition sportive" },
    { id: "8", date: "2025-05-15", course: "Mathématiques", student: "Nathan Durand", class: "Seconde B", status: "present", duration: 2 },
  ];

  // Données fictives pour toutes les notes
  const allGradesData: GradeRecord[] = [
    { id: "1", date: "2025-05-20", course: "Mathématiques", student: "Sophie Martin", class: "Terminale S", professor: "Prof. Dupont", grade: 16.5, coefficient: 2, type: "exam", comment: "Excellent travail" },
    { id: "2", date: "2025-05-19", course: "Mathématiques", student: "Lucas Dubois", class: "Terminale S", professor: "Prof. Dupont", grade: 14.0, coefficient: 1, type: "homework" },
    { id: "3", date: "2025-05-18", course: "Français", student: "Emma Bernard", class: "Première L", professor: "Prof. Martin", grade: 12.5, coefficient: 2, type: "quiz" },
    { id: "4", date: "2025-05-17", course: "Histoire", student: "Thomas Leroy", class: "Seconde A", professor: "Prof. Leroy", grade: 18.0, coefficient: 3, type: "project", comment: "Très bon projet" },
    { id: "5", date: "2025-05-16", course: "Anglais", student: "Léa Moreau", class: "Première ES", professor: "Prof. Smith", grade: 15.5, coefficient: 2, type: "exam" },
    { id: "6", date: "2025-05-15", course: "SVT", student: "Hugo Petit", class: "Terminale S", professor: "Prof. Dubois", grade: 13.0, coefficient: 1, type: "homework" },
  ];

  const filteredGrades = allGradesData.filter(grade => {
    if (selectedClass !== "all" && !grade.class.toLowerCase().includes(selectedClass)) return false;
    if (selectedCourse !== "all" && grade.course !== selectedCourse) return false;
    return true;
  });

  const handleEditGrade = (grade: GradeRecord) => {
    console.log("Modifier la note:", grade);
    // Logique de modification par l'admin
  };

  const handleDeleteGrade = (gradeId: string) => {
    console.log("Supprimer la note:", gradeId);
    // Logique de suppression
  };

  // Données fictives pour le planning
  const [scheduleSessions, setScheduleSessions] = useState<CourseSession[]>([
    { id: "1", course: "Mathématiques", professor: "Prof. Dupont", class: "Terminale S", day: "Lundi", startTime: "08:00", endTime: "10:00", room: "Salle 101", duration: 2 },
    { id: "2", course: "Français", professor: "Prof. Martin", class: "Première L", day: "Lundi", startTime: "10:15", endTime: "12:15", room: "Salle 102", duration: 2 },
    { id: "3", course: "Histoire", professor: "Prof. Leroy", class: "Seconde A", day: "Mardi", startTime: "14:00", endTime: "16:00", room: "Salle 103", duration: 2 },
    { id: "4", course: "Anglais", professor: "Prof. Smith", class: "Première ES", day: "Mercredi", startTime: "09:00", endTime: "11:00", room: "Salle 201", duration: 2 },
    { id: "5", course: "SVT", professor: "Prof. Dubois", class: "Terminale S", day: "Jeudi", startTime: "08:00", endTime: "11:00", room: "Laboratoire 1", duration: 3 },
  ]);

  const handleAddSession = (sessionData: Omit<CourseSession, 'id'>) => {
    const newSession: CourseSession = {
      ...sessionData,
      id: Date.now().toString()
    };
    setScheduleSessions(prev => [...prev, newSession]);
    console.log("Nouveau cours ajouté:", newSession);
  };

  const handleEditSession = (session: CourseSession) => {
    setScheduleSessions(prev => 
      prev.map(s => s.id === session.id ? session : s)
    );
    console.log("Cours modifié:", session);
  };

  const handleDeleteSession = (sessionId: string) => {
    setScheduleSessions(prev => prev.filter(s => s.id !== sessionId));
    console.log("Cours supprimé:", sessionId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header userRole="admin" userName="Admin Principal" />
      <div className="flex flex-1">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                <TabsTrigger value="absences">Gestion des absences</TabsTrigger>
                <TabsTrigger value="grades">Gestion des notes</TabsTrigger>
                <TabsTrigger value="schedule">Planning des cours</TabsTrigger>
                <TabsTrigger value="reports">Rapports</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>
              
              <div className="flex space-x-2">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Toutes les classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    <SelectItem value="terminale">Terminale</SelectItem>
                    <SelectItem value="premiere">Première</SelectItem>
                    <SelectItem value="seconde">Seconde</SelectItem>
                  </SelectContent>
                </Select>
                
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
                  value="142"
                  description="Ce mois-ci"
                  trend="up"
                  trendValue="12% par rapport au mois dernier"
                />
                <DashboardCard
                  title="Absences justifiées"
                  value="87"
                  description="61% du total"
                  trend="neutral"
                  trendValue="Stable par rapport au mois dernier"
                />
                <DashboardCard
                  title="Élèves à risque"
                  value="8"
                  description="Plus de 10% d'absences"
                  trend="down"
                  trendValue="2 élèves de moins que le mois dernier"
                />
                <DashboardCard
                  title="Taux de présence"
                  value="94.3%"
                  description="Moyenne établissement"
                  trend="up"
                  trendValue="1.2% par rapport au mois dernier"
                />
                <DashboardCard
                  title="Moyenne générale"
                  value="14.2"
                  description="Toutes matières confondues"
                  trend="up"
                  trendValue="0.3 points par rapport au mois dernier"
                />
                <DashboardCard
                  title="Notes saisies"
                  value="156"
                  description="Ce mois-ci"
                  trend="up"
                  trendValue="23 notes de plus que le mois dernier"
                />
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Dernières absences</h2>
                <AttendanceTable data={attendanceData.slice(0, 5)} userRole="admin" />
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Dernières notes saisies</h2>
                <GradesTable 
                  data={allGradesData.slice(0, 5)} 
                  userRole="admin"
                  onEditGrade={handleEditGrade}
                  onDeleteGrade={handleDeleteGrade}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="absences" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestion des absences</h2>
                <Button>Nouvel enregistrement</Button>
              </div>
              <AttendanceTable data={attendanceData} userRole="admin" />
            </TabsContent>
            
            <TabsContent value="grades" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestion des notes</h2>
                <div className="text-sm text-muted-foreground">
                  {filteredGrades.length} note(s) trouvée(s)
                </div>
              </div>
              <GradesTable 
                data={filteredGrades} 
                userRole="admin"
                onEditGrade={handleEditGrade}
                onDeleteGrade={handleDeleteGrade}
              />
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4">
              <Tabs defaultValue="management" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="management">Gestion</TabsTrigger>
                  <TabsTrigger value="view">Vue planning</TabsTrigger>
                </TabsList>
                
                <TabsContent value="management">
                  <ScheduleManagement
                    sessions={scheduleSessions}
                    onAddSession={handleAddSession}
                    onEditSession={handleEditSession}
                    onDeleteSession={handleDeleteSession}
                  />
                </TabsContent>
                
                <TabsContent value="view">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Planning général des cours</h2>
                    <CourseSchedule 
                      sessions={scheduleSessions} 
                      userRole="admin"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Rapports</h2>
              <div className="grid gap-4 grid-cols-2">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="text-lg">Rapport mensuel</span>
                  <span className="text-sm text-muted-foreground">Toutes les classes</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="text-lg">Rapport par classe</span>
                  <span className="text-sm text-muted-foreground">Détails par classe</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="text-lg">Élèves à risque</span>
                  <span className="text-sm text-muted-foreground">Plus de 10% d'absences</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center">
                  <span className="text-lg">Rapport d'absence</span>
                  <span className="text-sm text-muted-foreground">Par étudiant</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Paramètres</h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Seuils d'alerte</h3>
                  <p className="text-sm text-muted-foreground">
                    Configurer les seuils d'alerte pour les absences des étudiants.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Configurer les notifications pour les absences.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-lg font-medium">Années scolaires</h3>
                  <p className="text-sm text-muted-foreground">
                    Gérer les années scolaires et les périodes.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
