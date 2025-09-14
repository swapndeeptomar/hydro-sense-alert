import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Cpu, 
  Wifi, 
  WifiOff, 
  Battery,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Settings,
  Activity,
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  Eye,
  Wrench
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const AdminDevices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterVillage, setFilterVillage] = useState("all");
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Sample device data
  const devices = [
    {
      id: "WS-LS-001",
      name: "Lake Shore Primary Sensor",
      village: "Lake Shore",
      type: "Water Quality Monitor",
      status: "Online",
      batteryLevel: 85,
      signalStrength: 95,
      lastUpdate: "2024-01-15T15:30:00",
      location: { lat: 40.7505, lng: -73.9934 },
      firmware: "v2.1.3",
      installDate: "2023-06-15",
      maintenanceScheduled: "2024-02-15",
      sensors: {
        turbidity: { value: 2.3, unit: "NTU", status: "Normal" },
        ph: { value: 7.1, unit: "pH", status: "Normal" },
        temperature: { value: 25.2, unit: "°C", status: "Normal" },
        chlorine: { value: 0.4, unit: "mg/L", status: "Normal" }
      },
      alerts: [
        { type: "Maintenance Due", severity: "Low", timestamp: "2024-01-10T09:00:00" }
      ],
      history: [
        { time: "6 AM", turbidity: 2.1, ph: 7.2, temperature: 24.5, chlorine: 0.5 },
        { time: "9 AM", turbidity: 2.3, ph: 7.1, temperature: 25.8, chlorine: 0.4 },
        { time: "12 PM", turbidity: 2.8, ph: 7.0, temperature: 27.2, chlorine: 0.3 },
        { time: "3 PM", turbidity: 3.1, ph: 6.9, temperature: 28.1, chlorine: 0.3 },
        { time: "6 PM", turbidity: 2.9, ph: 7.0, temperature: 26.5, chlorine: 0.4 },
        { time: "9 PM", turbidity: 2.5, ph: 7.1, temperature: 25.2, chlorine: 0.4 },
      ]
    },
    {
      id: "WS-MV-003",
      name: "Mountain View Backup",
      village: "Mountain View",
      type: "pH Monitor",
      status: "Warning",
      batteryLevel: 45,
      signalStrength: 72,
      lastUpdate: "2024-01-15T14:45:00",
      location: { lat: 40.7589, lng: -73.9851 },
      firmware: "v2.0.8",
      installDate: "2023-04-22",
      maintenanceScheduled: "2024-01-20",
      sensors: {
        ph: { value: 6.2, unit: "pH", status: "Low" },
        temperature: { value: 28.5, unit: "°C", status: "High" }
      },
      alerts: [
        { type: "Low Battery", severity: "Medium", timestamp: "2024-01-15T12:00:00" },
        { type: "pH Below Threshold", severity: "Medium", timestamp: "2024-01-15T10:30:00" }
      ],
      history: [
        { time: "6 AM", ph: 6.8, temperature: 24.2 },
        { time: "9 AM", ph: 6.5, temperature: 25.1 },
        { time: "12 PM", ph: 6.3, temperature: 26.8 },
        { time: "3 PM", ph: 6.2, temperature: 28.5 },
        { time: "6 PM", ph: 6.1, temperature: 27.9 },
        { time: "9 PM", ph: 6.2, temperature: 26.5 },
      ]
    },
    {
      id: "WS-PG-002",
      name: "Palm Grove Central",
      village: "Palm Grove",
      type: "Multi-Parameter",
      status: "Offline",
      batteryLevel: 0,
      signalStrength: 0,
      lastUpdate: "2024-01-14T22:15:00",
      location: { lat: 40.6892, lng: -74.0445 },
      firmware: "v2.1.1",
      installDate: "2023-08-10",
      maintenanceScheduled: "2024-01-18",
      sensors: {
        turbidity: { value: null, unit: "NTU", status: "No Data" },
        ph: { value: null, unit: "pH", status: "No Data" },
        temperature: { value: null, unit: "°C", status: "No Data" },
        chlorine: { value: null, unit: "mg/L", status: "No Data" }
      },
      alerts: [
        { type: "Device Offline", severity: "High", timestamp: "2024-01-14T22:15:00" },
        { type: "Communication Lost", severity: "High", timestamp: "2024-01-14T22:15:00" }
      ],
      history: []
    },
    {
      id: "WS-RV-001",
      name: "Riverside Primary",
      village: "Riverside Village",
      type: "Water Quality Monitor",
      status: "Online",
      batteryLevel: 92,
      signalStrength: 88,
      lastUpdate: "2024-01-15T15:25:00",
      location: { lat: 40.7128, lng: -74.0060 },
      firmware: "v2.1.3",
      installDate: "2023-05-20",
      maintenanceScheduled: "2024-03-20",
      sensors: {
        turbidity: { value: 1.8, unit: "NTU", status: "Normal" },
        ph: { value: 7.3, unit: "pH", status: "Normal" },
        temperature: { value: 24.8, unit: "°C", status: "Normal" },
        chlorine: { value: 0.6, unit: "mg/L", status: "Normal" }
      },
      alerts: [],
      history: [
        { time: "6 AM", turbidity: 1.7, ph: 7.4, temperature: 23.5, chlorine: 0.6 },
        { time: "9 AM", turbidity: 1.8, ph: 7.3, temperature: 24.2, chlorine: 0.6 },
        { time: "12 PM", turbidity: 1.9, ph: 7.2, temperature: 25.1, chlorine: 0.5 },
        { time: "3 PM", turbidity: 2.0, ph: 7.1, temperature: 25.8, chlorine: 0.5 },
        { time: "6 PM", turbidity: 1.9, ph: 7.2, temperature: 25.2, chlorine: 0.6 },
        { time: "9 PM", turbidity: 1.8, ph: 7.3, temperature: 24.8, chlorine: 0.6 },
      ]
    },
    {
      id: "WS-GV-004",
      name: "Green Valley Monitor",
      village: "Green Valley",
      type: "Chlorine Sensor",
      status: "Online",
      batteryLevel: 78,
      signalStrength: 91,
      lastUpdate: "2024-01-15T15:20:00",
      location: { lat: 40.7282, lng: -73.7949 },
      firmware: "v1.9.5",
      installDate: "2023-03-12",
      maintenanceScheduled: "2024-01-25",
      sensors: {
        chlorine: { value: 0.3, unit: "mg/L", status: "Low" },
        temperature: { value: 26.1, unit: "°C", status: "Normal" }
      },
      alerts: [
        { type: "Low Chlorine", severity: "Medium", timestamp: "2024-01-15T14:00:00" }
      ],
      history: [
        { time: "6 AM", chlorine: 0.5, temperature: 24.1 },
        { time: "9 AM", chlorine: 0.4, temperature: 24.8 },
        { time: "12 PM", chlorine: 0.3, temperature: 25.5 },
        { time: "3 PM", chlorine: 0.3, temperature: 26.1 },
        { time: "6 PM", chlorine: 0.3, temperature: 25.8 },
        { time: "9 PM", chlorine: 0.3, temperature: 25.2 },
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Online": return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", icon: CheckCircle };
      case "Warning": return { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200", icon: AlertTriangle };
      case "Offline": return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", icon: WifiOff };
      default: return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", icon: Cpu };
    }
  };

  const getBatteryColor = (level) => {
    if (level > 50) return "text-green-600";
    if (level > 20) return "text-amber-600";
    return "text-red-600";
  };

  const getSignalStrength = (strength) => {
    if (strength > 80) return { bars: 4, color: "text-green-600" };
    if (strength > 60) return { bars: 3, color: "text-amber-600" };
    if (strength > 40) return { bars: 2, color: "text-red-600" };
    return { bars: 1, color: "text-red-600" };
  };

  const getSensorStatus = (status) => {
    switch (status) {
      case "Normal": return "text-green-600";
      case "Low": case "High": return "text-amber-600";
      case "Critical": return "text-red-600";
      case "No Data": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.village.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || device.status === filterStatus;
    const matchesVillage = filterVillage === "all" || device.village === filterVillage;
    
    return matchesSearch && matchesStatus && matchesVillage;
  });

  const villages = [...new Set(devices.map(d => d.village))];

  const stats = {
    totalDevices: devices.length,
    onlineDevices: devices.filter(d => d.status === "Online").length,
    warningDevices: devices.filter(d => d.status === "Warning").length,
    offlineDevices: devices.filter(d => d.status === "Offline").length,
    averageBattery: Math.round(devices.reduce((sum, d) => sum + d.batteryLevel, 0) / devices.length)
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Device Management</h1>
          <p className="text-muted-foreground">Monitor and manage IoT water quality sensors</p>
        </div>
        <Button>
          <Cpu className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Devices</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalDevices}</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online</p>
                <p className="text-2xl font-bold text-foreground">{stats.onlineDevices}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Warning</p>
                <p className="text-2xl font-bold text-foreground">{stats.warningDevices}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold text-foreground">{stats.offlineDevices}</p>
              </div>
              <WifiOff className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Battery</p>
                <p className="text-2xl font-bold text-foreground">{stats.averageBattery}%</p>
              </div>
              <Battery className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices by name, ID, or village..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterVillage} onValueChange={setFilterVillage}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by village" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Villages</SelectItem>
                {villages.map(village => (
                  <SelectItem key={village} value={village}>{village}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Device Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDevices.map((device) => {
          const statusConfig = getStatusColor(device.status);
          const batteryColor = getBatteryColor(device.batteryLevel);
          const signalConfig = getSignalStrength(device.signalStrength);
          const StatusIcon = statusConfig.icon;
          
          return (
            <Card key={device.id} className="card-interactive">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{device.name}</h3>
                      <p className="text-sm text-muted-foreground font-mono">{device.id}</p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {device.village}
                      </div>
                    </div>
                    <Badge className={`${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} border`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {device.status}
                    </Badge>
                  </div>

                  {/* Status Indicators */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Battery className={`h-4 w-4 ${batteryColor}`} />
                      <span className="text-sm font-medium">{device.batteryLevel}%</span>
                      <Progress value={device.batteryLevel} className="flex-1 h-2" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Wifi className={`h-4 w-4 ${signalConfig.color}`} />
                      <span className="text-sm font-medium">{device.signalStrength}%</span>
                    </div>
                  </div>

                  {/* Sensor Readings */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Current Readings</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(device.sensors).map(([key, sensor]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-muted-foreground capitalize">{key}:</span>
                          <span className={`font-medium ${getSensorStatus(sensor.status)}`}>
                            {sensor.value !== null ? `${sensor.value} ${sensor.unit}` : "No Data"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alerts */}
                  {device.alerts.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-foreground">Active Alerts</h4>
                      <div className="space-y-1">
                        {device.alerts.slice(0, 2).map((alert, index) => (
                          <div key={index} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{alert.type}</span>
                            <Badge 
                              variant={alert.severity === "High" ? "destructive" : alert.severity === "Medium" ? "secondary" : "outline"}
                              className="text-xs"
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex-1" onClick={() => setSelectedDevice(device)}>
                          <Eye className="h-3 w-3 mr-2" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{device.name}</DialogTitle>
                          <DialogDescription>
                            Device ID: {device.id} • {device.village}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedDevice && (
                          <DeviceDetailModal device={selectedDevice} />
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Last Update */}
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Last update: {new Date(device.lastUpdate).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDevices.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Cpu className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No devices found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Device Detail Modal Component
const DeviceDetailModal = ({ device }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Online": return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200", icon: CheckCircle };
      case "Warning": return { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200", icon: AlertTriangle };
      case "Offline": return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200", icon: WifiOff };
      default: return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200", icon: Cpu };
    }
  };

  const getSensorStatus = (status) => {
    switch (status) {
      case "Normal": return "text-green-600";
      case "Low": case "High": return "text-amber-600";
      case "Critical": return "text-red-600";
      case "No Data": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Device Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-foreground mb-3">Device Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{device.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Firmware:</span>
              <span className="font-medium">{device.firmware}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Install Date:</span>
              <span className="font-medium">{new Date(device.installDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Next Maintenance:</span>
              <span className="font-medium">{new Date(device.maintenanceScheduled).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-foreground mb-3">Current Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge className={`${getStatusColor(device.status).bg} ${getStatusColor(device.status).text} ${getStatusColor(device.status).border} border`}>
                {device.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Battery:</span>
              <span className="font-medium">{device.batteryLevel}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Signal:</span>
              <span className="font-medium">{device.signalStrength}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Update:</span>
              <span className="font-medium">{new Date(device.lastUpdate).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Data */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Sensor Readings</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(device.sensors).map(([key, sensor]: [string, any]) => (
            <Card key={key} className="border">
              <CardContent className="p-4 text-center">
                <div className="mb-2">
                  {key === "turbidity" && <Droplets className="h-6 w-6 mx-auto text-blue-600" />}
                  {key === "ph" && <Activity className="h-6 w-6 mx-auto text-purple-600" />}
                  {key === "temperature" && <Thermometer className="h-6 w-6 mx-auto text-red-600" />}
                  {key === "chlorine" && <Cpu className="h-6 w-6 mx-auto text-green-600" />}
                </div>
                <div className="text-lg font-bold text-foreground">
                  {sensor?.value !== null ? `${sensor?.value} ${sensor?.unit}` : "No Data"}
                </div>
                <div className="text-sm text-muted-foreground capitalize">{key}</div>
                <Badge 
                  variant="outline" 
                  className={`text-xs mt-1 ${getSensorStatus(sensor?.status || "No Data")}`}
                >
                  {sensor?.status || "No Data"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Historical Data Chart */}
      {device.history.length > 0 && (
        <div>
          <h4 className="font-semibold text-foreground mb-3">24-Hour Trend</h4>
          <Tabs defaultValue="turbidity" className="space-y-4">
            <TabsList>
              {Object.keys(device.sensors).map(sensor => (
                <TabsTrigger key={sensor} value={sensor} className="capitalize">
                  {sensor}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.keys(device.sensors).map(sensor => (
              <TabsContent key={sensor} value={sensor}>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={device.history}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey={sensor} 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </Button>
        <Button variant="outline">
          <Wrench className="h-4 w-4 mr-2" />
          Schedule Maintenance
        </Button>
        <Button variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Calibrate Sensors
        </Button>
      </div>
    </div>
  );
};

export default AdminDevices;