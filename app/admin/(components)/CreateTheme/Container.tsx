import { FormEvent } from "react";
import "../../(style)/createTheme.modules.sass";
import { useRouter } from "next/navigation";

import { usePostTheme } from "@/mutations/postTheme";
import { useCreateThemeValue } from "@/components/atoms/createTheme.atom";
import { useSelectedThemeWrite } from "@/components/atoms/selectedTheme.atom";
import { setSelectedThemeId } from "@/utils/storageUtil";

import CreateThemeTitle from "./CreateThemeTitle";
import CreateThemeBody from "./CreateThemeBody";
import CreateThemeAddButton from "./CreateThemeAddButton";

export default function CreateTheme() {
  const createTheme = useCreateThemeValue();
  const setSelectedTheme = useSelectedThemeWrite();
  const { mutateAsync: postTheme } = usePostTheme();
  const router = useRouter();
  const handleKeyDownSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isDisabled =
      (!(createTheme.title && createTheme.timeLimit && createTheme.hintLimit) &&
        createTheme.timeLimit < 1) ||
      createTheme.timeLimit > 10000 ||
      (createTheme.hintLimit && createTheme.hintLimit > 1000);
    if (isDisabled) {
      return;
    }
    try {
      const response = await postTheme(createTheme);
      const { id } = response.data.data;
      router.push(`/admin?themeId=${encodeURIComponent(id)}`);
      if (id) {
        setSelectedTheme(createTheme);
        setSelectedThemeId(id);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form className="create-theme" onSubmit={handleKeyDownSubmit}>
      <CreateThemeTitle />
      <CreateThemeBody />
      <CreateThemeAddButton />
    </form>
  );
}
