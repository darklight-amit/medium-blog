const username = "amit.rajawat12";
const feedURL = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`;

fetch(feedURL)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("articles");
    data.items.forEach(item => {
      const article = document.createElement("div");
      article.classList.add("article");
      article.innerHTML = `
        <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
        <p>${item.pubDate.split(' ')[0]} — ${item.author}</p>
        <p>${item.description.substring(0, 200)}...</p>
      `;
      container.appendChild(article);
    });
  })
  .catch(error => {
    console.error("Error fetching Medium feed:", error);
    document.getElementById("articles").innerHTML = "<p>Failed to load articles. Please try again later.</p>";
  });
