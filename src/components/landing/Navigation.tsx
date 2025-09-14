import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplets, Menu, X } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { 
      label: "About", 
      labelHindi: "परिचय", 
      href: "#about" 
    },
    { 
      label: "Prevention", 
      labelHindi: "रोकथाम", 
      href: "#prevention" 
    },
    { 
      label: "How It Works", 
      labelHindi: "कैसे काम करता है", 
      href: "#system" 
    }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-xl shadow-soft border-b border-border/50' 
        : 'bg-background/95 backdrop-blur-xl'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-elevated transition-all duration-300 group-hover:scale-110">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                HydroSense
              </span>
              <div className="text-xs text-muted-foreground">हाइड्रोसेंस</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.href)}
                className="group text-center transition-all duration-300 hover:scale-105"
              >
                <div className="nav-link text-foreground hover:text-primary font-medium">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                  {item.labelHindi}
                </div>
              </button>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/citizen')}
              className="group border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-sm font-medium">Citizen Portal</div>
                <div className="text-xs opacity-80">नागरिक पोर्टल</div>
              </div>
            </Button>
            <Button 
              onClick={() => navigate('/admin')}
              className="group bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white shadow-soft hover:shadow-elevated transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className="text-sm font-medium">Admin Login</div>
                <div className="text-xs opacity-90">प्रशासक लॉगिन</div>
              </div>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-6' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-soft p-6 space-y-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-4">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left group p-3 rounded-xl hover:bg-secondary/50 transition-all duration-300"
                >
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.labelHindi}
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-border/30">
              <Button 
                variant="outline" 
                onClick={() => navigate('/citizen')}
                className="w-full py-6 border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                <div className="text-center">
                  <div className="font-medium">Citizen Portal</div>
                  <div className="text-sm opacity-80">नागरिक पोर्टल</div>
                </div>
              </Button>
              <Button 
                onClick={() => navigate('/admin')}
                className="w-full py-6 bg-gradient-to-r from-primary to-accent text-white shadow-soft hover:shadow-elevated hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="font-medium">Admin Login</div>
                  <div className="text-sm opacity-90">प्रशासक लॉगिन</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;