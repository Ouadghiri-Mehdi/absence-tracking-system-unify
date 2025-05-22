
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type AttendanceStatus = "present" | "absent" | "excused" | "late";

export interface AttendanceRecord {
  id: string;
  date: string;
  course: string;
  student?: string;
  class?: string;
  status: AttendanceStatus;
  duration?: number;
  justification?: string;
}

interface AttendanceTableProps {
  data: AttendanceRecord[];
  userRole: "admin" | "professor" | "student";
}

const AttendanceTable = ({ data, userRole }: AttendanceTableProps) => {
  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500">Présent</Badge>;
      case "absent":
        return <Badge className="bg-red-500">Absent</Badge>;
      case "excused":
        return <Badge className="bg-yellow-500">Justifié</Badge>;
      case "late":
        return <Badge className="bg-orange-500">En retard</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Cours</TableHead>
            {(userRole === "admin" || userRole === "professor") && (
              <TableHead>Étudiant</TableHead>
            )}
            {userRole === "admin" && <TableHead>Classe</TableHead>}
            <TableHead>Statut</TableHead>
            <TableHead>Durée (h)</TableHead>
            {(userRole === "admin" || userRole === "professor") && (
              <TableHead>Justification</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.course}</TableCell>
              {(userRole === "admin" || userRole === "professor") && (
                <TableCell>{record.student}</TableCell>
              )}
              {userRole === "admin" && <TableCell>{record.class}</TableCell>}
              <TableCell>{getStatusBadge(record.status)}</TableCell>
              <TableCell>{record.duration}</TableCell>
              {(userRole === "admin" || userRole === "professor") && (
                <TableCell>{record.justification || "-"}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
