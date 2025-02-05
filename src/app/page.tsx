'use client';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/Loading";
import dynamic from "next/dynamic";
import { youtubeInfoApi } from "@/api/youtube";
import { useGetYoutubeInfoLink } from "@/hooks/useGetYoutubeInfo";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const { thumbNail } = useGetYoutubeInfoLink(link);

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

  return (
    <div>
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="링크 입력"
          value={text}
          onChange={onchange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={onEnter}>검색</button>
      </div>
      <br />다운로드
      <div>
        {youtubeInfoLoading ? (
          <Loading />
        ) : (
          <div>
            {youtubeInfo && (
              <div>
                <h1>{youtubeInfo.snippet?.title}</h1>
                <p>{youtubeInfo.snippet?.channelTitle}</p>
                <p>Playtime: {youtubeInfo.contentDetails?.duration}</p>
                {Object.entries(thumbNail).map(([key, value]) => {
                  const thumbnail = value as { url: string; width: number; height: number };
                  return (
                    <div key={key}>
                      <Image src={thumbnail.url} alt={key} width={thumbnail.width} height={thumbnail.height} />
                      <p>{key}</p>
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
