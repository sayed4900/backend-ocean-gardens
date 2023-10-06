# backend-ocean-gardens

## Main Routes

### Authentication Routes

- **POST /signup**
  - Creates a new user account.
  - Controller Function: `authController.signup`

- **POST /login**
  - Allows users to log in.
  - Controller Function: `authController.login`

- **GET /logout**
  - Logs the user out.
  - Controller Function: `authController.logout`

## Post Routes

### Post Management Routes

- **GET /**
  - Retrieves all posts.
  - Controller Function: `postController.getAllPosts`

- **GET /:id**
  - Retrieves a specific post by ID.
  - Controller Function: `authController.protect`, `postController.getPost`

- **POST /createPost**
  - Creates a new post.
  - Middleware: `upload.single('file')`
  - Authentication Required: `authController.protect`
  - Controller Function: `postController.makePost`

### Likes and Favorites Routes

- **PUT /updateLikes/:id**
  - Updates the likes for a specific post.
  - Authentication Required: `authController.protect`
  - Controller Function: `postController.updateLikes`

- **PUT /updateFavorites/:id**
  - Updates the favorites for a specific post.
  - Authentication Required: `authController.protect`
  - Controller Function: `postController.updateFavorites`

- **DELETE /deletePost/:id**
  - Deletes a specific post.
  - Authentication Required: `authController.protect`
  - Controller Function: `postController.deletePost`

## Comment Routes

### Comment Management Routes

- **POST /createComment/:postid**
  - Creates a new comment on a specific post.
  - Authentication Required: `authController.protect`
  - Controller Function: `commentController.makeComment`

- **DELETE /deleteComment/:postid/:commentid**
  - Deletes a specific comment on a post.
  - Authentication Required: `authController.protect`
  - Controller Function: `commentController.deleteComment`

- **PUT /updateComment/:postid/:commentid**
  - Updates a specific comment on a post.
  - Authentication Required: `authController.protect`
  - Controller Function: `commentController.updateComment`

---


