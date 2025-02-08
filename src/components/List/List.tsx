import { downloadApi } from '@/api/youtube';
import Image from 'next/image';
import React from 'react';
import s from './list.module.scss';
// 검색 유형 = '동영상 검색', | '썸네일 검색'에따라 리스트의 ui가 달라짐.

type ListProps = {
  searchTheme: 'video' | 'thumbnail',
  data: any
}

const List = ({ searchTheme, data }: ListProps) => {
  return (
    <div>
      {searchTheme === 'video' && <></>}
      {searchTheme === 'thumbnail' && <div>
        <div className={s.title}>
          <h1>{data.snippet?.title} - {data.snippet?.channelTitle}</h1>
        </div>
        {/* <p>Playtime: {youtubeInfo.contentDetails?.duration}</p> */}
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
      </div>}
    </div>
  );
};

export default List;