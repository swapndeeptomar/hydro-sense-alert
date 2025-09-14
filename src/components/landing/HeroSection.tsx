import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Eye, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-water-monitoring.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const workflowSteps = [
    {
      step: 1,
      title: "Collect",
      titleHindi: "एकत्र करें",
      description: "IoT sensors monitor water quality in real-time across villages",
      descriptionHindi: "आईओटी सेंसर गांवों में वास्तविक समय में पानी की गुणवत्ता की निगरानी करते हैं",
      icon: Droplets
    },
    {
      step: 2, 
      title: "Predict",
      titleHindi: "भविष्यवाणी करें",
      description: "AI analyzes data patterns to predict disease outbreak risks",
      descriptionHindi: "एआई रोग प्रकोप के जोखिमों की भविष्यवाणी के लिए डेटा पैटर्न का विश्लेषण करता है",
      icon: Eye
    },
    {
      step: 3,
      title: "Prevent", 
      titleHindi: "रोकें",
      description: "Early warnings sent to authorities and citizens for prevention",
      descriptionHindi: "रोकथाम के लिए अधिकारियों और नागरिकों को शीघ्र चेतावनी भेजी जाती है",
      icon: AlertTriangle
    }
  ];

  return (
    <section className="hero-section pt-20 relative overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-75"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${scrollY * 0.5}px) scale(1.1)`
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-accent/90 to-primary-dark/95" />
      
      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-6 text-center pt-8 pb-20">
        {/* Animated Badge */}
        <Badge 
          variant="secondary" 
          className="mb-8 bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/25 transition-all duration-300 transform hover:scale-105 animate-fade-in"
        >
          <div className="flex flex-col items-center space-y-1 py-2 px-4">
            <span className="text-base font-semibold">🚀 AI-Powered Disease Prevention</span>
            <span className="text-sm opacity-90">🚀 एआई-संचालित रोग रोकथाम</span>
          </div>
        </Badge>
        
        {/* Main Headlines with Staggered Animation */}
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="block mb-2">Fighting Waterborne</span>
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Diseases with Data & AI
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white/90 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            डेटा और एआई के साथ जलजनित रोगों से लड़ाई
          </h2>
        </div>
        
        {/* Enhanced Description */}
        <div className="space-y-4 mb-12 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed">
            This platform uses AI models to analyze water quality and health reports, predict risks, and send early alerts to communities through real-time monitoring and intelligent prediction systems.
          </p>
          <p className="text-lg md:text-xl text-white/85 leading-relaxed">
            यह प्लेटफॉर्म पानी की गुणवत्ता और स्वास्थ्य रिपोर्ट का विश्लेषण करने, जोखिमों की भविष्यवाणी करने और समुदायों को शीघ्र चेतावनी भेजने के लिए एआई मॉडल का उपयोग करता है।
          </p>
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <Button 
            size="lg" 
            className="group bg-white text-primary hover:bg-white/95 text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            onClick={() => navigate('/citizen')}
          >
            <div className="text-center">
              <div className="font-bold text-xl mb-1">Access Citizen Portal</div>
              <div className="text-sm opacity-80">नागरिक पोर्टल एक्सेस करें</div>
            </div>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="group bg-white text-primary hover:bg-white/95 text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            onClick={() => navigate('/admin')}
          >
            <div className="text-center">
              <div className="font-bold text-xl mb-1">Admin Dashboard</div>
              <div className="text-sm opacity-80">प्रशासक डैशबोर्ड</div>
            </div>
          </Button>
        </div>

        {/* Enhanced Process Animation */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16 animate-fade-in" style={{ animationDelay: "1s" }}>
          {workflowSteps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center group">
              <div className="relative">
                <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <Badge className="absolute -top-2 -right-2 bg-accent text-white border-0 group-hover:scale-110 transition-all duration-300">
                  {step.step}
                </Badge>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left max-w-xs">
                <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                <h4 className="text-lg font-semibold text-white/80 mb-2">{step.titleHindi}</h4>
                <p className="text-sm text-white/90 leading-relaxed">{step.description}</p>
                <p className="text-xs text-white/75 leading-relaxed mt-1">{step.descriptionHindi}</p>
              </div>
              
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:block w-8 h-0.5 bg-white/50 mx-8 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;