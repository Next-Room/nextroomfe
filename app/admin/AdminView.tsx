import React, { useEffect } from "react";

import "./(style)/admin.modules.sass";
import Sidebar from "@/admin/(components)/Sidebar";
import ContentArea from "@/admin/(components)/ContentArea";
import Toast from "@/components/common/Toast/Toast";
import NotiDialog from "@/components/common/Dialog-new/Noti-Dialog-new/Dialog";
import useModal from "@/hooks/useModal";
import { getLocalStorage } from "@/utils/storageUtil";

interface Theme {
  id: number;
  title: string;
  timeLimit: number;
  hintLimit: number;
}

interface Props {
  adminCode: string;
  shopName: string;
  categories: Theme[];
  selectedTheme: Theme;
  isOpen: boolean;
  handleClickSelected: (theme: Theme) => void;
}

function AdminView(props: Props) {
  const { isOpen } = props;
  const { open } = useModal();
  const isHideDialog = getLocalStorage("hideDialog");

  useEffect(() => {
    if (!isHideDialog) {
      open(NotiDialog, { type: "put" });
    }
  }, []);
  return (
    <div className="main">
      <Sidebar {...props} />
      <ContentArea />
      {isOpen && <Toast />}
    </div>
  );
}

export default AdminView;
