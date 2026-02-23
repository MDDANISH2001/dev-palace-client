import React from "react";
import type { ReviewType } from "@/types/shared.types";

interface ReviewsSectionProps {
  reviews: ReviewType[] | undefined;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const getStarRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="text-lg">
        {i < Math.floor(rating) ? "★" : "☆"}
      </span>
    ));
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Reviews</h2>
        <p className="text-muted-foreground text-center py-8">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        Reviews ({reviews.length})
      </h2>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border-b border-border pb-4 last:border-b-0"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-foreground">
                  {review.reviewerId || "Anonymous"}
                </p>
                <div className="flex gap-1 mt-1 text-amber-500">
                  {getStarRating(review.rating || 0)}
                </div>
              </div>
              {review.createdAt && (
                <p className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <p className="text-sm text-foreground text-justify">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
