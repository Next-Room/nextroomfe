export const LOGIN_PATH = "/login";
const REDIRECT_KEY = "redirect";

// 외부 URL로 이동하지 않도록 같은 origin의 내부 경로만 허용한다.
const isInternalPath = (path: string | null): path is string => {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return false;
  if (path.startsWith("/\\")) return false;

  try {
    const url = new URL(path, window.location.origin);
    return (
      url.origin === window.location.origin &&
      !url.pathname.startsWith(LOGIN_PATH)
    );
  } catch {
    return false;
  }
};

export const getLoginPathWithRedirect = (path: string) => {
  if (typeof window === "undefined" || !isInternalPath(path)) return LOGIN_PATH;

  return `${LOGIN_PATH}?${REDIRECT_KEY}=${encodeURIComponent(path)}`;
};

export const getRedirectPath = (): string | null => {
  if (typeof window === "undefined") return null;

  const redirect = new URLSearchParams(window.location.search).get(
    REDIRECT_KEY
  );
  return isInternalPath(redirect) ? redirect : null;
};
