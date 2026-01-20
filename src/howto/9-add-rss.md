---
title: Added an Atom (RSS) Feed
blurb: This adds a feed for subscribing to the blog.
---
## Added an RSS Feed

1. Followed the guide at the [Eleventy RSS page](https://www.11ty.dev/docs/plugins/rss/), starting with installing the Eleventy's RSS plugin with `npm install @11ty/eleventy-plugin-rss`.
2. In `.eleventy.js` added a constant and a plugin to make a [virtual template](https://www.11ty.dev/docs/plugins/rss/#virtual-template) with this code:
{% raw %}
```
<!--- This is the new constant -->
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

<!--- This goes with the filters previously added -->
eleventyConfig.addPlugin(feedPlugin, {
	type: "atom", // or "rss", "json"
	outputPath: "/feed.xml",
	collection: {
		name: "posts", // iterate over `collections.posts`
		limit: 0,     // 0 means no limit
	},
	metadata: {
		language: "en",
		title: "Brian's Website",
		subtitle: "These are posts from Brian's Website.",
		base: "https://brianjasonford.com",
		author: {
			name: "Brian Ford",
			email: "", // Optional
		}
	}
});
```
{% endraw %}
3. Ran `npm start` to start Eleventy, which makes `feed.xml` in `/public`.
4. Added a link to the feed on the homepage in `homepage.njk`. I did not do this in `index.md` because I wanted it at the bottom and editing the layout made that easier. This is the code:
```
<h2>📡 Feed</h2>
Subscribe: <a href="./feed.xml">RSS/Atom feed</a> for your reader of choice.
```
5. Edited the `posts.njk` layout to also include a link to the feed at the bottom of every post.