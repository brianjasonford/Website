---
title: Made a "Back to Top" Button
blurb: This makes a button that appears when you scroll down in a page to get back to the top of the page.
---
## Made a Back-To-Top Button

This button stays invisable untill you scroll down the page. Then, it appears and takes you back to the top of the page.

1. In `/partials` made `topButton.html` with a version of code I found at [W3Schools](https://www.w3schools.com/howto/howto_js_scroll_to_top.asp):
{% raw %}
```
<!-- this positions the button and hides it until you scroll down -->

<style>
    #topBtn {
        display: none;
        position: fixed;
        bottom: 20px;
        right: 30px;
        z-index: 99;
    }
</style>

<!-- this is the button -->

<button onclick="topFunction()" id="topBtn" title="Go to top">&uarr; Top</button>

<!-- this is the script that makes the button work -->
<script>
    // Get the button
    let mybutton = document.getElementById("topBtn");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
         if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
</script>
```
{% endraw %}

2. Added the back-to-top button to all pages by including it in the `<body></body>` of the `base.njk` and `posts.njk` layouts with {% raw %}`{% include "partials/topButton.html" %}`{% endraw %}.