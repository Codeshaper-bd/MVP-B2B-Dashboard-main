import type { ReactNode } from "react";

interface ISlot {
  children: ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
  label: string;
}
function Slot({ children, containerRef, label }: ISlot) {
  return (
    <div>
      <h4 className="mb-2 text-center text-sm font-medium">{label}</h4>
      <div
        ref={containerRef || undefined}
        className="no-scrollbar flex h-48 flex-col items-center"
      >
        {children}
      </div>
    </div>
  );
}

export default Slot;
