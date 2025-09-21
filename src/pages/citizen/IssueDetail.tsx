import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Clock, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";

interface Issue {
  id: string;
  description: string;
  status: "reported" | "in-progress" | "resolved";
  address: string;
  images?: string[];
  createdAt: string;
  updatedAt?: string;
  priority?: "low" | "medium" | "high";
  category?: string;
  aiFlags?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  statusHistory?: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
}

const IssueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data based on ID
        const mockIssue: Issue = {
          id: id!,
          description: "Broken streetlight on MG Road causing safety issues at night. The light has been non-functional for the past week, making it dangerous for pedestrians and vehicles.",
          status: "in-progress",
          address: "MG Road, Near City Mall, Ranchi, Jharkhand 834001",
          images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1573152143286-0c422b4d2175?w=400&h=300&fit=crop"
          ],
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-16T14:20:00Z",
          priority: "high",
          category: "Street Lighting",
          aiFlags: ["urgent", "verified"],
          coordinates: {
            latitude: 23.3441,
            longitude: 85.3096
          },
          statusHistory: [
            {
              status: "reported",
              timestamp: "2024-01-15T10:30:00Z",
              note: "Issue reported by citizen"
            },
            {
              status: "in-progress", 
              timestamp: "2024-01-16T14:20:00Z",
              note: "Assigned to maintenance team"
            }
          ]
        };
        
        setIssue(mockIssue);
      } catch (error) {
        console.error("Failed to fetch issue:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchIssue();
    }
  }, [id]);

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case "reported": return "bg-yellow-500";
      case "in-progress": return "bg-blue-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority?: Issue['priority']) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">Loading issue details...</div>
        </main>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Issue Not Found</h2>
            <Button asChild>
              <Link to="/issues">Back to Issues</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="outline">
              <Link to="/issues">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Issues
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Issue #{issue.id}</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Issue Details */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={`${getStatusColor(issue.status)} text-white`}>
                      {issue.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    {issue.priority && (
                      <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                        {issue.priority.toUpperCase()} PRIORITY
                      </Badge>
                    )}
                    {issue.category && (
                      <Badge variant="secondary">{issue.category}</Badge>
                    )}
                    {issue.aiFlags?.includes("urgent") && (
                      <Badge variant="destructive" className="animate-pulse">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        URGENT
                      </Badge>
                    )}
                    {issue.aiFlags?.includes("verified") && (
                      <Badge className="bg-green-600">
                        AI VERIFIED
                      </Badge>
                    )}
                  </div>
                  <CardTitle>Issue Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {issue.description}
                  </p>
                </CardContent>
              </Card>

              {/* Images */}
              {issue.images && issue.images.length > 0 && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {issue.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Issue image ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => window.open(image, '_blank')}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Status History */}
              {issue.statusHistory && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Status History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {issue.statusHistory.map((history, index) => (
                        <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                          <div className="flex-shrink-0">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(history.status as Issue['status'])}`}></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium capitalize">
                                {history.status.replace('-', ' ')}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(history.timestamp).toLocaleString()}
                              </span>
                            </div>
                            {history.note && (
                              <p className="text-sm text-muted-foreground">
                                {history.note}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Location Info */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground mb-3">
                    {issue.address}
                  </p>
                  {issue.coordinates && (
                    <div className="text-xs text-muted-foreground mb-3">
                      Lat: {issue.coordinates.latitude.toFixed(6)}<br />
                      Lng: {issue.coordinates.longitude.toFixed(6)}
                    </div>
                  )}
                  <Button variant="outline" size="sm" className="w-full">
                    View on Map
                  </Button>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Reported</p>
                      <p className="text-muted-foreground">
                        {new Date(issue.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {issue.updatedAt && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Last Updated</p>
                        <p className="text-muted-foreground">
                          {new Date(issue.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* AI Analysis */}
              {(issue.category || issue.priority || issue.aiFlags) && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>AI Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {issue.category && (
                      <p className="text-sm">
                        <span className="font-medium">Category:</span> {issue.category}
                      </p>
                    )}
                    {issue.priority && (
                      <p className="text-sm">
                        <span className="font-medium">Priority:</span> {issue.priority}
                      </p>
                    )}
                    {issue.aiFlags && issue.aiFlags.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-1">AI Flags:</p>
                        <div className="flex flex-wrap gap-1">
                          {issue.aiFlags.map((flag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {flag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IssueDetail;