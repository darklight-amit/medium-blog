const container = document.getElementById('articles-container');

fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@amit.rajawat12")
  .then(response => response.json())
  .then(data => {
    data.items.forEach(article => {
      const card = document.createElement("div");
      card.className = "article-card";

      const imageMatch = article.content.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imageMatch ? imageMatch[1] : "https://via.placeholder.com/300x180.png?text=No+Image";

      card.innerHTML = `
        <img src="${imageUrl}" alt="${article.title}">
        <div class="article-content">
          <a href="${article.link}" target="_blank" class="article-title">${article.title}</a>
          <p class="article-description">${article.description.slice(0, 100)}...</p>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    container.innerHTML = "<p>Failed to load articles. Please try again later.</p>";
    console.error("Error loading feed:", error);
  });
