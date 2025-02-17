import { forwardRef, RefObject, useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import hljs from "highlight.js";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css"; // 원하는 스타일로 변경 가능
import ImageUploader from "quill-image-uploader";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import { formDataApi } from "@/modules/ApiInstance";

const Editor = forwardRef(
  ({
    editorRef,
    uploadApiUrl = "/storages/upload",
    contents = "",
  }: {
    editorRef: RefObject<ReactQuill>;
    uploadApiUrl?: string;
    contents?: string;
  }) => {
    Quill.register("modules/ImageUploader", ImageUploader);
    const [value, setValue] = useState(contents);

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };
    useEffect(() => {
      hljs.configure({
        languages: ["javascript", "python", "java", "html", "css"], // 필요한 언어 추가
      });
    }, []);

    const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "code-block",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "align",
      "color",
      "background",
    ];
    const imageHandler = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data: response } = await formDataApi.post(uploadApiUrl, formData);
      return response.data.url;
    };
    const modules = useMemo(
      () => ({
        syntax: {
          highlight: (text) => hljs.highlightAuto(text).value,
        },
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image"],
          [{ align: [] }, { color: [] }, { background: [] }],
        ],
        ImageUploader: {
          upload: imageHandler,
        },
      }),
      []
    );

    return (
      <div className="flex flex-col items-center gap-8 mb-8">
        <ReactQuill
          ref={editorRef}
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          className="w-full"
          style={{ height: "30rem" }}
        />
      </div>
    );
  }
);
Editor.displayName = "Editor";
export default Editor;
