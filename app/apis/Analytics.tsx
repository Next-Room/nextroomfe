"use client";

import { isDevMode } from "@/consts/env";
import Script from "next/script";
import * as gtag from "./gtag";

function Analytics() {
  // You can show in the console the GA_TRACKING_ID to confirm
  if (isDevMode) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('ts', new Date());
                      gtag('config', '${gtag.GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      });
                    `,
        }}
      />
    </>
  );
}

export default Analytics;
