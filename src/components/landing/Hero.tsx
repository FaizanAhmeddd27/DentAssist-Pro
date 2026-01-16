"use client";

import React from "react";
import { Sparkles, Brain, Shield, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const Hero: React.FC = () => {
  const features = [
    { icon: Brain, text: "AI-Powered Diagnostics" },
    { icon: Shield, text: "HIPAA Compliant" },
    { icon: Zap, text: "Instant Results" },
  ];

  const capabilities = [
    "Cavity Detection",
    "X-Ray Analysis",
    "Treatment Planning",
    "Patient History",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left z-10 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-fade-in">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                AI-Powered Dental Assistant
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-foreground">Your AI</span>
                <br />
                <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-gradient">
                  Dental Assistant
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Transform your dental practice with cutting-edge AI technology.
                Diagnose faster, treat smarter, care better.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center lg:justify-start">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs sm:text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link href="/dashboard">
             
              <button className="group px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                Get Started
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              </Link>
              <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-transparent border-2 border-border hover:border-primary hover:bg-primary/5 font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
                Personalized Tips
              </button>
            </div>

            {/* Capabilities List */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-4 sm:pt-8">
              {capabilities.map((capability, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{capability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Robot Illustration */}
          <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[600px] z-10 order-1 lg:order-2">
            {/* Glowing Effect Behind Robot */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />

            {/* Floating Cards - Hidden on small mobile, visible on larger screens */}
            <div className="hidden sm:block absolute bottom-16 sm:bottom-20 right-0 sm:right-4 p-3 sm:p-4 bg-card/80 backdrop-blur-md rounded-lg border border-border shadow-xl animate-float-delayed">
              <div className="flex items-center gap-2 sm:gap-3">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium">10k+ Scans Daily</span>
              </div>
            </div>

            <div className="hidden md:block absolute top-1/2 -right-2 sm:-right-4 p-3 sm:p-4 bg-card/80 backdrop-blur-md rounded-lg border border-border shadow-xl animate-float-slow">
              <div className="flex items-center gap-2 sm:gap-3">
                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-medium">AI Learning</span>
              </div>
            </div>

            {/* Main Robot SVG Illustration */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] animate-float-gentle">
                <svg
                  viewBox="0 0 400 400"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-2xl"
                >
                  {/* Robot Body */}
                  <g className="animate-float-gentle">
                    {/* Main Body */}
                    <rect
                      x="120"
                      y="160"
                      width="160"
                      height="180"
                      rx="20"
                      className="fill-primary/20 stroke-primary"
                      strokeWidth="2"
                    />

                    {/* Chest Panel */}
                    <rect
                      x="150"
                      y="200"
                      width="100"
                      height="80"
                      rx="10"
                      className="fill-primary/10 stroke-primary/50"
                      strokeWidth="1"
                    />

                    {/* Heart/Core */}
                    <circle cx="200" cy="240" r="20" className="fill-primary/30">
                      <animate attributeName="r" values="20;22;20" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Activity icon */}
                    <path
                      d="M182 240h10l8-18 8 36 8-18h10"
                      className="stroke-primary"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Head */}
                    <rect
                      x="140"
                      y="80"
                      width="120"
                      height="100"
                      rx="15"
                      className="fill-primary/20 stroke-primary"
                      strokeWidth="2"
                    />

                    {/* Antenna */}
                    <line
                      x1="200"
                      y1="80"
                      x2="200"
                      y2="50"
                      className="stroke-primary"
                      strokeWidth="2"
                    />
                    <circle cx="200" cy="50" r="8" className="fill-primary">
                      <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
                    </circle>

                    {/* Eyes */}
                    <circle cx="170" cy="120" r="12" className="fill-primary">
                      <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="230" cy="120" r="12" className="fill-primary">
                      <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Smile */}
                    <path
                      d="M 170 145 Q 200 155 230 145"
                      className="stroke-primary"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Arms */}
                    <rect
                      x="80"
                      y="180"
                      width="40"
                      height="100"
                      rx="10"
                      className="fill-primary/15 stroke-primary"
                      strokeWidth="2"
                    />
                    <rect
                      x="280"
                      y="180"
                      width="40"
                      height="100"
                      rx="10"
                      className="fill-primary/15 stroke-primary"
                      strokeWidth="2"
                    />

                    {/* Hands */}
                    <circle cx="100" cy="285" r="15" className="fill-primary/20 stroke-primary" strokeWidth="2" />
                    <circle cx="300" cy="285" r="15" className="fill-primary/20 stroke-primary" strokeWidth="2" />

                    {/* Legs */}
                    <rect
                      x="150"
                      y="340"
                      width="35"
                      height="50"
                      rx="8"
                      className="fill-primary/15 stroke-primary"
                      strokeWidth="2"
                    />
                    <rect
                      x="215"
                      y="340"
                      width="35"
                      height="50"
                      rx="8"
                      className="fill-primary/15 stroke-primary"
                      strokeWidth="2"
                    />

                    {/* Feet */}
                    <ellipse cx="167" cy="390" rx="20" ry="8" className="fill-primary/20 stroke-primary" strokeWidth="2" />
                    <ellipse cx="232" cy="390" rx="20" ry="8" className="fill-primary/20 stroke-primary" strokeWidth="2" />
                  </g>

                  {/* Floating Particles */}
                  <circle cx="80" cy="150" r="4" className="fill-primary/40">
                    <animate attributeName="opacity" values="1;0.25;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="320" cy="200" r="3" className="fill-primary/40">
                    <animate attributeName="opacity" values="1;0.25;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="350" cy="100" r="5" className="fill-primary/40">
                    <animate attributeName="opacity" values="1;0.25;1" dur="2s" begin="1s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="250" r="3" className="fill-primary/40">
                    <animate attributeName="opacity" values="1;0.25;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>

                {/* Orbiting Particles - Hidden on very small screens */}
                <div className="hidden sm:block absolute top-1/4 left-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary animate-orbit" />
                <div className="hidden sm:block absolute top-1/4 right-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary/60 animate-orbit-reverse" />
                <div className="hidden sm:block absolute bottom-1/4 left-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/40 animate-orbit-slow" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-10 lg:pt-12 border-t border-border/50">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "1M+", label: "Diagnoses" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center space-y-1 sm:space-y-2 hover:scale-105 transition-transform duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;