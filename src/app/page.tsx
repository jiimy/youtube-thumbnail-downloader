'use client';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  // 유튜브 목록 검색
  const [text1, setText1] = useState('');


  // 유튜브 썸네[일 검색 api
  const { data: youtubeInfo, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(link),
    queryKey: ["youtubeLink", link],
    enabled: link !== '' && shouldFetch
  });

  // 유튜브 검색 api
  const { data: youtubeList, isLoading: youtubeListLoading } = useQuery({
    queryFn: () => axios.get(`/api/search/?search=${text}`),
    queryKey: ['youtubeList', text],
    enabled: link == '' && shouldFetch
  })

  const onchange = (e: any) => {
    setText(e.target.value);
  };
  const onChange1 = (e: any) => {
    setText1(e.target.value);
  }

  const onEnter = () => {
    if (text) {
      // 유튜브 썸네일 검색일때. 
      if (text.includes('youtube')) {
        const value = text.split('=')[1];
        setLink(value);
      }
      setShouldFetch(true);
    }
  };

  console.log('목록: ', youtubeList);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

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


      {/* 썸네일 목록 */}
      <div className="relative">
        {youtubeInfoLoading ? (
          <Loading />
        ) : (
          <div>
            {youtubeInfo && (
              <List searchTheme="thumbnail" data={youtubeInfo} />
            )}
          </div>
        )}
      </div>
      {/* 영상 검색 목록 */}
      <div className="relative">
        {youtubeInfoLoading ? (
          <Loading />
        ) : (
          <div>
            {youtubeList && (
              <div>
                영상 목록 보여주기
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
