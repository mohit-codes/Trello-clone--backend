# Trello-clone--backend

Backend repository

## List of API endpoints

### Users

- POST /users/login - Takes username and password as a parameter and returns JWT.
- POST /users/signup - Providing username, password, and email would add a new user into the database.
- GET /users/boards/:userId - fetch all boards of single user.

### Boards

- POST /boards/create - Takes title and userId to add new board and returns boardId.
- GET /boards/:boardId - Fetch the details of single board.
- PUT /boards/:boardId - Update details of board (except id and ref).
- DELETE /boards/:boardId - delete board.

### Lists

- POST /lists/create - Takes title and boardId to add new list and returns listId.
- GET /lists/:listId - Fetch the details of single list.
- PUT /lists/:listId - Update details of list (except id and board ref).
- DELETE /lists/:listId - delete list.

### Cards

- POST /cards/create - Takes title and listId to add new card and returns cardId (description is optional in request).
- PUT /cards/:cardId - Update details of card (except id and list ref).
- DELETE /cards/:cardId - delete card.

## Tech Stack

### - Mongoose

### - Node js

### - Express js

### - MongoDB
