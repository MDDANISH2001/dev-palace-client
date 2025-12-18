/**
 * Project API Types
 * Type definitions for project-related API operations
 */

export interface MediaType {
  url: string;
  type: string;
}

export interface BudgetType {
  min: number;
  max: number;
}

export type ProjectType = "direct" | "listed" | "instant";
export type ProjectStatus = "pending" | "in-progress" | "completed" | "on-hold";
export type UrgencyLevel = "low" | "medium" | "high";
export type DeveloperAvailability = "available" | "offline" | "busy";

/**
 * Full Project Interface (from backend)
 */
export interface Project {
  _id: string;
  title: string;
  description: string;
  clientId: string;
  projectType: ProjectType;
  skillsRequired?: string[];
  budget?: BudgetType;
  durationEstimate?: string;
  urgencyLevel?: UrgencyLevel;
  status: ProjectStatus;
  sowUrl?: string;
  developerId?: string[];
  media?: MediaType[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create Project Request (for POST /projects)
 */
export interface CreateProjectRequest {
  title: string;
  description: string;
  projectType: ProjectType;
  skillsRequired?: string[];
  budget?: BudgetType;
  durationEstimate?: string;
  urgencyLevel?: UrgencyLevel;
  status?: ProjectStatus;
  sowUrl?: string;
  developerId?: string[];
  media?: MediaType[];
}

/**
 * Create Project Response
 */
export interface CreateProjectResponse {
  success: boolean;
  data: Project;
  matchedDeveloperCount?: number;
}

/**
 * Analyze Skills Request (for POST /projects/analyze-skills)
 */
export interface AnalyzeSkillsRequest {
  description: string;
}

/**
 * Analyze Skills Response
 */
export interface AnalyzeSkillsResponse {
  success: boolean;
  data: {
    skills: string[];
    confidence: number;
    suggestions?: string[];
  };
}

/**
 * Estimate Budget Request (for POST /projects/estimate-budget)
 */
export interface EstimateBudgetRequest {
  description: string;
  location?: string;
  projectType?: ProjectType;
  durationEstimate?: string;
}

/**
 * Estimate Budget Response
 */
export interface EstimateBudgetResponse {
  success: boolean;
  data: {
    budget: BudgetType;
    currency: string;
    confidence: number;
    factors?: string[];
  };
}

/**
 * Selectable Developer Interface (for GET /common/connected-devs)
 */
export interface SelectableDeveloper {
  devId: string;
  name: string;
  profileImg: string;
  skills: string[];
  availability: DeveloperAvailability;
}

/**
 * Get Selectable Developers Response
 */
export interface GetSelectableDevelopersResponse {
  success: boolean;
  data: SelectableDeveloper[];
}


/**
 * Update Project Request (for PUT /projects/:id)
 */
export interface UpdateProjectRequest {
  title?: string;
  description?: string;
  projectType?: ProjectType;
  skillsRequired?: string[];
  budget?: BudgetType;
  durationEstimate?: string;
  urgencyLevel?: UrgencyLevel;
  status?: ProjectStatus;
  sowUrl?: string;
  developerId?: string[];
  media?: MediaType[];
}

/**
 * Update Project Response
 */
export interface UpdateProjectResponse {
  success: boolean;
  data: Project;
}

/**
 * Generate SOW Request (for POST /projects/generate-sow)
 */
export interface GenerateSOWRequest {
  title: string;
  description: string;
  skillsRequired?: string[];
  budget?: BudgetType;
  durationEstimate?: string;
  projectType?: ProjectType;
}

/**
 * Generate SOW Response
 */
export interface GenerateSOWResponse {
  success: boolean;
  data: {
    sowUrl: string; // URL to the generated SOW document
    previewUrl?: string; // Optional preview URL if different
    documentId: string; // Document ID for future editing
  };
}
