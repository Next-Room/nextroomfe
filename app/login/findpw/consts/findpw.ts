export const FIND_PW_RESULT = {
  success: {
    title: "비밀번호 재설정 링크를 발송했습니다.",
    description: ["메일함과 스팸함을 확인해 주세요."],
    className: "",
    icon: "check",
  },
  notFound: {
    title: "가입되지 않은 이메일입니다.",
    description: [
      "해당 이메일로 가입된 계정이 없어",
      "비밀번호 재설정 메일을 발송하지 않았습니다.",
    ],
    className: "error",
    icon: "error",
  },
  google: {
    title: "구글 계정으로 가입된 이메일입니다.",
    description: [
      "구글 계정의 비밀번호는 넥스트룸에서 변경할 수 없습니다.",
      "구글 계정 설정에서 비밀번호를 변경해 주세요.",
    ],
    className: "error",
    icon: "error",
  },
  rateLimited: {
    title: "잠시 후 다시 시도해 주세요.",
    description: [
      "이미 비밀번호 재설정 메일을 요청하셨습니다.",
      "메일함과 스팸함을 먼저 확인해 주세요.",
    ],
    className: "warning",
    icon: "clock",
  },
} as const;
