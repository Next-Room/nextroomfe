import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "@/lib/reactQueryProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastInfo } from "@/components/atoms/toast.atom";
import { QUERY_KEY } from "@/queries/getHintList";
import extractFilename from "@/utils/helper";

interface PreSignedUrlRequest {
  themeId: number;
  hintImageCount: number;
  answerImageCount: number;
}

interface PreSignedUrlResponse {
  code: number;
  message: string;
  data: {
    hintImageUrlList: string[];
    answerImageUrlList: string[];
  };
}

interface HintData {
  themeId: number;
  hintCode: string;
  contents: string;
  answer: string;
  progress: number;
  hintImageList: string[];
  answerImageList: string[];
  id: number;
}

interface UploadParams {
  url: string;
  file: File;
}

interface AxiosSameCodeError {
  code: number;
  message: string;
}

const getPreSignedUrl = async (
  params: PreSignedUrlRequest
): Promise<PreSignedUrlResponse> => {
  const { data } = await apiClient.get("/v1/hint/url", {
    params: {
      themeId: params.themeId,
      hintImageCount: params.hintImageCount,
      answerImageCount: params.answerImageCount,
    },
  });
  return data;
};

const uploadToS3 = async ({ url, file }: UploadParams): Promise<void> => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "image/png",
    },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status: ${response.status}`);
  }
};

const putHint = (data: HintData) => apiClient.put("/v1/hint", data);

const postHint = (data: HintData) => apiClient.post("/v1/hint", data);

const useHintUpload = () => {
  const [, setToast] = useToastInfo();
  const queryClient = useQueryClient();

  const presignedMutation = useMutation<
    PreSignedUrlResponse,
    AxiosError<AxiosSameCodeError>,
    PreSignedUrlRequest
  >({
    mutationFn: getPreSignedUrl,
    onError: (error) => {
      setToast({
        isOpen: true,
        title: error.message,
        text: "",
      });
    },
  });

  const uploadMutation = useMutation<void, Error, UploadParams>({
    mutationFn: uploadToS3,
    onError: (error) => {
      setToast({
        isOpen: true,
        title: error.message,
        text: "",
      });
    },
  });

  const hintMutation = useMutation<
    AxiosResponse,
    AxiosError<AxiosSameCodeError>,
    HintData
  >({
    mutationFn: (data) => (data.id > 0 ? putHint(data) : postHint(data)),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      setToast({
        isOpen: true,
        title: "힌트가 성공적으로 등록되었습니다.",
        text: "",
      });
    },
    onError: (error) => {
      if (error.response) {
        setToast({
          isOpen: true,
          title: error.response.data.message,
          text: "",
        });
        throw new Error(error.response.data.message);
      }
    },
  });

  const handleProcess = async (
    formData: HintData,
    hintFiles: File[],
    answerFiles: File[]
  ) => {
    try {
      const presignedResponse = await presignedMutation.mutateAsync({
        themeId: formData.themeId,
        hintImageCount: hintFiles.length,
        answerImageCount: answerFiles.length,
      });

      const { hintImageUrlList = [], answerImageUrlList = [] } =
        presignedResponse.data;

      if (hintFiles.length > 0) {
        await Promise.all(
          hintFiles.map((file, index) =>
            uploadMutation.mutateAsync({
              url: hintImageUrlList[index],
              file,
            })
          )
        );
      }

      if (answerFiles.length > 0) {
        await Promise.all(
          answerFiles.map((file, index) =>
            uploadMutation.mutateAsync({
              url: answerImageUrlList[index],
              file,
            })
          )
        );
      }

      const { hintImageList, answerImageList } = formData;

      const tempHintImageUrlList = [
        ...hintImageList,
        ...(hintFiles.length > 0
          ? hintImageUrlList.map((url) => extractFilename(url))
          : []),
      ];

      const tempAnswerImageUrlList = [
        ...answerImageList,
        ...(answerFiles.length > 0
          ? answerImageUrlList.map((url) => extractFilename(url))
          : []),
      ];

      const finalData: HintData = {
        ...formData,
        hintImageList: tempHintImageUrlList,
        answerImageList: tempAnswerImageUrlList,
      };

      await hintMutation.mutateAsync(finalData);
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          isOpen: true,
          title: error.message,
          text: "",
        });
      }
      throw error;
    }
  };

  return {
    handleProcess,
  };
};

export default useHintUpload;
