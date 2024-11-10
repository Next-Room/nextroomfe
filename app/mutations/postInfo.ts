import { addDoc, collection, Timestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/apis/firebase";

interface CreatePostProps {
  info: string;
}

export const postInfo = async ({ info }: CreatePostProps) => {
  await addDoc(collection(db, "info"), {
    info,
    createdAt: Timestamp.now(),
  });
};

export const usePostInfo = () => {
  const queryClient = useQueryClient();
  return useMutation(postInfo, {
    onSuccess: () => {
      
      queryClient.invalidateQueries(["info"]);
    },
    onError: (error: FirebaseError) => {
      console.error(error);
    },
  });
};
