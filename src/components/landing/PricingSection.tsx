"use client";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircle2, Sparkles, Crown, Zap, Star } from "lucide-react";
import { useState } from "react";

function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals exploring AI dental care",
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: Sparkles,
      color: "from-blue-500/20 to-blue-500/10",
      borderColor: "border-blue-500/30",
      features: [
        "5 AI chat conversations per month",
        "Basic symptom checker",
        "Appointment booking",
        "Email support",
        "Dental care tips",
        "Treatment cost estimates"
      ],
      popular: false,
      cta: "Start Free"
    },
    {
      name: "Professional",
      description: "Comprehensive AI dental assistance",
      monthlyPrice: 12,
      yearlyPrice: 120,
      icon: Crown,
      color: "from-primary/20 to-primary/10",
      borderColor: "border-primary/50",
      features: [
        "Unlimited AI conversations",
        "Advanced symptom analysis",
        "Priority appointment booking",
        "24/7 live chat support",
        "Personalized care plans",
        "X-ray image analysis",
        "Treatment recommendations",
        "Dental emergency guidance"
      ],
      popular: true,
      cta: "Get Professional"
    },
    {
      name: "Family",
      description: "Complete care for your entire family",
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: Star,
      color: "from-purple-500/20 to-purple-500/10",
      borderColor: "border-purple-500/30",
      features: [
        "Everything in Professional",
        "Up to 6 family members",
        "Kids dental guidance",
        "Family care dashboard",
        "Shared appointment calendar",
        "Orthodontic consultations",
        "Premium support",
        "Quarterly dental reports"
      ],
      popular: false,
      cta: "Get Family Plan"
    }
  ];

  return (
    <section id="pricing" className="relative  px-6 overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_70%)]"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Flexible Pricing</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Choose the plan that
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              fits your needs
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Get instant AI dental assistance with transparent pricing. 
            No hidden fees, cancel anytime.
          </p>

          <div className="inline-flex items-center gap-3 p-1 bg-muted/50 rounded-xl backdrop-blur-sm">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                billingPeriod === "monthly"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 relative ${
                billingPeriod === "yearly"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const isPopular = plan.popular;

            return (
              <div
                key={idx}
                className={`relative group ${isPopular ? 'lg:scale-105' : ''}`}
              >
                {isPopular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border-2 ${isPopular ? plan.borderColor : 'border-border/50'} hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                    
                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        ${price}
                      </span>
                      <span className="text-muted-foreground mb-2">
                        /{billingPeriod === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    {billingPeriod === "yearly" && price > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        ${(price / 12).toFixed(2)}/month billed annually
                      </p>
                    )}
                  </div>

                  <SignUpButton mode="modal">
                    <Button
                      className={`w-full py-6 rounded-xl font-semibold mb-6 transition-all duration-300 ${
                        isPopular
                          ? "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground shadow-lg hover:shadow-xl"
                          : "bg-gradient-to-r from-muted to-muted/80 hover:from-muted/90 hover:to-muted/70"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </SignUpButton>

                  <div className="space-y-4 flex-1">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">All plans include:</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mt-8">
            Need a custom solution?{" "}
            <button className="text-primary font-semibold hover:underline">
              Contact our team
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;