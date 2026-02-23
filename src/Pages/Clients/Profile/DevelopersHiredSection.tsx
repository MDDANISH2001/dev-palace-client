import React from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import type { IDevelopersHired } from '@/types/clientTypes/clientAuth.types';

interface DevelopersHiredSectionProps {
  developers: IDevelopersHired[] | undefined;
}

export const DevelopersHiredSection: React.FC<DevelopersHiredSectionProps> = ({
  developers,
}) => {
  const navigate = useNavigate();

  if (!developers || developers.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Developers Hired
        </h2>
        <p className="text-muted-foreground text-center py-8">
          No developers hired yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Developers Hired ({developers.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {developers.map((developer) => (
          <div
            key={developer._id}
            className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={developer.profileImg}
                alt={developer.name}
                className="w-16 h-16 rounded-lg object-cover border border-border"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{developer.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {developer.hourlyRate}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground">Skills</p>
                <p className="text-foreground">{developer.skills}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Experience</p>
                <p className="text-foreground">{developer.experience}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Availability</p>
                <p className="text-foreground">{developer.availibility}</p>
              </div>
            </div>

            <Button
              onClick={() => navigate(`/dev-profile/${developer._id}`)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              View Profile
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
