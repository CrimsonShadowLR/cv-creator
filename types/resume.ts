export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  provider: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface Resume {
  id: string;
  title: string;
  lastEdited: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  courses: Course[];
  projects: Project[];
}
