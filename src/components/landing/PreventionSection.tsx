import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertTriangle } from "lucide-react";

const PreventionSection = () => {
  const preventionTips = {
    dos: [
      {
        en: "Boil water for at least 1 minute before drinking",
        hi: "पीने से पहले पानी को कम से कम 1 मिनट तक उबालें"
      },
      {
        en: "Use water purification tablets or filters",
        hi: "पानी शुद्धीकरण की गोलियों या फिल्टर का उपयोग करें"
      },
      {
        en: "Wash hands frequently with soap",
        hi: "साबुन से बार-बार हाथ धोएं"
      },
      {
        en: "Eat freshly cooked, hot food",
        hi: "ताजा पका हुआ, गर्म भोजन खाएं"
      },
      {
        en: "Store water in clean, covered containers",
        hi: "साफ, ढके हुए कंटेनरों में पानी स्टोर करें"
      }
    ],
    donts: [
      {
        en: "Drink untreated water from wells or rivers",
        hi: "कुओं या नदियों से बिना शुद्ध किए पानी न पिएं"
      },
      {
        en: "Eat raw or undercooked seafood",
        hi: "कच्चा या अधपका समुद्री भोजन न खाएं"
      },
      {
        en: "Use ice made from unsafe water",
        hi: "असुरक्षित पानी से बनी बर्फ का उपयोग न करें"
      },
      {
        en: "Eat food from street vendors",
        hi: "स्ट्रीट वेंडर से भोजन न खाएं"
      },
      {
        en: "Swim in contaminated water sources",
        hi: "दूषित पानी के स्रोतों में न तैरें"
      }
    ]
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/10 to-background relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-success rounded-full animate-pulse" style={{ animationDelay: "0s", animationDuration: "4s" }} />
        <div className="absolute top-40 right-20 w-24 h-24 bg-danger rounded-full animate-pulse" style={{ animationDelay: "2s", animationDuration: "6s" }} />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary rounded-full animate-pulse" style={{ animationDelay: "1s", animationDuration: "5s" }} />
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-accent rounded-full animate-pulse" style={{ animationDelay: "3s", animationDuration: "7s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Prevention
            <br />
            <span className="bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              Guidelines
            </span>
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            रोकथाम दिशानिर्देश
          </h3>
          
          <div className="max-w-4xl mx-auto space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Simple yet effective practices to protect yourself and your community from waterborne diseases.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              जलजनित रोगों से अपने और अपने समुदाय की सुरक्षा के लिए सरल लेकिन प्रभावी उपाय।
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Do's Card */}
          <Card className="group bg-gradient-to-br from-success/5 to-success/10 border-success/20 shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-[1.02] animate-fade-in overflow-hidden">
            <CardContent className="p-10 relative">
              {/* Header */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-success to-success-foreground rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-success mb-1">Do's</h3>
                  <h4 className="text-2xl font-bold text-success/80">करें</h4>
                </div>
              </div>

              {/* Tips List */}
              <ul className="space-y-6">
                {preventionTips.dos.map((tip, index) => (
                  <li 
                    key={index} 
                    className="flex items-start group-hover:translate-x-2 transition-transform duration-300"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-success to-success/80 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                    <div className="space-y-1">
                      <span className="text-foreground leading-relaxed font-medium text-lg">
                        {tip.en}
                      </span>
                      <div className="text-muted-foreground text-base">
                        {tip.hi}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-success/10 to-success/20 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-success/5 to-success/15 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            </CardContent>
          </Card>

          {/* Don'ts Card */}
          <Card className="group bg-gradient-to-br from-danger/5 to-danger/10 border-danger/20 shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-[1.02] animate-fade-in overflow-hidden" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-10 relative">
              {/* Header */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-danger to-danger-foreground rounded-2xl flex items-center justify-center mr-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-danger mb-1">Don'ts</h3>
                  <h4 className="text-2xl font-bold text-danger/80">न करें</h4>
                </div>
              </div>

              {/* Tips List */}
              <ul className="space-y-6">
                {preventionTips.donts.map((tip, index) => (
                  <li 
                    key={index} 
                    className="flex items-start group-hover:translate-x-2 transition-transform duration-300"
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-danger to-danger/80 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                    <div className="space-y-1">
                      <span className="text-foreground leading-relaxed font-medium text-lg">
                        {tip.en}
                      </span>
                      <div className="text-muted-foreground text-base">
                        {tip.hi}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-danger/10 to-danger/20 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-danger/5 to-danger/15 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
            </CardContent>
          </Card>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 max-w-4xl mx-auto shadow-soft border border-primary/10">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-primary mr-3" />
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Prevention is Better Than Cure
            </h3>
            <h4 className="text-xl font-semibold text-muted-foreground mb-6">
              रोकथाम इलाज से बेहतर है
            </h4>
            
            <div className="space-y-3">
              <p className="text-lg text-muted-foreground leading-relaxed">
                By following these simple guidelines, you can significantly reduce the risk of waterborne diseases in your community.
              </p>
              <p className="text-base text-muted-foreground/80 leading-relaxed">
                इन सरल दिशानिर्देशों का पालन करके, आप अपने समुदाय में जलजनित रोगों के जोखिम को काफी कम कर सकते हैं।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreventionSection;