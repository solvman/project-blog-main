import { URL } from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Bits & Bytes",
    description: "Bits & Bytes Blog",
    generator: "RSS for Node and Next.js",
    feed_url: `${URL}/feed.xml`,
    site_url: URL,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  const allPosts = await getBlogPostList();

  if (allPosts) {
    allPosts.map((post) => {
      feed.item({
        title: post.title,
        description: post.abstract,
        url: `${URL}/${post.slug}`,
        publishedOn: post.publishedOn,
      });
    });
  }
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
