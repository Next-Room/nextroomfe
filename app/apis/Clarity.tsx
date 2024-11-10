"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { isDevMode } from "@/consts/env";

function Clarity() {
  const pathname = usePathname();

  if (isDevMode) return null;

  if (pathname === "/admin") return null;

  const clarityScript = `
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "kmarcei8ka");
    `;
  // You can show in the console the GA_TRACKING_ID to confirm

  return (
    <Script
      id="clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: clarityScript,
      }}
    />
  );
}

export default Clarity;
