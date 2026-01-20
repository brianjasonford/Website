---
title: Made Images Work
blurb: This creates a folder for images and passes them through to the website.
---
## Made Images Work

1. Made folder `/src/images`. Images will go there.
2. In `.eleventy.js`, added a new passthrough for images, just below the passthrough for CSS:<sup id="ref-1"><a href="#fn-1">[1]</a></sup>
```
eleventyConfig.addPassthroughCopy('./src/images/');
```
---
Footnotes
<ol>
    <li id="fn-1">
        To use an image, put the file in the `/images` folder and then add the image to whatever page you like using Markdown (e.g. `![alt text](/images/FILENAME)`) or HTML (e.g. <code>&lt;img src="/images/FILENAME" alt="alt text"&gt;</code>). I like HTML for this because it is easier to center images by placing the <code>&lt;img&gt;</code> within <code>&lt;p align="center"&gt;&lt;/p&gt;</code>.<a href="#ref-1" title="Jump back to the reference in the text">&#8617;</a>
    </li>
</ol>