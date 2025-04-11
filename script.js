async function loadArticles() {
  const rssUrl = 'https://medium.com/feed/@amit.rajawat12';
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const container = document.getElementById('articles');
    container.innerHTML = '';

    data.items.forEach(item => {
      const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
      const image = imgMatch ? `<img src="${imgMatch[1]}" alt="Article Image">` : '';

      const article = document.createElement('div');
      article.className = 'article';
      article.innerHTML = `
        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        ${image}
        <p><strong>Published:</strong> ${new Date(item.pubDate).toDateString()}</p>
        <p>${item.description}</p>
      `;

      container.appendChild(article);
    });
  } catch (error) {
    console.error('Failed to load articles:', error);
    document.getElementById('articles').innerHTML = '<p>Failed to load articles.</p>';
  }
}

window.onload = loadArticles;
