import { ExportModalType } from '@/types/modal';
import { useEffect, useRef, useState } from 'react';
import ModalFrame from '../ModalFrame';
import axios from "axios";
import { useRouter } from "next/navigation";

const UploadModal = ({
  setOnModal,
  dimClick,
  isDim = false,
  className
}: ExportModalType) => {
  const router = useRouter();

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      dimClick={dimClick}
      className={className}
    >
      모달
    </ModalFrame>
  );
};

export default UploadModal;