import FileCheck from "@/components/icons/FileCheck";
import FileX from "@/components/icons/FileX";
import ChecklistCard, {
  type ChecklistCardProps,
} from "@/components/modules/employees/ChecklistCard";

const data: ChecklistCardProps[] = [
  {
    icon: <FileCheck className="size-7 text-white" />,
    iconColor: "#6938EF",
    title: "Opening Checklist",
    description:
      "Morning to-do list to prepare the venue and make sure everything is ready for visitors.",
    link: "./checklist/opening-checklist",
    hasArrow: true,
  },
  {
    icon: <FileX className="size-7 text-white" />,
    iconColor: "#C11574",
    title: "Closing Checklist",
    description:
      "Closing task list to ensure area is clean and safe, and prepare for the next day.",
    link: "./checklist/closing-checklist",
    hasArrow: true,
  },
];
function ConfigureChecklist() {
  return (
    <div className="py-6">
      <h2 className="text-center text-2xl font-semibold text-white">
        Configure
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {data.map((item, index) => (
          <ChecklistCard
            key={index}
            icon={item.icon}
            iconColor={item.iconColor}
            title={item.title}
            description={item.description}
            link={item.link}
            hasArrow={item.hasArrow}
          />
        ))}
      </div>
    </div>
  );
}

export default ConfigureChecklist;
