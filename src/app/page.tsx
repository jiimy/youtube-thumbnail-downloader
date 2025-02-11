'use client';
import { useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/Loading";
import dynamic from "next/dynamic";
import { downloadApi, youtubeInfoApi } from "@/api/youtube";
import { useGetYoutubeInfoLink } from "@/hooks/useGetYoutubeInfo";
import Image from "next/image";
import s from './page.module.scss';
import axios from "axios";
import searchIcon from '/public/image/search.svg';
import List from "@/components/List/List";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [searchType, setSearchType] = useState<'video' | 'thumbnail'>('video');
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  // 유튜브 목록 검색
  const [text1, setText1] = useState('');


  // 유튜브 썸네[일 검색 api
  const { data: youtubeInfo, isSuccess: thumbnailSuccess, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(link),
    queryKey: ["youtubeLink", link],
    enabled: link !== '' && shouldFetch
  });

  // 유튜브 검색 api - 동영상 목록만 나오게
  //   const { data: youtubeData, isSuccess: youtubeListSuccess, isLoading: youtubeListLoading } = useQueries([
  //   {
  //     queryKey: ['youtubeList', text],
  //     queryFn: () => axios.get(`/api/search/?search=${text}`),
  //     enabled: link === '' && shouldFetch
  //   },
  //   {
  //     queryKey: ['youtubeProfile', text],
  //     queryFn: () => axios.get(`/api/search/profile/?search=${text}`),
  //     enabled: link === '' && shouldFetch
  //   }
  // ]);
  const [
    { data: youtubeList, isSuccess: youtubeListS, isLoading: youtubeListLoading },
    { data: youtubeProfile, isSuccess: youtubeProfileS, isLoading: youtubeProfileLoading }
  ] = useQueries({
    queries: [
      { queryKey: ["youtubeList", text], queryFn: () => axios.get(`/api/search/?search=${text}`) },
      { queryKey: ["youtubeProfile", text], queryFn: () => axios.get(`/api/search/profile/?search=${text}`) },
    ],
  });

  const onchange = (e: any) => {
    setText(e.target.value);
  };

  const onEnter = () => {
    console.log('엔터 누름');
    if (text) {
      // 유튜브 썸네일 검색일때. 
      if (text.includes('youtube')) {
        setSearchType('thumbnail');
        const value = text.split('=')[1];
        setLink(value);
      }
      setShouldFetch(true);
      setSearchType('video');
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  // useEffect(() => {
  //   if (thumbnailSuccess || listSuccess) {
  //     setText('');
  //   }
  // }, [thumbnailSuccess, listSuccess]);

  return (
    <div className={s.page}>
      <div className={s.input_wrap}>
        <input
          type="text"
          name=""
          id=""
          className={s.input}
          placeholder="유튜브 링크 및 검색어 입력"
          value={text}
          onChange={onchange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onEnter}>
          <Image src={searchIcon} alt={'검색'} width={36} height={36} />
        </button>
      </div>

      <div className="relative min-h-800">
        {(youtubeInfoLoading || youtubeListLoading) ? (
          <Loading />
        ) : (
          <div>
            {(youtubeInfo || youtubeList) && (
              <List searchTheme={searchType} data={youtubeInfo || (youtubeList?.data && youtubeProfile?.data)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
