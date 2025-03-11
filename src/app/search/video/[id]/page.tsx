import ListSearch from '@/components/List/ListSearch';
import ListThumbnail from '@/components/List/ListThumbnail';
import Loading from '@/components/loading/Loading';
import React, { Suspense } from 'react';

const page = ({ params }: { params: { id: string } }) => {

  return (
    <Suspense fallback={<Loading />}>
      {/* <ListThumbnail link={params.id} /> */}
      <ListSearch link={params.id} />
    </Suspense>
  );
};

export default page;