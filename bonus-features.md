## List of Users Online

-   do not add multiple times!

## Wall Posts

Allow users to add textual messages to their own and their friends' profile screens. These should be shown in reverse chronological order and should only be visible to friends of the user whose profile the post appears on.

-   Posts should show the author of the post,
-   the time and date it was created,
-   and the text.
    You can take this even further by allowing users to post images or links. For link posts you could crawl the submitted url to find the page's title and an image to display.
    Yet another enhancement would be to allow friends to comment on posts:)

## Friend Request Notifications

Use socket.io to alert users when they receive a friend request if the request occurs while they are using the site. To do this, you will have to maintain a list of socket ids and the user ids that the sockets belong to. You could modify the Friends link in your navigation to show in parentheses the number of open requests and increment this number every time a friend request happens. Alternatively, you could make some sort of pop up message appear.

# DEPLOY!!!

huroko.

## delete messages???

Wall Posts - ⭐️ / ⭐️⭐️⭐️
You would need a new wall_posts table that keeps track of all the posts for specific users. friends could be allowed to post on your wall too. You could allow comments on wall posts You could display website previews when people post links. You may want to look into cheerio.js to find the meta information of a website

Friend Request Notifications - ⭐️ / ⭐️⭐️⭐️
You want to implement the list of online users first.

When someone makes a friendship request, you could send that information straight away over sockets and display it to the user without requiring a refresh. You could for example add a bell icon with a red dot. If you want to display notifications for users that were offline when something happened, you'd need to keep track of those events in a table, notificaitions say
