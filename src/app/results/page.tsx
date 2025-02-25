'use client';
import ListSearch from '@/components/List/ListSearch';
import ListThumbnail from '@/components/List/ListThumbnail';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ResultPage = () => {
  const params = useSearchParams();
  const search = params.get('search_query');

  return (
    <div>
      {/* <ListThumbnail link={params.id} /> */}
      {search &&
        <ListSearch link={search} />
      }
    </div>
  );
};

export default ResultPage;