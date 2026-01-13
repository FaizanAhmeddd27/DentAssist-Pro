"use client";
import React from "react";
import Navbar from "@/components/adminUi/Navbar";
import { Crown, Check, Zap, Shield, Users, Sparkles, TrendingUp, Clock, Award, Star } from "lucide-react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { PricingTable } from "@clerk/nextjs";

const Pro = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast AI",
      description: "Process patient data and generate insights in milliseconds"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level encryption and HIPAA-compliant data protection"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Unlimited Team Members",
      description: "Collaborate seamlessly with your entire dental practice"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Priority Support",
      description: "Get help whenever you need it from our expert team"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Deep insights into practice performance and patient trends"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Templates",
      description: "Access to exclusive AI-powered dental templates"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Dental Practice Owner",
      image: "SJ",
      rating: 5,
      text: "This platform has transformed how we manage our practice. The AI features save us hours every day!"
    },
    {
      name: "Dr. Michael Chen",
      role: "Orthodontist",
      image: "MC",
      rating: 5,
      text: "The best investment we've made. Patient satisfaction has increased by 40% since we started using it."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Cosmetic Dentist",
      image: "ER",
      rating: 5,
      text: "Incredible support team and the features are exactly what modern dental practices need."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Dentists" },
    { number: "2M+", label: "Patients Served" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ];

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      
      <SignedIn>
        <div className="min-h-screen bg-background">
          <Navbar />
          
          <div className="relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              {/* Hero Section */}
              <div className="text-center mb-16 sm:mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 mb-6 animate-fade-in">
                  <Crown className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-sm font-semibold text-primary">Premium Plan</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                  <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Unlock the Full
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                    Power of AI
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
                  Take your dental practice to the next level with advanced AI features, unlimited team collaboration, and premium support.
                </p>
              </div>

              {/* Clerk Pricing Table */}
              <div className="max-w-5xl mx-auto mb-20">
                <PricingTable
                  // Get your publishable key from Clerk Dashboard
                  // Settings > Monetization > Pricing Tables
                />
              </div>

              {/* Stats Section */}
              <div className="mb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="mb-24">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">Features</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Everything You Need to Succeed
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Powerful features designed specifically for modern dental practices
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials Section */}
              <div className="mb-24">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">Testimonials</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Loved by Dental Professionals
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    See what top dentists are saying about our platform
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                    >
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold">
                          {testimonial.image}
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl blur-xl" />
                <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-primary/20 text-center">
                  <Crown className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Ready to Transform Your Practice?
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Join thousands of dental professionals who have already upgraded to premium and are seeing incredible results.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center items-center">
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary" />
                      <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary" />
                      <span>Cancel anytime</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-5 h-5 text-primary" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
};

export default Pro;