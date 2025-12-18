# Project Posting Form - Implementation Guide

## 📋 Overview

A comprehensive, client-friendly project posting form with AI-powered features, multi-step wizard, and state persistence.

## ✨ Features

### 1. **Smart Multi-Step Form**
- **Step 1**: Project Type Selection (Listed/Instant/Direct)
- **Step 2**: Description & AI Analysis
- **Step 3**: Skills, Budget & Timeline
- **Step 4**: Developer Selection (Direct projects only)
- **Step 5**: Media Upload & SOW
- **Step 6**: Review & Submit

### 2. **AI-Powered Assistance**
- **Skills Analysis**: Automatically extract required skills from project description
- **Budget Estimation**: AI estimates budget based on description and location
- Location-aware pricing (different rates for different countries)

### 3. **Client-Friendly Design**
- Plain English descriptions for technical terms
- Optional fields with helpful tooltips
- Visual progress indicator
- Inline validation and feedback

### 4. **State Persistence**
- Form data saved to localStorage
- Survives page refreshes
- Auto-clears after successful submission

### 5. **Smart Form Flow**
- Conditional steps based on project type
- Skip developer selection for Listed/Instant projects
- Dynamic validation per step

## 🏗️ Architecture

### File Structure
```
src/
├── apis/
│   ├── config.ts                    # Updated with project endpoints
│   ├── types/project.types.ts       # TypeScript interfaces
│   ├── services/project.service.ts  # API service functions
│   └── hooks/useProject.ts          # TanStack Query hooks
├── components/ui/
│   ├── FileUpload.tsx               # Drag-drop file uploader
│   └── MultiSelect.tsx              # Skills multi-select
├── hooks/
│   ├── useLocationDetector.ts       # Geolocation detection
│   └── useProjectFormSubmit.ts      # Form submission logic
├── store/
│   └── useProjectFormStore.ts       # Zustand store with persistence
└── Pages/Clients/PostProjects/
    ├── index.tsx                    # Main export
    ├── PostProjectForm.tsx          # Main form component
    ├── ProjectTypeStep.tsx          # Step 1
    ├── DescriptionStep.tsx          # Step 2
    ├── DetailsStep.tsx              # Step 3
    ├── DeveloperSelectionStep.tsx   # Step 4
    ├── MediaUploadStep.tsx          # Step 5
    └── ReviewStep.tsx               # Step 6
```

## 🔌 API Integration

### Required Backend Endpoints

#### 1. Analyze Skills (Optional - AI Feature)
```
POST /projects/analyze-skills
Body: { description: string }
Response: {
  success: boolean
  data: {
    skills: string[]
    confidence: number
    suggestions?: string[]
  }
}
```

#### 2. Estimate Budget (Optional - AI Feature)
```
POST /projects/estimate-budget
Body: {
  description: string
  location?: string
  projectType?: string
  durationEstimate?: string
}
Response: {
  success: boolean
  data: {
    budget: { min: number, max: number }
    currency: string
    confidence: number
    factors?: string[]
  }
}
```

#### 3. Get Selectable Developers
```
GET /common/connected-devs
Response: {
  success: boolean
  data: Array<{
    devId: string
    name: string
    profileImg: string
    skills: string[]
    availability: "available" | "offline" | "busy"
  }>
}
```

#### 4. Create Project
```
POST /projects
Body: CreateProjectRequest (see types/project.types.ts)
Response: {
  success: boolean
  data: Project (full project object)
  matchedDeveloperCount?: number
}
```

## 🚀 Usage

### Basic Integration

```tsx
// In your router/app
import { PostProjectForm } from '@/Pages/Clients/PostProjects';

// Add route
<Route path="/post-project" element={<PostProjectForm />} />
```

### Navigation After Submission

The form automatically redirects to:
```
/project-details/:projectId
```

Make sure you have this route defined in your application.

## 🎨 Customization

### Styling
All components use Tailwind CSS with your existing design system. Colors and styles inherit from:
- `@/components/ui/*` (shadcn components)
- Your global theme (primary, secondary, etc.)

### Modify Common Skills
Edit `COMMON_SKILLS` array in `DetailsStep.tsx`:
```tsx
const COMMON_SKILLS = [
  "React", "Node.js", "Python", // ... add your skills
];
```

