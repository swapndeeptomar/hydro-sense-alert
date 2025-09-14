import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  MapPin, 
  Users, 
  Activity,
  TrendingUp,
  AlertTriangle,
  Search,
  Eye,
  UserPlus,
  Shield
} from "lucide-react";

const AdminAllVillages = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Sample village data (same as AdminVillages but expanded)
  const villages = [
    {
      id: 1,
      name: "Riverside Village",
      nameHindi: "नदी किनारे गांव",
      district: "North District",
      districtHindi: "उत्तर जिला",
      population: 2500,
      riskLevel: "Low",
      riskPercentage: 15,
      activeCases: 1,
      devicesOnline: 3,
      totalDevices: 3,
      lastUpdate: "2 hours ago",
      healthWorkers: 2,
      waterSources: 2
    },
    {
      id: 2,
      name: "Mountain View",
      nameHindi: "पहाड़ी दृश्य",
      district: "East District", 
      districtHindi: "पूर्व जिला",
      population: 1800,
      riskLevel: "Medium",
      riskPercentage: 45,
      activeCases: 3,
      devicesOnline: 2,
      totalDevices: 3,
      lastUpdate: "1 hour ago",
      healthWorkers: 1,
      waterSources: 1
    },
    {
      id: 3,
      name: "Lake Shore",
      nameHindi: "झील तट",
      district: "South District",
      districtHindi: "दक्षिण जिला",
      population: 3200,
      riskLevel: "High",
      riskPercentage: 78,
      activeCases: 8,
      devicesOnline: 4,
      totalDevices: 4,
      lastUpdate: "30 minutes ago",
      healthWorkers: 3,
      waterSources: 3
    },
    {
      id: 4,
      name: "Green Valley",
      nameHindi: "हरी घाटी",
      district: "West District",
      districtHindi: "पश्चिम जिला",
      population: 2100,
      riskLevel: "Low",
      riskPercentage: 22,
      activeCases: 0,
      devicesOnline: 2,
      totalDevices: 2,
      lastUpdate: "3 hours ago",
      healthWorkers: 1,
      waterSources: 2
    },
    {
      id: 5,
      name: "Palm Grove",
      nameHindi: "ताड़ का बगीचा",
      district: "Central District",
      districtHindi: "केंद्रीय जिला",
      population: 2800,
      riskLevel: "Medium",
      riskPercentage: 55,
      activeCases: 2,
      devicesOnline: 3,
      totalDevices: 3,
      lastUpdate: "1 hour ago",
      healthWorkers: 2,
      waterSources: 2
    },
    {
      id: 6,
      name: "Sunset Hills",
      nameHindi: "सूर्यास्त पहाड़ी",
      district: "North District",
      districtHindi: "उत्तर जिला",
      population: 1900,
      riskLevel: "Low",
      riskPercentage: 18,
      activeCases: 0,
      devicesOnline: 2,
      totalDevices: 2,
      lastUpdate: "4 hours ago",
      healthWorkers: 1,
      waterSources: 1
    }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low": return { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" };
      case "Medium": return { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" };
      case "High": return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" };
      default: return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };
    }
  };

  const getActionButton = (village: typeof villages[0]) => {
    if (village.riskLevel === "High") {
      return (
        <Button size="sm" variant="destructive" onClick={() => navigate(`/admin/villages/${village.id}`)}>
          <UserPlus className="h-4 w-4 mr-1" />
          Assign Worker
        </Button>
      );
    } else if (village.riskLevel === "Medium") {
      return (
        <Button size="sm" variant="outline" onClick={() => navigate(`/admin/villages/${village.id}`)}>
          <Shield className="h-4 w-4 mr-1" />
          Monitor
        </Button>
      );
    } else {
      return (
        <Button size="sm" variant="outline" onClick={() => navigate(`/admin/villages/${village.id}`)}>
          <Activity className="h-4 w-4 mr-1" />
          Routine Check
        </Button>
      );
    }
  };

  const filteredVillages = villages.filter(village =>
    village.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    village.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    village.nameHindi.includes(searchTerm) ||
    village.districtHindi.includes(searchTerm)
  );

  const totalStats = {
    totalPopulation: villages.reduce((sum, v) => sum + v.population, 0),
    totalCases: villages.reduce((sum, v) => sum + v.activeCases, 0),
    averageRisk: Math.round(villages.reduce((sum, v) => sum + v.riskPercentage, 0) / villages.length),
    highRiskVillages: villages.filter(v => v.riskLevel === "High").length,
    devicesOnline: villages.reduce((sum, v) => sum + v.devicesOnline, 0),
    totalDevices: villages.reduce((sum, v) => sum + v.totalDevices, 0)
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            All Villages Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            सभी गांवों का डैशबोर्ड
          </p>
          <p className="text-muted-foreground">
            Complete overview of all village health and risk status
            <br />
            <span className="text-sm">सभी गांवों के स्वास्थ्य और जोखिम स्थिति का पूर्ण अवलोकन</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'}
            onClick={() => setViewMode('table')}
          >
            Table View
          </Button>
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
          <Button onClick={() => navigate('/admin/villages')}>
            <Eye className="h-4 w-4 mr-2" />
            Detailed View
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Villages</p>
                <p className="text-xs text-muted-foreground/80">कुल गांव</p>
                <p className="text-xl font-bold text-foreground">{villages.length}</p>
              </div>
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">High Risk</p>
                <p className="text-xs text-muted-foreground/80">उच्च जोखिम</p>
                <p className="text-xl font-bold text-red-600">{totalStats.highRiskVillages}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Population</p>
                <p className="text-xs text-muted-foreground/80">कुल जनसंख्या</p>
                <p className="text-xl font-bold text-foreground">{totalStats.totalPopulation.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Active Cases</p>
                <p className="text-xs text-muted-foreground/80">सक्रिय मामले</p>
                <p className="text-xl font-bold text-red-600">{totalStats.totalCases}</p>
              </div>
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Avg Risk</p>
                <p className="text-xs text-muted-foreground/80">औसत जोखिम</p>
                <p className="text-xl font-bold text-foreground">{totalStats.averageRisk}%</p>
              </div>
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Devices</p>
                <p className="text-xs text-muted-foreground/80">उपकरण</p>
                <p className="text-xl font-bold text-foreground">{totalStats.devicesOnline}/{totalStats.totalDevices}</p>
              </div>
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="card-elevated">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search villages by name, district... (गांव का नाम, जिला से खोजें...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Villages Display */}
      {viewMode === 'table' ? (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              Villages Overview | गांवों का अवलोकन
            </CardTitle>
            <CardDescription>
              Complete status of all registered villages
              <br />
              सभी पंजीकृत गांवों की पूर्ण स्थिति
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Village | गांव</TableHead>
                    <TableHead>District | जिला</TableHead>
                    <TableHead>Population | जनसंख्या</TableHead>
                    <TableHead>Risk Level | जोखिम स्तर</TableHead>
                    <TableHead>Active Cases | सक्रिय मामले</TableHead>
                    <TableHead>Devices | उपकरण</TableHead>
                    <TableHead>Actions | कार्य</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVillages.map((village) => {
                    const riskColors = getRiskColor(village.riskLevel);
                    
                    return (
                      <TableRow key={village.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <div className="font-medium">{village.name}</div>
                            <div className="text-sm text-muted-foreground">{village.nameHindi}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{village.district}</div>
                            <div className="text-xs text-muted-foreground">{village.districtHindi}</div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {village.population.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={`${riskColors.bg} ${riskColors.text} ${riskColors.border} border text-xs`}>
                              {village.riskLevel}
                            </Badge>
                            <div className="flex-1 min-w-0">
                              <Progress value={village.riskPercentage} className="h-2" />
                              <div className="text-xs text-muted-foreground mt-1">{village.riskPercentage}%</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${village.activeCases > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {village.activeCases}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`text-sm font-medium ${village.devicesOnline === village.totalDevices ? 'text-green-600' : 'text-amber-600'}`}>
                            {village.devicesOnline}/{village.totalDevices}
                          </span>
                        </TableCell>
                        <TableCell>
                          {getActionButton(village)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVillages.map((village) => {
            const riskColors = getRiskColor(village.riskLevel);
            
            return (
              <Card key={village.id} className="card-interactive">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{village.name}</h3>
                      <p className="text-sm text-muted-foreground">{village.nameHindi}</p>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {village.district} | {village.districtHindi}
                      </p>
                    </div>
                    <Badge className={`${riskColors.bg} ${riskColors.text} ${riskColors.border} border`}>
                      {village.riskLevel}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Population:</span>
                      <span className="font-medium">{village.population.toLocaleString()}</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-muted-foreground">Risk Level:</span>
                        <span className="text-sm font-bold">{village.riskPercentage}%</span>
                      </div>
                      <Progress value={village.riskPercentage} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active Cases:</span>
                      <span className={`font-medium ${village.activeCases > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {village.activeCases}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Devices:</span>
                      <span className={`font-medium ${village.devicesOnline === village.totalDevices ? 'text-green-600' : 'text-amber-600'}`}>
                        {village.devicesOnline}/{village.totalDevices}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    {getActionButton(village)}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminAllVillages;