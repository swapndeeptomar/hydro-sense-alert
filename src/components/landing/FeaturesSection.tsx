import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Activity, Heart } from "lucide-react";

const FeaturesSection = () => {
  const diseases = [
    {
      title: "Cholera",
      titleHindi: "हैजा",
      description: "Acute diarrheal infection caused by ingesting contaminated water or food",
      descriptionHindi: "दूषित पानी या भोजन के सेवन से होने वाला तीव्र दस्त संक्रमण",
      severity: "High",
      severityHindi: "उच्च",
      symptoms: [
        { en: "Severe diarrhea", hi: "गंभीर दस्त" },
        { en: "Vomiting", hi: "उल्टी" },
        { en: "Dehydration", hi: "निर्जलीकरण" }
      ],
      icon: Droplets,
      color: "from-red-500 to-red-600"
    },
    {
      title: "Typhoid",
      titleHindi: "टाइफाइड",
      description: "Bacterial infection caused by Salmonella typhi through contaminated water",
      descriptionHindi: "दूषित पानी के माध्यम से साल्मोनेला टाइफी के कारण होने वाला बैक्टीरियल संक्रमण",
      severity: "High", 
      severityHindi: "उच्च",
      symptoms: [
        { en: "High fever", hi: "तेज़ बुखार" },
        { en: "Headache", hi: "सिरदर्द" },
        { en: "Stomach pain", hi: "पेट दर्द" }
      ],
      icon: Thermometer,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Hepatitis A",
      titleHindi: "हेपेटाइटिस ए",
      description: "Viral liver infection spread through contaminated water and poor sanitation",
      descriptionHindi: "दूषित पानी और खराब स्वच्छता के माध्यम से फैलने वाला वायरल लिवर संक्रमण",
      severity: "Medium",
      severityHindi: "मध्यम",
      symptoms: [
        { en: "Fatigue", hi: "थकान" },
        { en: "Nausea", hi: "मतली" },
        { en: "Yellowing of skin", hi: "त्वचा का पीला होना" }
      ],
      icon: Activity,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Diarrheal Diseases",
      titleHindi: "दस्त संबंधी रोग",
      description: "Various infections causing loose, watery stools from unsafe water",
      descriptionHindi: "असुरक्षित पानी से होने वाले विभिन्न संक्रमण जो पतले, पानी जैसे मल का कारण बनते हैं",
      severity: "Medium",
      severityHindi: "मध्यम",
      symptoms: [
        { en: "Loose stools", hi: "पतला मल" },
        { en: "Cramping", hi: "ऐंठन" },
        { en: "Dehydration", hi: "निर्जलीकरण" }
      ],
      icon: Heart,
      color: "from-yellow-500 to-amber-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <Badge variant="outline" className="px-6 py-2 text-lg border-primary/30 text-primary animate-fade-in">
              <Droplets className="w-5 h-5 mr-2" />
              Disease Information
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Understanding Waterborne
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Diseases
            </span>
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            जलजनित रोगों को समझना
          </h3>
          
          <div className="max-w-4xl mx-auto space-y-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Learn about the most common waterborne diseases and their impact on communities worldwide.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              सबसे आम जलजनित रोगों और दुनिया भर के समुदायों पर उनके प्रभाव के बारे में जानें।
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {diseases.map((disease, index) => (
            <Card 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm border-0 shadow-card hover:shadow-elevated transition-all duration-500 hover:scale-105 animate-fade-in overflow-hidden" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="p-8 relative">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${disease.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <disease.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${disease.color}`} />
                  </div>
                </div>

                {/* Title and Severity */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {disease.title}
                    </h3>
                    <h4 className="text-lg font-semibold text-muted-foreground">
                      {disease.titleHindi}
                    </h4>
                  </div>
                  <Badge 
                    variant={disease.severity === 'High' ? 'destructive' : 'secondary'}
                    className="text-xs font-semibold"
                  >
                    <span className="block">{disease.severity}</span>
                    <span className="block text-[10px] opacity-80">{disease.severityHindi}</span>
                  </Badge>
                </div>

                {/* Description */}
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {disease.description}
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">
                    {disease.descriptionHindi}
                  </p>
                </div>

                {/* Symptoms */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-sm flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                    <span>Symptoms</span>
                    <span className="text-xs text-muted-foreground ml-2">• लक्षण</span>
                  </h4>
                  <ul className="space-y-2">
                    {disease.symptoms.map((symptom, i) => (
                      <li key={i} className="text-xs text-muted-foreground">
                        <div className="flex items-start space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${disease.color} mt-1.5 flex-shrink-0`} />
                          <div>
                            <div>{symptom.en}</div>
                            <div className="opacity-75 text-[10px]">{symptom.hi}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: "1s" }}>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 max-w-3xl mx-auto backdrop-blur-sm border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Stay Informed, Stay Protected
            </h3>
            <h4 className="text-xl font-semibold text-muted-foreground mb-4">
              जानकार रहें, सुरक्षित रहें
            </h4>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Early detection and prevention are key to protecting your community from waterborne diseases.
            </p>
            <p className="text-sm text-muted-foreground/80">
              जलजनित रोगों से अपने समुदाय की सुरक्षा के लिए जल्दी पहचान और रोकथाम मुख्य हैं।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;