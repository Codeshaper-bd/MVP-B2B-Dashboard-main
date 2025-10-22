"use client";

import PageError, {
  type TPageErrorProps,
} from "@/components/page-states/page-error";

export default function GlobalError(props: TPageErrorProps) {
  return (
    <html>
      <body>
        <PageError {...props} mode="global" />
      </body>
    </html>
  );
}
