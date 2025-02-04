'use client';
import { useEffect, useState } from "react";
import Loading from "@/components/loading/Loading";
import dynamic from "next/dynamic";


export default function Home() {
  const [text, setText] = useState<string>("");

  const onchange = (e: any) => {
    setText(e.target.value);
  }

  const onEnter = () => {
    if (text) {
      // dispatch(questionText(text));
    } else {
      // dispatch(questionText(''));
    }
  };

  const handleKeyDown = (e:any) => {
    if (e.key === "Enter") {
      onEnter();
    }
  };

  return (
    <div>
      <div>
        <input type="text" name="" id="" placeholder="링크 입력" value={text} onChange={onchange} onKeyDown={handleKeyDown} />
        <button>다운로드</button>
      </div>
      <br />다운로드
    </div>
  );
}
