import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Calendar, AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface Issue {
  id: string;
  description: string;
  status: "reported" | "in-progress" | "resolved";
  address: string;
  image?: string;
  createdAt: string;
  priority?: "low" | "medium" | "high";
  category?: string;
  aiFlags?: string[];
}

const IssueList = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchIssues = async () => {
      if (!user) return;
      
      try {
        const userId = user.id;
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedIssues: Issue[] = data.map(report => ({
          id: report.id,
          description: report.description || '',
          status: report.status as Issue['status'],
          address: report.location || '',
          createdAt: report.created_at,
          priority: report.priority as Issue['priority'] || 'medium',
          category: report.category || 'Other',
          aiFlags: []
        }));

        setIssues(formattedIssues);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [user]);

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
          <div className="text-center">Loading issues...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Reported Issues</h1>
            <p className="text-muted-foreground mt-2">Track the status of your civic issue reports</p>
          </div>
          
          <Button asChild className="bg-gradient-gov hover:bg-gov-green-light">
            <Link to="/issues/report">
              <Plus className="w-4 h-4 mr-2" />
              Report New Issue
            </Link>
          </Button>
        </div>

        {issues.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">No Issues Reported Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by reporting your first civic issue to help improve your community
              </p>
              <Button asChild className="bg-gradient-gov hover:bg-gov-green-light">
                <Link to="/issues/report">Report Your First Issue</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {issues.map((issue) => (
              <Card key={issue.id} className="shadow-card hover:shadow-gov transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
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
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {issue.description}
                      </h3>
                      
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {issue.address}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(issue.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/issues/${issue.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default IssueList;