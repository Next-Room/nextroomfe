import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile; // compressedFile 반환
  } catch (error) {
    throw new Error("Image compression error");
  }
};

export const convertToPng = async (file: File): Promise<File> =>
  new Promise<File>((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    // File을 로드하여 이미지로 변환
    reader.onload = (event) => {
      if (event.target?.result) {
        img.src = event.target.result as string;
      }
    };

    reader.onerror = (error) => reject(error);

    // FileReader로 파일을 읽음
    reader.readAsDataURL(file);

    // 이미지가 로드되면 Canvas에 그려서 PNG로 변환
    // eslint-disable-next-line consistent-return
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return reject(new Error("Canvas context not available")); // reject 호출
      }

      // Canvas 크기를 이미지 크기로 설정
      canvas.width = img.width;
      canvas.height = img.height;

      // Canvas에 이미지 그리기
      ctx.drawImage(img, 0, 0);

      // Canvas에서 PNG 형식의 Blob 얻기
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const pngFile = new File(
              [blob],
              file.name.replace(/\.\w+$/, ".png"),
              {
                type: "image/png",
                lastModified: Date.now(),
              }
            );
            resolve(pngFile); // PNG 파일 반환
          } else {
            reject(new Error("Blob creation failed"));
          }
        },
        "image/png",
        1.0
      );
    };

    img.onerror = (error) => reject(error);
  });
