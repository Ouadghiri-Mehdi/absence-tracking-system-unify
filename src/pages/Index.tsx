
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="max-w-4xl w-full px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-education-primary mb-6">
          Système de Gestion des Absences
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Une plateforme complète pour gérer les présences et absences dans votre établissement
        </p>
        
        <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-education-primary">Administration</h2>
            <p className="mb-6 text-gray-600">
              Gérez et suivez les absences de tous les étudiants et consultez des rapports détaillés.
            </p>
            <Button 
              className="w-full bg-education-primary hover:bg-education-dark"
              onClick={() => navigate("/admin")}
            >
              Espace Administration
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-education-primary">Professeurs</h2>
            <p className="mb-6 text-gray-600">
              Enregistrez les présences, suivez les absences et gérez vos cours facilement.
            </p>
            <Button 
              className="w-full bg-education-primary hover:bg-education-dark"
              onClick={() => navigate("/professor")}
            >
              Espace Professeur
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-education-primary">Étudiants</h2>
            <p className="mb-6 text-gray-600">
              Consultez vos absences, soumettez des justifications et suivez votre assiduité.
            </p>
            <Button 
              className="w-full bg-education-primary hover:bg-education-dark"
              onClick={() => navigate("/student")}
            >
              Espace Étudiant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
