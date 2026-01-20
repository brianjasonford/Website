---
title: Installed Eleventy, Made an Index Page
blurb: The prelimiary steps for creating this website.
---
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