"use client";
import { MessageCircleIcon, Sparkles, Search, Stethoscope, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function WhatToAsk() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const questions = [
    {
      category: "Pain & Symptoms",
      icon: Stethoscope,
      color: "from-red-500/20 to-red-500/10",
      borderColor: "border-red-500/20",
      image: "/tooth-pain.png", // You can use any relevant image
      questions: [
        {
          question: "Why does my tooth hurt when I drink cold water?",
          answer: "Could indicate tooth sensitivity, cavity, or exposed nerve",
          tags: ["Sensitivity", "Diagnosis"]
        },
        {
          question: "My gums bleed when I brush—is this serious?",
          answer: "May signal gingivitis or gum disease requiring attention",
          tags: ["Gum Health", "Prevention"]
        },
        {
          question: "What causes persistent bad breath?",
          answer: "Often linked to bacteria, cavities, or dry mouth",
          tags: ["Oral Hygiene", "Treatment"]
        }
      ]
    },
    {
      category: "Treatments & Costs",
      icon: Search,
      color: "from-blue-500/20 to-blue-500/10",
      borderColor: "border-blue-500/20",
      image: "/dental-treatment.png",
      questions: [
        {
          question: "How much does a root canal typically cost?",
          answer: "Get price ranges, insurance coverage, and payment options",
          tags: ["Pricing", "Insurance"]
        },
        {
          question: "Are dental implants better than bridges?",
          answer: "Compare longevity, cost, comfort, and maintenance needs",
          tags: ["Comparison", "Options"]
        },
        {
          question: "What's the best teeth whitening method?",
          answer: "Professional vs at-home options, safety, and results",
          tags: ["Cosmetic", "Safety"]
        }
      ]
    },
    {
      category: "Prevention & Care",
      icon: Sparkles,
      color: "from-green-500/20 to-green-500/10",
      borderColor: "border-green-500/20",
      image: "/dental-care.png",
      questions: [
        {
          question: "How often should I really floss?",
          answer: "Best practices for daily oral hygiene routines",
          tags: ["Daily Care", "Prevention"]
        },
        {
          question: "Can I reverse early tooth decay naturally?",
          answer: "Learn about remineralization and preventive measures",
          tags: ["Natural Care", "Early Detection"]
        },
        {
          question: "What foods strengthen teeth?",
          answer: "Nutrition guide for optimal dental health",
          tags: ["Nutrition", "Health"]
        }
      ]
    },
    {
      category: "Kids & Family",
      icon: Users,
      color: "from-purple-500/20 to-purple-500/10",
      borderColor: "border-purple-500/20",
      image: "/family-dental.png",
      questions: [
        {
          question: "When should my child's first dental visit be?",
          answer: "Age recommendations and what to expect at first visits",
          tags: ["Pediatric", "First Visit"]
        },
        {
          question: "Are pacifiers bad for baby teeth?",
          answer: "Effects on dental development and when to stop",
          tags: ["Baby Teeth", "Development"]
        },
        {
          question: "How to help kids overcome dental anxiety?",
          answer: "Tips for making dental visits stress-free for children",
          tags: ["Anxiety", "Child Care"]
        }
      ]
    }
  ];

  return (
    <section className="relative  px-6 overflow-hidden bg-gradient-to-b from-background via-muted/3 to-background">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03),transparent_70%)]"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <MessageCircleIcon className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">AI-Powered Answers</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ask anything about
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              your dental health
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our AI is trained on thousands of dental cases and provides instant, 
            expert-level guidance for all your oral health questions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {questions.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div
                key={idx}
                className="group relative"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border ${category.borderColor} hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10`}>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{category.category}</h3>
                      <p className="text-sm text-muted-foreground">Common questions</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.questions.map((q, qIdx) => (
                      <div
                        key={qIdx}
                        className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer hover:shadow-lg"
                      >
                        <p className="font-semibold text-primary mb-2 text-sm">
                          "{q.question}"
                        </p>
                        <p className="text-xs text-muted-foreground mb-3">
                          {q.answer}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {q.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center transition-all duration-300 ${hoveredCard === idx ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        

            

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Can't find your question? Our AI can help with that too!
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20 backdrop-blur-sm">
            <MessageCircleIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              Try: "What causes jaw clicking?" or "Is charcoal toothpaste safe?"
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatToAsk;