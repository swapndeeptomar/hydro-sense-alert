import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Droplets, ArrowLeft } from "lucide-react";

const CitizenSignIn = () => {
  const navigate = useNavigate();
  const [selectedVillage, setSelectedVillage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample village data
  const villages = [
    { id: "1", name: "Riverside Village", district: "North District", population: 2500, riskLevel: "Low" },
    { id: "2", name: "Mountain View", district: "East District", population: 1800, riskLevel: "Medium" },
    { id: "3", name: "Lake Shore", district: "South District", population: 3200, riskLevel: "High" },
    { id: "4", name: "Green Valley", district: "West District", population: 2100, riskLevel: "Low" },
    { id: "5", name: "Palm Grove", district: "Central District", population: 2800, riskLevel: "Medium" },
    { id: "6", name: "Cedar Heights", district: "North District", population: 1950, riskLevel: "Low" },
    { id: "7", name: "Willow Creek", district: "East District", population: 2650, riskLevel: "High" },
    { id: "8", name: "Sunset Hills", district: "South District", population: 2200, riskLevel: "Medium" },
  ];

  const filteredVillages = villages.filter(village =>
    village.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    village.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVillageSelect = (villageId: string) => {
    setSelectedVillage(villageId);
  };

  const handleContinue = () => {
    if (selectedVillage) {
      navigate("/citizen/dashboard", { state: { villageId: selectedVillage } });
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "High": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 md:top-8 md:left-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Droplets className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-foreground">HydroSense</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Citizen Portal</h1>
          <p className="text-xl text-muted-foreground">
            Select your village to access local water quality information and health alerts
          </p>
        </div>

        <Card className="card-elevated">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Choose Your Village</CardTitle>
            <CardDescription>
              Find and select your village to access personalized water quality data and health information
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Label htmlFor="search" className="text-sm font-medium text-foreground mb-2 block">
                Search Villages
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search by village name or district..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Village Selection */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Available Villages ({filteredVillages.length})
              </Label>
              
              <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredVillages.map((village) => (
                  <Card
                    key={village.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedVillage === village.id
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleVillageSelect(village.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{village.name}</h3>
                          <div className="flex items-center text-muted-foreground text-sm mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {village.district}
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(village.riskLevel)}`}>
                          {village.riskLevel} Risk
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Population: {village.population.toLocaleString()}
                      </div>
                      
                      {selectedVillage === village.id && (
                        <div className="mt-3 pt-3 border-t border-primary/20">
                          <div className="flex items-center text-primary text-sm font-medium">
                            <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                            Selected Village
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredVillages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>No villages found matching your search.</p>
                  <p className="text-sm">Try adjusting your search terms.</p>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <div className="pt-4 border-t border-border">
              <Button
                onClick={handleContinue}
                disabled={!selectedVillage}
                size="lg"
                className="w-full"
              >
                Continue to Dashboard
              </Button>
              
              {selectedVillage && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Accessing data for {villages.find(v => v.id === selectedVillage)?.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="card-elevated">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Real-time Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Get live water quality data from sensors in your area
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Health Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Receive early warnings about potential health risks
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Local Support</h3>
              <p className="text-sm text-muted-foreground">
                Find nearby healthcare facilities and treatment options
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CitizenSignIn;