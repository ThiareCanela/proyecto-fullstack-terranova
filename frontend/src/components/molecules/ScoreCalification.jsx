import { Star } from "lucide-react";

/* eslint-disable react/prop-types */
export const ScoreCalification = ({ totalStars = 5 }) => {
  const stars = Array(totalStars).fill(null);
  return (
    <div className="flex gap-5">
      {stars.map((_, index) => (
        <Star key={index} className="text-2xl" />
      ))}
    </div>
  );
};
