
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

type UserRole = "admin" | "professor" | "student";

interface HeaderProps {
  userRole: UserRole;
  userName: string;
}

const Header = ({ userRole, userName }: HeaderProps) => {
  const navigate = useNavigate();
  const [currentUser] = useState({ name: userName, role: userRole });

  const getRoleDisplay = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "Administration";
      case "professor":
        return "Professeur";
      case "student":
        return "Étudiant";
      default:
        return role;
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleSwitchRole = (role: UserRole) => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "professor") {
      navigate("/professor");
    } else if (role === "student") {
      navigate("/student");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-education-primary">GestionAbs</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                {currentUser.name} ({getRoleDisplay(currentUser.role)})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSwitchRole("admin")}>
                Vue Administration
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSwitchRole("professor")}>
                Vue Professeur
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSwitchRole("student")}>
                Vue Étudiant
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
