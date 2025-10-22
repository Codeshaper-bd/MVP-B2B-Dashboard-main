import Image from "next/image";

function ImageLoader() {
  return (
    <div className="h-[170px] w-full rounded-md">
      <Image
        src="/images/all-img/loader.gif"
        unoptimized
        alt="placeholder"
        width={300}
        height={170}
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  );
}

export default ImageLoader;
