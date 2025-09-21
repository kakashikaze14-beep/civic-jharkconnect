import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Shield, Building } from "lucide-react";
import Header from "@/components/Header";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Crowdsourced Civic Issue Reporting and Resolution System – Jharkhand
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering citizens to report civic issues and enabling efficient resolution 
            through collaborative governance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Citizen Login Card */}
          <Card className="shadow-card hover:shadow-gov transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-gov rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">Citizen Login</CardTitle>
              <CardDescription className="text-muted-foreground">
                Report and track civic issues in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">✓ Report civic issues with photos</p>
                <p className="text-sm text-muted-foreground">✓ Track issue resolution status</p>
                <p className="text-sm text-muted-foreground">✓ GPS-based location capture</p>
              </div>
              <Button asChild className="w-full bg-gradient-gov hover:bg-gov-green-light">
                <Link to="/login/citizen">Login as Citizen</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Administrator Login Card */}
          <Card className="shadow-card hover:shadow-gov transition-all duration-300 border-2 hover:border-accent/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">Administrator</CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage and oversee issue resolution system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">✓ View all reported issues</p>
                <p className="text-sm text-muted-foreground">✓ AI-powered issue categorization</p>
                <p className="text-sm text-muted-foreground">✓ System analytics & reports</p>
              </div>
              <Button asChild className="w-full bg-gradient-accent hover:bg-accent" variant="secondary">
                <Link to="/login/admin">Login/Signup</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Municipality Login Card */}
          <Card className="shadow-card hover:shadow-gov transition-all duration-300 border-2 hover:border-secondary/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">Municipality Head</CardTitle>
              <CardDescription className="text-muted-foreground">
                Resolve issues in your municipality area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <p className="text-sm text-muted-foreground">✓ View municipality-specific issues</p>
                <p className="text-sm text-muted-foreground">✓ Update issue resolution status</p>
                <p className="text-sm text-muted-foreground">✓ Direct citizen communication</p>
              </div>
              <Button asChild className="w-full" variant="secondary">
                <Link to="/login/municipality">Login/Signup</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            This system uses AI to detect duplicate issues and prevent spam, 
            ensuring efficient resolution of genuine civic concerns.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;