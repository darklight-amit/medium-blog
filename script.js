async function loadMediumArticles() {
  const rssUrl = 'https://medium.com/feed/@amit.rajawat12';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const container = document.getElementById('articles');
    container.innerHTML = '';

    data.items.forEach(item => {
      const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
      const imgSrc = imgMatch ? imgMatch[1] : '';

      const div = document.createElement('div');
      div.className = 'article';
      div.innerHTML = `
        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        ${imgSrc ? `<img src="${imgSrc}" alt="Article Image">` : ''}
        <p><strong>Published:</strong> ${new Date(item.pubDate).toLocaleDateString()}</p>
        <p>${item.description}</p>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    document.getElementById('articles').innerHTML = `<p>Failed to load articles. Please try again later.</p>`;
    console.error('Error loading Medium articles:', err);
  }
}

window.onload = loadMediumArticles;
