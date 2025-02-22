import React from 'react';
import s from './list.module.scss';
import { downloadApi, downloadMultiApi, youtubeInfoApi } from '@/api/youtube';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

type ListProps = {
  link: string,
}

const ListThumbnail = ({ link }: ListProps) => {

  const { data, isLoading: youtubeInfoLoading } = useQuery({
    queryFn: () => youtubeInfoApi(link),
    queryKey: ["youtubeLink", link],
    enabled: Boolean(link)
  });


  return (
    <div>
      <div className={s.title}>
        <h1>{data.snippet?.title} - {data.snippet?.channelTitle}</h1>
      </div>
      <button
        className={s.download_btn}
        onClick={() => {
          const urls = Object.values(data.snippet?.thumbnails).map((thumb: any) => thumb.url);
          const keys = Object.keys(data.snippet?.thumbnails);
          downloadMultiApi(urls, keys);
        }}
      >
        모든 썸네일 다운로드
      </button>
      <div className={s.thumnail_list}>
        {Object.entries(data?.snippet?.thumbnails).map(([key, value]) => {
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
    </div>
  );
};

export default ListThumbnail;