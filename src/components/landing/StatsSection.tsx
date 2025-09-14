import { useEffect, useState } from "react";
import { Shield, Bell, TrendingUp, Users } from "lucide-react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { 
      label: "Villages Protected", 
      labelHindi: "संरक्षित गांव",
      value: "150+", 
      icon: Shield,
      color: "text-success"
    },
    { 
      label: "Early Warnings Sent", 
      labelHindi: "भेजी गई चेतावनी",
      value: "2,300+", 
      icon: Bell,
      color: "text-warning"
    },
    { 
      label: "Cases Prevented", 
      labelHindi: "रोके गए मामले",
      value: "890+", 
      icon: TrendingUp,
      color: "text-primary"
    },
    { 
      label: "Citizens Engaged", 
      labelHindi: "जुड़े नागरिक",
      value: "45K+", 
      icon: Users,
      color: "text-accent"
    },
  ];

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-br from-secondary/30 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent" 
             style={{ 
               backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), 
                                radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%)` 
             }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Our Impact So Far
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            अब तक का हमारा प्रभाव
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full animate-fade-in" style={{ animationDelay: "0.4s" }} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center group cursor-pointer transform transition-all duration-500 hover:scale-110 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-card flex items-center justify-center group-hover:shadow-elevated transition-all duration-300 group-hover:rotate-6">
                  <stat.icon className={`h-10 w-10 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="space-y-1">
                  <div className="text-lg font-semibold text-muted-foreground">{stat.label}</div>
                  <div className="text-sm text-muted-foreground/80">{stat.labelHindi}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: "1s" }}>
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto shadow-soft border border-primary/10">
            <p className="text-lg text-foreground/90 leading-relaxed mb-2">
              Join thousands of communities already protected by our AI-powered early warning system
            </p>
            <p className="text-base text-muted-foreground">
              हमारी एआई-संचालित पूर्व चेतावनी प्रणाली द्वारा पहले से संरक्षित हजारों समुदायों में शामिल हों
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;