import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";

const CitizenLogin = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginCitizen } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both name and phone number",
        variant: "destructive",
      });
      return;
    }

    if (phone.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const result = await loginCitizen(name, phone);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: `Welcome, ${name}!`,
        });
        navigate("/issues");
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Please check your credentials",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('/src/assets/jharkhand-gov-bg.jpg')`
      }}
    >
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gov-green">Citizen Login</CardTitle>
              <CardDescription>
                Enter your details to access the issue reporting system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your 10-digit phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-gov hover:bg-gov-green-light"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>New to the system? Contact your local authority to get registered.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CitizenLogin;