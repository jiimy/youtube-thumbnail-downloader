import ListThumbnail from '@/components/List/ListThumbnail';
import React from 'react';

const page = ({ params }: { params: { link: string } }) => {

  return (
    <div>
      <ListThumbnail link={params.link} />
    </div>
  );
};

export default page;