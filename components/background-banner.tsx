import Image from "next/image";

type Props = {
  image: string;
  title: string;
};
function BackgroundBanner({ image, title }: Props) {
  return (
    <div className="relative flex h-[228px] w-full items-center justify-center overflow-hidden rounded-2xl md:min-h-[228px]">
      <Image
        src={image}
        alt="bg banner"
        width={1440}
        height={228}
        className="absolute h-full w-full object-cover"
        loading="lazy"
      />
      <h2 className="relative p-10 text-4xl font-semibold text-default-900">
        {title}
      </h2>
    </div>
  );
}

export default BackgroundBanner;
