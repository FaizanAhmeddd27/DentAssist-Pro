// app/appointment/page.tsx
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/adminUi/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppointmentsList from "@/components/appointment/AppointmentList";
export default async function AppointmentPage() {
  const { userId } =await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Appointments
              </span>
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage your dental appointments
            </p>
          </div>
          
          <Link href="/appointment/book">
            <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
              <Plus className="w-5 h-5 mr-2" />
              Book Appointment
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Past</span>
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Cancelled</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <AppointmentsList filter="upcoming" />
          </TabsContent>

          <TabsContent value="past">
            <AppointmentsList filter="past" />
          </TabsContent>

          <TabsContent value="cancelled">
            <AppointmentsList filter="cancelled" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}