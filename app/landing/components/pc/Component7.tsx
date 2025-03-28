import { useState, useEffect, forwardRef } from "react";
import { motion } from "framer-motion";

import Phone from "./Phone";
import Phone2 from "./Phone2";
import Phone3 from "./Phone3";
import Phone4 from "./Phone4";

const Component7 = forwardRef<HTMLDivElement>((_, ref) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof ref !== "function" && ref?.current) {
        const { scrollY } = window;
        const sectionHeight = window.innerHeight;
        const currentSection = Math.floor(
          (scrollY - ref.current.offsetTop) / sectionHeight
        );

        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return (
    <motion.div className="pc-wrapper7" ref={ref}>
      <Phone key="phone1" />
      {activeSection === 1 && <Phone2 key="phone2" />}
      {activeSection === 2 && <Phone3 key="phone3" />}
      {activeSection === 3 && <Phone4 key="phone4" />}
    </motion.div>
  );
});
export default Component7;
