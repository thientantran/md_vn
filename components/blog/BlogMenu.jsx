import BlogMenuTopic from "./BlogMenuTopic";

export default function BlogMenu({posts}) {
  // Sort the posts based on views in descending order
  const sortedPosts = posts.sort((a, b) => b.views - a.views);
  
  return (
    <div className="md:flex-[2] hidden md:block">
      <BlogMenuTopic posts={sortedPosts.slice(0, 4)} title={'Popular News'} subtitle={"What's hot"}/>
      <BlogMenuTopic posts={sortedPosts.slice(0, 4)} title={'Editors Pick'} subtitle={"Chosen by the editor"}/>
    </div>
  )
}
