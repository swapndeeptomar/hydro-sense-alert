import { Droplets, Heart, Shield, Globe } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "About", labelHindi: "परिचय", href: "#about" },
    { label: "Prevention", labelHindi: "रोकथाम", href: "#prevention" },
    { label: "How It Works", labelHindi: "कैसे काम करता है", href: "#system" }
  ];

  const portals = [
    { label: "Citizen Portal", labelHindi: "नागरिक पोर्टल", href: "/citizen" },
    { label: "Admin Dashboard", labelHindi: "प्रशासक डैशबोर्ड", href: "/admin" }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0s", animationDuration: "6s" }} />
        <div className="absolute top-20 right-20 w-24 h-24 bg-accent rounded-full animate-pulse" style={{ animationDelay: "2s", animationDuration: "8s" }} />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: "4s", animationDuration: "10s" }} />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Droplets className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">HydroSense</span>
                <div className="text-sm text-gray-300">हाइड्रोसेंस</div>
              </div>
            </div>
            
            <div className="space-y-4 max-w-md">
              <p className="text-gray-300 leading-relaxed text-lg">
                Protecting communities from waterborne diseases through AI-powered early warning systems.
              </p>
              <p className="text-gray-400 leading-relaxed">
                एआई-संचालित पूर्व चेतावनी प्रणालियों के माध्यम से जलजनित रोगों से समुदायों की रक्षा करना।
              </p>
            </div>

            {/* Mission Statement */}
            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center mb-3">
                <Heart className="h-5 w-5 text-primary mr-2" />
                <span className="font-semibold">Our Mission • हमारा मिशन</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                To build a world where no community suffers from preventable waterborne diseases through the power of data, AI, and early intervention.
              </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary" />
              <div>
                <div>Quick Links</div>
                <div className="text-sm text-gray-300 font-normal">त्वरित लिंक</div>
              </div>
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(link.href)}
                    className="group text-left transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {link.label}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      {link.labelHindi}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Portals */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-accent" />
              <div>
                <div>Portals</div>
                <div className="text-sm text-gray-300 font-normal">पोर्टल</div>
              </div>
            </h4>
            <ul className="space-y-4">
              {portals.map((portal, index) => (
                <li key={index}>
                  <button 
                    onClick={() => scrollToSection(portal.href)}
                    className="group text-left transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {portal.label}
                    </div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                      {portal.labelHindi}
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <h5 className="font-semibold mb-3 text-primary">
                Emergency Contact • आपातकालीन संपर्क
              </h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📞 Hotline: 1-800-AQUA-911</p>
                <p>📧 info@HydroSense.org</p>
                <p>🕒 24/7 Monitoring Center</p>
                <p className="text-xs text-gray-400">24/7 निगरानी केंद्र</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300">
                &copy; 2024 HydroSense. All rights reserved. Built for community health and safety.
              </p>
              <p className="text-sm text-gray-400 mt-1">
                समुदायिक स्वास्थ्य और सुरक्षा के लिए निर्मित। सभी अधिकार सुरक्षित।
              </p>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Shield className="w-4 h-4 text-success" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Heart className="w-4 h-4 text-primary" />
                <span>Trusted</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Globe className="w-4 h-4 text-accent" />
                <span>Global</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;