import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, Mail, MessageSquare } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      id: "reporting",
      question: "How do I report a civic issue?",
      answer: "To report an issue: 1) Login as a citizen with your name and phone number, 2) Click 'Report New Issue', 3) Describe the issue in detail, 4) Upload photos (optional but recommended), 5) Capture GPS location, and 6) Submit. You'll receive a confirmation with an issue ID for tracking."
    },
    {
      id: "tracking",
      question: "What happens after I report an issue?",
      answer: "After reporting: 1) Your issue gets an AI analysis for category and priority, 2) It's automatically assigned to the relevant municipality, 3) Municipality heads can update the status (reported → in-progress → resolved), 4) You can track progress on your issues page, 5) You'll see status updates and resolution timeline."
    },
    {
      id: "spam",
      question: "How is spam and fraud handled?",
      answer: "Our AI system automatically detects potential spam and fraudulent reports using advanced algorithms. Suspicious issues are flagged for manual review by administrators. This ensures that genuine civic issues receive priority attention while preventing system abuse."
    },
    {
      id: "resolution",
      question: "Who can resolve issues and how long does it take?",
      answer: "Municipality heads and their teams are responsible for resolving issues in their respective areas. Resolution time varies based on issue complexity and priority. High-priority issues (safety-related) are addressed first, followed by medium and low priority issues. You can track status updates in real-time."
    },
    {
      id: "multiple-reports",
      question: "What if the same issue is reported multiple times?",
      answer: "Our AI system automatically detects duplicate issues based on location, description, and timing. Duplicate reports are marked and linked to the original issue to avoid redundant work and provide administrators with a clear view of issue frequency and citizen concern levels."
    },
    {
      id: "photo-requirements",
      question: "Are photos required when reporting issues?",
      answer: "Photos are not mandatory but highly recommended as they help authorities better understand the issue and prioritize resolution. You can upload up to 5 images, each under 5MB. Clear photos showing the problem from different angles are most helpful."
    },
    {
      id: "location-accuracy",
      question: "Why is GPS location important?",
      answer: "GPS location ensures that your issue is assigned to the correct municipality and helps authorities locate the problem quickly. The system automatically captures your current location when you report an issue, but make sure you're at the issue location for accuracy."
    },
    {
      id: "account-required",
      question: "Do I need to create an account?",
      answer: "Citizens don't need to create a formal account. Simply enter your name and phone number to login and start reporting issues. However, municipality heads and administrators need to create accounts with email verification for security purposes."
    },
    {
      id: "issue-types",
      question: "What types of issues can I report?",
      answer: "You can report various civic issues including: street lighting problems, road maintenance (potholes, damaged roads), waste management issues, water supply problems, drainage issues, park maintenance, traffic signals, and other municipal infrastructure concerns."
    },
    {
      id: "contact-municipality",
      question: "Can I contact municipality officials directly?",
      answer: "While the system doesn't provide direct contact features, municipality officials can see your phone number and may contact you for additional information. All communication and updates are primarily handled through the platform's status update system."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Help & Support
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions and learn how to use our civic issue reporting system
            </p>
          </div>

          {/* Quick Help Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-card text-center">
              <CardHeader>
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  New to the platform? Learn the basics of reporting civic issues.
                </p>
                <Button variant="outline" size="sm">
                  Quick Tutorial
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card text-center">
              <CardHeader>
                <MessageSquare className="w-12 h-12 text-accent mx-auto mb-2" />
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Browse frequently asked questions and solutions.
                </p>
                <Button variant="outline" size="sm">
                  View FAQs
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card text-center">
              <CardHeader>
                <Phone className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Need More Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Contact our support team for personalized assistance.
                </p>
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="shadow-card mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Technical Support</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-muted-foreground">support@jharkhand-civic.gov.in</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Helpline</p>
                        <p className="text-sm text-muted-foreground">1800-XXX-XXXX (Toll Free)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>Support Hours:</strong><br />
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Administrative Queries</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Municipality Coordination</p>
                        <p className="text-sm text-muted-foreground">admin@jharkhand-civic.gov.in</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Government Liaison</p>
                        <p className="text-sm text-muted-foreground">0651-XXX-XXXX</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>Emergency Civic Issues?</strong><br />
                      For urgent safety-related issues, please also contact your local municipality directly 
                      or emergency services if immediate action is required.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Help;