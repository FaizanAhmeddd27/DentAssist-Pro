"use client";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { MessageSquare, Calendar, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

function CTA() {
  const benefits = [
    "Instant AI responses 24/7",
    "Verified by dental professionals",
    "100% private and secure"
  ];

  return (
    <section className="relative px-6 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_70%)]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-3xl border-2 border-primary/20 shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm w-fit">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm font-medium text-primary">Start Your Journey</span>
                </div>

                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Get answers to your
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      dental questions now
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Join 50,000+ users who trust our AI for expert dental guidance. 
                    No appointments needed—get instant help today.
                  </p>
                </div>

                <div className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <SignUpButton mode="modal">
                    <Button
                      size="lg"
                      className="px-8 py-6 text-base bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                       <MessageSquare className="mr-2 w-5 h-5" />

                     
                      Start Free Chat
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </SignUpButton>

                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-base border-2 border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Book Dentist
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  💳 No credit card required • 🔒 HIPAA compliant • ⚡ 2-second response
                </p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-12 lg:p-16 flex items-center justify-center">
              <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

              <div className="relative space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                    <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                    <div className="text-3xl font-bold text-primary mb-1">97%</div>
                    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                  
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                    <div className="text-3xl font-bold text-primary mb-1">2.3s</div>
                    <div className="text-sm text-muted-foreground">Avg Response</div>
                  </div>
                  
                  <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                    <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                </div>

                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-2xl shrink-0">
                      👤
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">Sarah M.</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-500 text-xs">★</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        "Got instant help for my tooth pain at 2 AM. The AI knew exactly what to do!"
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                      <span className="text-sm font-medium">Live now</span>
                    </div>
                    <span className="text-xs text-muted-foreground">127 users chatting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;