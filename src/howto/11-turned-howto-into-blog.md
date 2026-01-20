---
title: Turned the How To Page Into a Blog
blurb: This makes the How To page organized and readable.
---
## Turned the How To Page into a Blog

I realized that the How To page was getting unwieldy and difficult to manage. Also, it was doing a bad job of showing how this website evolved over time. I thought the right fix was to make the How To page into a blog. Following steps very similar to those I took when I [made the blog](/howto/5-set-up-blog/), this is what I did:

1. In `/src` made a `/howto` folder.
2. In `/howto` made `howto.json` with code similar to `blog.json`:
{% raw %}
```
{
    "layout": "/layouts/base.njk",
    "tags": "howto"
}
```
{% endraw %}
3. In `.eleventy.json`, edited the tag list filter to filter out the "howto" tag. The updated code looks like this:
{% raw %}
```
eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "posts", "howto"].indexOf(tag) === -1);
}); 
```
{% endraw %}
4. Renamed `howto.md` to `old-howto.md` and edited its front matter to remove it from the navigation bar.
5. Made a new file in `/src` named `howto.md` with the same front matter as the old "How To" page:
```
---
title: How To
layout: /layouts/base
eleventyNavigation: 
  key: How To
  order: 3
---
```
6. In `/layouts` made `howto.njk` and copied the code from `blog.njk` to the new file.
7. Edited the code in `howto.njk`, replacing everyting in `<main></main>` with this:
{% raw %}
```
{{ content | safe }}
{% for posts in collections.howto %}
    <article>
        <strong><a href="{{ posts.url }}">{{ posts.data.title }}</a></strong><br>
        <em>{{ posts.data.blurb }}</em><br>
    </article>
{% endfor %}
```
{% endraw %}
8. For each section in `old-howto.md`, created a new Markdown page in `/howto`, copied the section to the new page, and added front matter with a title and blurb.
9. Copied the introductory section from `old-howto.md` to the new `howto.md`.

If you are curious, you can see the old How To page [here](/old-howto).