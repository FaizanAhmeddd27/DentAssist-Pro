"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Calendar,
  Users,
  Activity,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageSquare,
  FileText,
  Stethoscope,
} from "lucide-react";

type WelcomeSectionProps = {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
};

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  totalDoctors,
  activeDoctors,
  totalAppointments,
  completedAppointments,
}) => {
  const { user } = useUser();
  const [greeting, setGreeting] = useState("Welcome back");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Dynamic change messages (optional but nice)
  const completionRate = useMemo(() => {
    if (!totalAppointments) return 0;
    return Math.round((completedAppointments / totalAppointments) * 100);
  }, [completedAppointments, totalAppointments]);

  const stats = useMemo(
    () => [
      {
        label: "Total Appointments",
        value: String(totalAppointments),
        change: `${completionRate}% completed`,
        icon: Calendar,
        color: "from-blue-500/20 to-blue-500/10",
        iconColor: "text-blue-500",
      },
      {
        label: "Total Doctors",
        value: String(totalDoctors),
        change: `${activeDoctors} active`,
        icon: Stethoscope,
        color: "from-green-500/20 to-green-500/10",
        iconColor: "text-green-500",
      },
      {
        label: "Active Doctors",
        value: String(activeDoctors),
        change: totalDoctors ? `${Math.round((activeDoctors / totalDoctors) * 100)}% active` : "0% active",
        icon: Users,
        color: "from-purple-500/20 to-purple-500/10",
        iconColor: "text-purple-500",
      },
      {
        label: "Completed Appointments",
        value: String(completedAppointments),
        change: `${Math.max(totalAppointments - completedAppointments, 0)} pending`,
        icon: CheckCircle2,
        color: "from-orange-500/20 to-orange-500/10",
        iconColor: "text-orange-500",
      },
    ],
    [totalAppointments, totalDoctors, activeDoctors, completedAppointments, completionRate]
  );

  const quickActions = [
    {
      title: "New Appointment",
      description: "Schedule a patient visit",
      icon: Calendar,
      href: "/admin/appointments/new",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "View Messages",
      description: "Check patient inquiries",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Generate Report",
      description: "Create analytics report",
      icon: FileText,
      href: "/admin/reports",
      color: "from-green-500 to-green-600",
    },
  ];

  const recentActivity = [
    { action: "New appointment booked", patient: "Sarah Johnson", time: "5 min ago", icon: Calendar },
    { action: "AI consultation completed", patient: "Mike Chen", time: "12 min ago", icon: CheckCircle2 },
    { action: "Doctor activated", patient: "Dr. Emma Davis", time: "1 hour ago", icon: Activity },
  ];

  if (!mounted) return null;

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">{greeting}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {user?.firstName || "Admin"}
            </span>
          </h1>

          <p className="text-muted-foreground text-lg">
            Here's what's happening with your practice today
          </p>
        </div>

        {/* Stats Grid (dynamic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

           
      </div>
    </div>
  );
};

export default WelcomeSection;
