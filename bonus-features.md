
## Account Deletion
...also: 
All rows that have the user's id in the chat_messages table
Every profile picture they have ever uploaded. This will require a change to how you store the urls of profile pics so that you have a record of every single one for every single user. It will also require you to use the deleteObject method from the AWS SDK.


## List of Users Online
To show a list of users who are online you will have to maintain the list on the server, adding users to it when their sockets connect and removing them when their sockets disconnect. Keep in mind that a user can have multiple tabs or browsers open, which means that they may appear in the list more than once.

## Private Messages
Use socket.io to allow users to conduct private, one-on-one chats with other users who are their friends (but disallow private chats between two users who are not friends). To do this, you will have to maintain a list of socket ids and the user ids that the sockets belong to.

## Wall Posts 
Allow users to add textual messages to their own and their friends' profile screens. These should be shown in reverse chronological order and should only be visible to friends of the user whose profile the post appears on. 
- Posts should show the author of the post,
- the time and date it was created, 
- and the text. 
You can take this even further by allowing users to post images or links. For link posts you could crawl the submitted url to find the page's title and an image to display. 
Yet another enhancement would be to allow friends to comment on posts:)

## Friend Request Notifications
Use socket.io to alert users when they receive a friend request if the request occurs while they are using the site. To do this, you will have to maintain a list of socket ids and the user ids that the sockets belong to. You could modify the Friends link in your navigation to show in parentheses the number of open requests and increment this number every time a friend request happens. Alternatively, you could make some sort of pop up message appear.

## Friends on Profile Pages
When users view the profile page of a user with whom they are friends, show them a selection of other users that are also friends with the user whose profile is being viewed.

## Reduxify Parts 3 through 6 
- We didn't start using Redux until Part 9 so local state is still used for a lot of components. 
You might prefer to use the global redux state throughout. If you do this, you'll have to create a whole bunch of new actions and reducers. You may want to create a new file for each feature (users/slice.js, bio/slice.js, other-users/slice.js, etc.), which will contain the associated sub-reducers and actions. Don’t forget to integrate the sub-reducers into your root reducer with combineReducer().

## Write or Rewrite Some Components in TypeScript +
- Using TypeScript with React is so hot right now. If you choose to do this, there are some things you need to be aware of.