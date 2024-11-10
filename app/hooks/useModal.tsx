
// useModal.ts
import { useCallback } from "react";
import { useModalState } from "@/components/atoms/modals.atom";

const useModal = () => {
  const [modals, setModals] = useModalState();

  // 모달 열기 함수
  const open = useCallback(
    <P extends object>(Component: React.FC<P>, props?: P) => {
      const modalId = `modal-${Date.now()}`; // 고유 ID 생성
      setModals((currentModals) => [
        ...currentModals,
        { Component, props, id: modalId },
      ]);
      return modalId; // ID 반환하여 나중에 특정 모달을 닫을 수 있게 함
    },
    [setModals]
  );

  // 특정 모달 닫기 함수
  const closeById = useCallback(
    (modalId: string) => {
      setModals((currentModals) =>
        currentModals.filter((modal) => modal.id !== modalId)
      );
    },
    [setModals]
  );

  // 가장 최근 모달 닫기
  const close = useCallback(() => {
    setModals((currentModals) => currentModals.slice(0, -1));
  }, [setModals]);

  // 모든 모달 닫기
  const closeAll = useCallback(() => {
    setModals([]);
  }, [setModals]);

  return { modals, open, close, closeById, closeAll };
};

export default useModal;
