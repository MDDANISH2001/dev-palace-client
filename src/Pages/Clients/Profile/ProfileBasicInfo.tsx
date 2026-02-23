import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IClient } from "@/types/clientTypes/clientAuth.types";
import { validateEmail } from "@/utils/validation";

interface ProfileBasicInfoProps {
  profile: Partial<IClient>;
  onSave: (updatedProfile: Partial<IClient>) => Promise<void>;
  isLoading: boolean;
}

export const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({
  profile,
  onSave,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<IClient>>(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailValidation = validateEmail(formData.email);
      if (!emailValidation.isValid) {
        newErrors.email = emailValidation.error || "Invalid email";
      }
    }

    if (formData.phone && !/^\+?[\d\s-()]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      await onSave(formData);
      setIsEditing(false);
    } catch {
      setErrors({ submit: "Failed to update profile" });
    }
  };

  const handleCancel = () => {
    setFormData(profile);
    setErrors({});
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Basic Information
          </h2>
          <Button
            onClick={() => setIsEditing(true)}
            variant="default"
            size="sm"
          >
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Full Name</p>
            <p className="font-medium text-foreground">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Email</p>
            <p className="font-medium text-foreground">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Phone</p>
            <p className="font-medium text-foreground">
              {profile.phone || "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Company</p>
            <p className="font-medium text-foreground">
              {profile.company || "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Address</p>
            <p className="font-medium text-foreground">
              {profile.address || "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Company Size</p>
            <p className="font-medium text-foreground">
              {profile.companySize || "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Industry</p>
            <p className="font-medium text-foreground">
              {profile.industry || "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Website</p>
            <p className="font-medium text-foreground text-primary truncate">
              {profile.companyWebsite ? (
                <a
                  href={profile.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.companyWebsite}
                </a>
              ) : (
                "-"
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Edit Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <Input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <Input
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Name
          </label>
          <Input
            name="company"
            value={formData.company || ""}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Address
          </label>
          <Input
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Enter your address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Size
          </label>
          <Input
            name="companySize"
            value={formData.companySize || ""}
            onChange={handleChange}
            placeholder="e.g., 1-50, 50-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Industry
          </label>
          <Input
            name="industry"
            value={formData.industry || ""}
            onChange={handleChange}
            placeholder="e.g., Technology, Finance"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Company Website
          </label>
          <Input
            name="companyWebsite"
            value={formData.companyWebsite || ""}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>
      </div>

      {errors.submit && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
          {errors.submit}
        </div>
      )}

      <div className="flex gap-3 justify-end">
        <Button onClick={handleCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
