import InfoIcon from "@/components/icons/InfoIcon";

interface StatusAlertProps {
  type?: "positive" | "negative";
  title: string;
  message?: string;
}

const STATUS_STYLES = {
  positive: {
    border: "border-[#17B26A]",
    bg: "bg-[#17B26A1A]",
    iconBg: "bg-[#17B26A]",
    iconColor: "text-white",
  },
  negative: {
    border: "border-[#F97066]",
    bg: "bg-[#F970661A]",
    iconBg: "bg-warning",
    iconColor: "text-default-1000",
  },
};

function ChecklistStatusAlert({
  type = "negative",
  title,
  message,
}: StatusAlertProps) {
  const styles = STATUS_STYLES[type];
  return (
    <div
      className={`flex items-center gap-3 rounded-[12px] border ${styles.border} ${styles.bg} px-4 py-3`}
    >
      <div
        className={`flex size-10 items-center justify-center rounded-[8px] ${styles.iconBg}`}
      >
        <InfoIcon className={`size-5 ${styles.iconColor}`} />
      </div>
      <div className="flex-1 space-y-1 text-default-1000">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm font-normal">{message}</p>
      </div>
    </div>
  );
}

export default ChecklistStatusAlert;
