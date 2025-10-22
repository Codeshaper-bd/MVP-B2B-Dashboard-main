"use client";
import { memo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Inputs = {
  example: string;
  exampleRequired: string;
};

function LockScreen() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          defaultValue="dashcode@gmail.com"
          {...register("example")}
          className="h-[48px] text-sm text-default-900"
        />
      </div>

      <Button type="submit" fullWidth>
        Unlock
      </Button>
    </form>
  );
}
export default memo(LockScreen);
