document.addEventListener("DOMContentLoaded", function () {
    const mediumUsername = "amit.rajawat12"; // Your Medium username
    const rssFeed = `https://medium.com/feed/@${mediumUsername}`;
    const apiURL = `https://api.rss2json.com/v1/api.json?rss_url=${rssFeed}`;

    const articlesContainer = document.getElementById("articles");

    async function fetchMediumArticles() {
        try {
            let response = await fetch(apiURL);
            let data = await response.json();

            if (data.status === "ok") {
                articlesContainer.innerHTML = ""; // Clear existing content
                data.items.slice(0, 6).forEach(article => {
                    const articleHTML = `
                        <div class="col-md-4">
                            <div class="article-card">
                                <h2>${article.title}</h2>
                                <p><strong>Published:</strong> ${article.pubDate.split(" ")[0]}</p>
                                <p>${article.description.substring(0, 100)}...</p>
                                <a href="${article.link}" target="_blank" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    `;
                    articlesContainer.innerHTML += articleHTML;
                });
            } else {
                articlesContainer.innerHTML = "<p>Failed to load articles. Please try again later.</p>";
            }
        } catch (error) {
            console.error("Error fetching Medium articles:", error);
            articlesContainer.innerHTML = "<p>Could not fetch articles. Please check your Medium profile privacy.</p>";
        }
    }

    fetchMediumArticles();
});
