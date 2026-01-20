---
title: Added a Navigation Bar and How To Page
blurb: This adds a navigation bar, shows how pages are added to the navigation bar, and creats a How To page.
---
## Added Navigation and This Page

This adds a navigation bar, shows the pattern for front matter that adds pages to the navigation bar. This is also where I crated a How To page (no point in having a navigation bar until I had two pages).

1. In `/src` added `howto.md` and copied/pasted my notes.<sup id="ref-1"><a href="#fn-1">[1]</a></sup>
2. Installed the Eleventy Navigation Plugin with `const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");`.
3. In `.eleventy.js` added `` above `module.exports` and added the plugin above `return`:
```
// Plugins
eleventyConfig.addPlugin(eleventyNavigationPlugin);
```
4. In `/partials`, made `navbar.html` and added code:<sup id="ref-2"><a href="#fn-2">[2]</a></sup>
```
{% raw %}<nav>{{ collections.all | eleventyNavigation | eleventyNavigationToHtml({ activeKey: eleventyNavigation.key, useAriaCurrentAttr: true }) | safe }}</nav>{% endraw %}.
``` 
5. In `index.md` front matter, added:
```
eleventyNavigation:
        key: Home
        order: 1
```
6. In `howto.md` front matter, added:<sup id="ref-3"><a href="#fn-3">[3]</a></sup>
```
eleventyNavigation:
        key: How To
        order: 2
```
---
Footnotes
<ol>
    <li id="fn-2">
          As I built this website, I took notes about what I was doing in <a href="https://getdrafts.com">Drafts</a>, an app I love very much! <a href="#ref-2" title="Jump back to the reference in the text">&#8617;</a>
    </li> 
    <li id="fn-3">
        This collects the EleventyNavigation keys and URLs (we are about to make those), and adds a function to correctly set <code>aria-current="page"</code>. Putting all of that in <code>&lt;nav&gt;&lt;/nav&gt;</code> makes everything display correctly. <a href="#ref-3" title="Jump back to the reference in the text">&#8617;</a>
    </li>
    <li id="fn-4">
        This pattern will repeat in all new pages except for blog entries. <a href="#ref-4" title="Jump back to the reference in the text">&#8617;</a>
    </li>
</ol>