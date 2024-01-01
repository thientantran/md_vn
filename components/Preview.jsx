//'use client'
// import dynamic from "next/dynamic"
// import 'react-quill/dist/quill.bubble.css'
export default function Preview({ value }) {
  // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])
  // return (
  //   <div className="bg-white">
  //     <ReactQuill
  //       theme="bubble"
  //       value={value}
  //       readOnly
  //     />
  //   </div>
  // )
  return <div className="text-base" dangerouslySetInnerHTML={{ __html: value }} />;
}
