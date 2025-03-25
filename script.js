document.addEventListener("DOMContentLoaded", function () {
    const mediumUsername = "amit.rajawat12";  // Your Medium username
    const proxyURL = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://medium.com/feed/@${mediumUsername}`)}`;

    const articlesContainer = document.getElementById("articles");

    async function fetchMediumArticles() {
        try {
            let response = await fetch(proxyURL);
            let data = await response.json();

            if (data.contents) {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data.contents, "text/xml");
                let items = xmlDoc.getElementsByTagName("item");

                articlesContainer.innerHTML = ""; // Clear content

                for (let i = 0; i < Math.min(6, items.length); i++) {
                    let title = items[i].getElementsByTagName("title")[0].textContent;
                    let link = items[i].getElementsByTagName("link")[0].textContent;
                    let pubDate = items[i].getElementsByTagName("pubDate")[0].textContent;
                    let description = items[i].getElementsByTagName("description")[0].textContent.replace(/<[^>]*>?/gm, '').substring(0, 100);

                    let articleHTML = `
                        <div class="col-md-4">
                            <div class="article-card">
                                <h2>${title}</h2>
                                <p><strong>Published:</strong> ${pubDate.split(" ")[0]}</p>
                                <p>${description}...</p>
                                <a href="${link}" target="_blank" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    `;

                    articlesContainer.innerHTML += articleHTML;
                }
            } else {
                articlesContainer.innerHTML = "<p>Failed to load articles. Please try again later.</p>";
            }
        } catch (error) {
            console.error("Error fetching Medium articles:", error);
            articlesContainer.innerHTML = "<p>Could not fetch articles. Please check your internet connection.</p>";
        }
    }

    fetchMediumArticles();
});
