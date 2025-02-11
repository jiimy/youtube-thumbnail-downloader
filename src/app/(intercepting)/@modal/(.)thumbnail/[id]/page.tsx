'use client';
import React from 'react';

const page = ({
  params,
}: {
  params: { id: string };
}) => {
  return (
    <div>
      모달 인터셉팅 {params.id}
    </div>
  );
};

export default page;