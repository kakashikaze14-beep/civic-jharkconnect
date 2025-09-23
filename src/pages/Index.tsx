import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, Building } from "lucide-react";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/src/assets/jharkhand-gov-bg.jpg')`
      }}
    >
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Crowdsourced Civic Issue Reporting and Resolution System – Jharkhand
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
            Empowering citizens to report civic issues and enabling government authorities to resolve them efficiently for a better Jharkhand
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Citizen Login Card */}
          <Card className="shadow-card hover:shadow-gov transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-gov rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gov-green">Citizen Login</CardTitle>
              <CardDescription className="text-base">
                Report civic issues in your locality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• Report issues with photos</li>
                <li>• Track status of your reports</li>
                <li>• GPS location capture</li>
                <li>• Direct communication with authorities</li>
              </ul>
              <Button asChild className="w-full bg-gradient-gov hover:bg-gov-green-light">
                <Link to="/login/citizen">Login as Citizen</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Administrator Login Card */}
          <Card className="shadow-card hover:shadow-gov transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gov-green">Administrator</CardTitle>
              <CardDescription className="text-base">
                Manage system-wide operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• View all issues across Jharkhand</li>
                <li>• AI categorization and analysis</li>
                <li>• System analytics and reports</li>
                <li>• Manage spam/fraud detection</li>
              </ul>
              <Button asChild className="w-full bg-gradient-accent hover:opacity-90">
                <Link to="/login/admin">Login/Signup</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Municipality Login Card */}
          <Card className="shadow-card hover:shadow-gov transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-gov rounded-full flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gov-green">Municipality Head</CardTitle>
              <CardDescription className="text-base">
                Manage local civic issues
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li>• View municipality-specific issues</li>
                <li>• Update issue status and priority</li>
                <li>• Direct communication with citizens</li>
                <li>• Local area management</li>
              </ul>
              <Button asChild className="w-full bg-gradient-gov hover:bg-gov-green-light">
                <Link to="/login/municipality">Login/Signup</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="bg-gov-green text-white py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© Government of Jharkhand 2025 | 
            <Link to="/about" className="hover:text-gov-saffron ml-2">Disclaimer</Link> | 
            <Link to="/help" className="hover:text-gov-saffron ml-2">Contact Info</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;