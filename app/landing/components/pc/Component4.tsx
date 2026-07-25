import { useAnimation, motion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { logos, reviews, swipeBoxVariants } from "../../const";

const Component4 = forwardRef<HTMLDivElement>((_, divref) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((prev) => (prev + 1) % reviews.length);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div ref={divref}>
      <motion.div
        className="pc-wrapper4"
        ref={ref}
        variants={swipeBoxVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="pc-review-wrapper">
          <div className="pc-review-logos">
            {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
              <img key={idx} src={logo.src} alt={logo.alt} />
            ))}
          </div>
          <div className="pc-review-logos-text">
            20+개의 매장에서 넥스트룸 사용 중
          </div>
        </div>
        <div className="pc-main4">
          <div className="pc-review-box">
            <div className="pc-review-slider-window">
              <motion.div
                className="pc-review-track"
                animate={{ x: `-${index * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {reviews.map((review, i) => (
                  <div className="pc-review-slide" key={i}>
                    <p className="pc-review-title">{review.title}</p>
                    <p className="pc-review-content">{review.content}</p>
                    <p className="pc-review-writer">{review.writer}</p>
                  </div>
                ))}
              </motion.div>
            </div>
            <button className="arrow-left" onClick={prev}>
              ‹
            </button>
            <div className="dots">
              {reviews.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button className="arrow-right" onClick={next}>
              ›
            </button>
          </div>
          <div className="pc-title4">
            사장님들의 리얼 후기,
            <br />
            직접 확인해보세요.
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
export default Component4;
