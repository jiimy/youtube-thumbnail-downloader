import { downloadApi } from '@/api/youtube';
import Image from 'next/image';
import React from 'react';
import s from './list.module.scss';
import YoutubeItem from './YoutubeItem';
// 검색 유형 = '동영상 검색', | '썸네일 검색'에따라 리스트의 ui가 달라짐.

type ListProps = {
  searchTheme: 'video' | 'thumbnail',
  uiType?: 'profile' | 'list',
  data: any
}

const List = ({ searchTheme, data, uiType = 'list' }: ListProps) => {
  console.log('data', searchTheme == 'video' && data)
  return (
    <div>
      {searchTheme === 'video' &&
        <div>
          {uiType === 'profile' &&
            <div className={s.title}>
              <div className={s.img_wrap}>
                <Image
                  src={data[0]?.snippet?.thumbnails?.high?.url}
                  alt="thumbnail"
                  width={160}
                  height={160}
                />
              </div>
              <span>
                {data[0]?.snippet?.channelTitle}
              </span>
            </div>
          }
          {data?.map((item: any, i: number) => {
            if (item?.id?.videoId !== undefined) {
              return <YoutubeItem link={item?.id?.videoId} key={i} />
            }
          })}
        </div>
      }
      {searchTheme === 'thumbnail' &&
        <div>
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