document.addEventListener("DOMContentLoaded", function () {
    const mediumUsername = "amit.rajawat12"; // Your Medium username
    const rssFeed = `https://medium.com/feed/@${amit.rajawat12}`;
    const articlesContainer = document.getElementById("articles");

    async function fetchMediumArticles() {
        try {
            let response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssFeed}`);
            let data = await response.json();
            
            if (data.status === "ok") {
                data.items.slice(0, 6).forEach(article => {
                    const articleHTML = `
                        <div class="col-md-4">
                            <div class="article-card">
                                <h2>${article.title}</h2>
                                <p>${article.pubDate.split(" ")[0]}</p>
                                <p>${article.description.substring(0, 100)}...</p>
                                <a href="${article.link}" target="_blank" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    `;
                    articlesContainer.innerHTML += articleHTML;
                });
            } else {
                articlesContainer.innerHTML = "<p>Failed to load articles. Try again later.</p>";
            }
        } catch (error) {
            articlesContainer.innerHTML = "<p>Error fetching articles. Ensure your Medium account is public.</p>";
        }
    }

    fetchMediumArticles();
});
