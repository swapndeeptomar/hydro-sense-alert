import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Upload, 
  Thermometer, 
  Droplets, 
  AlertCircle, 
  CheckCircle,
  Users,
  Calendar,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportSymptoms = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patientCount: "",
    symptoms: [],
    severity: "",
    duration: "",
    additionalInfo: "",
    contactName: "",
    contactPhone: "",
    location: "",
    photo: null
  });

  const symptoms = [
    { id: "fever", label: "Fever", icon: Thermometer },
    { id: "diarrhea", label: "Diarrhea", icon: Droplets },
    { id: "vomiting", label: "Vomiting", icon: AlertCircle },
    { id: "nausea", label: "Nausea", icon: AlertCircle },
    { id: "headache", label: "Headache", icon: AlertCircle },
    { id: "fatigue", label: "Fatigue", icon: AlertCircle },
    { id: "stomach_pain", label: "Stomach Pain", icon: AlertCircle },
    { id: "dehydration", label: "Dehydration", icon: Droplets },
  ];

  const handleSymptomChange = (symptomId) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter(s => s !== symptomId)
        : [...prev.symptoms, symptomId]
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In real app, this would send data to backend
    toast({
      title: "Report Submitted Successfully",
      description: "Health authorities have been notified. You will receive updates via SMS.",
    });
    
    setTimeout(() => {
      navigate("/citizen/dashboard");
    }, 2000);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.patientCount && formData.symptoms.length > 0;
      case 2:
        return formData.severity && formData.duration;
      case 3:
        return formData.contactName && formData.contactPhone;
      default:
        return false;
    }
  };

  const progress = (currentStep / 3) * 100;

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
                <h1 className="text-2xl font-bold text-foreground">Report Symptoms</h1>
                <p className="text-muted-foreground">Help protect your community by reporting health concerns</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Emergency Hotline</div>
              <div className="font-semibold text-foreground">1-800-AQUA-911</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Step {currentStep} of 3</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="card-elevated">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Tell us about the symptoms and how many people are affected
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Patient Count */}
                <div>
                  <Label htmlFor="patientCount" className="text-base font-medium">
                    How many people are experiencing symptoms? *
                  </Label>
                  <Input
                    id="patientCount"
                    type="number"
                    min="1"
                    placeholder="Enter number of affected people"
                    value={formData.patientCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, patientCount: e.target.value }))}
                    className="mt-2"
                  />
                </div>

                {/* Symptoms Selection */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Which symptoms are being experienced? * (Select all that apply)
                  </Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {symptoms.map((symptom) => (
                      <Card
                        key={symptom.id}
                        className={`cursor-pointer transition-all ${
                          formData.symptoms.includes(symptom.id)
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => handleSymptomChange(symptom.id)}
                      >
                        <CardContent className="p-4 flex items-center space-x-3">
                          <Checkbox 
                            checked={formData.symptoms.includes(symptom.id)}
                            onChange={() => handleSymptomChange(symptom.id)}
                          />
                          <symptom.icon className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">{symptom.label}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location" className="text-base font-medium">
                    Specific location/area (Optional)
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Village center, near water source, residential area"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </>
          )}

          {/* Step 2: Symptom Details */}
          {currentStep === 2 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                  Symptom Details
                </CardTitle>
                <CardDescription>
                  Provide more details about the severity and duration of symptoms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Severity */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    How severe are the symptoms? *
                  </Label>
                  <RadioGroup
                    value={formData.severity}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-secondary/50">
                      <RadioGroupItem value="mild" id="mild" />
                      <Label htmlFor="mild" className="flex-1 cursor-pointer">
                        <div className="font-medium text-green-700">Mild</div>
                        <div className="text-sm text-muted-foreground">
                          Manageable symptoms, daily activities mostly unaffected
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-secondary/50">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate" className="flex-1 cursor-pointer">
                        <div className="font-medium text-amber-700">Moderate</div>
                        <div className="text-sm text-muted-foreground">
                          Noticeable symptoms, some difficulty with daily activities
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-secondary/50">
                      <RadioGroupItem value="severe" id="severe" />
                      <Label htmlFor="severe" className="flex-1 cursor-pointer">
                        <div className="font-medium text-red-700">Severe</div>
                        <div className="text-sm text-muted-foreground">
                          Debilitating symptoms, unable to perform daily activities
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Duration */}
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    How long have the symptoms been present? *
                  </Label>
                  <RadioGroup
                    value={formData.duration}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="less_than_day" id="less_than_day" />
                      <Label htmlFor="less_than_day">Less than 24 hours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1_3_days" id="1_3_days" />
                      <Label htmlFor="1_3_days">1-3 days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4_7_days" id="4_7_days" />
                      <Label htmlFor="4_7_days">4-7 days</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="more_than_week" id="more_than_week" />
                      <Label htmlFor="more_than_week">More than a week</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Additional Information */}
                <div>
                  <Label htmlFor="additionalInfo" className="text-base font-medium">
                    Additional Information (Optional)
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any other details you think might be helpful..."
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    className="mt-2"
                    rows={4}
                  />
                </div>
              </CardContent>
            </>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Your contact details for follow-up and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your information will be kept confidential and used only for health monitoring and emergency response.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName" className="text-base font-medium">
                      Full Name *
                    </Label>
                    <Input
                      id="contactName"
                      placeholder="Your full name"
                      value={formData.contactName}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone" className="text-base font-medium">
                      Phone Number *
                    </Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="Your phone number"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <Label className="text-base font-medium mb-2 block">
                    Upload Photo (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload a photo if relevant (symptoms, water source, etc.)
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                  </div>
                </div>

                {/* Privacy Notice */}
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    By submitting this report, you consent to sharing this information with health authorities for disease prevention and community protection.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? "bg-primary" : "bg-border"
                  }`}
                />
              ))}
            </div>

            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className="bg-success hover:bg-success/90"
              >
                Submit Report
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportSymptoms;