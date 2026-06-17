import { MetadataRoute } from 'next';

const BASE_URL = 'https://jaber.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/dungeon',
    '/font-preview',
    '/ui',
    '/illustration',
  ];

  const sitemapData: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    sitemapData.push({
      url: `${BASE_URL}/en${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${route}`,
          bn: `${BASE_URL}/bn${route}`,
        },
      },
    });

    sitemapData.push({
      url: `${BASE_URL}/bn${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${route}`,
          bn: `${BASE_URL}/bn${route}`,
        },
      },
    });
  });

  return sitemapData;
}
