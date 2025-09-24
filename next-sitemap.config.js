/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL, // берем из .env.local
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  transform: async (_config, path) => {
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/all`);
    const posts = await res.json();

    return posts.map(post => ({
      loc: `/post/${post.slug}`,
      lastmod: post.publishedAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
    }));
  },
};
