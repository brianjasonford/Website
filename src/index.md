---
title: Home
layout: /layouts/homepage
eleventyNavigation:
    key: Home
    order: 1
---
<h2>Welcome</h2>
Hello! My name is Brian. I enjoy keyboards, coffee, stories told though all sorts of media, and nerdy games. I made this website because I am curious about how websites work and want the challenge of making something new.

<p class="notice">There is a reasonable chance that you have found this page by searching for my name. If you did that, you might know me in a professional context. Please note that this is my personal website. <strong>I do not talk about my work here.</strong> Do not contact me about my work through this website or on social media.</p>

<h2>🗓️ Recent Posts</h2>
{% for posts in collections.myPostsReverse limit: 3 %}
    **{{ posts.data.date | correctISO }} &mdash; [{{ posts.data.title}}]({{ posts.url }})**<br>
    _{{ posts.data.blurb }}_
{% endfor %}