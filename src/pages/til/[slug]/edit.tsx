import { apiEditTil, apiGetTil } from "@/api/til/til";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TILCATEGORIES } from "@/constants/til.constants";
import TilEditSkeleton from "@/components/Til/Skeleton/TilEdit";
import dynamic from "next/dynamic";
import { TilWriteAttributes } from "../write";
import { setGlobalToast } from "@/components/Toast";

interface TilEditAttributes extends TilWriteAttributes {
  id: string;
}
export default function TilEdit({ slug }: { slug: string }) {
  const editorRef = useRef<ReactQuill>(null);
  const [clicked, setClicked] = useState(false);
  const [tilData, setTilData] = useState({
    id: "",
    title: "",
    contents: "",
    category: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (tilData.contents !== "" && clicked === true) editMutation.mutateAsync();

    setClicked(false);
  }, [tilData.contents]);

  const { data, isLoading } = useQuery({
    queryKey: ["getTil", slug],
    queryFn: async () => await apiGetTil(slug),
  });

  useEffect(() => {
    if (!isLoading && data) {
      const { id, title, contents, category } = data;
      setTilData({
        id,
        title,
        contents,
        category,
      });
    }
  }, [data, isLoading]);

  const editMutation = useMutation({
    mutationKey: ["editTil", slug],
    mutationFn: async () => await apiEditTil(tilData),
    onSuccess(response) {
      setClicked(false);
      router.push(`/til/${response.title}-${slug}`);
    },
  });

  const handleData = (e: any, column: keyof TilWriteAttributes) => {
    setTilData((current) => {
      return {
        ...current,
        [column]: e.target?.value,
      };
    });
  };

  const handleEdit = async () => {
    const isError = true;
    const contents = editorRef.current?.getEditor().root.innerHTML;

    if (!contents) {
      setGlobalToast("내용을 입력해주세요.", isError);
      return false;
    }
    setTilData((current) => ({
      ...current,
      contents,
    }));
    if (clicked === false) {
      await editMutation.mutate();
    }
    setClicked(true);
  };

  // react-quill 에디터 자체가 client단의 window 객체를 사용하는 걸로 보여
  // 동적 로딩 필수.
  const Editor = dynamic(() => import("@/components/Til/Skeleton/Editor"));

  // 재 렌더링 될 경우 자식 컴포넌트도 새로 렌더링이 되기 때문에
  // 내용이 초기화 되는 문제가 발생해 메모이제이션 필수
  const TilEditor = useMemo(() => React.memo(Editor), []);
  return isLoading ? (
    <TilEditSkeleton />
  ) : (
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
      <TilEditor contents={tilData.contents} editorRef={editorRef} />

      <button
        className={` ${
          clicked ? `disabled` : ""
        } w-1/2 p-2 w-full border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition bg-gradient-to-br from-purple-600 to-blue-500 text-white`}
        onClick={handleEdit}
      >
        {clicked ? "수정 중..." : "수정"}
      </button>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query;
  let splitSlug;
  console.log(slug);
  splitSlug = typeof slug === "string" ? slug.split("-")[1] : slug;
  return {
    props: {
      slug: splitSlug,
    },
  };
};
