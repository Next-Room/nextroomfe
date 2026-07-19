import { useAnimation, motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { qnas } from "@/landing/const";

const Component6 = forwardRef<HTMLDivElement>((_, divref) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const boxVariants = {
    hidden: {
      y: 100, // 시작 위치를 아래로 조정합니다.
      opacity: 0,
    },
    visible: {
      y: 0, // 최종 위치를 원래 위치로 설정합니다.
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div ref={divref}>
      <motion.div
        className="pc-wrapper6"
        ref={ref}
        variants={boxVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="pc-sub-title3">자주 묻는 질문</div>
        <div className="pc-faq-wrapper">
          {qnas.map((qna, i) => (
            <div
              key={i}
              className={`pc-faq-item ${openIndex === i ? "open" : ""}`}
              onClick={() => toggle(i)}
            >
              <div className="pc-faq-title">
                <div className="pc-faq-title-text">{qna.question}</div>
                <span className="arrow" />
              </div>
              <div
                className="faq-answer"
                dangerouslySetInnerHTML={{ __html: qna.answer }}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
});
export default Component6;
