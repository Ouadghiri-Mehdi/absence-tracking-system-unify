
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import AttendanceTable, { AttendanceRecord } from "@/components/AttendanceTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const sidebarItems = [
    { title: "Tableau de bord", href: "/admin?tab=dashboard" },
    { title: "Gestion des absences", href: "/admin?tab=absences" },
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
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Dernières absences</h2>
                <AttendanceTable data={attendanceData.slice(0, 5)} userRole="admin" />
              </div>
            </TabsContent>
            
            <TabsContent value="absences" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Gestion des absences</h2>
                <Button>Nouvel enregistrement</Button>
              </div>
              <AttendanceTable data={attendanceData} userRole="admin" />
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
