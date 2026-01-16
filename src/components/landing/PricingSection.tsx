"use client";

import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircle2, Sparkles, Crown, Zap, Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";




function PricingSection() {

  const { isSignedIn } = useUser();
const router = useRouter();

const handleClick = () => {
  if (isSignedIn) {
    router.push("/dashboard");
  }
};


  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with dental care",
      price: 0,
      icon: Sparkles,
      color: "from-blue-500/20 to-blue-500/10",
      borderColor: "border-blue-500/30",
      features: [
        "Unlimited appointment booking",
        "Basic text chat support",
        "Appointment reminders",
      ],
      popular: false,
      cta: "Get Started Free",
    },
    {
      name: "Basic",
      description: "Enhanced AI-powered dental assistance",
      price: 12,
      icon: Crown,
      color: "from-primary/20 to-primary/10",
      borderColor: "border-primary/50",
      features: [
        "Everything in Free",
        "10 AI voice calls per month",
        "AI dental guidance",
        "Priority support",
      ],
      popular: true,
      cta: "Get Basic",
    },
    {
      name: "Premium",
      description: "Complete AI dental care solution",
      price: 29,
      icon: Star,
      color: "from-purple-500/20 to-purple-500/10",
      borderColor: "border-purple-500/30",
      features: [
        "Everything in Basic",
        "Unlimited AI voice calls",
        "Personalized care plans",
        "Detailed health reports",
      ],
      popular: false,
      cta: "Get Premium",
    },
  ];

  return (
    <section
      id="pricing"
      className="relative px-6 py-24 overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Simple Pricing
            </span>
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

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant AI dental assistance with transparent pricing.
            No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const isPopular = plan.popular;

            return (
              <div
                key={idx}
                className={`relative group ${isPopular ? "lg:scale-105" : ""}`}
              >
                {isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  className={`relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border-2 ${
                    isPopular ? plan.borderColor : "border-border/50"
                  } hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col`}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {plan.description}
                    </p>

                    <div className="flex items-end gap-2">
                      <span className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground mb-2">
                        /month
                      </span>
                    </div>
                  </div>

                {isSignedIn ? (
                         <Button
    onClick={() => router.push("/dashboard")}
    className="w-full mt-5 mb-10 rounded-xl"
  >
    Go to Dashboard
  </Button>
) : (
  <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
    <Button className="w-full py-6 rounded-xl">
      {plan.cta}
    </Button>
  </SignUpButton>
)}


                  <div className="space-y-4 flex-1">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
