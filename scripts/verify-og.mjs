async function verifyAll() {
  const urls = [
    'https://bloomiaclub.com/',
    'https://bloomiaclub.com/blog/how-to-talk-to-teens-coaching-guide',
    'https://bloomiaclub.com/blog/mom-burnout-symptoms-causes-coaching',
    'https://bloomiaclub.com/about',
    'https://bloomiaclub.com/coaching',
    'https://bloomiaclub.com/coaches',
    'https://bloomiaclub.com/coaches/fatemeh-derakhsh'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'TelegramBot (like TwitterBot)',
          'Cache-Control': 'no-cache',
        }
      });
      const html = await res.text();
      const getTag = (prop) => {
        const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]+)"`, 'i')) ||
                  html.match(new RegExp(`<meta name="${prop}" content="([^"]+)"`, 'i'));
        return m ? m[1] : null;
      };

      console.log(`\n==============================================`);
      console.log(`URL: ${url} (Status: ${res.status})`);
      console.log(`Title: ${getTag('og:title')}`);
      console.log(`Desc:  ${getTag('og:description')?.slice(0, 70)}...`);
      console.log(`Image: ${getTag('og:image')}`);
    } catch (err) {
      console.error(`Error fetching ${url}:`, err.message);
    }
  }
}

verifyAll();
