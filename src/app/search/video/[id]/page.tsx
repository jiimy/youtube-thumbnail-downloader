import ListSearch from '@/components/List/ListSearch';
import ListThumbnail from '@/components/List/ListThumbnail';
import React from 'react';

const page = ({ params }: { params: { link: string } }) => {

  return (
    <div>
      {/* <ListThumbnail link={params.link} /> */}
      <ListSearch link={params.link} type='video' />
    </div>
  );
};

export default page;