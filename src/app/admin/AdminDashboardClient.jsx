"use client"

import React from 'react'
import Navbar from '@/components/adminUi/Navbar'
import WelcomeSection from '@/components/adminUi/WelcomeSection'
import { useGetDoctors } from '@/hooks/use-doctors'
import { useGetAppointments } from '@/hooks/use-appointment'
import DoctorsManagement from '@/components/adminUi/DoctorsManagement'

const AdminDashboardClient = () => {
    const { data: doctors, isLoading: doctorLoading } = useGetDoctors();
    const { data: appointments, isLoading: appointmentLoading } = useGetAppointments();

    // Calculate stats safely
    const stats = {
        totalDoctors: doctors?.length || 0,
        activeDoctors: doctors?.filter(doctor => doctor.isActive)?.length || 0,
        totalAppointments: appointments?.length || 0,
        completedAppointments: appointments?.filter(appointment => appointment.status === 'COMPLETED')?.length || 0,
    };

    // Loading state
    if (doctorLoading || appointmentLoading) {
        return (
            <div className='min-h-screen bg-background'>
                <Navbar />
                <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-muted-foreground">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-background'>
            <Navbar />
            <WelcomeSection
                totalDoctors={stats.totalDoctors}
                activeDoctors={stats.activeDoctors}
                totalAppointments={stats.totalAppointments}
                completedAppointments={stats.completedAppointments}
            />

            <DoctorsManagement/>
        </div>
    );
};

export default AdminDashboardClient;