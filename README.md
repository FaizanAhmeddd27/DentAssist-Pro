# AI Dental Assistant

An intelligent dental appointment management system powered by AI, featuring voice interactions, automated scheduling, and comprehensive patient management.

## Features

- **AI-Powered Voice Assistant**: Integrated with Vapi.ai for natural voice conversations
- **Appointment Booking**: Seamless booking system with real-time availability
- **Doctor Management**: Admin dashboard for managing dental professionals
- **Patient Dashboard**: Personalized health overview and appointment tracking
- **Email Notifications**: Automated appointment confirmations via Resend
- **Authentication**: Secure user authentication with Clerk
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **Database**: Prisma with PostgreSQL
- **Authentication**: Clerk
- **Voice AI**: Vapi.ai
- **Email**: Resend
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- PostgreSQL database

### Installation

1. Clone the repository:
```
git clone https://github.com/FaizanAhmeddd27/DentAssist-Pro.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
DATABASE_URL="your-postgresql-connection-string"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key
CLERK_SECRET_KEY=your-clerk-secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
VAPI_API_KEY=your-vapi-key
RESEND_API_KEY=your-resend-key
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

- **Patients**: Book appointments, view dental health overview, and interact with the voice assistant
- **Admins**: Manage doctors, view appointments, and oversee the system
- **Voice Assistant**: Navigate to `/voice` for AI-powered dental consultations

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
└── providers/          # Context providers
prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Database seeding script
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Voice AI powered by [Vapi.ai](https://vapi.ai)
- Authentication by [Clerk](https://clerk.com)
