import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

type Props = {
  image?: string;
  name?: string;
  email?: string;
  id?: string;
};
function UserBlock({ image, name, email, id }: Props) {
  return (
    <Card className="w-[286px]">
      <CardContent className="p-4">
        <div className="size-[254px] overflow-hidden rounded-[12px]">
          {image ? (
            <Image
              src={image}
              width={254}
              height={254}
              alt="Customer Details Image"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-default-50">
              <h1 className="text-[80px] font-normal text-default-600">AN</h1>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1.5 px-4">
        <h3>{name}</h3>
        <p>{email}</p>
        <p>ID: {id}</p>
      </CardFooter>
    </Card>
  );
}

export default UserBlock;
