# BlackStars-Backend
This is a server that stores information about the national football team players (The Black Stars).

This server enables signed up/in users to upload information about the players that belong to the national team

ENV Requirement
 *MONGO_URI
 *JWT_SECRET
 *JWT_LIFETIME

baseURL = http://localhost:8000/api/v1

USERS
* Singup - POST => /user-auth/singup 

    *name: String (required)
    
    *email: String (required)
    
    *password: String (required)


* Login - POST => /user-auth/login

    *email: String (required)
    
    *password: String (required)

PLAYERS (Authenticated)
* Create Player - POST => /players

    *name: String (required)
    
    *position: ['striker', 'defender', 'midfielder', 'goalkeeper'] (required)
    
    *number: int (optional)


* Get Players - GET => /players

* Patch Player - PATCH => /players

    *playerID: String (required)
    
    *name: String (optional)
    
    *position: ['striker', 'defender', 'midfielder', 'goalkeeper'] (optional)
    
    *number: int (optional)


* Delete Player - DELETE => /players

    *playerID: String (required)
