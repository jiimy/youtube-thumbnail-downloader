'use client';

import { youtubeInfoApi, youtubeSearchApi, youtubeSearchProfileApi } from '@/api/youtube';
import List from '@/components/List/List';
import Loading from '@/components/loading/Loading';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
    } else {
      setSearchType('video');
    }
    setLink(search as string);
    setShouldFetch(true);
  }, [type, search]);

  // 유튜브 썸네일 검색 API
  const { data: youtubeInfo, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(link),
    queryKey: ["youtubeLink", link],
    enabled: type === 'thumbnail' && search !== ''
  });

  // 유튜브 검색 api
  const { data: youtubeList, isSuccess: listSuccess, isLoading: youtubeListLoading } = useQuery({
    queryFn: () => youtubeSearchApi(link),
    queryKey: ['youtubeList', link],
    enabled: type === 'video' && search !== ''
  })

  const { data: youtubeProfile, isSuccess: youtubeProfileS, isLoading: youtubeProfileLoading } = useQuery({
    queryFn: () => youtubeSearchProfileApi(link),
    queryKey: ['youtubeProfile', link],
    enabled: type === 'video' && search !== ''
  })

  console.log('dd', link, youtubeInfo);
  // console.log('dd', type, search);
  // console.log('dd', link);

  return (
    <Suspense fallback={<Loading />}>
      {youtubeInfo &&
        <List searchTheme={searchType} data={youtubeInfo} uiType="list" />
      }
      {youtubeList && youtubeProfile && <>
        <List searchTheme={searchType} data={youtubeProfile?.data} uiType="profile" />
        <List searchTheme={searchType} data={youtubeList?.data} uiType="list" />
      </>}
    </Suspense>
  );
};

export default Search;
