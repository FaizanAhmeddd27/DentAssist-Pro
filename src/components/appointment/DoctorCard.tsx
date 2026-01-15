// components/appointment/DoctorCard.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Stethoscope, Calendar } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingForm from "./BookingForm";

interface DoctorCardProps {
  doctor: any;
}

function DoctorCard({ doctor }: DoctorCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
        <CardContent className="p-0">
          <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/10 overflow-hidden">
            {doctor.imageUrl ? (
              <Image
                src={doctor.imageUrl}
                alt={doctor.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-20 h-20 text-primary" />
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-2">Dr. {doctor.name}</h3>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Stethoscope className="w-4 h-4 text-primary" />
              <span>{doctor.specialty}</span>
            </div>

            {doctor.bio && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {doctor.bio}
              </p>
            )}

            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${
                doctor.gender === "MALE" ? "bg-blue-500" : "bg-pink-500"
              }`} />
              <span className="text-xs text-muted-foreground capitalize">
                {doctor.gender.toLowerCase()}
              </span>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" size="lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Book Appointment with Dr. {doctor.name}</DialogTitle>
                  <DialogDescription>
                    {doctor.specialty} - Choose your preferred date and time
                  </DialogDescription>
                </DialogHeader>
                <BookingForm doctor={doctor} onSuccess={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default DoctorCard;