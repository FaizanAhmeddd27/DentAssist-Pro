import { Gender } from "@prisma/client";

export const doctors = [
  {
    name: "John Smith",
    specialty: "General Dentist",
    gender: Gender.MALE,
    bio: "Experienced general dentist providing routine checkups.",
    email: "johnsmith@gmail.com"
  },
  {
    name: "Emily Johnson",
    specialty: "Orthodontist",
    gender: Gender.FEMALE,
    bio: "Specialist in braces and smile correction.",
    email: "emilyjohnson@gmail.com"
  },
  {
    name: "Michael Brown",
    specialty: "Endodontist",
    gender: Gender.MALE,
    bio: "Expert in root canal treatments.",
    email: "michaelbrown@gmail.com"
  },
  {
    name: "Sophia Wilson",
    specialty: "Pediatric Dentist",
    gender: Gender.FEMALE,
    bio: "Focused on dental care for children and teens.",
    email: "sophiawilson@gmail.com"
  },
  {
    name: "David Miller",
    specialty: "Oral Surgeon",
    gender: Gender.MALE,
    bio: "Performs tooth extractions and oral surgeries.",
    email: "davidmiller@gmail.com"
  },
  {
    name: "Olivia Davis",
    specialty: "Cosmetic Dentist",
    gender: Gender.FEMALE,
    bio: "Expert in teeth whitening and smile makeovers.",
    email: "oliviadavis@gmail.com"
  },
  {
    name: "James Anderson",
    specialty: "Periodontist",
    gender: Gender.MALE,
    bio: "Treats gum disease and dental implants.",
    email: "jamesanderson@gmail.com"

  },
  {
    name: "Emma Taylor",
    specialty: "Prosthodontist",
    gender: Gender.FEMALE,
    bio: "Specialist in crowns, bridges, and dentures.",
    email: "emmataylor@gmail.com"
  },
  {
    name: "Daniel Thomas",
    specialty: "Implantologist",
    gender: Gender.MALE,
    bio: "Advanced dental implant specialist.",
    email: "danielthomas@gmail.com"
  },
  
];
