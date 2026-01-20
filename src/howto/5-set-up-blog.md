---
title: Made a Blog
blurb: These steps strucure the blog and make posts appear on the home page.
---
## Set Up the Blog
1. Made folder `/src/blog`.
2. In `/layouts` made `posts.njk` and copied content from `base.njk`. 
3. Edited `<main></main>` in `posts.njk` as follows:
{% raw %}
```
<main>
  <h2>{{ title }}</h2>
  <p><strong><time datetime="{{ date | correctISO }}">{{ date | niceDate }}</time></strong></p>
  {{ content | safe }}
</main>
```
{% endraw %}
4. Made file `blog.json` in `/blog` and set layout and tags:
{% raw %}
```
{
  "layout": "/layouts/blogPost.njk",
  "tags": "posts"
}
```
{% endraw %}
5. Using a pattern that will repeat for all blog posts, in `/blog`, made blog post `YYYY-MM-DD-title-of-post.md` with front matter:
```
title: The Title of the Post
date: YYYY-MM-DD
blurb: A blurb about the post.
tags:
  - First Tag
  - Second Tag
```
6.  Used Eleventy to make posts appear, newest to oldest, on `index.md` with:
{% raw %}
```
<h2>Blog</h2>
{% for posts in collections.posts reversed %}
	**{{ posts.data.date | correctISO }} &mdash; [{{ posts.data.title }}]({{ posts.url }})**
	_{{ posts.data.blurb }}_
{% endfor %}
```
{% endraw %}
7. In `.eleventy.js` made a filter to remove "posts" and "all" from the tags collection:
{% raw %}
```
eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    	return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
    });
```
{% endraw %}
8. In `.eleventy.js` made another filter to sort tags into alphabetical order:
```
eleventyConfig.addFilter("sortTags", function(tags) {
    	if (!Array.isArray(tags)) return tags;
    	return tags
    	.filter(tag => typeof tag === "string") // Ensure only strings are processsed 
    	.sort((a, b) => a.localeCompare(b));
    });
```
9. In `/src` made the file `tagpages.njk`. Wrote front matter as follows:
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
10. In `tagpages.njk`, added a loop to display all posts with the specified tag:
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