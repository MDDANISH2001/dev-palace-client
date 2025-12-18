export interface Project {
  _id: string;
  title: string;
  description: string;
  clientId: string;
  projectType: "direct" | "listed" | "instant";
  skillsRequired?: string[];
  budget?: {
    min: number;
    max: number;
  };
  durationEstimate?: string;
  urgencyLevel?: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed" | "on-hold";
  sowUrl?: string;
  developerId?: string[];
  media?: Array<{
    url: string;
    type: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface GetProjectsResponse {
  success: true;
  message: string;
  data: {
    projects: Project[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      limit: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    }; 
  };
}

export interface getProjectParams {
  page?: number;
  limit?: number;
  status?: string;
  projectId?: string;
  myProjects?: boolean;
}

// Developer Types
export interface MediaType {
  url: string;
  type: string;
}

export interface ReviewType {
  _id: string;
  clientId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Developer {
  _id: string;
  name: string;
  email: string;
  profileImg?: string;
  phone?: string;
  company?: string;
  address?: string;
  skills?: string[];
  experience?: number;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  media?: MediaType[];
  projectsCompleted?: string[];
  reviews?: ReviewType[];
  hourlyRate?: number;
  availability?: "available" | "offline" | "busy";
}

export interface GetDevelopersResponse {
  success: true;
  message: string;
  data: {
    developers: Developer[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCount: number;
      limit: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface GetDeveloperProfileResponse {
  success: true;
  message: string;
  data: {
    developer: Developer;
  };
}

export interface SearchDevelopersParams {
  page?: number;
  limit?: number;
  search?: string;
  availability?: "available" | "offline" | "busy";
  experienceLevel?: "junior" | "mid" | "senior";
}