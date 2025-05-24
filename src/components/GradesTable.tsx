
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export interface GradeRecord {
  id: string;
  date: string;
  course: string;
  student: string;
  class: string;
  professor: string;
  grade: number;
  coefficient: number;
  type: "exam" | "homework" | "quiz" | "project";
  comment?: string;
}

interface GradesTableProps {
  data: GradeRecord[];
  userRole: "admin" | "professor" | "student";
  onEditGrade?: (grade: GradeRecord) => void;
  onDeleteGrade?: (gradeId: string) => void;
}

const GradesTable = ({ data, userRole, onEditGrade, onDeleteGrade }: GradesTableProps) => {
  const [editingGrade, setEditingGrade] = useState<GradeRecord | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<GradeRecord>>({});

  const handleEditClick = (grade: GradeRecord) => {
    setEditingGrade(grade);
    setEditFormData(grade);
  };

  const handleSaveEdit = () => {
    if (editingGrade && onEditGrade) {
      onEditGrade({ ...editingGrade, ...editFormData });
    }
    setEditingGrade(null);
    setEditFormData({});
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return "text-green-600 font-semibold";
    if (grade >= 14) return "text-blue-600 font-semibold";
    if (grade >= 12) return "text-orange-600 font-semibold";
    if (grade >= 10) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "exam": return "Examen";
      case "homework": return "Devoir";
      case "quiz": return "Contrôle";
      case "project": return "Projet";
      default: return type;
    }
  };

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Matière</TableHead>
              {userRole !== "student" && <TableHead>Étudiant</TableHead>}
              {userRole === "admin" && <TableHead>Professeur</TableHead>}
              <TableHead>Type</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Coefficient</TableHead>
              {userRole !== "student" && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.date}</TableCell>
                <TableCell>{grade.course}</TableCell>
                {userRole !== "student" && <TableCell>{grade.student}</TableCell>}
                {userRole === "admin" && <TableCell>{grade.professor}</TableCell>}
                <TableCell>{getTypeLabel(grade.type)}</TableCell>
                <TableCell className={getGradeColor(grade.grade)}>
                  {grade.grade}/20
                </TableCell>
                <TableCell>{grade.coefficient}</TableCell>
                {userRole !== "student" && (
                  <TableCell>
                    <div className="flex space-x-2">
                      {userRole === "admin" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(grade)}
                        >
                          Modifier
                        </Button>
                      )}
                      {(userRole === "admin" || userRole === "professor") && onDeleteGrade && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteGrade(grade.id)}
                        >
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de modification pour l'administration */}
      <Dialog open={!!editingGrade} onOpenChange={() => setEditingGrade(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la note</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la note ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grade" className="text-right">Note</Label>
              <Input
                id="grade"
                type="number"
                min="0"
                max="20"
                step="0.25"
                value={editFormData.grade || ""}
                onChange={(e) => setEditFormData(prev => ({ ...prev, grade: parseFloat(e.target.value) }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coefficient" className="text-right">Coefficient</Label>
              <Input
                id="coefficient"
                type="number"
                min="1"
                max="10"
                value={editFormData.coefficient || ""}
                onChange={(e) => setEditFormData(prev => ({ ...prev, coefficient: parseInt(e.target.value) }))}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comment" className="text-right">Commentaire</Label>
              <Input
                id="comment"
                value={editFormData.comment || ""}
                onChange={(e) => setEditFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEdit}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GradesTable;