### Adjust File Upload Limits
Modify in `FileUpload.tsx`:
```tsx
maxSizeMB={10}  // Change max file size
maxFiles={5}    // Change max file count
```

## 🔐 Authentication

The form automatically:
1. Retrieves `clientId` from localStorage (`user` object)
2. Redirects to `/login` if user not found
3. Includes `clientId` in project creation request

User object expected format:
```json
{
  "_id": "string",  // or "id"
  "name": "string",
  // ... other user fields
}
```

## 🧪 Testing the Form

### 1. Test Basic Flow (Listed Project)
- Navigate to `/post-project`
- Select "Post Publicly"
- Fill title and description (50+ chars)
- Add skills manually or use AI
- Set optional budget
- Skip to review and submit

### 2. Test AI Features
- Enter detailed description (100+ words)
- Click "Analyze Project"
- Verify skills are suggested
- Verify budget is estimated
- Check that suggestions are applied

### 3. Test Direct Assignment
- Select "Hire Directly"
- Go through steps
- Verify developer selection appears at Step 4
- Select developer(s)
- Complete submission

### 4. Test Persistence
- Start filling form
- Refresh page
- Verify data is restored
- Complete and submit
- Verify localStorage is cleared

## 🐛 Troubleshooting

### Form State Not Persisting
Check browser console for localStorage errors. Ensure:
- LocalStorage is enabled
- Key `project-form-storage` has data

### AI Analysis Not Working
1. Check backend endpoint is implemented
2. Verify API endpoint in `config.ts`
3. Check network tab for API errors
4. The form gracefully degrades if AI fails

### Developer List Empty
1. Ensure `/common/connected-devs` endpoint works
2. Check that client has chat history
3. Verify response format matches types

### Navigation After Submit Fails
1. Ensure route `/project-details/:projectId` exists
2. Check that backend returns `_id` in response
3. Verify React Router is properly configured

## 📝 Backend Implementation Notes

### AI Implementation Recommendation

For skills analysis and budget estimation, use:
- **OpenAI GPT-3.5-turbo** (cost-effective)
- **OpenAI GPT-4** (more accurate)
- **Anthropic Claude** (alternative)

Example prompt for skills:
```
Extract technical skills required from this project description:
"[description]"

Return only a JSON array of skill strings.
```

Example prompt for budget:
```
Estimate the budget for this project in [location]:
"[description]"

Consider: complexity, timeline, market rates in [location].
Return: { "min": number, "max": number }
```

### Socket Notifications

Backend should emit socket events when project is created:
- Room: `userType:developer` (all developers)
- Room: `notification:${projectType}`
- Room: `notification:urgency:${urgencyLevel}`
- Direct: `user:${developerId}` (matched developers)

Format:
```json
{
  "id": "string",
  "type": "project_posted",
  "title": "string",
  "message": "string",
  "data": {
    "projectId": "string",
    "projectType": "string",
    "urgencyLevel": "string"
  },
  "timestamp": "ISO-8601"
}
```

## 🎯 Best Practices

1. **Always validate on backend** - Frontend validation is for UX only
2. **Handle AI failures gracefully** - Form works without AI features
3. **Test file uploads** - Implement actual file storage (S3, Cloudinary, etc.)
4. **Rate limit AI calls** - Prevent abuse of AI endpoints
5. **Log errors** - Monitor failed submissions for debugging

## 📊 Analytics Events to Track

Consider tracking:
- Form abandonment rate per step
- AI feature usage rate
- Project type distribution
- Average completion time
- Error rates per step

## 🔄 Future Enhancements

Potential improvements:
- [ ] Draft saving (auto-save every 30 seconds)
- [ ] Project templates (pre-fill common project types)
- [ ] Skill suggestions from past projects
- [ ] Budget comparison with similar projects
- [ ] Real-time validation with debounce
- [ ] Progress saving to user account (not just localStorage)

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify API endpoints are working
3. Test with network tab open
4. Check Zustand DevTools (if installed)

---

**Built with**: React, TypeScript, TanStack Query, Zustand, Tailwind CSS, shadcn/ui
