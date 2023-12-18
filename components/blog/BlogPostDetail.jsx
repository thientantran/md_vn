import Image from "next/image";

export default function BlogPostDetail() {
  return (
    <div>
      <header className="mb-4 lg:mb-6 not-format">
        <address className="flex items-center mb-6 not-italic">
          <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
          <div className="h-16 w-16 relative mr-2">
                  <Image src='https://img.medscapestatic.com/vim/live/professional_assets/medscape/images/thumbnail_library/is_231213_asthma_cough_800x450.jpg' alt="postimage" fill className="rounded-full object-cover"/>
                </div>
            <div>
              <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">Jese Leos</a>
              <p className="text-base text-gray-500 dark:text-gray-400">Graphic Designer, educator &amp; CEO Flowbite</p>
              <p className="text-base text-gray-500 dark:text-gray-400"><time pubdate dateTime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
            </div>
          </div>
        </address>
        <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Best practices for successful prototypes</h1>
      </header>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quaerat ducimus, quae quisquam eum, maxime temporibus enim excepturi amet rerum, esse dolore veniam. Delectus, ex cupiditate, iste atque nulla doloribus voluptate quasi similique commodi magnam enim, sint non natus? Veritatis ratione, magni dolorum dicta sit consequatur praesentium quos dolore, mollitia nobis non? Eos numquam vitae fugiat rem nulla iure ipsum quam alias et harum illum voluptatum enim at doloribus culpa quibusdam, facere autem. Dignissimos inventore repellat, nulla consequuntur itaque modi pariatur quia aspernatur ipsum exercitationem eaque cupiditate ex quos, ab, ut incidunt deleniti possimus velit sint hic quisquam nisi laboriosam? Voluptate veritatis rem a, optio perspiciatis officia dolor excepturi amet dicta architecto! Aliquid, error ipsa dignissimos accusantium dolorem quod quo, qui iusto esse in cumque doloribus veritatis, enim possimus adipisci dicta expedita iste. Iusto doloribus officia deserunt eligendi iure quis, ex laboriosam laudantium! Optio corporis velit beatae expedita consequuntur! Explicabo possimus quae est, tempore, minus sequi quam exercitationem non dicta placeat perspiciatis neque consequatur odit, provident iusto voluptatibus facere voluptatum cumque? Dignissimos in quas, alias modi facere quae, sequi quasi temporibus officia porro libero, quibusdam totam velit iusto adipisci. Blanditiis quidem voluptatibus doloremque omnis fuga maxime, nulla repellat porro aliquam minima ducimus alias, eaque cumque sapiente voluptate sunt, vel autem dolor sint cum esse recusandae obcaecati nesciunt? Dolorem voluptatem eveniet consequuntur, facere cum ratione, nobis illo placeat obcaecati magnam eligendi corrupti, labore laboriosam culpa nam odit earum sunt iste quidem libero vitae cupiditate et. Nesciunt, repellat magnam deleniti assumenda minima iure laboriosam quidem, odio consectetur exercitationem ipsam beatae nisi ab iusto fuga. Mollitia, minima impedit. Placeat reiciendis exercitationem, sequi, quae quo ipsum ipsa atque numquam accusantium tempore deserunt suscipit, quidem excepturi unde quaerat dicta iusto impedit ad. Minus, inventore sit iure nam nostrum delectus soluta earum alias? Quasi, nemo quidem!</p>
    </div>

  )
}
