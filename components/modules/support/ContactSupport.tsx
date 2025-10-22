import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface IContact {
  contact: {
    images: { src: string }[];
    title: string;
    desc: string;
    buttonLink: string;
    buttonLabel: string;
  };
}
function ContactSupport({ contact }: IContact) {
  const { images, title, desc, buttonLink, buttonLabel } = contact;
  return (
    <Card>
      <CardContent className="flex justify-center py-10">
        <div className="mx-auto w-full max-w-[768px]">
          <div className="flex justify-center -space-x-3 [&>*:nth-child(2)]:z-10 [&>*:nth-child(2)]:-mt-2 [&>*:nth-child(2)]:h-14 [&>*:nth-child(2)]:w-14 [&>*]:h-12 [&>*]:w-12">
            {images.map((image, index) => (
              <Avatar
                key={`avatar-${index}`}
                className="bg-transparent shadow-none"
              >
                <AvatarImage src={image.src} />
                <AvatarFallback> PR </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <h3 className="mt-8 text-center text-xl font-semibold text-default-900">
            {title}
          </h3>
          <p className="mt-2 text-center text-lg text-default-600">{desc}</p>
          <div className="mt-8 flex justify-center">
            <Button
              asChild
              color="primary"
              variant="noborder"
              className="text-default"
              size="xl"
            >
              <Link href={buttonLink}>{buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ContactSupport;
