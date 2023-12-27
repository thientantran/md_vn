'use client'

import dynamic from "next/dynamic";
import { useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

export default function Editor({onChange, value}) {
  const ReactQuill = useMemo(()=> dynamic(()=> import('react-quill'), {ssr:false}),[])
  // const quillRef = useRef(null);
  // useEffect(() => {
  //   if (quillRef.current) {
  //     const quillInstance = quillRef.current.getEditor();
  //     quillInstance.format('size', 'large');
  //   }
  // }, []);
  return (
    <div className="bg-white">
      <ReactQuill
      // ref={quillRef}
      theme="snow"
      placeholder="Start writing..."
      modules={{
        toolbar: {
          container: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["code-block"],
            ["clean"],
          ],
        },
        clipboard: {
          matchVisual: false,
        },
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "code-block",
      ]}
      value={value}
      onChange={onChange}
    />
    </div>
  )
}
