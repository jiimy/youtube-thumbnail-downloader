import { useSnackbar } from '@/provider/snackbarProvider';
import React from 'react';

const Test2 = () => {
  const { showSnackbar } = useSnackbar();

  const handleShowSnackbar = () => {
    showSnackbar('테스트2', 4000);
  };

  return (
    <div>
      <button onClick={handleShowSnackbar}>테스트2</button>
    </div>
  );
};

export default Test2;