---
title: Old How To
layout: /layouts/base
---
## How I Made this Website
**I am not qualified to teach you how to make a website.** I am not a programmer or developer or anything like that. If you are making your first website, [HTML For People](https://htmlforpeople.com/) by Blake Watson is the best place to start. After working through HTML for People, I found [Eleventy](https://www.11ty.dev/). I'm using Eleventiy to generate this website. Before using Eleventy, I strongly recommend Zach Leatherman's great video [6 Minutes to Build a Blog from Scratch with Eleventy](https://www.youtube.com/watch?v=kzf9A9tkkl4) and Stephanie Eckles' fantastic class, [Builld an Eleventy (11ty) Site from Scratch](https://egghead.io/courses/build-an-eleventy-11ty-site-from-scratch-bfd3). Stephanie's website, [11ty Rocks!](https://11ty.rocks/), well, rocks! The [Learn Eleventy](https://learn-eleventy.pages.dev/) project is outstanding, even if their scope is quite a bit broader than what I needed. [11tybundle.dev](https://11tybundle.dev/) shares the latest and greatest. Finally, but importantly, the folks at the [11ty Discord server](https://www.11ty.dev/blog/discord/) have been welcoming, kind, and helpful - sometimes going out of their way to help me. I appreciate them very much.

This is what I did...


## Installed Eleventy, Made Index Page

These are the prelimiary setps to set up Eleventy.

1. Created a folder for the website (I called mine "Website").
2. Opened the Website folder in VS Code.
3. Confirmed that Node.js was installed with `node -v`(v22.14.0 was installed).
4. Made `.eleventy.js` configuration file. Added code similar to what is used in the [Learn Eleventy](https://learn-eleventy.pages.dev/lesson/2/) project:
```
module.exports = (eleventyConfig) => {
    	return {
    		dir: {
    			input: 'src',
    			output: 'public',
    		},
    	};
    };
```
5. Made `/src` folder.
6. In `/src` made `index.md` with Hello World placeholder.
7. Added `package.json` with `nom init -y`.
8. In `package.json`, replaced test script with `"start": "npx eleventy --serve"`.
9. Installed Eleventy with `npm install @11ty/eleventy`.
10. Ran Eleventy with `npm start`. This creates `/publc`. Checked [http://localhost:8080](http://localhost:8080/).

## Made a Base Template with CSS, Header, and Footer

This makes a template that will be used for most pages. This also adds CSS, a header, and a footer to all pages that use the template.

11. Made folder `/src/css`
12. Made `simple.css` file and added Simple CSS from <https://cdn.simplecss.org/simple.css>.
13. In `.eleventy.js` added a passthrough for CSS under `module.exports`, above `return`:
```
// Passthroughs
eleventyConfig.addPassthroughCopy('./src/css/');
```
14. Made folder `/src/_includes/layouts`.
15. Made layout file `base.njk` in `/layouts` and added HTML5 boilerplate.
16. In the `<head></head>` of `base.njk` in `<title></title>` replaced Document with Brian's Website.
17. In the `<body></body>` of `base.njk`, added `<header></header>`, `<main></main>`, and `<footer></footer>`.
18. In `<main></main>` added `{% raw %}{{ content | safe }}{% endraw %}`.<sup id="ref-1"><a href="#fn-1">[1]</a></sup>
19. In `index.md`, added front matter:
```
---
title: Home
layout: /layouts/base
---
```
20. Made folder `/_includes/partials`.
21. In `/partials` made `header.html` with `<h1>Brian's Website</h1>`.
22. In `/partials` made `footer.html` with "Made with ☕ and ⌨️ by Brian"
23. Included `header.html` and `footer.html` in `base.njk` with `{% raw %}{% include "partials/FILENAME.html" %}{% endraw %}`.

## Added Navigation and This Page

This adds a navigation bar, shows the pattern for front matter that adds pages to the navigation bar. This is also where I crated this page (no point in having a navigation bar until I had two pages).

24. In `/src`, added `howto.md` and copied/pasted my notes.<sup id="ref-2"><a href="#fn-2">[2]</a></sup>
25. Installed the Eleventy Navigation Plugin with `const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");`.
26. In `.eleventy.js` added `` above `module.exports` and added the plugin above `return`:
```
// Plugins
eleventyConfig.addPlugin(eleventyNavigationPlugin);
```
27. In `/partials`, made `navbar.html` and added code:<sup id="ref-3"><a href="#fn-3">[3]</a></sup>
```
{% raw %}<nav>{{ collections.all | eleventyNavigation | eleventyNavigationToHtml({ activeKey: eleventyNavigation.key, useAriaCurrentAttr: true }) | safe }}</nav>{% endraw %}.
``` 
28. In `index.md` front matter, added:
```
eleventyNavigation:
    	key: Home
    	order: 1
```
29. In `howto.md` front matter, added:<sup id="ref-4"><a href="#fn-4">[4]</a></sup>
```
eleventyNavigation:
    	key: How To
    	order: 2
```

## Add Date Filters 

I wanted to make a blog, but displaying dates correctly in Eleventy is a [common pitfall](https://www.11ty.dev/docs/dates/#dates-off-by-one-day). To get around this, I used date filters. The first filter will make the date display correctly in ISO format (e.g. YYYY-MM-DD). The second filter will make the date display with the month spelled out (e.g. YYYY Month DD). I made the date filters first, and then the blog.

30. In `.eleventy.js`, above `module.exports` added `const { DateTime } = require("luxon");`
31. In `.eleventy.js`, below `module.exports` but above `return {` added:
```
// Filters
eleventyConfig.addFilter("correctISO", (dateObj) => {
    	return DateTime.fromJSDate(dateObj, { zone: "utc"}).toFormat("yyyy-MM-dd");
    });

eleventyConfig.addFilter("niceDate", (dateObj) => {
    	return DateTime.fromJSDate(dateObj, { zone: "utc"}).toFormat("dd MMMM yyyy");
    });
```
## Set Up the Blog
33. Made folder `/src/blog`.
34. In `/layouts` made `posts.njk` and copied content from `base.njk`. 
35. Edited `<main></main>` in `posts.njk` as follows:
{% raw %}
```
<main>
  <h2>{{ title }}</h2>
  <p><strong><time datetime="{{ date | correctISO }}">{{ date | niceDate }}</time></strong></p>
  {{ content | safe }}
</main>
```
{% endraw %}
36. Made file `blog.json` in `/blog` and set layout and tags:
{% raw %}
```
{
  "layout": "/layouts/blogPost.njk",
  "tags": "posts"
}
```
{% endraw %}
37. Using a pattern that will repeat for all blog posts, in `/blog`, made blog post `YYYY-MM-DD-title-of-post.md` with front matter:
```
title: The Title of the Post
date: YYYY-MM-DD
blurb: A blurb about the post.
tags:
  - First Tag
  - Second Tag
```
38.  Used Eleventy to make posts appear, newest to oldest, on `index.md` with:
{% raw %}
```
<h2>Blog</h2>
{% for posts in collections.posts reversed %}
	**{{ posts.data.date | correctISO }} &mdash; [{{ posts.data.title }}]({{ posts.url }})**
	_{{ posts.data.blurb }}_
{% endfor %}
```
{% endraw %}
39. In `.eleventy.js` made a filter to remove "posts" and "all" from the tags collection:
{% raw %}
```
eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    	return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
    });
```
{% endraw %}
40. In `.eleventy.js` made another filter to sort tags into alphabetical order:
```
eleventyConfig.addFilter("sortTags", function(tags) {
    	if (!Array.isArray(tags)) return tags;
    	return tags
    	.filter(tag => typeof tag === "string") // Ensure only strings are processsed 
    	.sort((a, b) => a.localeCompare(b));
    });
```
41. In `/src` made the file `tagpages.njk`. Wrote front matter as follows:
```
---
pagination:
	data: collections
	size: 1
	alias: tag
	filter:
		- posts
permalink: /tags/{{ tag | slug }}/
layout: /layouts/base
---
```
42. In `tagpages.njk`, added a loop to display all posts with the specified tag:
{% raw %}
``` 
<h2>Tagged: {{ tag }}</h2>

{% set taglist = collections[ tag ] %}
{% for post in taglist | reverse %}
    <p>{{ post.data.date | correctISO }} &mdash; <a href="{{ post.url }}">{{ post.data.title }}</a><br>
    <em>{{ post.data.blurb }}</em></p>
{% endfor %}
```
{% endraw %}

## Made a Back-To-Top Button

This button stays invisable untill you scroll down the page. Then, it appears and takes you back to the top of the page.

43. In `/partials` made `topButton.html` with a version of code I found at [W3Schools](https://www.w3schools.com/howto/howto_js_scroll_to_top.asp):
{% raw %}
```
<!-- this positions the button and hides it until you scroll down -->

<style>
    #topBtn {
        display: none;
        position: fixed;
        bottom: 20px;
        right: 30px;
        z-index: 99;
    }
</style>

<!-- this is the button -->

<button onclick="topFunction()" id="topBtn" title="Go to top">&uarr; Top</button>

<!-- this is the script that makes the button work -->
<script>
    // Get the button
    let mybutton = document.getElementById("topBtn");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
</script>
```
{% endraw %}

44. Added the back-to-top button to all pages by including it in the `<body></body>` of the `base.njk` and `posts.njk` layouts with {% raw %}`{% include "partials/topButton.html" %}`{% endraw %}.

## Made Images Work

45. Made folder `/src/images`. Images will go there.
46. In `.eleventy.js`, added a new passthrough for images, just below the passthrough for CSS:<sup id="ref-5"><a href="#fn-5">[5]</a></sup>
```
eleventyConfig.addPassthroughCopy('./src/images/');
```
## Homepage Adjustments

47. Limited the number of posts displaying on the homepage to the three most recent by adding a collection to `.eleventy.js` and then editing the code in the homepage. The collection is:
{% raw %}
``` 
eleventyConfig.addCollection("myPostsReverse", function (collectionsApi) {
	return collectionsApi.getFilteredByTag("posts").reverse();
});
```
{% endraw %}
48. and the edits to the homepage are to replace the prior blog display with this:
{% raw %}
```
<h2>Recent Posts</h2>
{% for posts in collections.myPostsReverse limit: 3 %}
	**{{ posts.data.date | correctISO }} &mdash; [{{ posts.data.title}}]({{ posts.url }})**<br>
	_{{ posts.data.blurb }}_
{% endfor %}
```
{% endraw %}
49. Added a list of blog post tags on the homepage by making a partial to list the tags, then using that partial in `base.njk` (it won't work in `index.md` or any other Markdown file. For the partial, in `/partials` made `allPostTags.njk`, which lists all post tags in alphabetical order with this code:
{% raw %}
```
<!-- Get all the tags from posts, filter "all" an "posts", sort alphabetically -->

{% set allTags = [] %}
{% for post in collections.all %}
    {% if post.data.tags %}
        {% for tag in post.data.tags %}
            {% if tag not in allTags %}
                {% set allTags = allTags.concat([tag]) %}
            {% endif %}
        {% endfor %}
    {% endif %}
{% endfor %}

{% for tag in allTags | filterTagList | sortTags %}
    <a href="/tags/{{ tag | slugify }}/">{{ tag }}</a>{% if not loop.last %}, {% endif %}
{% endfor %}
```
{% endraw %}
50. ... and in `base.njk` added in `<main></main>`:
{% raw %}
```
<h2>🏷️ Tags</h2>
{% include "partials/allPostTags.njk" %}
```
{% endraw %}

## Added an RSS Feed

51. Followed the guide at the [Eleventy RSS page](https://www.11ty.dev/docs/plugins/rss/), starting with installing the Eleventy's RSS plugin with `npm install @11ty/eleventy-plugin-rss`.
52. In `.eleventy.js` added a constant and a plugin to make a [virtual template](https://www.11ty.dev/docs/plugins/rss/#virtual-template) with this code:
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
53. Ran `npm start` to start Eleventy, which makes `feed.xml` in `/public`.
54. Added a link to the feed on the homepage in `homepage.njk`. I did not do this in `index.md` because I wanted it at the bottom and editing the layout made that easier. This is the code:
```
<h2>📡 Feed</h2>
Subscribe: <a href="./feed.xml">RSS/Atom feed</a> foryour reader of choice.
```
55. Edited the `posts.njk` layout to also include a link to the feed at the bottom of every post.

## Made an All Posts Page

56. In `howto.md` changed the front matter from navigation order 2 to 3.
57. In `/layouts`, made `blog.njk` and copied `base.njk` into the new layout.
58. In `/src` made `blog.md` with front matter:
```
---
title: All Posts
layout: /layouts/blog
eleventyNavigation: 
	key: All Posts
	order: 2
---
```
59. Added all posts to `blog.njk` with this code:
{% raw %}
```
<h2>✍️ All Posts</h2>
{% for posts in collections.myPostsReverse %}
	<article>
		<strong>{{ posts.data.date | correctISO }} &mdash; <a href="{{ posts.url }}">{{ posts.data.title }}</a></strong><br>
		<em>{{ posts.data.blurb }}</em><br>
		Tags: {% for tags in posts.data.tags | filterTagList | sortTags %}<a href="/tags/{{ tags | slug }}">{{ tags }}</a>{% if not loop.last %}, {% endif %}
		{% endfor %}
	</article>
{% endfor %}
```
{% endraw %}


That's it for the time being.

---
**Footnotes<sup id="ref-6"><a href="#fn-6">[6]</a></sup>**

<ol>
    <li id="fn-1">
        To make code with curly brackets display correctly and not throw an error, but the code between {% raw %}<code>{% raw %}</code> and <code>{% end&zwnj;raw %}</code>{% endraw %}. <a href="#ref-1" title="Jump back to the reference in the text">&#8617;</a>
    </li>
    <li id="fn-2">
      As I built this website, I took notes about what I was doing in <a href="https://getdrafts.com">Drafts</a>, an app I love very much! <a href="#ref-2" title="Jump back to the reference in the text">&#8617;</a>
    </li> 
    <li id="fn-3">
      This collects the EleventyNavigation keys and URLs (we are about to make those), and adds a function to correctly set <code>aria-current="page"</code>. Putting all of that in <code>&lt;nav&gt;&lt;/nav&gt;</code> makes everything display correctly. <a href="#ref-3" title="Jump back to the reference in the text">&#8617;</a>
    </li>
    <li id="fn-4">
      This pattern will repeat in all new pages except for blog entries. <a href="#ref-4" title="Jump back to the reference in the text">&#8617;</a>
    </li>
    <li id="fn-5">
      To use an image, put the file in the `/images` folder and then add the image to whatever page you like using Markdown (e.g. <code>![alt text](/images/FILENAME)</code>) or HTML (e.g. <code>&lt;img src="/images/FILENAME" alt="alt text"&gt;</code>). I like HTML for this because it is easier to center images by placing the <code>&lt;img&gt;</code> within <code>&lt;p align="center"&gt;&lt;/p&gt;</code>.<a href="#ref-5" title="Jump back to the reference in the text">&#8617;</a>
    </li>
    <li id="fn-6">
      I used HTML for these footnotes. It works like this: <a href="#ref-6" title="Jump back to the reference in the text">&#8617;</a>
      <pre>
        <code>
&lt;!-- Main content section --&gt;
&lt;p&gt;
  This is the main body of the content. I have a footnote link for this line&lt;sup id="ref-1"&gt; &lt;a href="#fn-1"&gt;[1]&lt;/a&gt;
&lt;/p&gt;
&lt;!-- Footnotes Section --&gt;
&lt;ol&gt;
  &lt;li id"fn-1"&gt;
    Here is my first footnote.&lt;a href="#ref-1" title="Jump back to the content"&gt;&#8617;&lt;/a&gt;
  &lt;/li&gt;
&lt;/ol&gt;
        </code>
      </pre>
    </li>
</ol>