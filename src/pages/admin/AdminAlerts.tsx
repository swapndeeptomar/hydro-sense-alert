import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Search, 
  Filter,
  Users,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download
} from "lucide-react";

const AdminAlerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTab, setSelectedTab] = useState("active");

  // Sample alerts data
  const alerts = [
    {
      id: 1,
      village: "Lake Shore",
      type: "Water Quality Alert",
      severity: "High",
      message: "Turbidity levels critically high at 8.5 NTU. Immediate boil water advisory issued.",
      timestamp: "2024-01-15 14:30:00",
      status: "Active",
      assignedTo: "Dr. Sarah Chen",
      affectedPopulation: 3200,
      priority: 1,
      deviceId: "WS-LS-001",
      actions: [
        "Boil water advisory issued",
        "Health team dispatched",
        "Water treatment initiated"
      ]
    },
    {
      id: 2,
      village: "Mountain View",
      type: "pH Anomaly",
      severity: "Medium",
      message: "pH levels dropped to 6.2, below safe threshold. Monitoring increased frequency.",
      timestamp: "2024-01-15 12:15:00",
      status: "In Progress",
      assignedTo: "Health Team A",
      affectedPopulation: 1800,
      priority: 2,
      deviceId: "WS-MV-003",
      actions: [
        "Increased monitoring",
        "Water source inspection scheduled",
        "Preventive advisories sent"
      ]
    },
    {
      id: 3,
      village: "Palm Grove",
      type: "Temperature Spike",
      severity: "Low",
      message: "Water temperature elevated to 32°C. Seasonal monitoring continues.",
      timestamp: "2024-01-15 10:45:00",
      status: "Monitoring",
      assignedTo: "Tech Team",
      affectedPopulation: 2800,
      priority: 3,
      deviceId: "WS-PG-002",
      actions: [
        "Temperature trend analysis",
        "Seasonal adjustment protocols"
      ]
    },
    {
      id: 4,
      village: "Willow Creek",
      type: "Outbreak Alert",
      severity: "High",
      message: "5 confirmed gastroenteritis cases reported in 24 hours. Investigation initiated.",
      timestamp: "2024-01-15 08:20:00",
      status: "Investigating",
      assignedTo: "Dr. Ahmed Rahman",
      affectedPopulation: 2650,
      priority: 1,
      deviceId: "Multiple",
      actions: [
        "Epidemiological investigation",
        "Contact tracing initiated",
        "Enhanced surveillance"
      ]
    },
    {
      id: 5,
      village: "Riverside Village",
      type: "Device Maintenance",
      severity: "Medium",
      message: "Sensor calibration required for accurate readings. Maintenance scheduled.",
      timestamp: "2024-01-14 16:30:00",
      status: "Resolved",
      assignedTo: "Tech Support",
      affectedPopulation: 2500,
      priority: 2,
      deviceId: "WS-RV-001",
      actions: [
        "Sensor recalibrated",
        "Quality control tests passed",
        "System restored"
      ]
    },
    {
      id: 6,
      village: "Green Valley",
      type: "Chlorine Depletion",
      severity: "Medium",
      message: "Free chlorine levels below 0.2 mg/L. Water treatment adjustment needed.",
      timestamp: "2024-01-14 14:15:00",
      status: "Resolved",
      assignedTo: "Water Treatment Team",
      affectedPopulation: 2100,
      priority: 2,
      deviceId: "WS-GV-004",
      actions: [
        "Chlorine dosing adjusted",
        "Treatment process optimized",
        "Follow-up testing completed"
      ]
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
      case "Active": return "bg-red-100 text-red-800 border-red-200";
      case "In Progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Monitoring": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Investigating": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Resolved": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active": return AlertTriangle;
      case "In Progress": return Clock;
      case "Monitoring": return AlertCircle;
      case "Investigating": return Search;
      case "Resolved": return CheckCircle;
      default: return AlertCircle;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return "border-l-red-500";
      case 2: return "border-l-amber-500";
      case 3: return "border-l-green-500";
      default: return "border-l-gray-300";
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    
    const matchesTab = selectedTab === "all" || 
                      (selectedTab === "active" && ["Active", "In Progress", "Monitoring", "Investigating"].includes(alert.status)) ||
                      (selectedTab === "resolved" && alert.status === "Resolved");
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesTab;
  });

  const stats = {
    total: alerts.length,
    active: alerts.filter(a => ["Active", "In Progress", "Monitoring", "Investigating"].includes(a.status)).length,
    resolved: alerts.filter(a => a.status === "Resolved").length,
    high: alerts.filter(a => a.severity === "High").length
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alert Management</h1>
          <p className="text-muted-foreground">Monitor and manage health and water quality alerts</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Alerts</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-foreground">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-foreground">{stats.high}</p>
              </div>
              <XCircle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts by village, type, or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Investigating">Investigating</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Alert Management</CardTitle>
          <CardDescription>
            View and manage all system alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Alerts ({stats.active})</TabsTrigger>
              <TabsTrigger value="resolved">Resolved ({stats.resolved})</TabsTrigger>
              <TabsTrigger value="all">All Alerts ({stats.total})</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedTab} className="space-y-4">
              {filteredAlerts.map((alert) => {
                const StatusIcon = getStatusIcon(alert.status);
                return (
                  <Card key={alert.id} className={`border-l-4 ${getPriorityColor(alert.priority)} hover:shadow-md transition-shadow`}>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Alert Details */}
                        <div className="md:col-span-2">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">{alert.type}</h3>
                                <Badge className={`border ${getSeverityColor(alert.severity)}`}>
                                  {alert.severity}
                                </Badge>
                                <Badge className={`border ${getStatusColor(alert.status)}`}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {alert.status}
                                </Badge>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {alert.village}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {alert.affectedPopulation.toLocaleString()} people
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {new Date(alert.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-foreground mb-4 leading-relaxed">{alert.message}</p>
                          
                          <div className="space-y-2">
                            <h4 className="font-medium text-foreground">Actions Taken:</h4>
                            <ul className="space-y-1">
                              {alert.actions.map((action, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start">
                                  <CheckCircle className="h-3 w-3 mr-2 mt-1 text-green-600 flex-shrink-0" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* Action Panel */}
                        <div className="space-y-4">
                          <div className="bg-secondary/30 rounded-lg p-4">
                            <h4 className="font-medium text-foreground mb-3">Assignment</h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Assigned to:</span>
                                <div className="font-medium text-foreground">{alert.assignedTo}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Device ID:</span>
                                <div className="font-medium text-foreground">{alert.deviceId}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Priority:</span>
                                <div className="font-medium text-foreground">P{alert.priority}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {alert.status === "Active" && (
                              <>
                                <Button className="w-full" size="sm">
                                  <Users className="h-4 w-4 mr-2" />
                                  Assign Worker
                                </Button>
                                <Button variant="outline" className="w-full" size="sm">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Resolved
                                </Button>
                              </>
                            )}
                            
                            {alert.status === "In Progress" && (
                              <>
                                <Button className="w-full" size="sm">
                                  <Clock className="h-4 w-4 mr-2" />
                                  Update Status
                                </Button>
                                <Button variant="outline" className="w-full" size="sm">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Resolved
                                </Button>
                              </>
                            )}
                            
                            <Button variant="outline" className="w-full" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {filteredAlerts.length === 0 && (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No alerts found matching your criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAlerts;