'use client';
import ListSearch from '@/components/List/ListSearch';
import ListThumbnail from '@/components/List/ListThumbnail';
import Loading from '@/components/loading/Loading';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const ResultPage = () => {
  const params = useSearchParams();
  const search = params.get('search_query');

  return (
    <Suspense fallback={<Loading />}>
      {/* <ListThumbnail link={params.id} /> */}
      {search &&
        <ListSearch link={search} />
      }
    </Suspense>
  );
};

export default ResultPage;