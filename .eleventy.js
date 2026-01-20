const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = (eleventyConfig) => {
    // Passthroughs
    eleventyConfig.addPassthroughCopy('./src/css/');
    eleventyConfig.addPassthroughCopy('./src/images/');

    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Collections
	eleventyConfig.addCollection("myPostsReverse", function (collectionsApi) {
		return collectionsApi.getFilteredByTag("posts").reverse();
	});

    // Filters
    eleventyConfig.addFilter("correctISO", (dateObj) => {
    	return DateTime.fromJSDate(dateObj, { zone: "utc"}).toFormat("yyyy-MM-dd");
    });
    
    eleventyConfig.addFilter("niceDate", (dateObj) => {
    	return DateTime.fromJSDate(dateObj, { zone: "utc"}).toFormat("dd MMMM yyyy");
    });

    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "posts", "howto"].indexOf(tag) === -1);
    }); 

    eleventyConfig.addFilter("sortTags", function(tags) {
        if (!Array.isArray(tags)) return tags;
        return tags
        .filter(tag => typeof tag === "string") //Ensure only strings are processsed
        .sort((a, b) => a.localeCompare(b));
    });

    eleventyConfig.addPlugin(feedPlugin, {
        type: "atom", // or "rss", "json"
        outputPath: "/feed.xml",
        collection: {
            name: "posts", // iterate over `collections.posts`
            limit: 0, // 0 means no limit
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

    return {
        dir: {
            input: 'src',
            output: 'public',
        },
    };
};