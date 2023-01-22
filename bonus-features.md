## List of Users Online

-   do not add multiple times!
    To show a list of users who are online you will have to maintain the list on the server, adding users to it when their sockets connect and removing them when their sockets disconnect. Keep in mind that a user can have multiple tabs or browsers open, which means that they may appear in the list more than once.

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
