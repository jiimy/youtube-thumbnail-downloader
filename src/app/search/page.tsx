'use client';

import { youtubeInfoApi } from '@/api/youtube';
import List from '@/components/List/List';
import Loading from '@/components/loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from 'react';

const Search = () => {
  const params = useSearchParams();
  const type = params.get('type');
  const search = params.get('search');

  const [searchType, setSearchType] = useState<'video' | 'thumbnail'>('video');
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  // type 값에 따라 searchType 설정
  useEffect(() => {
    if (type === 'thumbnail') {
      setSearchType('thumbnail');
      setLink(search as string);
    } else {
      setSearchType('video');
    }
    setShouldFetch(true);
  }, [type, search]);

  // 유튜브 썸네일 검색 API
  const { data: youtubeInfo, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi('f-pj0U-0a_E'),
    queryKey: ["youtubeLink", 'f-pj0U-0a_E'],
    // enabled: type === 'thumbnail' && search !== ''
  });

  console.log('dd', searchType);
  // console.log('dd', type, search);
  // console.log('dd', link);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <List searchTheme={searchType} data={youtubeInfo} uiType="list" />
      </Suspense>
    </>
  );
};

export default Search;
