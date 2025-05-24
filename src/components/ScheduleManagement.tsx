
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CourseSession } from "./CourseSchedule";

interface ScheduleManagementProps {
  sessions: CourseSession[];
  onAddSession: (session: Omit<CourseSession, 'id'>) => void;
  onEditSession: (session: CourseSession) => void;
  onDeleteSession: (sessionId: string) => void;
}

const ScheduleManagement = ({ sessions, onAddSession, onEditSession, onDeleteSession }: ScheduleManagementProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<CourseSession | null>(null);
  const [formData, setFormData] = useState({
    course: "",
    professor: "",
    class: "",
    day: "",
    startTime: "",
    endTime: "",
    room: "",
    duration: "2"
  });

  const professors = [
    "Prof. Dupont",
    "Prof. Martin", 
    "Prof. Leroy",
    "Prof. Smith",
    "Prof. Dubois"
  ];

  const courses = [
    "Mathématiques",
    "Français", 
    "Histoire",
    "Anglais",
    "SVT",
    "Physique",
    "Philosophie"
  ];

  const classes = [
    "Terminale S",
    "Terminale L",
    "Première S", 
    "Première L",
    "Première ES",
    "Seconde A",
    "Seconde B"
  ];

  const daysOfWeek = [
    "Lundi",
    "Mardi", 
    "Mercredi",
    "Jeudi",
    "Vendredi"
  ];

  const rooms = [
    "Salle 101",
    "Salle 102",
    "Salle 103",
    "Salle 201",
    "Salle 202",
    "Laboratoire 1",
    "Laboratoire 2"
  ];

  const handleSubmit = () => {
    if (editingSession) {
      onEditSession({
        ...editingSession,
        ...formData,
        duration: parseInt(formData.duration)
      });
    } else {
      onAddSession({
        ...formData,
        duration: parseInt(formData.duration)
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      course: "",
      professor: "",
      class: "",
      day: "",
      startTime: "",
      endTime: "",
      room: "",
      duration: "2"
    });
    setEditingSession(null);
  };

  const handleEdit = (session: CourseSession) => {
    setEditingSession(session);
    setFormData({
      course: session.course,
      professor: session.professor,
      class: session.class,
      day: session.day,
      startTime: session.startTime,
      endTime: session.endTime,
      room: session.room,
      duration: session.duration.toString()
    });
    setIsDialogOpen(true);
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Gestion des plannings de cours</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>Nouveau cours</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSession ? "Modifier le cours" : "Ajouter un nouveau cours"}
              </DialogTitle>
              <DialogDescription>
                Configurez les détails du cours dans le planning.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="course">Matière</Label>
                <Select value={formData.course} onValueChange={(value) => setFormData({...formData, course: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course} value={course}>{course}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="professor">Professeur</Label>
                <Select value={formData.professor} onValueChange={(value) => setFormData({...formData, professor: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un professeur" />
                  </SelectTrigger>
                  <SelectContent>
                    {professors.map(professor => (
                      <SelectItem key={professor} value={professor}>{professor}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Classe</Label>
                <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="day">Jour</Label>
                <Select value={formData.day} onValueChange={(value) => setFormData({...formData, day: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un jour" />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Heure de début</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Heure de fin</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Salle</Label>
                <Select value={formData.room} onValueChange={(value) => setFormData({...formData, room: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une salle" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(room => (
                      <SelectItem key={room} value={room}>{room}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durée (heures)</Label>
                <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 heure</SelectItem>
                    <SelectItem value="2">2 heures</SelectItem>
                    <SelectItem value="3">3 heures</SelectItem>
                    <SelectItem value="4">4 heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSubmit}>
                {editingSession ? "Modifier" : "Ajouter"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des cours programmés</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sessions.map(session => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{session.course} - {session.class}</div>
                  <div className="text-sm text-muted-foreground">
                    {session.professor} • {session.day} {session.startTime}-{session.endTime} • {session.room}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(session)}>
                    Modifier
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => onDeleteSession(session.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            ))}
            
            {sessions.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                Aucun cours programmé
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManagement;
