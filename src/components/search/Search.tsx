'use client';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import s from './search.module.scss';

import Loading from "@/components/loading/Loading";
import dynamic from "next/dynamic";
import { downloadApi, youtubeInfoApi } from "@/api/youtube";
import { useGetYoutubeInfoLink } from "@/hooks/useGetYoutubeInfo";
import Image from "next/image";
import axios from "axios";
import searchIcon from '/public/image/search.svg';
import List from "@/components/List/List";
import { useRouter } from "next/navigation";


const Search = () => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [searchType, setSearchType] = useState<'video' | 'thumbnail'>('video');
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  // 유튜브 검색 api
  // const { data: youtubeList, isSuccess: listSuccess, isLoading: youtubeListLoading } = useQuery({
  //   queryFn: () => axios.get(`/api/search/?search=${text}`),
  //   queryKey: ['youtubeList', text],
  //   enabled: link === '' && shouldFetch && searchType === 'video'
  // })

  // const { data: youtubeProfile, isSuccess: youtubeProfileS, isLoading: youtubeProfileLoading } = useQuery({
  //   queryFn: () => axios.get(`/api/search/profile/?search=${text}`),
  //   queryKey: ['youtubeProfile', text],
  //   enabled: link === '' && shouldFetch && searchType === 'video'
  // })

  const onchange = (e: any) => {
    setText(e.target.value);
  };

  const onEnter = () => {
    console.log('엔터 누름');
    if (text) {
      // 유튜브 썸네일 검색일때. 
      if (text.includes('youtu.be')) {
        // setSearchType('thumbnail');
        const value = text.split('youtu.be/')[1].split('?si')[0];
        // setLink(value);
        console.log('value', value);
        router.push(`/search?type=thumbnail&search=${value}`);
      }
      // 유튜브 썸네일 검색일때. 
      else if (text.includes('youtube')) {
        // setSearchType('thumbnail');
        const value = text.split('watch?v=')[1];
        // setLink(value);
        router.push(`/search?type=thumbnail&search=${value}`);
      } else {
        router.push(`/search?type=video&search=${text}`);
        setSearchType('video');
      }
      // setShouldFetch(true);
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
  // console.log('data', youtubeList, youtubeProfile);

  return (
    <>
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

      {/* {
        (listSuccess && youtubeProfileS) &&
        <div className="relative min-h-800">
          <List searchTheme={searchType} data={youtubeProfile?.data} uiType="profile" />
          <List searchTheme={searchType} data={youtubeList?.data} uiType="list" />
        </div>
      } */}
    </>
  );
};

export default Search;