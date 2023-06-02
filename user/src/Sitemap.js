import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// Đường dẫn tới file sitemap.xml

export const Sitemap = () => {
    const sitemapContent = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!--  created with Free Online Sitemap Generator www.xml-sitemaps.com  -->
<url>
<loc>https://balostore.vercel.app/</loc>
<lastmod>2023-06-01T03:15:40+00:00</lastmod>
</url>
</urlset>`;

    return (
        <div>
            <pre>{sitemapContent}</pre>
        </div>
    );
};

const sitemapHtml = renderToStaticMarkup(<Sitemap />);
const blob = new Blob([sitemapHtml], { type: 'text/xml' });
const url = URL.createObjectURL(blob);
console.log(url);

export default url;
