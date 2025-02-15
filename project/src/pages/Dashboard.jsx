import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { PlusCircle, Edit2, Trash2, LogOut } from "lucide-react";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/quizzes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch quizzes");
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      toast.error("Failed to load quizzes");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/quizzes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete quiz");
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
      toast.success("Quiz deleted successfully");
    } catch (error) {
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <h1 className="text-4xl font-extrabold text-white flex items-center gap-3">
            <span className="text-5xl">🎯</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
              Quizo Dashboard
            </span>
          </h1>
          <div className="flex gap-4">
            <Button asChild className="">
              <Link to="/create-quiz" className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 " />
                Create Quiz
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={logout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Quiz Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="group relative bg-white bg-opacity-10 backdrop-blur-xl border-none rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-bold text-white">
                  {quiz.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <p className="text-gray-100 text-lg">{quiz.description}</p>
              </CardContent>
              
              <CardFooter className="relative z-10 flex justify-end gap-4 mt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate(`/edit-quiz/${quiz.id}`)}
                  className="bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white border-none transition-all duration-300 rounded-xl p-2"
                >
                  <Edit2 className="w-5 h-5" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 border-none text-white transition-all duration-300 rounded-xl p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl font-bold text-white">
                        Delete Quiz
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-white text-opacity-80">
                        Are you sure you want to delete this quiz? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel 
                     >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(quiz.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;