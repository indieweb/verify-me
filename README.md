# verify-me
A plugin that checks all rel="me" links are reciprocal, doing distributed verification

It uses the indiewebify.me link checker service, and so has the same issues as that does - it may miss some kinds of redirection, and if you serve both http and https  wihtout redirection it will not coalesce them.
