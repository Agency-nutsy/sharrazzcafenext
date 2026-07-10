import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sharrazzcafe.com';

  const routes = ['', '/menu', '/about', '/gallery', '/contact'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/menu' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/menu' ? 0.9 : 0.7,
  }));
}