---
title: Added Date Fiters
blurb: Before setting up a blog, this will make dates display correctly.
---
## Add Date Filters 

I wanted to make a blog, but displaying dates correctly in Eleventy is a [common pitfall](https://www.11ty.dev/docs/dates/#dates-off-by-one-day). To get around this, I used date filters. The first filter will make the date display correctly in ISO format (e.g. YYYY-MM-DD). The second filter will make the date display with the month spelled out (e.g. YYYY Month DD). I made the date filters first, and then the blog.

1. In `.eleventy.js`, above `module.exports` added `const { DateTime } = require("luxon");`
2. In `.eleventy.js`, below `module.exports` but above `return {` added:
```
// Filters
eleventyConfig.addFilter("correctISO", (dateObj) => {
    	return DateTime.fromJSDate(dateObj, { zone: "utc"}).toFormat("yyyy-MM-dd");
    });

eleventyConfig.addFilter("niceDate", (dateObj) => {
    	return DateTime.fromJSDate(dateObj, { zone: "utc"}).toFormat("dd MMMM yyyy");
    });
```