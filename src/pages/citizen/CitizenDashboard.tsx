import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Droplets, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Users, 
  ArrowLeft,
  Thermometer,
  Activity,
  Eye,
  Phone,
  MapPin
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [villageData, setVillageData] = useState(null);

  // Sample village data (in real app, this would come from API)
  const villages = {
    "1": { name: "Riverside Village", district: "North District", riskLevel: "Low", riskPercentage: 15 },
    "2": { name: "Mountain View", district: "East District", riskLevel: "Medium", riskPercentage: 45 },
    "3": { name: "Lake Shore", district: "South District", riskLevel: "High", riskPercentage: 78 },
    "4": { name: "Green Valley", district: "West District", riskLevel: "Low", riskPercentage: 22 },
    "5": { name: "Palm Grove", district: "Central District", riskLevel: "Medium", riskPercentage: 55 },
  };

  // Sample sensor data
  const sensorData = [
    { time: "6 AM", turbidity: 2.1, ph: 7.2, temperature: 24.5, chlorine: 0.5 },
    { time: "9 AM", turbidity: 2.3, ph: 7.1, temperature: 25.8, chlorine: 0.4 },
    { time: "12 PM", turbidity: 2.8, ph: 7.0, temperature: 27.2, chlorine: 0.3 },
    { time: "3 PM", turbidity: 3.1, ph: 6.9, temperature: 28.1, chlorine: 0.3 },
    { time: "6 PM", turbidity: 2.9, ph: 7.0, temperature: 26.5, chlorine: 0.4 },
    { time: "9 PM", turbidity: 2.5, ph: 7.1, temperature: 25.2, chlorine: 0.5 },
  ];

  // Sample alerts
  const alerts = [
    {
      id: 1,
      title: "Water Quality Advisory",
      message: "Turbidity levels slightly elevated. Boil water before consumption as precaution.",
      severity: "Medium",
      timestamp: "2 hours ago",
      status: "Active"
    },
    {
      id: 2,
      title: "Preventive Health Reminder",
      message: "Monsoon season approaching. Follow proper water storage guidelines.",
      severity: "Low",
      timestamp: "1 day ago", 
      status: "Info"
    },
    {
      id: 3,
      title: "Community Health Update",
      message: "3 mild gastric cases reported this week. Practice extra hygiene measures.",
      severity: "Medium",
      timestamp: "3 days ago",
      status: "Resolved"
    }
  ];

  useEffect(() => {
    const villageId = location.state?.villageId || "1";
    setVillageData(villages[villageId]);
  }, [location.state]);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "Low": return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", gradient: "gradient-risk-low" };
      case "Medium": return { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200", gradient: "gradient-risk-medium" };
      case "High": return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", gradient: "gradient-risk-high" };
      default: return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", gradient: "bg-gray-200" };
    }
  };

  if (!villageData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const riskColors = getRiskColor(villageData.riskLevel);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/citizen")}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Change Village
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{villageData.name}</h1>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  {villageData.district}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate("/citizen/treatment")}>
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </Button>
              <Button onClick={() => navigate("/citizen/report")}>
                <FileText className="h-4 w-4 mr-2" />
                Report Symptoms
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Risk Prediction Card */}
        <Card className="card-elevated mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Disease Risk Prediction</h2>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-medium text-foreground">Current Risk Level</span>
                    <Badge className={`${riskColors.bg} ${riskColors.text} ${riskColors.border} border`}>
                      {villageData.riskLevel}
                    </Badge>
                  </div>
                  <Progress value={villageData.riskPercentage} className="h-3 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0%</span>
                    <span className="font-medium">{villageData.riskPercentage}% Risk</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span className="text-foreground">AI model last updated: 2 hours ago</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span className="text-foreground">Based on water quality + weather + health data</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-success rounded-full mr-3" />
                    <span className="text-foreground">Next update: In 4 hours</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className={`w-48 h-48 ${riskColors.gradient} rounded-full flex items-center justify-center mx-auto shadow-elevated`}>
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-2">{villageData.riskPercentage}%</div>
                    <div className="text-lg font-medium">{villageData.riskLevel} Risk</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts and Alerts */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Water Quality Monitoring
                </CardTitle>
                <CardDescription>Real-time sensor data from your area</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="turbidity" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="turbidity">Turbidity</TabsTrigger>
                    <TabsTrigger value="ph">pH Level</TabsTrigger>
                    <TabsTrigger value="temperature">Temperature</TabsTrigger>
                    <TabsTrigger value="chlorine">Chlorine</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="turbidity" className="space-y-2">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sensorData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="turbidity" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current: 2.5 NTU | Safe Range: 0-4 NTU
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ph" className="space-y-2">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sensorData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis domain={[6, 8]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="ph" stroke="hsl(var(--accent))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current: 7.1 pH | Safe Range: 6.5-8.5 pH
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="temperature" className="space-y-2">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sensorData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="temperature" stroke="hsl(var(--warning))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current: 25.2°C | Normal Range: 20-30°C
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="chlorine" className="space-y-2">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={sensorData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="chlorine" stroke="hsl(var(--success))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Current: 0.5 mg/L | Safe Range: 0.2-1.0 mg/L
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                onClick={() => navigate("/citizen/report")}
                className="h-20 flex-col space-y-2"
                variant="outline"
              >
                <FileText className="h-6 w-6" />
                <span>Report Symptoms</span>
              </Button>
              
              <Button 
                onClick={() => navigate("/citizen/treatment")}
                className="h-20 flex-col space-y-2"
                variant="outline"
              >
                <Users className="h-6 w-6" />
                <span>Find Doctors</span>
              </Button>
              
              <Button 
                className="h-20 flex-col space-y-2"
                variant="outline"
              >
                <Eye className="h-6 w-6" />
                <span>Prevention Tips</span>
              </Button>
            </div>
          </div>

          {/* Alerts Section */}
          <div>
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                  Health Alerts
                </CardTitle>
                <CardDescription>Latest updates for your area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <Card key={alert.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground text-sm">{alert.title}</h4>
                        <Badge 
                          variant={alert.severity === "High" ? "destructive" : alert.severity === "Medium" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{alert.timestamp}</span>
                        <Badge variant="outline" className="text-xs">
                          {alert.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;