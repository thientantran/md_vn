import BlogCategoryItem from "./BlogCategoryItem";

export default function BlogCategories({ categories }) {
  return (
    <div className="mt-[30px]">
      {/* <div className="text-xl md:text-2xl font-semibold">
        Popular Categories
      </div> */}
      <div className="flex justify-center">
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
          {categories.map((category, _index) => (
            <BlogCategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
