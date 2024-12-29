export const setCookie = (value: string, days?: number): void => {
  if (typeof document === "undefined") {
    console.warn("Cookies are not supported in the current environment.");
    return;
  }

  const exdate = new Date();
  exdate.setDate(exdate.getDate() + (days || 0)); // 설정 일수만큼 현재 시간에 만료값 지정

  const cookieValue =
    encodeURIComponent(value) +
    (typeof days === "undefined" ? "" : `; expires=${exdate.toUTCString()}`);
  document.cookie = `pathName=${cookieValue}`;
};

export const getCookie = (): string => {
  if (typeof document === "undefined") {
    console.warn("Cookies are not supported in the current environment.");
    return "";
  }

  const nameOfCookie = `pathName=`;
  let x = 0;

  while (x <= document.cookie.length) {
    const y = x + nameOfCookie.length;

    if (document.cookie.substring(x, y) === nameOfCookie) {
      let endOfCookie = document.cookie.indexOf(";", y);

      if (endOfCookie === -1) {
        endOfCookie = document.cookie.length;
      }

      return decodeURIComponent(document.cookie.substring(y, endOfCookie));
    }

    x = document.cookie.indexOf(" ", x) + 1;

    if (x === 0) {
      break;
    }
  }

  return "";
};
