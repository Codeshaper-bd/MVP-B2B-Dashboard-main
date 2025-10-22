import { cn } from "@/lib/utils";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IFilterDropdownProps {
  classNames?: {
    contentClassName?: string;
    triggerClassName?: string;
  };
  children?: React.ReactNode;
  buttonContent?: React.ReactNode;
  buttonRightIcon?: React.ReactNode;
  disableButtonRightIcon?: boolean;

  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
}

function FilterDropdown({
  isOpen,
  setIsOpen,
  classNames,
  children,
  buttonContent,
  buttonRightIcon,
  disableButtonRightIcon,
}: IFilterDropdownProps) {
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button color="secondary" className={cn(classNames?.triggerClassName)}>
          {buttonContent}
          {buttonRightIcon ||
            (!disableButtonRightIcon && (
              <ChevronDownIcon className="ms-1.5 h-5 w-5" />
            ))}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn("mt-2.5 w-[200px]", classNames?.contentClassName)}
        align="end"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterDropdown;
