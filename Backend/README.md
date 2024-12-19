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






# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description:
This endpoint is used to log in an existing user. It requires the user's email and password.

### Request Body:
The request body should be a JSON object containing the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses:

#### Success:
- **Status Code: 200 OK**
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

#### Authentication Errors:
- **Status Code: 401 Unauthorized**
- **Response Body:**
  ```json
  {
    "message": "Invalid email or password"
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
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```











# User Profile Endpoint Documentation

## Endpoint: `/user/profile`

### Method: GET

### Description:
This endpoint is used to retrieve the profile of the authenticated user.

### Headers:
- `Authorization` (string, required): The JWT token for authentication. Should be in the format `Bearer <token>`.

### Responses:

#### Success:
- **Status Code: 200 OK**
- **Response Body:**
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }

#### Authentication Errors:
- **Status Code: 401 Unauthorized**
- **Response Body:**

 ```json
  {
    "message": "Authentication failed"
  }
  ```







### User Logout Endpoint Documentation

## Endpoint: `/user/logout`

### Method: GET

### Description:
This endpoint is used to log out the authenticated user. It clears the authentication token from cookies and blacklists the token to prevent further use.

### Headers:
- `Authorization` (string, required): The JWT token for authentication. Should be in the format `Bearer <token>`.

### Responses:

#### Success:
- **Status Code: 200 OK**
- **Response Body:**
  ```json
  {
    "message": "Logged out successfully"
  }

#### Authentication Errors:
- **Status Code: 401 Unauthorized**
- **Response Body:**

 ```json
  {
    "message": "Unauthorized"
  }
  ```




### Captain Register Endpoint Documentation

## Endpoint: `/captain/register`

### Method: POST

### Description:
This endpoint is used to register a new captain. It validates the input data and creates a new captain record in the database.

### Request Body:
- `email` (string, required): The email of the captain. Must be a valid email format.
- `fullname` (object, required):
  - `firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
  - `lastname` (string, required): The last name of the captain.
- `password` (string, required): The password for the captain's account. Must be at least 6 characters long.
- `vehicle` (object, required):
  - `color` (string, required): The color of the vehicle. Must be at least 3 characters long.
  - `plate` (string, required): The plate number of the vehicle. Must be at least 7 characters long.
  - `capacity` (integer, required): The capacity of the vehicle. Must be at least 1.
  - `vehicleType` (string, required): The type of the vehicle. Must be one of `car`, `bike`, or `auto`.


#### Example Request:
````json
{
  "email": "john.doe@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}

````

### Responses:

#### Success:
- **Status Code: 201 Created**
- **Response Body:**
  ```json
  {
    "captain": {
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "jwt_token_here"
  }
   ```


### Captain Login Endpoint Documentation

## Endpoint: `/captain/login`

### Method: POST

### Description:
This endpoint is used to log in an existing captain. It requires the captain's email and password.

### Request Body:
```json
{
  "email": "john.doe@example.com", // string, required, must be a valid email format
  "password": "password123" // string, required, must be at least 6 characters long
}
```

### Responses:

#### Success:
- **Status Code: 200 OK**
- **Response Body:**
  ```json
  {
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC1234",
      "capacity": 4,
    }
  }
  }
  ```





  ### Captain Profile Endpoint Documentation

## Endpoint: `/captain/profile`

### Method: GET

### Description:
This endpoint is used to retrieve the profile of the authenticated captain.

### Headers:
```json
{
  "Authorization": "Bearer your_jwt_token" // string, required, the JWT token for authentication
}
```

### Responses:

#### Success:
- **Status Code: 200 OK**
- **Response Body:**
  ```json
  {
  "_id": "captain_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
  }
  ```





  ### Captain Logout Endpoint Documentation

## Endpoint: `/captain/logout`

### Method: GET

### Description:
This endpoint is used to log out the authenticated captain. It clears the authentication token from cookies and blacklists the token to prevent further use.

### Headers:
```json
{
  "Authorization": "Bearer your_jwt_token" // string, required, the JWT token for authentication
}
```

### Responses:

#### Success:
- **Status Code: 200 OK**
- **Response Body:**
```json
 {
  "message": "Logged out successfully"
 }
```



