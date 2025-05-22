
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LandingPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ici, nous simulons la connexion pour la démo
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "professor") {
      navigate("/professor");
    } else if (role === "student") {
      navigate("/student");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-education-primary">GestionAbs</h1>
          <p className="text-gray-600 mt-2">Système de gestion des absences</p>
        </div>
        
        <Tabs defaultValue="admin" value={role} onValueChange={setRole} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="admin">Administration</TabsTrigger>
            <TabsTrigger value="professor">Professeur</TabsTrigger>
            <TabsTrigger value="student">Étudiant</TabsTrigger>
          </TabsList>
          
          <TabsContent value={role}>
            <Card>
              <CardHeader>
                <CardTitle>Connexion {role === "admin" ? "Administration" : role === "professor" ? "Professeur" : "Étudiant"}</CardTitle>
                <CardDescription>
                  Connectez-vous pour accéder à votre espace personnel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="username">Identifiant</Label>
                      <Input
                        id="username"
                        placeholder="Votre identifiant"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full mt-4" type="submit">
                    Se connecter
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-xs text-gray-500">
                  © 2025 GestionAbs - Tous droits réservés
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LandingPage;
