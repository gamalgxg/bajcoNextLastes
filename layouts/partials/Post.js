import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";

const Post = ({ post }) => {
  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author
    ? post.frontmatter.author
    : meta_author;
  return (
    <div className="post rounded-3xl shadow-lg shadow-orange-500/50 transition duration-300 ease-in hover:scale-105 ">
      <div className="relative ">
        {post.frontmatter.image && (
          <ImageFallback
            className="rounded "
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={405}
            height={208}
          />
        )}
        <ul className="absolute left-2 top-3 flex flex-wrap items-center">
          {post.frontmatter.categories.map((tag, index) => (
            <li
              className="mx-2 inline-flex h-7 rounded-[10px] bg-primary px-3 text-white"
              key={"tag-" + index}
            >
              <Link
                className="capitalize "
                href={`/categories/${tag.replace(" ", "-")}`}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-2">
        <h3 className="h5 mb-2 mt-4 pl-2 ">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="block text-primary hover:text-rose-900"
          >
            {post.frontmatter.title}
          </Link>
        </h3>
        <div className="grid grid-cols-4 gap-4">
          <p className="text-center"> النوع</p>
          <p className="text-center">المقاس</p>
          <p className="text-center">الحالة </p>
          <p className="text-center">اللون </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <p className="text-center"> ({post.frontmatter.typeMarble}) </p>
          <p className="text-center">({post.frontmatter.size}) سم </p>
          <p className="text-center">({post.frontmatter.state}) </p>
          <p className="text-center"> ({post.frontmatter.color})</p>
        </div>
        {/* <ul className="flex items-center space-x-4 ">
          <li>
            <Link
              className="inline-flex items-center font-secondary text-xs leading-3"
              href="#"
            >
              <FaUserAlt className="mr-1.5" />
              {author}
            </Link>
          </li>
          <li className="inline-flex items-center font-primary text-xs leading-3">
            <FaRegCalendar className="mr-1.5" />
            {dateFormat(post.frontmatter.date)}
          </li>
        </ul> */}
        <p className="pr-2 pt-2">{post.content.slice(0, 100)}....</p>
        <Link
          className="btn btn-outline-primary mt-4  "
          href={`/${blog_folder}/${post.slug}`}
        >
          {post.frontmatter.title.slice(0, 15)}....
        </Link>
      </div>
    </div>
  );
};

export default Post;
