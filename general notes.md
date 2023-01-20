## error displays in different cases of the reset :(

## add anymation to message popup

## typescript and await anync (change on the weekend)

Remember to put your cookie-session logic into a separate file, so you can add it as middleware to both the app and the socket.io instance.

Listen out for the two events in your socket setup on the client
When data is received, dispatch an action to the Redux store!
Create your Chat component and route in the client.
Render in a list, all the chat messages found in the Redux store
Add an input to allow the user to type and send a new message
When the sending is triggered by the user, use the socket object to emit to the server a new data-message, which will include only the user's typed text as the data/payload.
