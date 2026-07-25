import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { compContents } from "../../const";

export default function Component5() {
  const controls = useAnimation();
  const [ref, inView] = useInView();

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
    <motion.div
      className="pc-wrapper5"
      ref={ref}
      variants={boxVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="pc-plan-section">
        <h2 className="compare-title">
          직접 만들지 마세요.
          <br />
          이미 더 완벽한 넥스트룸이 있습니다.
          {/* 넥스트룸이 훨씬 낫습니다. */}
        </h2>
        <p className="compare-sub">무엇이 다른지 항목별로 비교해보세요.</p>

        <div className="compare-table-wrapper">
          <div className="compare-header">
            <div className="col-category"></div>
            <div className="col-outsourcing">외주 의뢰</div>
            <div className="col-nextroom">
              <span>넥스트룸</span>
              <span className="badge-recommend">추천</span>
            </div>
          </div>

          <div className="compare-body">
            {compContents.map((item, idx) => (
              <div className="compare-row" key={idx}>
                <div className="col-category">{item.category}</div>
                <div className="col-outsourcing">
                  <span
                    dangerouslySetInnerHTML={{ __html: item.outsourcing }}
                  />
                </div>
                <div className="col-nextroom">
                  <svg
                    className="check-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" fill="#10B981" />
                    <path
                      d="M8.5 12.5L10.5 14.5L15.5 9.5"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: item.nextroom }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
