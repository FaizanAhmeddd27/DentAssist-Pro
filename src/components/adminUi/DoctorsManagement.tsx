"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useGetDoctors,
  useCreateDoctor,
  useUpdateDoctor,
  useDeleteDoctor,
} from "@/hooks/use-doctors";
import { Plus, Edit, Trash2, Search, Mail, Phone } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DoctorsManagement = () => {
  const { data: doctors = [], isLoading } = useGetDoctors();
  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const deleteDoctor = useDeleteDoctor();

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);

  // ✅ shadcn Select is not a real input -> keep gender in state
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");

  useEffect(() => {
    if (editingDoctor?.gender) setGender(editingDoctor.gender);
    else setGender("MALE");
  }, [editingDoctor, open]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d: any) => {
      const q = searchQuery.toLowerCase();
      return (
        d.name?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q) ||
        d.specialty?.toLowerCase().includes(q)
      );
    });
  }, [doctors, searchQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const doctorData = {
      name: (form.elements.namedItem("doctorName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phoneNumber: (form.elements.namedItem("phone") as HTMLInputElement).value,
      specialty: (form.elements.namedItem("specialty") as HTMLInputElement).value,
      gender,
    };

    if (editingDoctor) {
      updateDoctor.mutate({ id: editingDoctor.id, ...doctorData });
    } else {
      createDoctor.mutate(doctorData);
    }

    // close after mutation starts
    setOpen(false);
    setEditingDoctor(null);
    form.reset();
  };

  const handleEdit = (doctor: any) => {
    setEditingDoctor(doctor);
    setOpen(true);
  };

  const handleDelete = (doctorId: string) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      deleteDoctor.mutate(doctorId);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingDoctor(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-8">
      <div className="bg-[#1f1f3a] rounded-xl border border-gray-800 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Doctors Management</h2>
            <p className="text-gray-400 text-sm">
              "Excellence in dental care starts with exceptional practitioners"
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setEditingDoctor(null)}
                className="flex items-center gap-2 px-4 py-2 bg-[#a78bfa] hover:bg-[#9575de] text-white rounded-lg font-medium transition-colors"
              >
                <Plus size={18} />
                Add Doctor
              </button>
            </DialogTrigger>

            <DialogContent className="bg-[#1f1f3a] border-gray-800 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Name
                  </label>
                  <Input
                    name="doctorName"
                    placeholder="Dr. John Doe"
                    defaultValue={editingDoctor?.name || ""}
                    required
                    className="bg-[#1a1a2e] border-gray-800 text-white focus:border-[#a78bfa]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="doctor@example.com"
                    defaultValue={editingDoctor?.email || ""}
                    required
                    className="bg-[#1a1a2e] border-gray-800 text-white focus:border-[#a78bfa]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Phone
                  </label>
                  <Input
                    name="phone"
                    placeholder="3254425"
                    defaultValue={editingDoctor?.phoneNumber || ""}
                    className="bg-[#1a1a2e] border-gray-800 text-white focus:border-[#a78bfa]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Specialty
                  </label>
                  <Input
                    name="specialty"
                    placeholder="Orthodontics"
                    defaultValue={editingDoctor?.specialty || ""}
                    required
                    className="bg-[#1a1a2e] border-gray-800 text-white focus:border-[#a78bfa]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Gender
                  </label>
                  <Select value={gender} onValueChange={(v) => setGender(v as any)}>
                    <SelectTrigger className="bg-[#1a1a2e] border-gray-800 text-white focus:border-[#a78bfa]">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1a2e] border-gray-800 text-white">
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseDialog}
                    className="flex-1 px-4 py-2.5 bg-[#1a1a2e] hover:bg-[#252544] border border-gray-800 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={createDoctor.isPending || updateDoctor.isPending}
                    className="flex-1 px-4 py-2.5 bg-[#a78bfa] hover:bg-[#9575de] rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {createDoctor.isPending || updateDoctor.isPending
                      ? "Saving..."
                      : editingDoctor
                      ? "Save Changes"
                      : "Add Doctor"}
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <Input
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a2e] border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-[#a78bfa] transition-colors"
          />
        </div>

        {/* Doctors Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#a78bfa] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    Doctor
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    Specialty
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    Appointments
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDoctors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      No doctors found
                    </td>
                  </tr>
                ) : (
                  filteredDoctors.map((doctor: any) => (
                    <tr
                      key={doctor.id}
                      className="border-b border-gray-800 hover:bg-[#1a1a2e] transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#a78bfa] rounded-full flex items-center justify-center font-semibold text-sm">
                            {doctor.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-sm text-gray-500">{doctor.gender}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-gray-300">{doctor.specialty}</td>

                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Mail size={14} />
                            {doctor.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Phone size={14} />
                            {doctor.phoneNumber || "N/A"}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-gray-300">
                        {doctor.appointmentCount ?? 0}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            doctor.isActive
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {doctor.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(doctor)}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                            title="Edit Doctor"
                          >
                            <Edit size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(doctor.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Doctor"
                            disabled={deleteDoctor.isPending}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsManagement;
