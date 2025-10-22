"use client";
import { useForm } from "react-hook-form";

import PaperFlyIcon from "@/components/icons/PaperFlyIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type IProps = {
  message: string;
};
function ChatFooter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProps>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = (data: IProps) => {};

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-2 px-6 pt-5">
        <div className="flex-1">
          <Input
            placeholder="Type your message here..."
            className="w-full"
            {...register("message", { required: "Ask me anything" })}
          />
        </div>
        <div className="flex-none">
          <Button
            size="icon"
            type="submit"
            className="h-11 w-11 bg-gradient-to-b from-blue-500 to-pink-500"
          >
            <PaperFlyIcon className="size-5" />
          </Button>
        </div>
      </div>

      {errors?.message?.message && (
        <p className="ms-4 mt-3 text-sm font-medium text-destructive">
          {errors.message.message}
        </p>
      )}
    </form>
  );
}

export default ChatFooter;
