import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Calendar, Image as ImageIcon } from "lucide-react";
import Header from "@/components/Header";

interface Issue {
  id: string;
  citizenName: string;
  citizenPhone: string;
  description: string;
  status: "reported" | "in-progress" | "resolved";
  address: string;
  images?: string[];
  createdAt: string;
  priority: "low" | "medium" | "high";
  category: string;
}

const MunicipalityDashboard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [municipalityInfo, setMunicipalityInfo] = useState<{ name: string; email: string }>({ name: "", email: "" });

  useEffect(() => {
    // Get municipality info from localStorage
    const municipalityData = localStorage.getItem('municipality');
    if (municipalityData) {
      const parsed = JSON.parse(municipalityData);
      setMunicipalityInfo({
        name: parsed.municipality || "Ranchi Municipal Corporation",
        email: parsed.email
      });
    }

    const fetchIssues = async () => {
      try {
        // TODO: Replace with actual API call filtered by municipality
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockIssues: Issue[] = [
          {
            id: "1",
            citizenName: "Rajesh Kumar",
            citizenPhone: "+91 9876543210",
            description: "Broken streetlight on MG Road causing safety issues at night. The light has been non-functional for the past week.",
            status: "reported",
            address: "MG Road, Near City Mall, Ranchi, Jharkhand",
            images: [
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
              "https://images.unsplash.com/photo-1573152143286-0c422b4d2175?w=300&h=200&fit=crop"
            ],
            createdAt: "2024-01-15T10:30:00Z",
            priority: "high",
            category: "Street Lighting"
          },
          {
            id: "2",
            citizenName: "Priya Singh",
            citizenPhone: "+91 9876543211",
            description: "Large pothole on Station Road near bus stop needs immediate repair for vehicle safety.",
            status: "in-progress",
            address: "Station Road, Ranchi, Jharkhand",
            images: [
              "https://images.unsplash.com/photo-1534587329712-ba961d34c416?w=300&h=200&fit=crop"
            ],
            createdAt: "2024-01-14T14:20:00Z",
            priority: "medium",
            category: "Road Maintenance"
          },
          {
            id: "3",
            citizenName: "Amit Sharma",
            citizenPhone: "+91 9876543212",
            description: "Garbage not collected for 3 days in Sector 12 residential area, causing hygiene issues.",
            status: "resolved",
            address: "Sector 12, Ranchi, Jharkhand",
            createdAt: "2024-01-13T09:15:00Z",
            priority: "low",
            category: "Waste Management"
          }
        ];

        setIssues(mockIssues);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const updateIssueStatus = async (issueId: string, newStatus: Issue['status']) => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIssues(issues.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: newStatus }
          : issue
      ));

      // Show success message
      console.log(`Issue ${issueId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update issue status:", error);
    }
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case "reported": return "bg-yellow-500";
      case "in-progress": return "bg-blue-500";
      case "resolved": return "bg-green-500";
    }
  };

  const getPriorityColor = (priority: Issue['priority']) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading dashboard...</div>
        </main>
      </div>
    );
  }

  const reportedIssues = issues.filter(issue => issue.status === "reported");
  const inProgressIssues = issues.filter(issue => issue.status === "in-progress");
  const resolvedIssues = issues.filter(issue => issue.status === "resolved");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Municipality Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            {municipalityInfo.name} - Manage civic issues in your area
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">New Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{reportedIssues.length}</div>
              <p className="text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{inProgressIssues.length}</div>
              <p className="text-muted-foreground">Being resolved</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{resolvedIssues.length}</div>
              <p className="text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Issues from Your Municipality</h2>
          
          {issues.length === 0 ? (
            <Card className="p-8 text-center">
              <CardContent>
                <h3 className="text-xl font-semibold mb-2">No Issues Reported</h3>
                <p className="text-muted-foreground">
                  All caught up! No civic issues currently reported in your municipality.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {issues.map((issue) => (
                <Card key={issue.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                      {/* Issue Images */}
                      <div className="lg:col-span-1">
                        {issue.images && issue.images.length > 0 ? (
                          <div className="space-y-2">
                            <img
                              src={issue.images[0]}
                              alt="Issue image"
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            {issue.images.length > 1 && (
                              <div className="flex gap-1">
                                {issue.images.slice(1, 3).map((image, index) => (
                                  <img
                                    key={index}
                                    src={image}
                                    alt={`Issue image ${index + 2}`}
                                    className="w-16 h-16 object-cover rounded border"
                                  />
                                ))}
                                {issue.images.length > 3 && (
                                  <div className="w-16 h-16 bg-muted rounded border flex items-center justify-center text-xs">
                                    +{issue.images.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-32 bg-muted rounded-lg border flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Issue Details */}
                      <div className="lg:col-span-2">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            #{issue.id}
                          </Badge>
                          <Badge className={`${getStatusColor(issue.status)} text-white`}>
                            {issue.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                            {issue.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="secondary">{issue.category}</Badge>
                        </div>

                        <h3 className="font-semibold text-lg mb-3">{issue.description}</h3>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{issue.address}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            <span>{issue.citizenName} - {issue.citizenPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span>Reported on {new Date(issue.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-1 flex flex-col gap-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Update Status</label>
                          <Select
                            value={issue.status}
                            onValueChange={(value: Issue['status']) => updateIssueStatus(issue.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="reported">Reported</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button variant="outline" size="sm" className="w-full">
                          Contact Citizen
                        </Button>
                        
                        <Button variant="outline" size="sm" className="w-full">
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MunicipalityDashboard;