
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GradeEntryProps {
  students: Array<{ id: string; name: string; class: string }>;
  courses: Array<{ id: string; name: string }>;
  onSubmit: (gradeData: any) => void;
}

const GradeEntry = ({ students, courses, onSubmit }: GradeEntryProps) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [gradeType, setGradeType] = useState("");
  const [coefficient, setCoefficient] = useState("1");
  const [comment, setComment] = useState("");
  const [studentGrades, setStudentGrades] = useState<Record<string, string>>({});

  const filteredStudents = students.filter(student => 
    selectedClass === "" || student.class === selectedClass
  );

  const handleGradeChange = (studentId: string, grade: string) => {
    setStudentGrades(prev => ({
      ...prev,
      [studentId]: grade
    }));
  };

  const handleSubmit = () => {
    const gradesData = Object.entries(studentGrades)
      .filter(([_, grade]) => grade !== "")
      .map(([studentId, grade]) => ({
        studentId,
        course: selectedCourse,
        grade: parseFloat(grade),
        type: gradeType,
        coefficient: parseInt(coefficient),
        comment,
        date: new Date().toISOString().split('T')[0]
      }));

    onSubmit(gradesData);
    
    // Reset form
    setStudentGrades({});
    setComment("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saisie des notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="course">Matière</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une matière" />
              </SelectTrigger>
              <SelectContent>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.name}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Classe</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une classe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les classes</SelectItem>
                <SelectItem value="Terminale S">Terminale S</SelectItem>
                <SelectItem value="Première S">Première S</SelectItem>
                <SelectItem value="Seconde A">Seconde A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type d'évaluation</Label>
            <Select value={gradeType} onValueChange={setGradeType}>
              <SelectTrigger>
                <SelectValue placeholder="Type d'évaluation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exam">Examen</SelectItem>
                <SelectItem value="homework">Devoir</SelectItem>
                <SelectItem value="quiz">Contrôle</SelectItem>
                <SelectItem value="project">Projet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coefficient">Coefficient</Label>
            <Select value={coefficient} onValueChange={setCoefficient}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map(coef => (
                  <SelectItem key={coef} value={coef.toString()}>
                    {coef}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Commentaire (optionnel)</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Commentaire sur l'évaluation..."
          />
        </div>

        {selectedCourse && selectedClass && gradeType && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notes des étudiants</h3>
            <div className="grid gap-3">
              {filteredStudents.map(student => (
                <div key={student.id} className="grid grid-cols-3 items-center gap-4 p-3 border rounded">
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.class}</div>
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      min="0"
                      max="20"
                      step="0.25"
                      placeholder="Note /20"
                      value={studentGrades[student.id] || ""}
                      onChange={(e) => handleGradeChange(student.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleSubmit}
              disabled={Object.values(studentGrades).every(grade => grade === "")}
              className="w-full"
            >
              Enregistrer les notes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GradeEntry;
