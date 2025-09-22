import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

const CitizenLogin = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
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
      // Check if citizen already exists by phone number
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('phone', phone)
        .eq('role', 'citizen')
        .maybeSingle();

      if (checkError) throw checkError;

      let userId;
      
      if (existingProfile) {
        // User exists, update their name
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ full_name: name })
          .eq('id', existingProfile.id);
          
        if (updateError) throw updateError;
        userId = existingProfile.id;
      } else {
        // Create new citizen profile with generated UUID
        const newUserId = crypto.randomUUID();
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: newUserId,
            full_name: name,
            phone: phone,
            role: 'citizen'
          });

        if (insertError) throw insertError;
        userId = newUserId;
      }

      // Store citizen session in localStorage (simple session management)
      localStorage.setItem('citizen_session', JSON.stringify({
        id: userId,
        full_name: name,
        phone: phone,
        role: 'citizen'
      }));
      
      toast({
        title: "Login Successful",
        description: `Welcome, ${name}!`,
      });
      
      navigate("/citizen/categories");
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Citizen Login</CardTitle>
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
                <p>New to the system? No signup required!</p>
                <p>Just enter your details to get started.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CitizenLogin;