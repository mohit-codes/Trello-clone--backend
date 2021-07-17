# Trello-clone--backend

Backend repository

## List of API endpoints

### Users

- POST /users/login - Takes username and password as a parameter and returns JWT.
- POST /users/signup - Providing username, password, and email would add a new user into the database.

### Board

- POST /board/create - Takes name and userId to add new board and returns boardId.
- GET /board/:boardId - Fetch the details of single board.
- PUT /board/:boardId - Update details of board (except id and ref).
- DELETE /board/:boardId - delete board.
