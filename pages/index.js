import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import Services from "@layouts/partials/services";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { IoTabletLandscapeOutline } from "react-icons/io5";
const { blog_folder, pagination } = config.settings;

const data = [
  {
    id: 1,
    title: "تفصيل مغاسل رخام ",
    url: "posts",
    btn: "شاهد المزيد..",
    icon: "IoTabletLandscapeOutline",
    desc: "تفصيل مغاسل رخام فخمة بجودة عالية مع الضمان لمدة خمس سنوات مع الخشب والمرايا بأيدي فنيين متخصصين في هذا المجال.",
  },
  {
    id: 2,
    title: " التصميم",
    url: "#",
    btn: "اقرا ايضا",
    icon: "",
    desc: "توريد وتركيب الارضيات الرخامية وجدران الحمامات المصممة من الرخام الطبيعي ورسومات الووترجيت بالاضافة الى الواجهات الخارجية الرخامية",
  },
  {
    id: 3,
    title: " توريد الرخام",
    url: "#",
    btn: "معرض الصور",
    icon: "",
    desc: "لدينا معرض صور ضخم يضم جميع المغاسل الرخامية المصممة والمنفذة من قبل باجكو ليكون مرجع ل",
  },
  {
    id: 4,
    title: " التركيب",
    url: "#",
    btn: "مغاسل الرخام",
    icon: "",
    desc: "مهتم بمجال الديكورات الداخلية او المقبلين على تفصيل مغاسل رخام فخممة تليق بالمكان",
  },
];
console.log(data[0].icon);
const Home = ({
  banner,
  posts,
  featured_posts,
  recent_posts,
  categories,
  promotion,
}) => {
  // define state
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );
  const showPosts = pagination;

  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-10">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div
              className={
                banner.image_enable
                  ? "mt-12 text-center lg:col-6 lg:mt-0 lg:text-center"
                  : "mt-12 text-center lg:col-12 lg:mt-0 lg:text-left"
              }
            >
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              {markdownify(banner.content, "p", "mt-4")}
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-6"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {/* {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority={true}
                  alt="Banner Image"
                />
              </div>
            )} */}
          </div>
        </div>
      </section>

      {/* Home main */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:col-8 lg:mb-0">
              {/* Featured posts */}
              {featured_posts.enable && (
                <div className="section ">
                  {markdownify(
                    featured_posts.title,
                    "h2",
                    "section-title text-center"
                  )}
                  <div className="rounded dark:border-darkmode-border">
                    <div className="row">
                      {data.map((e) => (
                        <>
                          <div className="md:col-6" key={e.id}>
                            <Services
                              icone={e.icon.type}
                              title={e.title}
                              desc={e.desc}
                              url={e.url}
                              btn={e.btn}
                            />
                          </div>
                        </>
                      ))}

                      {/* اخر المقالات */}
                      {/* <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border md:col-6 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0">
                        {featuredPosts
                          .slice(1, featuredPosts.length)
                          .map((post, i, arr) => (
                            <div
                              className={`mb-6 flex items-center pb-6 ${
                                i !== arr.length - 1 &&
                                "border-b border-border dark:border-darkmode-border"
                              }`}
                              key={`key-${i}`}
                            >
                              {post.frontmatter.image && (
                                <ImageFallback
                                  className="mr-3 h-[85px] rounded object-cover pl-2"
                                  src={post.frontmatter.image}
                                  alt={post.frontmatter.title}
                                  width={100}
                                  height={85}
                                />
                              )}
                              <div>
                                <h3 className="h5 mb-2">
                                  <Link
                                    href={`/${blog_folder}/${post.slug}`}
                                    className="block text-primary hover:text-rose-900"
                                  >
                                    {post.frontmatter.title}
                                  </Link>
                                </h3>
                                <p className="inline-flex items-center font-bold">
                                  <FaRegCalendar className="mr-1.5" />
                                  {dateFormat(post.frontmatter.date)}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div> */}
                    </div>
                  </div>
                </div>
              )}

              {/* Promotion */}
              {promotion.enable && (
                <div className="section relative  block pt-0">
                  <ImageFallback
                    className="h-full w-full rounded-lg "
                    height="115"
                    width="800"
                    src={promotion.image}
                    alt="promotion"
                  />
                  <ul className="absolute left-10 top-3 flex flex-wrap items-center">
                    <li className="mx-2 inline-flex h-7 rounded bg-primary px-3 text-white">
                      مغاسل رخام
                    </li>
                  </ul>
                </div>
              )}

              {/* Recent Posts */}
              {recent_posts.enable && (
                <div className="section pt-0">
                  {markdownify(
                    recent_posts.title,
                    "h2",
                    "section-title text-center"
                  )}
                  <div className="rounded  dark:border-darkmode-border">
                    <div className="row">
                      {sortPostByDate.slice(0, showPosts).map((post) => (
                        <div className="mb-8 md:col-6" key={post.slug}>
                          <Post post={post} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Pagination
                totalPages={Math.ceil(posts.length / showPosts)}
                currentPage={1}
              />
            </div>
            {/* sidebar */}
            <Sidebar
              className={"lg:mt-[9.5rem]"}
              posts={posts}
              categories={categories}
            />
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, featured_posts, recent_posts, promotion } = frontmatter;
  const posts = getSinglePage(`content/${blog_folder}`);
  const categories = getTaxonomy(`content/${blog_folder}`, "categories");

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    return {
      name: category,
      posts: filteredPosts.length,
    };
  });

  return {
    props: {
      banner: banner,
      posts: posts,
      featured_posts,
      recent_posts,
      promotion,
      categories: categoriesWithPostsCount,
    },
  };
};
