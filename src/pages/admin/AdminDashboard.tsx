import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, AlertCircle, Clock, CheckCircle, AlertTriangle, Users, Building } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

interface DashboardStats {
  totalIssues: number;
  pending: number;
  inProgress: number;
  resolved: number;
  spamDetected: number;
}

interface Issue {
  id: string;
  citizenName: string;
  description: string;
  status: "reported" | "in-progress" | "resolved";
  municipality: string;
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: string;
  aiFlags?: string[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalIssues: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    spamDetected: 0
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [municipalityFilter, setMunicipalityFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reports with profiles
        const { data: reports, error } = await supabase
          .from('reports')
          .select(`
            *,
            profiles!inner(full_name, phone)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedIssues: Issue[] = reports.map(report => ({
          id: report.id,
          citizenName: report.profiles.full_name || 'Unknown',
          description: report.description || '',
          status: report.status as Issue['status'],
          municipality: 'Unknown Municipality', // TODO: Add municipality mapping
          priority: report.priority as Issue['priority'] || 'medium',
          category: report.category || 'Other',
          createdAt: report.created_at,
          aiFlags: []
        }));

        // Calculate stats
        const totalIssues = formattedIssues.length;
        const pending = formattedIssues.filter(i => i.status === 'reported').length;
        const inProgress = formattedIssues.filter(i => i.status === 'in-progress').length;
        const resolved = formattedIssues.filter(i => i.status === 'resolved').length;

        setStats({
          totalIssues,
          pending,
          inProgress,
          resolved,
          spamDetected: 0
        });

        setIssues(formattedIssues);
        setFilteredIssues(formattedIssues);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    let filtered = issues;

    if (statusFilter !== "all") {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    if (municipalityFilter !== "all") {
      filtered = filtered.filter(issue => issue.municipality === municipalityFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(issue => 
        issue.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredIssues(filtered);
  }, [issues, statusFilter, municipalityFilter, searchTerm]);

  const chartData = [
    { name: 'Reported', value: stats.pending },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Resolved', value: stats.resolved },
    { name: 'Spam/Fraud', value: stats.spamDetected }
  ];

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case "reported": return "bg-yellow-500";
      case "in-progress": return "bg-blue-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Administrator Dashboard</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage civic issues across Jharkhand</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIssues}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Spam Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.spamDetected}</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Issue Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issues Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>All Issues</CardTitle>
            <CardDescription>
              Comprehensive view of all reported civic issues
            </CardDescription>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Input
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:max-w-xs"
              />
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={municipalityFilter} onValueChange={setMunicipalityFilter}>
                <SelectTrigger className="sm:w-64">
                  <SelectValue placeholder="Filter by municipality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Municipalities</SelectItem>
                  <SelectItem value="Ranchi Municipal Corporation">Ranchi</SelectItem>
                  <SelectItem value="Dhanbad Municipal Corporation">Dhanbad</SelectItem>
                  <SelectItem value="Bokaro Steel City Municipal Corporation">Bokaro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Citizen</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Municipality</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium">#{issue.id}</TableCell>
                      <TableCell>{issue.citizenName}</TableCell>
                      <TableCell className="max-w-xs truncate">{issue.description}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(issue.status)} text-white`}>
                          {issue.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{issue.municipality}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                          {issue.priority.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>{issue.category}</TableCell>
                      <TableCell>{new Date(issue.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          {issue.aiFlags?.includes("spam") && (
                            <Badge variant="destructive" className="text-xs">
                              SPAM
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;