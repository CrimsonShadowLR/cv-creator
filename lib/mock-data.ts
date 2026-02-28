import type { Resume } from "@/types/resume";

export const mockResumes: Resume[] = [
  {
    id: "1",
    title: "Software Engineer CV",
    lastEdited: "Feb 27, 2026",
    personalInfo: {
      firstName: "Alex",
      lastName: "Johnson",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      city: "San Francisco",
      country: "United States",
      summary:
        "Experienced software engineer with 4+ years building scalable distributed systems and web applications.",
    },
    education: [
      {
        id: "e1",
        institution: "MIT",
        degree: "B.Sc.",
        field: "Computer Science",
        startDate: "2016",
        endDate: "2020",
      },
      {
        id: "e2",
        institution: "Stanford University",
        degree: "M.Sc.",
        field: "Software Engineering",
        startDate: "2020",
        endDate: "2022",
      },
    ],
    experience: [
      {
        id: "x1",
        company: "Google",
        title: "Senior Software Engineer",
        startDate: "2022",
        endDate: "Present",
        description:
          "Led a team of 8 engineers building distributed systems for cloud infrastructure. Reduced latency by 40% through architectural improvements.",
      },
      {
        id: "x2",
        company: "Meta",
        title: "Software Engineer",
        startDate: "2020",
        endDate: "2022",
        description:
          "Built and maintained React-based features for Facebook Marketplace. Improved page load time by 25% and implemented A/B testing framework.",
      },
    ],
    courses: [
      { id: "c1", name: "AWS Solutions Architect", provider: "Amazon", date: "2023" },
      { id: "c2", name: "Machine Learning Specialization", provider: "Coursera", date: "2022" },
      { id: "c3", name: "Advanced TypeScript", provider: "Frontend Masters", date: "2021" },
    ],
    projects: [
      {
        id: "p1",
        name: "ResumeForge",
        url: "https://resumeforge.io",
        description:
          "Full-stack web application that uses AI to help users create professional resumes. Features include template selection, real-time preview, and PDF export.",
      },
      {
        id: "p2",
        name: "ShopStream",
        url: "https://shopstream.io",
        description:
          "Scalable e-commerce solution with product management, cart system, payment processing, and order tracking. Deployed on Vercel with CI/CD pipeline.",
      },
    ],
  },
  {
    id: "2",
    title: "Product Manager Resume",
    lastEdited: "Feb 25, 2026",
    personalInfo: {
      firstName: "Jordan",
      lastName: "Smith",
      email: "jordan@example.com",
      phone: "+1 (555) 987-6543",
      city: "New York",
      country: "United States",
      summary: "Strategic product manager with 5 years of experience launching B2B SaaS products.",
    },
    education: [],
    experience: [],
    courses: [],
    projects: [],
  },
  {
    id: "3",
    title: "UX Designer Portfolio",
    lastEdited: "Feb 20, 2026",
    personalInfo: {
      firstName: "Sam",
      lastName: "Lee",
      email: "sam@example.com",
      phone: "+1 (555) 456-7890",
      city: "Austin",
      country: "United States",
      summary: "UX Designer with a passion for accessible, user-centered design.",
    },
    education: [],
    experience: [],
    courses: [],
    projects: [],
  },
  {
    id: "4",
    title: "Data Analyst CV",
    lastEdited: "Feb 15, 2026",
    personalInfo: {
      firstName: "Casey",
      lastName: "Brown",
      email: "casey@example.com",
      phone: "+1 (555) 321-0987",
      city: "Chicago",
      country: "United States",
      summary: "Data analyst specializing in Python, SQL, and business intelligence dashboards.",
    },
    education: [],
    experience: [],
    courses: [],
    projects: [],
  },
];
