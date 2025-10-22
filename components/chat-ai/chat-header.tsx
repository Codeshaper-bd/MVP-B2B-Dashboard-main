import Image from "next/image";

import XIcon from "@/components/icons/X";
import { Button } from "@/components/ui/button";

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function ChatHeader({ setOpen }: Props) {
  return (
    <div className="relative flex justify-center gap-4 px-6 py-5">
      <Image
        src="/images/all-img/ai-star.png"
        alt="dashcode"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <h3 className="text-xl font-semibold text-default-900">
        Fennec the AI Fox
      </h3>
      <Button
        size="icon"
        className="absolute end-6 top-3.5 h-10 w-10 border-none"
        rounded="full"
        onClick={() => setOpen(false)}
      >
        <XIcon className="size-3" />
      </Button>
    </div>
  );
}

export default ChatHeader;
