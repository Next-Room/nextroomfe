import { Metadata } from "next";
import { ReactNode, Suspense } from "react";

import "./(shared)/styles/reset.css";
import Recoil from "@/(shared)/lib/recoil";
import ReactQueryProvider from "@/(shared)/lib/reactQueryProvider";
import RequireAuth from "@/(shared)/auth/helpers/RequireAuth";

import Clarity from "./(shared)/utils/Clarity";
import Analytics from "./(shared)/utils/Analytics";
import Loader from "./(shared)/components/Loader/Loader";

export const metadata: Metadata = {
  title: "넥스트룸 (NEXT ROOM) | 방탈출 힌트폰 서비스",
  description:
    "방탈출 운영이 편리해지고 테마 만족도가 올라가는 힌트폰 서비스 넥스트룸",
  openGraph: {
    url: "https://nextroom.co.kr",
    type: "website",
    description:
      "방탈출 운영이 편리해지고 테마 만족도가 올라가는 힌트폰 서비스 넥스트룸",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Suspense fallback={<Loader />}>
          <Analytics />
          <Clarity />
        </Suspense>
        <Recoil>
          <ReactQueryProvider>
            <RequireAuth>{children}</RequireAuth>
          </ReactQueryProvider>
        </Recoil>
        <div id="modal-root" />
      </body>
    </html>
  );
}
