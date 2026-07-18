export const reviews = [
  {
    idx: 1,
    title: "“여러 기기에서 바로 연동되니 훨씬 효율적이에요”",
    content:
      "직관적인 UI로 사용이 매우 편리하고, 지속적으로 업그레이드를 해주셔서 너무 좋습니다!",
    writer: "– 홍대 토끼굴 사장님",
  },
  {
    idx: 2,
    title: `“힌트 입력 과정이 너무 쉬워서 한 줄기 빛 같았어요”`,
    content:
      "관리자도, 이용자도 모두 쉽게 사용할 수 있었어요. 최고의 방탈출 힌트폰 앱입니다!",
    writer: "– 홍대 둡두 사장님",
  },
  {
    idx: 3,
    title: "“손님, 직원 모두에게 사용자 친화적인 서비스입니다.”",
    content:
      "굉장히 유저프렌들리하고 필요한 기능만 알차게 담겨 있어 운영에 많은 도움이 되었습니다.",
    writer: "– 신사 시그널헌터 사장님",
  },
  {
    idx: 3,
    title: "“어플 퀄리티가 너무 좋습니다”",
    content:
      "개선점 업데이트 등 고객 피드백도 빠르고 서비스도 깔끔해서 몇 년째 잘 사용하고 있습니다.",
    writer: "– 홍대 덤앤더머 사장님",
  },
];

export const logos = [
  {
    src: "/images/landing/storeLogos/rabbithole.png",
    alt: "rabbithole_logo",
  },
  {
    src: "/images/landing/storeLogos/doopdoo.png",
    alt: "doopdoo_logo",
  },
  {
    src: "/images/landing/storeLogos/signalhunter.png",
    alt: "signalhunter_logo",
  },
  {
    src: "/images/landing/storeLogos/labyrinth.png",
    alt: "labyrinth_logo",
  },
  {
    src: "/images/landing/storeLogos/dumbanddumber.png",
    alt: "dumbanddumber_logo",
  },
];

export const swipeBoxVariants = {
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
