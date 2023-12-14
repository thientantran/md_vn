import BlogMenuTopic from "./BlogMenuTopic";

export default function BlogMenu() {
  return (
    <div className="md:flex-[2] hidden md:block">
      <BlogMenuTopic title={'Popular News'} subtitle={"What's hot"}/>
      <BlogMenuTopic title={'Editors Pick'} subtitle={"Chosen by the editor"}/>
    </div>
  )
}
