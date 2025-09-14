import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  Search,
  Thermometer,
  Droplets,
  Pill,
  Heart,
  Shield,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const TreatmentDoctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // Sample treatment advice
  const treatmentAdvice = [
    {
      symptom: "Diarrhea",
      icon: Droplets,
      severity: "Common",
      immediateSteps: [
        "Drink plenty of fluids (ORS solution preferred)",
        "Eat bland foods like rice, bananas, toast",
        "Avoid dairy products and fatty foods",
        "Rest and monitor symptoms"
      ],
      whenToSeekHelp: [
        "Symptoms persist for more than 3 days",
        "Signs of severe dehydration",
        "Blood in stool",
        "High fever (above 102°F)"
      ],
      prevention: [
        "Boil drinking water for at least 1 minute",
        "Wash hands frequently with soap",
        "Eat freshly cooked, hot food",
        "Avoid raw or undercooked foods"
      ]
    },
    {
      symptom: "Fever",
      icon: Thermometer,
      severity: "Monitor",
      immediateSteps: [
        "Take temperature regularly",
        "Drink plenty of fluids",
        "Rest in a cool, comfortable place",
        "Use fever reducers if recommended"
      ],
      whenToSeekHelp: [
        "Temperature above 104°F (40°C)",
        "Fever lasts more than 3 days",
        "Difficulty breathing",
        "Severe headache or neck stiffness"
      ],
      prevention: [
        "Maintain good hygiene",
        "Avoid crowded places when possible",
        "Drink safe, treated water",
        "Get adequate rest and nutrition"
      ]
    },
    {
      symptom: "Vomiting",
      icon: AlertCircle,
      severity: "Concerning",
      immediateSteps: [
        "Stop solid foods temporarily",
        "Sip small amounts of clear fluids",
        "Rest and avoid movement",
        "Try ice chips or popsicles"
      ],
      whenToSeekHelp: [
        "Unable to keep fluids down for 24 hours",
        "Signs of dehydration",
        "Blood in vomit",
        "Severe abdominal pain"
      ],
      prevention: [
        "Eat small, frequent meals",
        "Avoid contaminated food and water",
        "Practice proper food hygiene",
        "Wash hands before eating"
      ]
    }
  ];

  // Sample doctors/clinics data
  const healthcareFacilities = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      type: "Doctor",
      specialty: "General Medicine",
      facility: "Riverside Health Clinic",
      distance: "2.1 km",
      rating: 4.8,
      availability: "Available Today",
      phone: "+1-555-0123",
      address: "123 Health Street, Riverside Village",
      languages: ["English", "Local Language"],
      experience: "15 years",
      status: "open"
    },
    {
      id: 2,
      name: "Community Health Center",
      type: "Clinic",
      specialty: "Primary Care",
      facility: "Government Health Center",
      distance: "1.5 km",
      rating: 4.5,
      availability: "24/7 Emergency",
      phone: "+1-555-0124",
      address: "45 Medical Plaza, Central Area",
      languages: ["English", "Local Language", "Regional"],
      experience: "Established 1995",
      status: "open"
    },
    {
      id: 3,
      name: "Dr. Ahmed Rahman",
      type: "Doctor",
      specialty: "Infectious Diseases",
      facility: "Waterborne Disease Specialist",
      distance: "3.7 km",
      rating: 4.9,
      availability: "By Appointment",
      phone: "+1-555-0125",
      address: "78 Specialist Avenue, Medical District",
      languages: ["English", "Arabic", "Local Language"],
      experience: "12 years",
      status: "open"
    },
    {
      id: 4,
      name: "Mobile Health Unit",
      type: "Mobile Clinic",
      specialty: "Community Outreach",
      facility: "Village Health Program",
      distance: "0.8 km",
      rating: 4.3,
      availability: "Weekdays 9AM-5PM",
      phone: "+1-555-0126",
      address: "Village Square (Moves daily)",
      languages: ["Local Language", "English"],
      experience: "5 years",
      status: "open"
    }
  ];

  const emergencyContacts = [
    {
      title: "National Emergency",
      number: "911",
      description: "Life-threatening emergencies"
    },
    {
      title: "Disease Control Hotline",
      number: "1-800-CDC-INFO",
      description: "Disease outbreak information"
    },
    {
      title: "Poison Control",
      number: "1-800-222-1222",
      description: "Poisoning emergencies"
    },
    {
      title: "Local Health Dept",
      number: "+1-555-HEALTH",
      description: "Local health concerns"
    }
  ];

  const filteredFacilities = healthcareFacilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.facility.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "all" || 
                           facility.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    
    return matchesSearch && matchesSpecialty;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Common": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Monitor": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Concerning": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/citizen/dashboard")}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Treatment & Healthcare</h1>
                <p className="text-muted-foreground">Find treatment advice and nearby healthcare providers</p>
              </div>
            </div>
            
            <Button variant="destructive" size="lg">
              <Phone className="h-4 w-4 mr-2" />
              Emergency: 911
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="treatment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="treatment">Treatment Advice</TabsTrigger>
            <TabsTrigger value="doctors">Find Healthcare</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
          </TabsList>

          {/* Treatment Advice Tab */}
          <TabsContent value="treatment" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Pill className="h-5 w-5 mr-2 text-primary" />
                  Immediate Treatment Guidelines
                </CardTitle>
                <CardDescription>
                  First aid and home treatment for common waterborne disease symptoms
                </CardDescription>
              </CardHeader>
            </Card>

            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>Important:</strong> This information is for guidance only. Always consult healthcare professionals for serious symptoms or if conditions worsen.
              </AlertDescription>
            </Alert>

            <div className="grid gap-6">
              {treatmentAdvice.map((advice, index) => (
                <Card key={index} className="card-elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <advice.icon className="h-6 w-6 mr-3 text-primary" />
                        {advice.symptom}
                      </CardTitle>
                      <Badge className={`border ${getSeverityColor(advice.severity)}`}>
                        {advice.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Immediate Steps */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Immediate Steps
                        </h4>
                        <ul className="space-y-2">
                          {advice.immediateSteps.map((step, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* When to Seek Help */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-red-600" />
                          When to Seek Help
                        </h4>
                        <ul className="space-y-2">
                          {advice.whenToSeekHelp.map((warning, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Prevention */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-blue-600" />
                          Prevention
                        </h4>
                        <ul className="space-y-2">
                          {advice.prevention.map((tip, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Find Healthcare Tab */}
          <TabsContent value="doctors" className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-primary" />
                  Nearby Healthcare Providers
                </CardTitle>
                <CardDescription>
                  Find doctors, clinics, and health facilities in your area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, specialty, or facility..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="all">All Specialties</option>
                    <option value="general">General Medicine</option>
                    <option value="infectious">Infectious Diseases</option>
                    <option value="primary">Primary Care</option>
                    <option value="community">Community Health</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Healthcare Facilities List */}
            <div className="grid gap-4">
              {filteredFacilities.map((facility) => (
                <Card key={facility.id} className="card-interactive">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Basic Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-foreground">{facility.name}</h3>
                            <p className="text-muted-foreground">{facility.facility}</p>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {facility.specialty}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="font-medium">{facility.rating}</span>
                            </div>
                            <Badge 
                              variant={facility.status === "open" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {facility.availability}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            {facility.address} • {facility.distance}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            {facility.experience}
                          </div>
                          <div className="text-muted-foreground">
                            <strong>Languages:</strong> {facility.languages.join(", ")}
                          </div>
                        </div>
                      </div>

                      {/* Contact Actions */}
                      <div className="space-y-3">
                        <Button className="w-full" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call {facility.phone}
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        {facility.type === "Doctor" && (
                          <Button variant="outline" className="w-full" size="sm">
                            <Clock className="h-4 w-4 mr-2" />
                            Book Appointment
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFacilities.length === 0 && (
              <Card className="text-center py-8">
                <CardContent>
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No healthcare providers found matching your search.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Emergency Contacts Tab */}
          <TabsContent value="emergency" className="space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <Phone className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>In case of life-threatening emergency, call 911 immediately.</strong> For non-urgent health concerns, use the contacts below.
              </AlertDescription>
            </Alert>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Emergency & Health Contacts
                </CardTitle>
                <CardDescription>
                  Important phone numbers for health emergencies and information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {emergencyContacts.map((contact, index) => (
                    <Card key={index} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{contact.title}</h4>
                          <Badge variant="destructive" className="font-mono">
                            {contact.number}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {contact.description}
                        </p>
                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Emergency Info */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Emergency Preparedness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Have Ready:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        Emergency contact list
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        Medical history and medications
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        First aid kit
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                        Clean water and basic supplies
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">When to Call:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                        Difficulty breathing
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                        Severe dehydration
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                        High fever with confusion
                      </li>
                      <li className="flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 text-red-600 mt-0.5" />
                        Blood in vomit or stool
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TreatmentDoctors;