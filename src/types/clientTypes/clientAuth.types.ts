import type { IKeys, MediaType, ReviewType } from "../shared.types";

export interface IProjectsPosted {
  _id: string;
  title: string;
  status: string;
  budget: string;
  skillsRequired: string;
  projectType: string;
  urgencyLevel: string;
  createdAt?: string;
}

export interface IDevelopersHired {
  _id: string;
  name: string;
  profileImg: string;
  phone: string;
  skills: string;
  experience: string;
  hourlyRate: string;
  availibility: string;
}

export interface IClient extends Document {
  name: string;
  profileImg: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
  address?: string;
  companySize?: string;
  industry?: string;
  companyWebsite?: string;
  media?: MediaType[];
  projectsPosted?: IProjectsPosted[];
  isVerified?: boolean;
  reviews?: ReviewType[];
  developersHired?: IDevelopersHired[];
  keys: IKeys;
  createdAt?: Date;
  updatedAt?: Date;
}
