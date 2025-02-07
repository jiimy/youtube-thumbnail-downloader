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

export default function Home() {
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  // 유튜브 목록 검색
  const [text1, setText1] = useState('');


  const { data: youtubeInfo, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(link),
    queryKey: ["youtubeLink", link],
    enabled: Boolean(link) && shouldFetch
  });
  const { data: youtubeList, isLoading: youtubeListLoading } = useQuery({
    queryFn: () => axios.get(`/api/search/?search=${text1}`),
    queryKey: ['youtubeList', text1],
    enabled: Boolean(text1) && shouldFetch
  })

  const onchange = (e: any) => {
    setText(e.target.value);
  };
  const onChange1 = (e: any) => {
    setText1(e.target.value);
  }

  const onEnter = () => {
    if (text) {
      const value = text.split('=')[1];
      setLink(value);
      setShouldFetch(true);
    }
  };
  const onEnter1 = () => {
    if (text1) {
      setShouldFetch(true);
    }
  }

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
          placeholder="링크 입력"
          value={text}
          onChange={onchange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onEnter}>
          <Image src={searchIcon} alt={'검색'} width={36} height={36} />
        </button>
      </div>

      <div className={s.input_wrap}>
        <input
          type="text"
          name=""
          id=""
          className={s.input}
          placeholder="검색"
          value={text1}
          onChange={onChange1}
        // onKeyDown={handleKeyDown}
        />
        <button onClick={onEnter1}>
          <Image src={searchIcon} alt={'검색'} width={36} height={36} />
        </button>
      </div>

      <div className="relative">
        {youtubeInfoLoading ? (
          <Loading />
        ) : (
          <div>
            {youtubeInfo && (
              <div>
                <div className={s.title}>
                  <h1>{youtubeInfo.snippet?.title} - {youtubeInfo.snippet?.channelTitle}</h1>
                </div>
                {/* <p>Playtime: {youtubeInfo.contentDetails?.duration}</p> */}
                {Object.entries(youtubeInfo?.snippet?.thumbnails).map(([key, value]) => {
                  const thumbnail = value as { url: string; width: number; height: number };
                  return (
                    <div key={key} className="mb-12">
                      <div className="flex gap-16">
                        <div className={s.img_wrap}>
                          <Image src={thumbnail.url} alt={key} width={thumbnail.width} height={thumbnail.height} />
                        </div>
                        <div className="text-left">
                          <p> {thumbnail.width} * {thumbnail.height} {key}</p>
                          <button className={s.download_btn} onClick={() => downloadApi(thumbnail.url, key)}>다운로드 받기</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
