import {
  atom,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil";

interface SelectedTheme {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
  themeImageUrl?: string;
  useTimerUrl?: boolean;
}

export const InitialSelectedTheme: SelectedTheme = {
  id: 0,
  title: "",
  timeLimit: 0,
  hintLimit: 0,
} as const;

const selectedThemeState = atom<SelectedTheme>({
  key: "selectedTheme",
  default: InitialSelectedTheme,
});
export const useSelectedTheme = () => useRecoilState(selectedThemeState);
export const useSelectedThemeValue = () => useRecoilValue(selectedThemeState);
export const useSelectedThemeWrite = () =>
  useSetRecoilState(selectedThemeState);
export const useSelectedThemeReset = () =>
  useResetRecoilState(selectedThemeState);
