import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Droplets, 
  Lightbulb, 
  Car, 
  Trash2, 
  TreePine,
  Building2,
  Zap
} from "lucide-react";
import Header from "@/components/Header";

const IssueCategories = () => {
  const categories = [
    {
      id: "pothole",
      title: "Road & Potholes",
      description: "Damaged roads, potholes, broken pavements",
      icon: Car,
      color: "text-red-600",
      bgColor: "bg-red-50",
      category: "Roads"
    },
    {
      id: "water",
      title: "Water Issues",
      description: "Water logging, pipe leaks, supply problems",
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      category: "Water"
    },
    {
      id: "electricity",
      title: "Electricity",
      description: "Power cuts, faulty street lights, electrical issues",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      category: "Electricity"
    },
    {
      id: "streetlight",
      title: "Street Lighting",
      description: "Non-functional street lights, dim lighting",
      icon: Lightbulb,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      category: "Street Lighting"
    },
    {
      id: "garbage",
      title: "Garbage & Sanitation",
      description: "Waste collection, overflowing bins, cleanliness",
      icon: Trash2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      category: "Garbage"
    },
    {
      id: "environment",
      title: "Environment",
      description: "Tree cutting, air pollution, noise pollution",
      icon: TreePine,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      category: "Environment"
    },
    {
      id: "building",
      title: "Building & Construction",
      description: "Illegal construction, building permits, safety",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      category: "Building"
    },
    {
      id: "other",
      title: "Other Issues",
      description: "Any other civic issues not listed above",
      icon: AlertTriangle,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      category: "Other"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            What Issue Would You Like to Report?
          </h1>
          <p className="text-muted-foreground">
            Select the category that best describes your civic issue
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
              >
                <Link to={`/issues/report?category=${category.category}`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mb-4`}>
                      <IconComponent className={`w-8 h-8 ${category.color}`} />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full bg-gradient-gov hover:bg-gov-green-light">
                      Report {category.title}
                    </Button>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link to="/issues">View My Reported Issues</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default IssueCategories;