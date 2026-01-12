"use client";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight, MessageSquare, Brain, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Share Your Concerns",
      description: "Tell our AI about your dental symptoms, questions, or concerns in natural language. No medical jargon required.",
      features: [
        "Voice or text chat",
        "Upload images (optional)",
        "Describe symptoms naturally"
      ],
      color: "from-blue-500/20 to-blue-500/10",
      emoji: "💬"
    },
    {
      number: "02",
      icon: Brain,
      title: "AI Analysis & Guidance",
      description: "Our advanced AI analyzes your input using thousands of dental case studies and provides personalized recommendations.",
      features: [
        "Instant symptom analysis",
        "Treatment suggestions",
        "Risk assessment"
      ],
      color: "from-purple-500/20 to-purple-500/10",
      emoji: "🧠"
    },
    {
      number: "03",
      icon: Calendar,
      title: "Take Action",
      description: "Get connected with verified dentists, book appointments, or follow our care recommendations for home treatment.",
      features: [
        "Book appointments instantly",
        "Get care instructions",
        "Track your progress"
      ],
      color: "from-green-500/20 to-green-500/10",
      emoji: "📅"
    }
  ];

  return (
    <section id="how-it-works" className="relative  px-6 overflow-hidden bg-gradient-to-b from-muted/5 via-background to-muted/10">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03),transparent_70%)]"></div>
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">How It Works</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Get dental care in
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              three simple steps
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From your first question to professional care, our AI guides you through 
            every step of your dental health journey.
          </p>
        </div>

        <div className="relative mb-20">
          <div className="hidden lg:block absolute top-1/2 left-[16.666%] right-[16.666%] h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2 rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 animate-pulse rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative group">
                  <div className="relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center text-primary-foreground font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>

                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-4xl">{step.emoji}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-center">{step.title}</h3>
                    <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="space-y-3">
                      {step.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-3 text-sm bg-muted/30 rounded-xl p-3 hover:bg-muted/50 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {idx < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                        <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-12 border border-border/50 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to get started?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of people who trust our AI for their dental health questions. 
            Get instant answers in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton mode="modal">
              <Button size="lg" className="px-8 py-6 text-base">
                <MessageSquare className="mr-2 w-5 h-5" />
                Start Free Chat
              </Button>
            </SignUpButton>
            
            <Button size="lg" variant="outline" className="px-8 py-6 text-base border-2">
              <Calendar className="mr-2 w-5 h-5" />
              Book Appointment
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>2-3 second response time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>HIPAA compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;