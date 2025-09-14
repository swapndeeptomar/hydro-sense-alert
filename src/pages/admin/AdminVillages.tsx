import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Users, 
  Activity,
  TrendingUp,
  Droplets,
  AlertTriangle,
  Search,
  Eye,
  UserPlus,
  Shield,
  Thermometer
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const AdminVillages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVillage, setSelectedVillage] = useState(null);

  // Sample village data
  const villages = [
    {
      id: 1,
      name: "Riverside Village",
      district: "North District",
      population: 2500,
      riskLevel: "Low",
      riskPercentage: 15,
      activeCases: 1,
      devicesOnline: 3,
      totalDevices: 3,
      lastUpdate: "2 hours ago",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      demographics: {
        children: 750,
        adults: 1500,
        elderly: 250
      },
      infrastructure: {
        waterSources: 2,
        healthFacilities: 1,
        schools: 3
      },
      weeklyTrend: [
        { day: "Mon", risk: 12, cases: 0 },
        { day: "Tue", risk: 14, cases: 1 },
        { day: "Wed", risk: 16, cases: 1 },
        { day: "Thu", risk: 15, cases: 1 },
        { day: "Fri", risk: 13, cases: 1 },
        { day: "Sat", risk: 15, cases: 1 },
        { day: "Sun", risk: 15, cases: 1 }
      ]
    },
    {
      id: 2,
      name: "Mountain View",
      district: "East District",
      population: 1800,
      riskLevel: "Medium",
      riskPercentage: 45,
      activeCases: 3,
      devicesOnline: 2,
      totalDevices: 3,
      lastUpdate: "1 hour ago",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      demographics: {
        children: 540,
        adults: 1080,
        elderly: 180
      },
      infrastructure: {
        waterSources: 1,
        healthFacilities: 1,
        schools: 2
      },
      weeklyTrend: [
        { day: "Mon", risk: 35, cases: 2 },
        { day: "Tue", risk: 38, cases: 2 },
        { day: "Wed", risk: 42, cases: 3 },
        { day: "Thu", risk: 45, cases: 3 },
        { day: "Fri", risk: 44, cases: 3 },
        { day: "Sat", risk: 46, cases: 3 },
        { day: "Sun", risk: 45, cases: 3 }
      ]
    },
    {
      id: 3,
      name: "Lake Shore",
      district: "South District",
      population: 3200,
      riskLevel: "High",
      riskPercentage: 78,
      activeCases: 8,
      devicesOnline: 4,
      totalDevices: 4,
      lastUpdate: "30 minutes ago",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      demographics: {
        children: 960,
        adults: 1920,
        elderly: 320
      },
      infrastructure: {
        waterSources: 3,
        healthFacilities: 2,
        schools: 4
      },
      weeklyTrend: [
        { day: "Mon", risk: 65, cases: 5 },
        { day: "Tue", risk: 70, cases: 6 },
        { day: "Wed", risk: 75, cases: 7 },
        { day: "Thu", risk: 78, cases: 8 },
        { day: "Fri", risk: 76, cases: 8 },
        { day: "Sat", risk: 78, cases: 8 },
        { day: "Sun", risk: 78, cases: 8 }
      ]
    },
    {
      id: 4,
      name: "Green Valley",
      district: "West District",
      population: 2100,
      riskLevel: "Low",
      riskPercentage: 22,
      activeCases: 0,
      devicesOnline: 2,
      totalDevices: 2,
      lastUpdate: "3 hours ago",
      coordinates: { lat: 40.7282, lng: -73.7949 },
      demographics: {
        children: 630,
        adults: 1260,
        elderly: 210
      },
      infrastructure: {
        waterSources: 2,
        healthFacilities: 1,
        schools: 2
      },
      weeklyTrend: [
        { day: "Mon", risk: 18, cases: 0 },
        { day: "Tue", risk: 20, cases: 0 },
        { day: "Wed", risk: 22, cases: 0 },
        { day: "Thu", risk: 21, cases: 0 },
        { day: "Fri", risk: 19, cases: 0 },
        { day: "Sat", risk: 22, cases: 0 },
        { day: "Sun", risk: 22, cases: 0 }
      ]
    },
    {
      id: 5,
      name: "Palm Grove",
      district: "Central District",
      population: 2800,
      riskLevel: "Medium",
      riskPercentage: 55,
      activeCases: 2,
      devicesOnline: 3,
      totalDevices: 3,
      lastUpdate: "1 hour ago",
      coordinates: { lat: 40.6892, lng: -74.0445 },
      demographics: {
        children: 840,
        adults: 1680,
        elderly: 280
      },
      infrastructure: {
        waterSources: 2,
        healthFacilities: 1,
        schools: 3
      },
      weeklyTrend: [
        { day: "Mon", risk: 48, cases: 1 },
        { day: "Tue", risk: 52, cases: 2 },
        { day: "Wed", risk: 55, cases: 2 },
        { day: "Thu", risk: 53, cases: 2 },
        { day: "Fri", risk: 56, cases: 2 },
        { day: "Sat", risk: 55, cases: 2 },
        { day: "Sun", risk: 55, cases: 2 }
      ]
    }
  ];

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "Low": return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" };
      case "Medium": return { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" };
      case "High": return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" };
      default: return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };
    }
  };

  const getDeviceStatus = (online, total) => {
    const percentage = (online / total) * 100;
    if (percentage === 100) return { text: "All Online", color: "text-green-600" };
    if (percentage >= 80) return { text: "Mostly Online", color: "text-amber-600" };
    return { text: "Issues Detected", color: "text-red-600" };
  };

  const filteredVillages = villages.filter(village =>
    village.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    village.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStats = {
    totalPopulation: villages.reduce((sum, v) => sum + v.population, 0),
    totalCases: villages.reduce((sum, v) => sum + v.activeCases, 0),
    averageRisk: Math.round(villages.reduce((sum, v) => sum + v.riskPercentage, 0) / villages.length),
    devicesOnline: villages.reduce((sum, v) => sum + v.devicesOnline, 0),
    totalDevices: villages.reduce((sum, v) => sum + v.totalDevices, 0)
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Village Management</h1>
          <p className="text-muted-foreground">Monitor village health status and manage interventions</p>
        </div>
        <Button>
          <MapPin className="h-4 w-4 mr-2" />
          Add Village
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Population</p>
                <p className="text-2xl font-bold text-foreground">{totalStats.totalPopulation.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold text-foreground">{totalStats.totalCases}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Risk</p>
                <p className="text-2xl font-bold text-foreground">{totalStats.averageRisk}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Devices Online</p>
                <p className="text-2xl font-bold text-foreground">{totalStats.devicesOnline}/{totalStats.totalDevices}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Villages</p>
                <p className="text-2xl font-bold text-foreground">{villages.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search villages by name or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Villages List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredVillages.map((village) => {
            const riskColors = getRiskColor(village.riskLevel);
            const deviceStatus = getDeviceStatus(village.devicesOnline, village.totalDevices);
            
            return (
              <Card key={village.id} className={`card-interactive ${selectedVillage?.id === village.id ? 'border-primary bg-primary/5' : ''}`}>
                <CardContent className="p-6" onClick={() => setSelectedVillage(village)}>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Basic Info */}
                    <div className="md:col-span-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{village.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {village.district}
                          </p>
                        </div>
                        <Badge className={`${riskColors.bg} ${riskColors.text} ${riskColors.border} border`}>
                          {village.riskLevel}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Population:</span>
                          <span className="font-medium">{village.population.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Cases:</span>
                          <span className="font-medium">{village.activeCases}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Update:</span>
                          <span className="font-medium">{village.lastUpdate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Risk and Status */}
                    <div className="md:col-span-1">
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-foreground">Risk Level</span>
                          <span className="text-sm font-bold text-foreground">{village.riskPercentage}%</span>
                        </div>
                        <Progress value={village.riskPercentage} className="h-2" />
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Devices:</span>
                          <span className={`font-medium ${deviceStatus.color}`}>
                            {village.devicesOnline}/{village.totalDevices}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {deviceStatus.text}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-1 space-y-2">
                      <Button size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); setSelectedVillage(village); }}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      
                      {village.riskLevel === "High" && (
                        <Button size="sm" variant="destructive" className="w-full">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign Worker
                        </Button>
                      )}
                      
                      {village.riskLevel === "Medium" && (
                        <Button size="sm" variant="outline" className="w-full">
                          <Shield className="h-4 w-4 mr-2" />
                          Monitor
                        </Button>
                      )}
                      
                      {village.riskLevel === "Low" && (
                        <Button size="sm" variant="outline" className="w-full">
                          <Activity className="h-4 w-4 mr-2" />
                          Routine Check
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Village Detail Panel */}
        <div>
          {selectedVillage ? (
            <Card className="card-elevated sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  {selectedVillage.name}
                </CardTitle>
                <CardDescription>{selectedVillage.district}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Risk Gauge */}
                <div className="text-center">
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 ${getRiskColor(selectedVillage.riskLevel).bg.replace('100', '200')}`}>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedVillage.riskPercentage}%</div>
                      <div className="text-sm font-medium">{selectedVillage.riskLevel} Risk</div>
                    </div>
                  </div>
                </div>

                {/* Demographics */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Demographics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Children (0-14):</span>
                      <span className="font-medium">{selectedVillage.demographics.children}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Adults (15-64):</span>
                      <span className="font-medium">{selectedVillage.demographics.adults}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Elderly (65+):</span>
                      <span className="font-medium">{selectedVillage.demographics.elderly}</span>
                    </div>
                  </div>
                </div>

                {/* Infrastructure */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Infrastructure</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Water Sources:</span>
                      <span className="font-medium">{selectedVillage.infrastructure.waterSources}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Health Facilities:</span>
                      <span className="font-medium">{selectedVillage.infrastructure.healthFacilities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Schools:</span>
                      <span className="font-medium">{selectedVillage.infrastructure.schools}</span>
                    </div>
                  </div>
                </div>

                {/* Weekly Trend */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Weekly Risk Trend</h4>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedVillage.weeklyTrend}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="risk" 
                          stroke="hsl(var(--primary))" 
                          fill="hsl(var(--primary))" 
                          fillOpacity={0.3} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign Health Worker
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Mark as Safe
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="card-elevated">
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">Select a village to view detailed information</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminVillages;