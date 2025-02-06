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

export default function Home() {
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  // const { thumbNail, title, channelTitle } = useGetYoutubeInfoLink(link);

  const { data: youtubeInfo, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(link),
    queryKey: ["youtubeLink", link],
    enabled: Boolean(link) && shouldFetch
  });

  const onchange = (e: any) => {
    setText(e.target.value);
  };

  const onEnter = () => {
    if (text) {
      const value = text.split('=')[1];
      setLink(value);
      setShouldFetch(true);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  const handleDownload = async (url: string, key: string) => {
    try {
      // 이미지 URL을 fetch하여 Blob 객체로 변환
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');

      // Blob URL을 다운로드 링크로 설정
      link.href = URL.createObjectURL(blob);
      link.download = `${key}.jpg`; // 다운로드 시 파일명 설정
      link.click();

      // Blob URL 해제
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("이미지 다운로드 실패", error);
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
        <button onClick={onEnter}>검색</button>
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
