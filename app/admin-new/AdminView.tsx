import React from "react";
import "./(style)/admin.modules.sass";
import Sidebar from "@/admin-new/(components)/Sidebar";
import ContentArea from "@/admin-new/(components)/ContentArea";
import Toast from "@/components/common/Toast/Toast";

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
  return (
    <div className="main">
      <Sidebar {...props} />
      <ContentArea />
      {isOpen && <Toast />}
    </div>
  );
}

export default AdminView;
