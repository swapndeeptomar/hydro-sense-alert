import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  TrendingUp,
  Activity,
  Droplets,
  Thermometer,
  Eye,
  UserPlus,
  Shield
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminOverview = () => {
  const [selectedVillage, setSelectedVillage] = useState(null);

  // Sample KPI data
  const kpiData = [
    { title: "Active Alerts", value: "7", trend: "+2 from yesterday", icon: AlertTriangle, color: "text-red-600" },
    { title: "Villages at Risk", value: "3", trend: "Medium or higher", icon: MapPin, color: "text-amber-600" },
    { title: "Cases Today", value: "12", trend: "+4 from yesterday", icon: Users, color: "text-blue-600" },
    { title: "Devices Online", value: "45/48", trend: "94% uptime", icon: Activity, color: "text-green-600" },
  ];

  // Sample alerts data
  const recentAlerts = [
    {
      id: 1,
      village: "Lake Shore",
      type: "High Risk",
      severity: "High",
      message: "Turbidity levels critically high. Immediate action required.",
      timestamp: "15 minutes ago",
      status: "Active",
      assignedTo: "Dr. Sarah Chen"
    },
    {
      id: 2,
      village: "Mountain View",
      type: "Water Quality",
      severity: "Medium",
      message: "pH levels outside normal range. Monitor closely.",
      timestamp: "1 hour ago",
      status: "In Progress",
      assignedTo: "Health Team A"
    },
    {
      id: 3,
      village: "Palm Grove",
      type: "Device Alert",
      severity: "Low",
      message: "Sensor maintenance required in 48 hours.",
      timestamp: "3 hours ago",
      status: "Scheduled",
      assignedTo: "Tech Team"
    },
    {
      id: 4,
      village: "Riverside Village",
      type: "Outbreak Alert",
      severity: "Medium",
      message: "5 new cases reported in the last 24 hours.",
      timestamp: "5 hours ago",
      status: "Investigating",
      assignedTo: "Dr. Ahmed Rahman"
    }
  ];

  // Sample village data for map
  const villages = [
    { id: 1, name: "Riverside Village", lat: 40.7128, lng: -74.0060, risk: "Low", population: 2500, cases: 1 },
    { id: 2, name: "Mountain View", lat: 40.7589, lng: -73.9851, risk: "Medium", population: 1800, cases: 3 },
    { id: 3, name: "Lake Shore", lat: 40.7505, lng: -73.9934, risk: "High", population: 3200, cases: 8 },
    { id: 4, name: "Green Valley", lat: 40.7282, lng: -73.7949, risk: "Low", population: 2100, cases: 0 },
    { id: 5, name: "Palm Grove", lat: 40.6892, lng: -74.0445, risk: "Medium", population: 2800, cases: 2 },
    { id: 6, name: "Cedar Heights", lat: 40.7831, lng: -73.9712, risk: "Low", population: 1950, cases: 1 },
    { id: 7, name: "Willow Creek", lat: 40.7014, lng: -73.9857, risk: "High", population: 2650, cases: 5 },
    { id: 8, name: "Sunset Hills", lat: 40.7480, lng: -73.8512, risk: "Medium", population: 2200, cases: 2 },
  ];

  // Sample chart data
  const chartData = [
    { name: 'Mon', alerts: 4, cases: 8, resolved: 6 },
    { name: 'Tue', alerts: 6, cases: 12, resolved: 8 },
    { name: 'Wed', alerts: 3, cases: 6, resolved: 10 },
    { name: 'Thu', alerts: 8, cases: 15, resolved: 7 },
    { name: 'Fri', alerts: 5, cases: 10, resolved: 12 },
    { name: 'Sat', alerts: 7, cases: 18, resolved: 9 },
    { name: 'Sun', alerts: 4, cases: 12, resolved: 11 },
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 4, color: '#10B981' },
    { name: 'Medium Risk', value: 3, color: '#F59E0B' },
    { name: 'High Risk', value: 2, color: '#EF4444' },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low": return "bg-green-500";
      case "Medium": return "bg-amber-500";
      case "High": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-800 border-red-200";
      case "Medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.trend}</p>
                </div>
                <kpi.icon className={`h-8 w-8 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Village Map */}
        <div className="lg:col-span-2">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Village Risk Map
              </CardTitle>
              <CardDescription>
                Real-time risk status across all monitored villages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Interactive Map Placeholder */}
              <div className="relative h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50" />
                
                {/* Village Markers */}
                {villages.map((village) => (
                  <div
                    key={village.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110`}
                    style={{
                      left: `${20 + (village.id * 11)}%`,
                      top: `${25 + (village.id * 8)}%`,
                    }}
                    onClick={() => setSelectedVillage(village)}
                  >
                    <div className={`w-4 h-4 rounded-full ${getRiskColor(village.risk)} border-2 border-white shadow-lg pulse-slow`} />
                    {selectedVillage?.id === village.id && (
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-elevated p-3 min-w-48 z-10">
                        <h4 className="font-semibold text-foreground mb-2">{village.name}</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Risk Level:</span>
                            <Badge className={`text-xs ${getSeverityColor(village.risk)} border`}>
                              {village.risk}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Population:</span>
                            <span className="font-medium">{village.population.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Cases:</span>
                            <span className="font-medium">{village.cases}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" className="text-xs">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs">
                            Assign Worker
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-card p-3">
                  <h5 className="text-sm font-medium text-foreground mb-2">Risk Levels</h5>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                      <span>Low Risk</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-2" />
                      <span>Medium Risk</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                      <span>High Risk</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Village Summary */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">4</div>
                  <div className="text-xs text-muted-foreground">Low Risk</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-600">3</div>
                  <div className="text-xs text-muted-foreground">Medium Risk</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">2</div>
                  <div className="text-xs text-muted-foreground">High Risk</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <div>
          <Card className="card-elevated h-fit">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                Recent Alerts
              </CardTitle>
              <CardDescription>Latest system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAlerts.map((alert) => (
                <Card key={alert.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground text-sm">{alert.village}</h4>
                        <p className="text-xs text-muted-foreground">{alert.type}</p>
                      </div>
                      <Badge className={`text-xs border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {alert.message}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{alert.timestamp}</span>
                      <Badge variant="outline" className="text-xs">
                        {alert.status}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <UserPlus className="h-3 w-3 mr-1" />
                      {alert.assignedTo}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button className="w-full" variant="outline">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-2">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Weekly Trends
              </CardTitle>
              <CardDescription>
                Alerts, cases, and resolutions over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="alerts" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={2}
                      name="Alerts"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cases" 
                      stroke="hsl(var(--danger))" 
                      strokeWidth={2}
                      name="Cases"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2}
                      name="Resolved"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Distribution */}
        <div>
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Risk Distribution
              </CardTitle>
              <CardDescription>
                Current risk levels across all villages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {riskDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </div>
                    <span className="font-medium">{item.value} villages</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;