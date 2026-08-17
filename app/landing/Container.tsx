"use client";

import "./styles/landing.modules.sass";

import Component1 from "./components/pc/Component1";
import Component2 from "./components/pc/Component2";
import Component3 from "./components/pc/Component3";
import Component4 from "./components/pc/Component4";
import Component5 from "./components/pc/Component5";
import Component6 from "./components/pc/Component6";
import PcBtn from "./components/pc/PcBtn";
import MobileBtn from "./components/mobile/MobileBtn";
import useScreen from "./hooks/useScreen";
import FooterComponent from "./components/Footer";
import NavbarComponent from "./components/Navbar";
import Component2Mobile from "./components/mobile/Component2Mobile";
import Component4Mobile from "./components/mobile/Component4Mobile";
import ComparePlanComponent from "./components/pc/ComparePlanComponent";

function LandingPage() {
  const {
    isMobile,
    isLoading,
    showBtn,
    component1Ref,
    component6Ref,
    component4Ref,
  } = useScreen();

  return (
    <>
      {isLoading && (
        <div className="container-wrapper">
          <NavbarComponent componentRef={component6Ref} isMobile={isMobile} />
          {isMobile ? (
            <>
              <Component1 ref={component1Ref} />
              <Component2Mobile />
              <Component3 />
              <Component4Mobile ref={component4Ref} />
              <ComparePlanComponent />
              <Component6 ref={component6Ref} />
              {showBtn && <MobileBtn />}
              <FooterComponent />
            </>
          ) : (
            <>
              <Component1 ref={component1Ref} />
              <Component2 />
              <Component3 />
              <Component4 ref={component4Ref} />
              <ComparePlanComponent />
              <Component6 ref={component6Ref} />
              {/* 조건부 렌더링을 통해 Btn 컴포넌트를 표시 */}
              {/* buttonProps를 전달하고 ref를 설정하여 DOM 요소를 참조합니다. */}
              {showBtn && <PcBtn />}
              <FooterComponent />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default LandingPage;
