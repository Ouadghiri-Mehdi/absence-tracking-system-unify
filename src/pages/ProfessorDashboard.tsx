import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import DashboardCard from "@/components/DashboardCard";
import AttendanceTable, { AttendanceRecord } from "@/components/AttendanceTable";
import GradesTable, { GradeRecord } from "@/components/GradesTable";
import GradeEntry from "@/components/GradeEntry";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ProfessorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const sidebarItems = [
    { title: "Tableau de bord", href: "/professor?tab=dashboard" },
    { title: "Prise d'absences", href: "/professor?tab=record" },
    { title: "Saisie des notes", href: "/professor?tab=grades" },
    { title: "Historique", href: "/professor?tab=history" },
    { title: "Mes cours", href: "/professor?tab=courses" },
  ];

  // Données fictives pour la démo
  const attendanceData: AttendanceRecord[] = [
    { id: "1", date: "2025-05-20", course: "Mathématiques", student: "Sophie Martin", status: "absent", duration: 2, justification: "Rendez-vous médical" },
    { id: "2", date: "2025-05-19", course: "Mathématiques", student: "Lucas Dubois", status: "present", duration: 2 },
    { id: "3", date: "2025-05-18", course: "Mathématiques", student: "Emma Bernard", status: "late", duration: 1, justification: "Retard de transport" },
    { id: "4", date: "2025-05-18", course: "Algèbre", student: "Thomas Leroy", status: "excused", duration: 2, justification: "Certificat médical" },
    { id: "5", date: "2025-05-17", course: "Algèbre", student: "Léa Moreau", status: "absent", duration: 2 },
    { id: "6", date: "2025-05-16", course: "Géométrie", student: "Hugo Petit", status: "present", duration: 3 },
  ];

  // Liste fictive des étudiants pour la prise d'absence
  const students = [
    { id: "1", name: "Sophie Martin" },
    { id: "2", name: "Lucas Dubois" },
    { id: "3", name: "Emma Bernard" },
    { id: "4", name: "Thomas Leroy" },
    { id: "5", name: "Léa Moreau" },
    { id: "6", name: "Hugo Petit" },
    { id: "7", name: "Chloé Robert" },
    { id: "8", name: "Nathan Durand" },
  ];

  // Données fictives pour les notes
  const gradesData: GradeRecord[] = [
    { id: "1", date: "2025-05-20", course: "Mathématiques", student: "Sophie Martin", class: "Terminale S", professor: "Prof. Dupont", grade: 16.5, coefficient: 2, type: "exam", comment: "Excellent travail" },
    { id: "2", date: "2025-05-19", course: "Mathématiques", student: "Lucas Dubois", class: "Terminale S", professor: "Prof. Dupont", grade: 14.0, coefficient: 1, type: "homework" },
    { id: "3", date: "2025-05-18", course: "Algèbre", student: "Emma Bernard", class: "Première S", professor: "Prof. Dupont", grade: 12.5, coefficient: 2, type: "quiz" },
    { id: "4", date: "2025-05-17", course: "Géométrie", student: "Thomas Leroy", class: "Seconde A", professor: "Prof. Dupont", grade: 18.0, coefficient: 3, type: "project", comment: "Très bon projet" },
  ];

  const courses = [
    { id: "1", name: "Mathématiques" },
    { id: "2", name: "Algèbre" },
    { id: "3", name: "Géométrie" }
  ];

  const handleGradeSubmit = (gradesData: any[]) => {
    console.log("Nouvelles notes:", gradesData);
    // Ici on ajouterait la logique pour sauvegarder les notes
  };

  const handleEditGrade = (grade: GradeRecord) => {
    console.log("Modifier la note:", grade);
    // Logique de modification
  };

  const handleDeleteGrade = (gradeId: string) => {
    console.log("Supprimer la note:", gradeId);
    // Logique de suppression
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header userRole="professor" userName="Prof. Dupont" />
      <div className="flex flex-1">
        <Sidebar items={sidebarItems} />
        <main className="flex-1 p-6">
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
                <TabsTrigger value="record">Prise d'absences</TabsTrigger>
                <TabsTrigger value="grades">Saisie des notes</TabsTrigger>
                <TabsTrigger value="history">Historique</TabsTrigger>
                <TabsTrigger value="courses">Mes cours</TabsTrigger>
              </TabsList>
              
              <div className="flex space-x-2">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Toutes les classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les classes</SelectItem>
                    <SelectItem value="terminale-s">Terminale S</SelectItem>
                    <SelectItem value="premiere-s">Première S</SelectItem>
                    <SelectItem value="seconde-a">Seconde A</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tous les cours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les cours</SelectItem>
                    <SelectItem value="math">Mathématiques</SelectItem>
                    <SelectItem value="algebra">Algèbre</SelectItem>
                    <SelectItem value="geometry">Géométrie</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="dashboard" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                  title="Absences dans mes cours"
                  value="28"
                  description="Ce mois-ci"
                  trend="down"
                  trendValue="8% par rapport au mois dernier"
                />
                <DashboardCard
                  title="Taux de présence"
                  value="92.7%"
                  description="Moyenne de mes cours"
                  trend="up"
                  trendValue="2.1% par rapport au mois dernier"
                />
                <DashboardCard
                  title="Cours à venir aujourd'hui"
                  value="3"
                  description="Terminale S, Première S, Seconde A"
                />
                <DashboardCard
                  title="Moyenne générale"
                  value="14.8"
                  description="Moyenne de mes cours"
                  trend="up"
                  trendValue="0.5 points par rapport au mois dernier"
                />
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Dernières absences enregistrées</h2>
                <AttendanceTable data={attendanceData.slice(0, 5)} userRole="professor" />
              </div>
            </TabsContent>
            
            <TabsContent value="record" className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Prise d'absences</h2>
                <div className="flex space-x-2">
                  <Select defaultValue="math">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sélectionner un cours" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathématiques</SelectItem>
                      <SelectItem value="algebra">Algèbre</SelectItem>
                      <SelectItem value="geometry">Géométrie</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="terminale-s">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="terminale-s">Terminale S</SelectItem>
                      <SelectItem value="premiere-s">Première S</SelectItem>
                      <SelectItem value="seconde-a">Seconde A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border rounded-lg">
                <div className="bg-muted px-4 py-2 border-b">
                  <div className="grid grid-cols-12 font-medium">
                    <div className="col-span-4">Étudiant</div>
                    <div className="col-span-8">Statut</div>
                  </div>
                </div>
                
                <div className="divide-y">
                  {students.map((student) => (
                    <div key={student.id} className="px-4 py-3 grid grid-cols-12 items-center">
                      <div className="col-span-4">{student.name}</div>
                      <div className="col-span-8">
                        <RadioGroup defaultValue="present" orientation="horizontal" className="flex space-x-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="present" id={`present-${student.id}`} />
                            <Label htmlFor={`present-${student.id}`} className="text-green-600">Présent</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="absent" id={`absent-${student.id}`} />
                            <Label htmlFor={`absent-${student.id}`} className="text-red-600">Absent</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="late" id={`late-${student.id}`} />
                            <Label htmlFor={`late-${student.id}`} className="text-orange-600">En retard</Label>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Justifier</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Ajouter une justification</DialogTitle>
                                <DialogDescription>
                                  Saisissez la justification pour l'absence ou le retard de {student.name}.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <textarea 
                                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                  placeholder="Entrez la justification ici..."
                                />
                              </div>
                              <DialogFooter>
                                <Button type="submit">Enregistrer</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </RadioGroup>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button>Enregistrer l'appel</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="grades" className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Saisie des notes</h2>
              <GradeEntry 
                students={students.map(s => ({ ...s, class: "Terminale S" }))}
                courses={courses}
                onSubmit={handleGradeSubmit}
              />
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Historique des absences</h2>
              <AttendanceTable data={attendanceData} userRole="professor" />
            </TabsContent>
            
            <TabsContent value="courses" className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Mes cours</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg">Mathématiques</h3>
                  <p className="text-sm text-muted-foreground">Terminale S</p>
                  <p className="text-sm mt-2">Lundi, Mercredi, Vendredi</p>
                  <p className="text-sm">10:00 - 12:00</p>
                  <div className="mt-4">
                    <Badge className="bg-blue-500">32 étudiants</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg">Algèbre</h3>
                  <p className="text-sm text-muted-foreground">Première S</p>
                  <p className="text-sm mt-2">Mardi, Jeudi</p>
                  <p className="text-sm">14:00 - 16:00</p>
                  <div className="mt-4">
                    <Badge className="bg-blue-500">28 étudiants</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg">Géométrie</h3>
                  <p className="text-sm text-muted-foreground">Seconde A</p>
                  <p className="text-sm mt-2">Lundi, Vendredi</p>
                  <p className="text-sm">08:00 - 10:00</p>
                  <div className="mt-4">
                    <Badge className="bg-blue-500">35 étudiants</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${className}`}>
      {children}
    </span>
  );
};

export default ProfessorDashboard;
