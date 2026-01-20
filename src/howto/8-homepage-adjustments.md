---
title: Homepage Adjustments
blurb: This Limits the number of posts on the homepage and adds a post tag list.
---
## Homepage Adjustments

1. Limited the number of posts displaying on the homepage to the three most recent by adding a collection to `.eleventy.js` and then editing the code in the homepage. The collection is:
``` 
eleventyConfig.addCollection("myPostsReverse", function (collectionsApi) {
	return collectionsApi.getFilteredByTag("posts").reverse();
});
```
2. ... and the edits to the homepage are to replace the prior blog display with this:
{% raw %}
```
<h2>Recent Posts</h2>
{% for posts in collections.myPostsReverse limit: 3 %}
	**{{ posts.data.date | correctISO }} &mdash; [{{ posts.data.title}}]({{ posts.url }})**<br>
	_{{ posts.data.blurb }}_
{% endfor %}
```
{% endraw %}
3. Added a list of blog post tags on the homepage by making a partial to list the tags, then using that partial in `base.njk` (it won't work in `index.md` or any other Markdown file. For the partial, in `/partials` made `allPostTags.njk`, which lists all post tags in alphabetical order with this code:
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
4. ... and in `base.njk` added in `<main></main>`:
{% raw %}
```
<h2>🏷️ Tags</h2>
{% include "partials/allPostTags.njk" %}
```
{% endraw %}