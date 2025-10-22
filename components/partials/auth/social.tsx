import Image from "next/image";

function Social({ locale }: { locale: string }) {
  return (
    <>
      <ul className="flex">
        <li className="flex-1">
          <a
            href="#"
            className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#1C9CEB] p-2 text-2xl text-white"
          >
            <Image
              width={300}
              height={300}
              className="h-full w-full"
              src="/images/icon/tw.svg"
              alt=""
            />
          </a>
        </li>
        <li className="flex-1">
          <a
            href="#"
            className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#395599] p-2 text-2xl text-white"
          >
            <Image
              width={300}
              height={300}
              className="h-full w-full"
              src="/images/icon/fb.svg"
              alt=""
            />
          </a>
        </li>
        <li className="flex-1">
          <a
            href="#"
            className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#0A63BC] p-2 text-2xl text-white"
          >
            <Image
              width={300}
              height={300}
              className="h-full w-full"
              src="/images/icon/in.svg"
              alt=""
            />
          </a>
        </li>
        <li className="flex-1">
          <form
            noValidate
            action={async () => {
              "use server";
              // await signIn("google", {
              //   redirectTo: `/${locale}/dashboard/analytics`,
              // });
            }}
          >
            <button
              type="submit"
              className="inline-flex h-10 w-10 flex-col items-center justify-center rounded-full bg-[#EA4335] p-2 text-2xl text-white"
            >
              <Image
                width={300}
                height={300}
                className="h-full w-full"
                src="/images/icon/gp.svg"
                alt=""
              />
            </button>
          </form>
        </li>
      </ul>
    </>
  );
}

export default Social;
