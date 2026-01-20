---
title: Made an All Posts Page
blurb: This makes a blog index page to display all posts.
---
## Made an All Posts Page

1. In `howto.md` changed the front matter from navigation order 2 to 3.
2. In `/layouts`, made `blog.njk` and copied `base.njk` into the new layout.
3. In `/src` made `blog.md` with front matter:
```
---
title: All Posts
layout: /layouts/blog
eleventyNavigation: 
	key: All Posts
	order: 2
---
```
4. Added all posts to `blog.njk` with this code:
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