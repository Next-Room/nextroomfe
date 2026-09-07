"use client";

import Link from "next/link";
import "../styles/footer.modules.sass";

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-title">넥스트룸(nextroom)</div>
          <div className="footer-info">
            대표: 김주환
            <br />
            사업자등록번호: 487-23-01961
            <span className="footer-mobile-line"> |</span>
            <span className="footer-mobile-newline">
              <br />
            </span>{" "}
            통신판매번호: 2024-서울강남-05436
            <br />
            <Link
              href="https://nextroom-official.notion.site/3be311947d1d8070b4c0dccd390912bf?pvs=74"
              target="_blank"
            >
              서비스이용약관
            </Link>{" "}
            |{" "}
            <Link
              href="https://nextroom-official.notion.site/38c311947d1d80618e61dfae7ad5d42b"
              target="_blank"
            >
              개인정보처리방침
            </Link>{" "}
            | 문의메일: nextroom.official@gmail.com
          </div>
          <div className="footer-sns">
            <Link
              href="https://www.instagram.com/team_nextroom/"
              target="_blank"
            >
              <img
                className="footer-sns-icon"
                src="/images/landing/insta_icon.jpg"
                alt="instaicon"
              />
            </Link>
            <Link href="https://pf.kakao.com/_mkBTn" target="_blank">
              <img
                className="footer-sns-icon"
                src="/images/landing/kakao_icon.jpg"
                alt="kakaoicon"
              />
            </Link>
          </div>
          <div className="footer-copyright">Copyright © 2023 nextroom</div>
        </div>
        <div className="footer-right">
          <img
            className="footer-qr"
            src="/images/landing/qr-code.png"
            alt="QR"
          />
          <div className="footer-qr-description">
            <img
              src="/images/landing/google-playstore.png"
              alt="googleplaystore"
              width={24}
              height={23}
            />
            <div>Android 앱 다운로드</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
