# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:
This is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body:
The request body should be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code: 201 Created**
- **Response Body:**
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    },
    "token": "jwt_token"
  }
  ```

#### Validation Errors:
- **Status Code: 400 Bad Request**
- **Response Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

#### Example Validation Error Response:
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```