import { apiWriteTil } from "@/api/til/til";
import { setGlobalToast } from "@/components/Toast";
import { TILCATEGORIES } from "@/constants/til.constants";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";

export interface TilWriteAttributes {
  title: string;
  category: string;
  contents: string;
  slug?: string;
}

export default function TilWrite() {
  const editorRef = useRef<ReactQuill>(null);
  const [tilData, setTilData] = useState({
    title: "",
    contents: "",
    category: "",
    link: [] as string[],
  });

  const router = useRouter();

  useEffect(() => {
    if (tilData.contents !== "") writeMutation.mutateAsync();
  }, [tilData.contents]);

  const handleData = (e: any, column: keyof TilWriteAttributes) => {
    setTilData((current) => {
      return {
        ...current,
        [column]: e.target?.value,
      };
    });
  };

  const handleWrite = async () => {
    const isError = true;
    if (!tilData.title) {
      setGlobalToast("제목을 입력해주세요.", isError);
      return false;
    }

    if (!tilData.category) {
      setGlobalToast("카테고리를 선택해주세요.", isError);
      return false;
    }
    const contents = editorRef.current?.getEditor().root.innerHTML;

    if (!contents) {
      setGlobalToast("내용을 입력해주세요.", isError);
      return false;
    }
    setTilData((current) => ({
      ...current,
      contents,
    }));
  };
  const writeMutation = useMutation({
    mutationKey: ["writeTil"],
    mutationFn: async () => await apiWriteTil(tilData),

    onSuccess(response: string) {
      const tilId = response;
      router.push(`/til/${tilId}`);
    },
  });

  // react-quill 에디터 자체가 client단의 window 객체를 사용하는 걸로 보여
  // 동적 로딩 필수.
  const Editor = dynamic(() => import("@/components/til/Editor"), {
    ssr: false,
  });

  // 재 렌더링 될 경우 자식 컴포넌트도 새로 렌더링이 되기 때문에
  // 내용이 초기화 되는 문제가 발생해 메모이제이션 필수
  const TilEditor = useMemo(() => React.memo(Editor), []);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-8 relative w-full">
        <div>제목</div>

        <input
          type="text"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg shadow-sm text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="제목을 입력해주세요."
          value={tilData.title}
          onChange={(e) => handleData(e, "title")}
        />
      </div>
      <div>카테고리</div>
      <div className="flex flex-wrap gap-2 relative mb-6 w-full">
        {TILCATEGORIES.map((category, key) => (
          <button
            key={key}
            type="button"
            onClick={(e) => handleData(e, "category")}
            value={category}
            className={`flex items-center justify-center p-4 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition ${
              tilData.category === category
                ? "bg-gradient-to-br from-purple-600 to-blue-500 text-white"
                : "text-gray-700"
            } w-full xs:w-[49%] sm:w-[49%] md:w-[32%]`}
          >
            {category}
          </button>
        ))}
      </div>
      <TilEditor editorRef={editorRef} />
      <div>참고링크</div>
      <div className="flex align-center flex-col gap-4 relative mb-6 w-full">
        {Array.isArray(tilData.link) && tilData.link.length > 0 ? (
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {tilData.link.map((link, key) => (
              <li key={key}>{link}</li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>

      <button
        className={`w-1/2 p-2 w-full border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition bg-gradient-to-br from-purple-600 to-blue-500 text-white`}
        onClick={handleWrite}
      >
        작성
      </button>
    </div>
  );
}
