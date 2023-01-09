
 It fetches this information when it mounts & keeps user info in its state.
Renders a Logo, ProfilePic, and Uploader
Passes functions to ProfilePic and Uploader for making changes to its state
Must be a class since it needs both state and lifecycle methods
ProfilePic
its job is to display a profile pic (can use first and last name fo the alt tag of the image)
Is passed props that tell it the first and last name of the user and the url of the image. (put name of user in the alt attribute).
Is also passed a prop that is a function that it must call when the image is clicked. When user clicks the pic, the uploader needs to become visible.
Can be a function (😄) or a class (😦)
Uploader
needs to be a class based component as it will have state
we need to conditionally render uploader. It starts of as hidden but when you click on the profilePic, you will make it visible. The conditional rendering of uploader depends on the current state. Make it look like a modal.
When visible, it needs to render a file input to make image upload possible
handles the change event on the file input and uploads the selected file at that time
when the upload is done, you should know the url of the uploaded file and you must pass the url to a function in App (function was passed to uploader as a prop).
for image upload, refer to what you did in IB. (formData, multer, s3, etc).
The function we pass the url to will update the state in App when there is a new image and will also close the modal afterwards.
Maybe uploader has a button or x for closing. This too must call a function that was passed as a prop to make the uploader disappear.
You'll need to add a new column to your user's table for the imageUrl- make it text.
Make sure you do an UPDATE for the image in the users table rather than an insert (you'll need userId and the imgUrl)