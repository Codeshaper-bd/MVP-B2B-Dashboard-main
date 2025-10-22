import type { TPromoter } from "@/store/api/promoters/promoters.types";

export interface IPromoterOptionProps {
  promoter: TPromoter;
  onSelect?: (promoter: TPromoter) => void;
}
function PromoterOption({ promoter, onSelect }: IPromoterOptionProps) {
  return (
    <div
      key={promoter.id}
      className="cursor-pointer border-b border-default-200 px-3 py-1.5 last:border-b-0 hover:bg-default-100"
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.(promoter);
      }}
    >
      <h3 className="mb-0.5 text-sm font-medium text-default-800">
        Name: {promoter?.fullName}
      </h3>
      <p className="text-sm font-normal text-default-600">
        Phone: {promoter?.phone}
      </p>
    </div>
  );
}

export default PromoterOption;
