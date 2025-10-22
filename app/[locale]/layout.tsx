import "leaflet/dist/leaflet.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "react-datepicker/dist/react-datepicker.css";
import "react-device-frameset/styles/marvel-devices.min.css";
import { Toaster as ReactHotToaster } from "react-hot-toast";
import "react-phone-input-2/lib/style.css";
import { getLangDir } from "rtl-detect";

import { inter } from "@/config/fonts";
import { getSeoMeta } from "@/lib/get-seo-meta";
import DirectionProvider from "@/providers/direction-provider";
import MountedProvider from "@/providers/mounted.provider";
import ThemeProvider from "@/providers/theme-provider";
import ReduxStoreProvider from "@/store/ReduxStoreProvider";
import CleanUnusedLocalStorage from "@/components/CleanUnusedLocalStorage";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

type TRootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>;

export const metadata = getSeoMeta();

const isSelectAbleContentClass =
  process.env.NEXT_PUBLIC_NODE_ENV !== "development" ? "select-none" : "";

export default async function RootLayout({
  children,
  params: { locale },
}: TRootLayoutProps) {
  const messages = await getMessages();
  const direction = getLangDir(locale);

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${inter.className} dashcode-app ${isSelectAbleContentClass}`}
      >
        <CleanUnusedLocalStorage />
        <ReduxStoreProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ThemeProvider attribute="class" defaultTheme="light">
              <MountedProvider>
                <DirectionProvider direction={direction}>
                  {children}
                </DirectionProvider>
              </MountedProvider>
              <Toaster />
              <SonnerToaster />
              <ReactHotToaster />
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
