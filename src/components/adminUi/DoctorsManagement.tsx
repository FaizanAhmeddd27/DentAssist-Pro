"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useGetDoctors,
  useCreateDoctor,
  useUpdateDoctor,
  useDeleteDoctor,
} from "@/hooks/use-doctors";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Mail,
  Phone,
  Users,
  Stethoscope,
  Filter,
  Download,
  Eye,
  MoreVertical,
  UserCircle2,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DoctorsManagement = () => {
  const { data: doctors = [], isLoading } = useGetDoctors();
  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const deleteDoctor = useDeleteDoctor();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [open, setOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");

  useEffect(() => {
    if (editingDoctor?.gender) setGender(editingDoctor.gender);
    else setGender("MALE");
  }, [editingDoctor, open]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d: any) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        d.name?.toLowerCase().includes(q) ||
        d.email?.toLowerCase().includes(q) ||
        d.specialty?.toLowerCase().includes(q);

      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "active" && d.isActive) ||
        (filterStatus === "inactive" && !d.isActive);

      return matchesSearch && matchesFilter;
    });
  }, [doctors, searchQuery, filterStatus]);

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

    setOpen(false);
    setEditingDoctor(null);
    form.reset();
  };

  const handleEdit = (doctor: any) => {
    setEditingDoctor(doctor);
    setOpen(true);
  };

  const handleView = (doctor: any) => {
    setSelectedDoctor(doctor);
    setViewDialogOpen(true);
  };

  const handleDelete = (doctorId: string) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      deleteDoctor.mutate(doctorId);
    }
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Specialty", "Email", "Phone", "Gender", "Status", "Appointments"],
      ...filteredDoctors.map((d: any) => [
        d.name,
        d.specialty,
        d.email,
        d.phoneNumber || "",
        d.gender,
        d.isActive ? "Active" : "Inactive",
        d.appointmentCount || 0,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doctors.csv";
    a.click();
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditingDoctor(null);
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Doctors Management
                </span>
              </h1>
              <p className="text-muted-foreground text-sm">
                "Excellence in dental care starts with exceptional practitioners"
              </p>
            </div>

            {/* Add Doctor Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => setEditingDoctor(null)}
                  className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Doctor
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl">
                    {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    {editingDoctor
                      ? "Update the doctor's information below."
                      : "Fill in the details to add a new doctor to your practice."}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                  <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="doctorName">Full Name</Label>
                      <Input
                        id="doctorName"
                        name="doctorName"
                        placeholder="Dr. John Doe"
                        defaultValue={editingDoctor?.name || ""}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input
                        id="specialty"
                        name="specialty"
                        placeholder="Orthodontics"
                        defaultValue={editingDoctor?.specialty || ""}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="doctor@dentassist.com"
                        defaultValue={editingDoctor?.email || ""}
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        defaultValue={editingDoctor?.phoneNumber || ""}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={gender} onValueChange={(v) => setGender(v as any)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter className="gap-2 sm:gap-2 flex-col sm:flex-row">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleCloseDialog}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createDoctor.isPending || updateDoctor.isPending}
                      className="w-full sm:w-auto"
                    >
                      {createDoctor.isPending || updateDoctor.isPending
                        ? "Saving..."
                        : editingDoctor
                        ? "Update Doctor"
                        : "Add Doctor"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search, Filter & Export Bar */}
          <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-border/50 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 h-10"
                />
              </div>

              {/* Filter & Export */}
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
                  <SelectTrigger className="w-[120px] sm:w-[140px] h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                {/* Export Button */}
                <Button variant="outline" onClick={handleExport} className="gap-2 h-10 px-3 sm:px-4">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Table/Grid */}
        <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">Loading doctors...</p>
              </div>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground font-medium">No doctors found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block md:hidden divide-y divide-border/50">
                {filteredDoctors.map((doctor: any) => (
                  <div
                    key={doctor.id}
                    className="p-4 hover:bg-accent/50 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center font-semibold text-lg shrink-0">
                            {doctor.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${doctor.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{doctor.specialty}</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {doctor.gender}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleView(doctor)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(doctor)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Doctor
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(doctor.id)}
                            className="text-red-500 focus:text-red-500"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Doctor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
                        <Mail className="w-3 h-3 text-muted-foreground shrink-0" />
                        <span className="truncate">{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-2">
                        <Phone className="w-3 h-3 text-muted-foreground shrink-0" />
                        <span className="truncate">{doctor.phoneNumber || "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium">{doctor.appointmentCount ?? 0} appointments</span>
                      </div>
                      <Badge
                        variant={doctor.isActive ? "default" : "secondary"}
                        className={
                          doctor.isActive
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                            : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20"
                        }
                      >
                        {doctor.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Doctor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Specialty
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold hidden lg:table-cell">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Appointments
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border/50">
                    {filteredDoctors.map((doctor: any) => (
                      <tr
                        key={doctor.id}
                        className="hover:bg-accent/50 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center font-semibold text-lg shrink-0 group-hover:scale-110 transition-transform duration-200">
                                {doctor.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${doctor.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold truncate">{doctor.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {doctor.gender}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                              <Stethoscope className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="text-sm font-medium">{doctor.specialty}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-xs">
                              <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                                <Mail className="w-3 h-3 text-primary" />
                              </div>
                              <span className="truncate max-w-[200px]">{doctor.email}</span>
                            </div>
                            {doctor.phoneNumber && (
                              <div className="flex items-center gap-2 text-xs">
                                <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                                  <Phone className="w-3 h-3 text-primary" />
                                </div>
                                <span>{doctor.phoneNumber}</span>
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                              <p className="text-lg font-bold">{doctor.appointmentCount ?? 0}</p>
                              <p className="text-xs text-muted-foreground">Total</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <Badge
                            variant={doctor.isActive ? "default" : "secondary"}
                            className={
                              doctor.isActive
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
                                : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-gray-500/20"
                            }
                          >
                            {doctor.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleView(doctor)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(doctor)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Doctor
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleDelete(doctor.id)}
                                className="text-red-500 focus:text-red-500"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Doctor
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* View Doctor Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">Doctor Details</DialogTitle>
            </DialogHeader>
            {selectedDoctor && (
              <div className="space-y-4 sm:space-y-6">
                {/* Avatar and Name */}
                <div className="flex items-center gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-border">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center font-bold text-2xl sm:text-3xl shrink-0">
                    {selectedDoctor.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold truncate">{selectedDoctor.name}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base truncate">{selectedDoctor.specialty}</p>
                    <Badge
                      variant={selectedDoctor.isActive ? "default" : "secondary"}
                      className="mt-2"
                    >
                      {selectedDoctor.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm sm:text-base break-all">{selectedDoctor.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-sm sm:text-base">{selectedDoctor.phoneNumber || "N/A"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium text-sm sm:text-base">{selectedDoctor.gender}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Appointments</p>
                    <p className="font-medium text-xl sm:text-2xl">{selectedDoctor.appointmentCount ?? 0}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DoctorsManagement;