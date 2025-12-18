import React from "react";

export const NotVerified: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 text-center flex-col">
      <h1 className="text-4xl font-bold text-foreground">
        Email Verification Required
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Please verify your email address to access this content.
      </p>
    </div>
  );
};
