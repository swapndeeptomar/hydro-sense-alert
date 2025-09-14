import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, AlertTriangle, Users, TrendingUp, Shield, Eye, Bell } from "lucide-react";
import heroImage from "@/assets/hero-water-monitoring.jpg";
import preventionImage from "@/assets/prevention-infographic.jpg";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { label: "Villages Protected", value: "150+", icon: Shield },
    { label: "Early Warnings Sent", value: "2,300+", icon: Bell },
    { label: "Cases Prevented", value: "890+", icon: TrendingUp },
    { label: "Citizens Engaged", value: "45K+", icon: Users },
  ];

  const aboutCards = [
    {
      title: "Cholera",
      description: "Acute diarrheal infection caused by ingesting contaminated water or food",
      severity: "High",
      symptoms: ["Severe diarrhea", "Vomiting", "Dehydration"]
    },
    {
      title: "Typhoid",
      description: "Bacterial infection caused by Salmonella typhi through contaminated water",
      severity: "High", 
      symptoms: ["High fever", "Headache", "Stomach pain"]
    },
    {
      title: "Hepatitis A",
      description: "Viral liver infection spread through contaminated water and poor sanitation",
      severity: "Medium",
      symptoms: ["Fatigue", "Nausea", "Yellowing of skin"]
    },
    {
      title: "Diarrheal Diseases",
      description: "Various infections causing loose, watery stools from unsafe water",
      severity: "Medium",
      symptoms: ["Loose stools", "Cramping", "Dehydration"]
    }
  ];

  const preventionTips = {
    dos: [
      "Boil water for at least 1 minute before drinking",
      "Use water purification tablets or filters",
      "Wash hands frequently with soap",
      "Eat freshly cooked, hot food",
      "Store water in clean, covered containers"
    ],
    donts: [
      "Drink untreated water from wells or rivers", 
      "Eat raw or undercooked seafood",
      "Use ice made from unsafe water",
      "Eat food from street vendors",
      "Swim in contaminated water sources"
    ]
  };

  const workflowSteps = [
    {
      step: 1,
      title: "Collect",
      description: "IoT sensors monitor water quality in real-time across villages",
      icon: Droplets
    },
    {
      step: 2, 
      title: "Predict",
      description: "AI analyzes data patterns to predict disease outbreak risks",
      icon: Eye
    },
    {
      step: 3,
      title: "Prevent", 
      description: "Early warnings sent to authorities and citizens for prevention",
      icon: AlertTriangle
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Droplets className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">AquaGuard</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#about" className="nav-link text-foreground hover:text-primary">About</a>
            <a href="#prevention" className="nav-link text-foreground hover:text-primary">Prevention</a>
            <a href="#system" className="nav-link text-foreground hover:text-primary">How It Works</a>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => navigate('/citizen')}>
              Citizen Portal
            </Button>
            <Button onClick={() => navigate('/admin')}>
              Admin Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            🚀 AI-Powered Disease Prevention
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Fighting Waterborne 
            <br />
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Diseases with Data & AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Protecting communities through real-time water quality monitoring, 
            AI-powered risk prediction, and early warning systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
              onClick={() => navigate('/citizen')}
            >
              Access Citizen Portal
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              onClick={() => navigate('/admin')}
            >
              Admin Dashboard
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Understanding Waterborne Diseases
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about the most common waterborne diseases and their impact on communities worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutCards.map((disease, index) => (
              <Card key={index} className="card-interactive">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-foreground">{disease.title}</h3>
                    <Badge 
                      variant={disease.severity === 'High' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {disease.severity}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {disease.description}
                  </p>
                  <div>
                    <h4 className="font-medium text-foreground mb-2 text-sm">Symptoms:</h4>
                    <ul className="space-y-1">
                      {disease.symptoms.map((symptom, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section id="prevention" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Prevention Guidelines
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple yet effective practices to protect yourself and your community from waterborne diseases.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Do's */}
            <Card className="card-elevated">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-success">Do's</h3>
                </div>
                <ul className="space-y-4">
                  {preventionTips.dos.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Don'ts */}
            <Card className="card-elevated">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-danger rounded-full flex items-center justify-center mr-4">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-danger">Don'ts</h3>
                </div>
                <ul className="space-y-4">
                  {preventionTips.donts.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-danger rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Workflow */}
      <section id="system" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How Our System Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A three-step approach to preventing waterborne disease outbreaks through technology and data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-elevated">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-accent text-white border-0">
                    {step.step}
                  </Badge>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Droplets className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">AquaGuard</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Protecting communities from waterborne diseases through AI-powered early warning systems.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-smooth">About</a></li>
                <li><a href="#prevention" className="text-gray-300 hover:text-white transition-smooth">Prevention</a></li>
                <li><a href="#system" className="text-gray-300 hover:text-white transition-smooth">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Portals</h4>
              <ul className="space-y-2">
                <li><a href="/citizen" className="text-gray-300 hover:text-white transition-smooth">Citizen Portal</a></li>
                <li><a href="/admin" className="text-gray-300 hover:text-white transition-smooth">Admin Dashboard</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <p>Emergency Hotline: 1-800-AQUA-911</p>
                <p>Email: info@aquaguard.org</p>
                <p>24/7 Monitoring Center</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2024 AquaGuard. All rights reserved. Built for community health and safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;