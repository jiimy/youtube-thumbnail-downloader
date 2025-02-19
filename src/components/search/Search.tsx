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
import { motion, useAnimationControls } from "framer-motion";



const Search = () => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [searchType, setSearchType] = useState<'video' | 'thumbnail'>('video');
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const [searchStart, setSearchStart] = useState(false); // searchStart - 검색시작할때. 
  const controls = useAnimationControls();

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

  useEffect(() => {
    if (searchStart) {
      controls.start({
        marginTop: "calc(0vh + 20px)",
        width: "calc(100vw - 90%)",
        height: "36px",
        transition: {
          duration: 0.4,
          ease: [0, 0.55, 0.45, 1],
        },
      });
    } else {
      controls.start({
        marginTop: "calc(50vh - 50px)",
        width: "calc(100vw - 60%)",
        height: "50px",
        transition: {
          duration: 0.4,
          ease: [0, 0.55, 0.45, 1],
        },
      });
    }
  }, [controls, searchStart]);

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
      // onEnter();
      if (text === '') {
        setSearchStart(false);
      }
      if (text !== '') {
        setSearchStart(true);
      }
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
      {/* <motion.h1 animate={controls}>{searchStart ? "Wow!" : "..."}</motion.h1> */}
      <motion.div className={s.input_wrap} animate={controls}
        initial={{
          marginTop: "calc(50vh - 50px)",
          width: "calc(100vw - 60%)",
          height: "50px",
        }}
      >
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
      </motion.div>

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