import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
} from "recoil";

interface TimerImageType {
  timerImage: File | undefined;
}
const timerImage = atom<TimerImageType>({
  key: "timerImage",
  default: { timerImage: undefined },
});

export const useTimerImage = () => useRecoilState(timerImage);
export const useTimerImageValue = () => useRecoilValue(timerImage);
export const useTimerImageWrite = () => useSetRecoilState(timerImage);
