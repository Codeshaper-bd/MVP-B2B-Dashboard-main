import { cn } from "@/lib/utils";

import FaRegStar from "../icons/FaRegStar";
import FaStar from "../icons/FaStar";
import FaStarHalfAlt from "../icons/FaStarHalfAlt";

interface IRatingProps {
  rating: number; // The current rating value
  maxRating?: number; // The maximum rating value (default is 5)
  className?: string; // Optional className for custom styling
  containerClassName?: string; // Optional containerClassName for custom styling
}

function Rating({
  rating,
  maxRating = 5,
  className = "",
  containerClassName = "",
}: IRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex !items-center gap-1", containerClassName)}>
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar
          className={cn("size-3.5 text-[#FAC515]", className)}
          key={`full-${index}`}
        />
      ))}

      {hasHalfStar && (
        <FaStarHalfAlt className={cn("size-3.5 text-[#FAC515]", className)} />
      )}

      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar
          className={cn("size-3.5 text-[#FAC515]", className)}
          key={`empty-${index}`}
        />
      ))}
    </div>
  );
}

export default Rating;
