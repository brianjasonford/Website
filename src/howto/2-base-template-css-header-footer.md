---
title: Made a Base Template with CSS, Header, and Footer
blurb: Established some basic structure.
---
## Made a Base Template with CSS, Header, and Footer

This makes a template that will be used for most pages. This also adds CSS, a header, and a footer to all pages that use the template.

1. Made folder `/src/css`
2. Made `simple.css` file and added Simple CSS from <https://cdn.simplecss.org/simple.css>.
3. In `.eleventy.js` added a passthrough for CSS under `module.exports`, above `return`:
```
// Passthroughs
eleventyConfig.addPassthroughCopy('./src/css/');
```
4. Made folder `/src/_includes/layouts`.
5. Made layout file `base.njk` in `/layouts` and added HTML5 boilerplate.
6. In the `<head></head>` of `base.njk` in `<title></title>` replaced Document with Brian's Website.
7. In the `<body></body>` of `base.njk`, added `<header></header>`, `<main></main>`, and `<footer></footer>`.
8. In `<main></main>` added `{% raw %}{{ content | safe }}{% endraw %}`.<sup id="ref-1"><a href="#fn-1">[1]</a></sup>
9. In `index.md`, added front matter:
```
---
title: Home
layout: /layouts/base
---
```
10. Made folder `/_includes/partials`.
11. In `/partials` made `header.html` with `<h1>Brian's Website</h1>`.
12. In `/partials` made `footer.html` with "Made with ☕ and ⌨️ by Brian"
13. Included `header.html` and `footer.html` in `base.njk` with `{% raw %}{% include "partials/FILENAME.html" %}{% endraw %}`.
---
Footnotes
<ol>
    <li id="fn-1">
        To make code with curly brackets display correctly and not make an error, put the code between {% raw %}<code>{% raw %}</code> and <code>{% end&zwnj;raw %}</code>{% endraw %}. <a href="#ref-1" title="Jump back to the reference in the text">&#8617;</a>
    </li>
</ol>