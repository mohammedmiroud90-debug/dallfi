import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatPostDate, getAllPosts, isParseConfigured } from "@/lib/posts";

export default async function BlogList() {
  const t = await getTranslations("Blog");
  const posts = (await getAllPosts(null, 5)) ?? []; // Get latest 5 posts
  const isConfigured = isParseConfigured();

  // Always render the section, even with fallback content
  return (
    <section className="border-t border-[#d8d8d8] bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 flex items-baseline justify-between">
          <p className="text-[13px] font-medium uppercase tracking-wider text-black/60">
            {t("title") || "FROM THE JOURNAL"}
          </p>
          <Link
            href="/blog"
            className="text-[14px] font-medium text-[#0066cc] transition-colors hover:text-[#0052a3] hover:underline"
          >
            {t("viewAll") || "All posts →"}
          </Link>
        </div>

        <h2 className="mb-12 font-[family-name:var(--font-display)] text-[2rem] tracking-tight text-black sm:text-[2.6rem]">
          {t("latestPosts") || "Recent posts"}
        </h2>

        <div className="divide-y divide-[#f0f0f0]">
          {posts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[1rem] text-[#6b6b6b]">
                {isConfigured 
                  ? "No posts available yet. Check back soon!"
                  : "Blog posts will appear here once the backend connection is configured."}
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-3 py-6 transition-opacity hover:opacity-80 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.25rem] leading-snug text-black group-hover:underline sm:text-[1.35rem]">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-black/70">
                    {formatPostDate(post.publishedAt)} · {post.author}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-black/5 px-3 py-1 text-[12px] font-medium uppercase tracking-wide text-black/80">
                    {post.category}
                    <svg
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
