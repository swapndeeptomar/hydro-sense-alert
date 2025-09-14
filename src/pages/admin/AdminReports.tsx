import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Search,
  Calendar as CalendarIcon,
  Filter,
  TrendingUp,
  Users,
  AlertTriangle,
  Eye,
  MapPin,
  Clock,
  Phone
} from "lucide-react";
import { format } from "date-fns";

const AdminReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterVillage, setFilterVillage] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState();
  const [selectedTab, setSelectedTab] = useState("health");

  // Sample health reports data
  const healthReports = [
    {
      id: "HR-001",
      reporterName: "Maria Santos",
      village: "Lake Shore",
      type: "Symptom Report",
      severity: "High",
      patientsAffected: 3,
      symptoms: ["Fever", "Diarrhea", "Vomiting"],
      status: "Under Investigation",
      dateReported: "2024-01-15T14:30:00",
      contactPhone: "+1-555-0123",
      assignedTo: "Dr. Sarah Chen",
      description: "3 family members experiencing severe symptoms after consuming water from local well.",
      followUpRequired: true,
      labTestsOrdered: true
    },
    {
      id: "HR-002",
      reporterName: "Ahmed Hassan",
      village: "Mountain View",
      type: "Symptom Report",
      severity: "Medium",
      patientsAffected: 1,
      symptoms: ["Stomach Pain", "Nausea"],
      status: "Resolved",
      dateReported: "2024-01-14T10:15:00",
      contactPhone: "+1-555-0124",
      assignedTo: "Health Team A",
      description: "Single case of mild gastric symptoms, resolved with basic treatment.",
      followUpRequired: false,
      labTestsOrdered: false
    },
    {
      id: "HR-003",
      reporterName: "Anonymous",
      village: "Palm Grove",
      type: "Water Quality Concern",
      severity: "Medium",
      patientsAffected: 0,
      symptoms: [],
      status: "In Progress",
      dateReported: "2024-01-14T16:45:00",
      contactPhone: "Not provided",
      assignedTo: "Water Quality Team",
      description: "Community reports unusual taste and odor in water supply.",
      followUpRequired: true,
      labTestsOrdered: true
    },
    {
      id: "HR-004",
      reporterName: "John Smith",
      village: "Riverside Village",
      type: "Symptom Report",
      severity: "Low",
      patientsAffected: 2,
      symptoms: ["Mild Diarrhea"],
      status: "Monitoring",
      dateReported: "2024-01-13T09:20:00",
      contactPhone: "+1-555-0125",
      assignedTo: "Community Health Worker",
      description: "Two children with mild symptoms, likely related to dietary changes.",
      followUpRequired: true,
      labTestsOrdered: false
    },
    {
      id: "HR-005",
      reporterName: "Lisa Chen",
      village: "Green Valley",
      type: "Outbreak Concern",
      severity: "High",
      patientsAffected: 5,
      symptoms: ["Fever", "Dehydration", "Fatigue"],
      status: "Active Investigation",
      dateReported: "2024-01-12T11:30:00",
      contactPhone: "+1-555-0126",
      assignedTo: "Dr. Ahmed Rahman",
      description: "Multiple cases in same neighborhood, potential contaminated water source.",
      followUpRequired: true,
      labTestsOrdered: true
    }
  ];

  // Sample system reports data
  const systemReports = [
    {
      id: "SR-001",
      type: "Device Alert",
      village: "Lake Shore",
      deviceId: "WS-LS-001",
      alertType: "Sensor Malfunction",
      severity: "High",
      timestamp: "2024-01-15T15:45:00",
      status: "Resolved",
      description: "Turbidity sensor providing inconsistent readings",
      actionTaken: "Sensor replaced and calibrated",
      downtime: "2 hours"
    },
    {
      id: "SR-002",
      type: "Data Anomaly",
      village: "Mountain View",
      deviceId: "WS-MV-003",
      alertType: "pH Spike",
      severity: "Medium",
      timestamp: "2024-01-14T12:20:00",
      status: "Monitoring",
      description: "Sudden pH increase detected in water supply",
      actionTaken: "Water treatment adjustment initiated",
      downtime: "0 hours"
    },
    {
      id: "SR-003",
      type: "Communication Error",
      village: "Palm Grove",
      deviceId: "WS-PG-002",
      alertType: "Network Connectivity",
      severity: "Low",
      timestamp: "2024-01-13T08:10:00",
      status: "Resolved",
      description: "Intermittent data transmission failures",
      actionTaken: "Network configuration updated",
      downtime: "4 hours"
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active Investigation":
      case "Under Investigation": return "bg-red-100 text-red-800 border-red-200";
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Monitoring": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Resolved": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredHealthReports = healthReports.filter(report => {
    const matchesSearch = report.reporterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === "all" || report.severity === filterSeverity;
    const matchesVillage = filterVillage === "all" || report.village === filterVillage;
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    
    return matchesSearch && matchesSeverity && matchesVillage && matchesStatus;
  });

  const filteredSystemReports = systemReports.filter(report => {
    const matchesSearch = report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === "all" || report.severity === filterSeverity;
    const matchesVillage = filterVillage === "all" || report.village === filterVillage;
    const matchesStatus = filterStatus === "all" || report.status === filterStatus;
    
    return matchesSearch && matchesSeverity && matchesVillage && matchesStatus;
  });

  const villages = [...new Set([...healthReports.map(r => r.village), ...systemReports.map(r => r.village)])];

  const stats = {
    totalHealthReports: healthReports.length,
    totalSystemReports: systemReports.length,
    activeInvestigations: healthReports.filter(r => r.status.includes("Investigation")).length,
    highPriorityReports: [...healthReports, ...systemReports].filter(r => r.severity === "High").length
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports Management</h1>
          <p className="text-muted-foreground">Monitor health reports and system alerts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Reports</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalHealthReports}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Reports</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalSystemReports}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Investigations</p>
                <p className="text-2xl font-bold text-foreground">{stats.activeInvestigations}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-foreground">{stats.highPriorityReports}</p>
              </div>
              <Users className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterVillage} onValueChange={setFilterVillage}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by village" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Villages</SelectItem>
                {villages.map(village => (
                  <SelectItem key={village} value={village}>{village}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="justify-start text-left font-normal" disabled>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Date Range (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Tabs */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Report Dashboard</CardTitle>
          <CardDescription>
            View and manage all health and system reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="health">Health Reports ({stats.totalHealthReports})</TabsTrigger>
              <TabsTrigger value="system">System Reports ({stats.totalSystemReports})</TabsTrigger>
            </TabsList>
            
            {/* Health Reports Tab */}
            <TabsContent value="health" className="space-y-4">
              <div className="space-y-4">
                {filteredHealthReports.map((report) => (
                  <Card key={report.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Report Details */}
                        <div className="md:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{report.type}</h3>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                <span>ID: {report.id}</span>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {report.village}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {format(new Date(report.dateReported), "MMM dd, yyyy HH:mm")}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Badge className={`border ${getSeverityColor(report.severity)}`}>
                                {report.severity}
                              </Badge>
                              <Badge className={`border ${getStatusColor(report.status)}`}>
                                {report.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-foreground mb-4 leading-relaxed">{report.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-foreground">Reporter:</span>
                              <div className="text-muted-foreground">{report.reporterName}</div>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Contact:</span>
                              <div className="text-muted-foreground flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {report.contactPhone}
                              </div>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Patients Affected:</span>
                              <div className="text-muted-foreground">{report.patientsAffected}</div>
                            </div>
                            <div>
                              <span className="font-medium text-foreground">Assigned To:</span>
                              <div className="text-muted-foreground">{report.assignedTo}</div>
                            </div>
                          </div>
                          
                          {report.symptoms.length > 0 && (
                            <div className="mt-4">
                              <span className="font-medium text-foreground">Symptoms:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {report.symptoms.map((symptom, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {symptom}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Action Panel */}
                        <div className="space-y-4">
                          <div className="bg-secondary/30 rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-3">Status Indicators</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Follow-up Required:</span>
                                <Badge variant={report.followUpRequired ? "destructive" : "outline"} className="text-xs">
                                  {report.followUpRequired ? "Yes" : "No"}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Lab Tests Ordered:</span>
                                <Badge variant={report.labTestsOrdered ? "default" : "outline"} className="text-xs">
                                  {report.labTestsOrdered ? "Yes" : "No"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Button size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            
                            {report.status !== "Resolved" && (
                              <Button size="sm" variant="outline" className="w-full">
                                <Users className="h-4 w-4 mr-2" />
                                Update Status
                              </Button>
                            )}
                            
                            <Button size="sm" variant="outline" className="w-full">
                              <Phone className="h-4 w-4 mr-2" />
                              Contact Reporter
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredHealthReports.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No health reports found matching your criteria.</p>
                </div>
              )}
            </TabsContent>
            
            {/* System Reports Tab */}
            <TabsContent value="system" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Downtime</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSystemReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.village}</TableCell>
                      <TableCell className="font-mono text-xs">{report.deviceId}</TableCell>
                      <TableCell>
                        <Badge className={`border ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`border ${getStatusColor(report.status)}`}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">
                        {format(new Date(report.timestamp), "MMM dd, HH:mm")}
                      </TableCell>
                      <TableCell>{report.downtime}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredSystemReports.length === 0 && (
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No system reports found matching your criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;