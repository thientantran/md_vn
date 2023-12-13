import { routes } from '@/constants/blogMenu';
import BlogSidebarItem from './BlogSidebarItem';


export default function BlogSideRoutes() {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <BlogSidebarItem key={route.label} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  )
}
