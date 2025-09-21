import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building, Shield, Target, CheckCircle, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Our Civic Issue Reporting System
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bridging the gap between citizens and government through technology-driven 
              civic engagement and transparent issue resolution.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To empower citizens of Jharkhand by providing a transparent, efficient, and 
                  accessible platform for reporting civic issues, while enabling government 
                  authorities to respond promptly and effectively to community needs.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-accent" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a digitally connected Jharkhand where every citizen's voice is heard, 
                  every civic issue is addressed promptly, and transparent governance becomes 
                  the foundation of community development.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="shadow-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">How Our System Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-gov rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Citizens Report</h3>
                  <p className="text-muted-foreground text-sm">
                    Citizens easily report civic issues with photos, GPS location, 
                    and detailed descriptions through our user-friendly platform.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">AI Processing</h3>
                  <p className="text-muted-foreground text-sm">
                    Advanced AI algorithms categorize issues, detect duplicates, 
                    prevent spam, and assign priority levels for efficient processing.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Government Action</h3>
                  <p className="text-muted-foreground text-sm">
                    Municipality heads and administrators receive categorized issues 
                    and can update resolution status in real-time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="shadow-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">GPS-Based Reporting</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatic location capture ensures precise issue identification and faster resolution.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Multi-Image Upload</h4>
                      <p className="text-sm text-muted-foreground">
                        Citizens can upload multiple photos to provide comprehensive issue documentation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Real-time Status Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        Citizens can track their reported issues from submission to resolution.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Municipality-Specific Assignment</h4>
                      <p className="text-sm text-muted-foreground">
                        Issues are automatically routed to the appropriate municipal authority.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">AI-Powered Categorization</h4>
                      <p className="text-sm text-muted-foreground">
                        Smart algorithms automatically categorize and prioritize issues for efficient handling.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Spam & Fraud Detection</h4>
                      <p className="text-sm text-muted-foreground">
                        Advanced AI systems detect and filter out spam and fraudulent reports.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Comprehensive Dashboard</h4>
                      <p className="text-sm text-muted-foreground">
                        Administrators get detailed analytics and insights for better governance.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Mobile-First Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Optimized for mobile devices to ensure accessibility for all citizens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Government Initiative */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Government of Jharkhand Initiative</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This platform is part of the Government of Jharkhand's commitment to digital governance 
                and citizen-centric service delivery. By leveraging modern technology and artificial 
                intelligence, we aim to create a more responsive and transparent administrative system.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The system covers all major municipalities across Jharkhand, including Ranchi, Dhanbad, 
                Jamshedpur, Bokaro, Deoghar, and Hazaribagh, ensuring comprehensive civic issue management 
                throughout the state.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through this initiative, we're building a stronger connection between the government and 
                citizens, fostering a collaborative approach to urban development and community welfare.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;