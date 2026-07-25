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

export const qnas = [
  // {
  //   idx: 0,
  //   question: "넥스트룸은 무료 서비스인가요?",
  //   answer: `누구나 힌트폰의 기본 기능을 무료로 사용할 수 있습니다.
  //             <br />
  //             다만 일부 기능은 유료로 제공하고 있어요.
  //             <br />
  //             <br />
  //             현재 얼리버드 이벤트 기간으로, 49% 할인된 가격으로 제공하고
  //             있습니다.
  //             <br />
  //             지금 구독하신 분들은 평생 동결 가격으로 넥스트룸을 사용하실 수
  //             있어요!`,
  // },
  // {
  //   idx: 1,
  //   question: "구독 시 어떤 혜택이 있나요?",
  //   answer: `손님들에게 보여줄 힌트에 사진을 첨부해 더 자세한 설명을 제공할 수
  //             있어요.
  //             <br />
  //             타이머 화면의 배경을 테마 분위기에 맞게 커스텀하는 기능도
  //             제공해요.
  //             <br />더 자세한 내용은{" "}
  //             <Link
  //               href="https://nextroom-official.notion.site/38c311947d1d80ffa8d2e13f6c31f8d5?pvs=74"
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               <span className="text-white">여기</span>
  //             </Link>
  //             에서 확인해 보세요.`,
  // },
  {
    idx: 1,
    question: "비용은 얼마인가요?",
    answer: `현재 얼리버드 이벤트 기간으로, 비용은 월 29,900원입니다.
지금 구독하신 분들은 평생 동결 가격으로 넥스트룸을 사용하실 수 있어요!
결제는 앱에서 가능합니다.`,
  },
  {
    idx: 2,
    question:
      "타이머 화면에서 게임을 종료하고 새로운 게임을 시작하는 방법이 궁금해요.",
    answer: `타이머 화면의 좌측 상단에 희미하게 화살표가 있어요.
화살표를 1초 이상 꾹 누르면 타이머 화면에서 나갈 수 있습니다.
손님들이 실수로 게임을 종료하지 못하도록 설정해둔 소소한 장치에요.`,
  },
  {
    idx: 3,
    question: "비밀번호를 잊어버렸어요.",
    answer: `현재 넥스트룸은 비밀번호 찾기/변경 기능을 제공하지 않습니다.
만약 비밀번호를 잊으셨다면 공식계정(nextroom.official@gmail.com)으로 연락 주세요.`,
  },
  {
    idx: 4,
    question: "앱 사용중에 문제가 생겼어요.",
    answer: `일시적으로 발생하는 문제가 아니라면 다음 연락망을 통해 제보해주세요.
■ 공식 계정: nextroom.official@gmail.com
<a href="https://www.instagram.com/team_nextroom/" target="_blank" rel="noopener noreferrer">■ 인스타그램: https://www.instagram.com/team_nextroom/</a>
■ 연락처: 010-7416-9874
<br />
<img className="pc-faq-img" src="/images/landing/error-message.png" alt="error-message" width=240 />
에러 팝업의 오류 내용 보기 버튼을 클릭하여 같이 제보해주시면
더욱 빠른 조치가 가능합니다.`,
  },
  {
    idx: 5,
    question: "힌트 코드에는 숫자만 사용할 수 있나요?",
    answer: `넥스트룸은 숫자만 지원하고 있습니다.
손님들이 힌트 코드를 입력하는 데 시간을 지체하지 않기를 바라는 마음에 숫자만 지원하고 있어요.`,
  },
  {
    idx: 6,
    question: "안드로이드 폰에서만 사용 가능한가요?",
    answer: `안드로이드 기기라면 폰, 태블릿 관계없이 사용 가능합니다. iOS는 지원하지 않습니다.`,
  },
  {
    idx: 7,
    question: "넥스트룸을 사용하기 위한 최소 사양을 알고 싶어요.",
    answer: `최소 안드로이드 OS 버전이 7.0 이상이어야 다운로드 및 사용이 가능합니다.
원활한 사용을 위해 램은 최소 3GB 이상을 권장드립니다.`,
  },
];
