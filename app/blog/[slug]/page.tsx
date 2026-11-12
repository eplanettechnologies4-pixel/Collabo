import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blogData";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="section bg-ink blog-post"  style={{paddingTop:"10rem",paddingBottom:"2rem"}}>
        <div className="container">
          <span className="eyebrow w-100 justify-content-center">
            {post.categoryLabel}
          </span>

          <h1 className="mt-3 text-center">
            {post.title}
          </h1>

          <p className="muted mt-3 text-center">
            {post.date} · {post.readTime}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <img
            src={post.image}
            alt={post.title}
            className="img-fluid rounded"
          />

          <div
            className="mt-5"
            style={{ maxWidth: "800px" }}
          >
            {post.body.map((block, index) => {
              switch (block.type) {
                case "p":
                  return (
                    <p key={index}>
                      {block.text}
                    </p>
                  );

                case "h3":
                  return (
                    <h3
                      key={index}
                      className="mt-4 mb-3"
                    >
                      {block.text}
                    </h3>
                  );

                case "ul":
                  return (
                    <ul key={index}>
                      {block.items?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );

                default:
                  return null;
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
}