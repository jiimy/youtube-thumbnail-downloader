import ListSearch from '@/components/List/ListSearch';
import ListThumbnail from '@/components/List/ListThumbnail';
import React from 'react';

const page = ({ params }: { params: { id: string } }) => {

  return (
    <div>
      {/* <ListThumbnail link={params.id} /> */}
      <ListSearch link={params.id} />
    </div>
  );
};

export default page;