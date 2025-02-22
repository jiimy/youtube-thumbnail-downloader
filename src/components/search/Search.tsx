'use client';
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import s from './search.module.scss';
import searchIcon from '/public/image/search.svg';

const Search = () => {
  const params = useSearchParams();
  const type = params.get('type');
  const search = params.get('search');
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [searchType, setSearchType] = useState<'video' | 'thumbnail'>('video');
  const [searchStart, setSearchStart] = useState(false); // searchStart - 검색시작할때. 
  const controls = useAnimationControls();

  // 공통 스타일을 변수로 빼기
  const startStyle = {
    marginTop: "calc(0vh + 20px)",
    width: "calc(100vw - 90%)",
    height: "36px",
  };
  const endStyle = {
    marginTop: "calc(50vh - 50px)",
    width: "calc(100vw - 60%)",
    height: "50px",
  };

  useEffect(() => {
    // 쿼리 파람즈에 따른 스타일 처리
    if (type === 'thumbnail' || searchStart) {
      controls.start({
        ...startStyle,
        transition: {
          duration: 0.4,
          ease: [0, 0.55, 0.45, 1],
        },
      });
    } else {
      controls.start({
        ...endStyle,
        transition: {
          duration: 0.4,
          ease: [0, 0.55, 0.45, 1],
        },
      });
    }
  }, [controls, searchStart, type]);

  useEffect(() => {
    if (ref.current) {
      ref.current?.focus();
    }
  }, []);

  const onchange = (e: any) => {
    setText(e.target.value);
  };

  const onEnter = () => {
    console.log('엔터 누름');
    if (text) {
      if (text.includes('youtu.be')) {
        const value = text.split('youtu.be/')[1].split('?si')[0];
        // router.push(`/search?type=thumbnail&search=${value}`);
        router.push(`/search/thumbnail/${value}`);
      } else if (text.includes('youtube')) {
        const value = text.split('watch?v=')[1];
        // router.push(`/search?type=thumbnail&search=${value}`);
        router.push(`/search/thumbnail/${value}`);
      } else {
        router.push(`/search?type=video&search=${text}`);
        setSearchType('video');
      }
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      if (text === '') {
        setSearchStart(false);
      }
      if (text !== '') {
        setSearchStart(true);
        onEnter();
      }
    }
  };

  return (
    <>
      <motion.div className={s.input_wrap} animate={controls}
        initial={endStyle} // initial 스타일 추가
      >
        <input
          ref={ref}
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
    </>
  );
};

export default Search;
