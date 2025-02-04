import { useSnackbar } from '@/provider/snackbarProvider';
import React from 'react';

const Test1 = () => {
  const { showSnackbar } = useSnackbar();

  const handleShowSnackbar = () => {
    showSnackbar('테스트1', 4000);
  };

  return (
    <div>
      <button onClick={handleShowSnackbar}>테스트1</button>
    </div>
  );
};

export default Test1;