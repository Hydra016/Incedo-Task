# Incedo-Task

Instructions:

Step 1:
pull this git repository:
https://github.com/Hydra016/Incedo-Task.git

Step 2:
use "npm start" in the terminal as nodemon is install and you don't have to start the server everytime.

Step 3:
Test the API on postman. 

Extra:

Since the task was pretty small I added some extra functionality like registering a user and logging in and then I used jwt so that only authenticated users can get the artists.

routes:

login: http://localhost:3000/users/login 

already made user: 
{
"email": "test@gmail.com"
"password": "test"
}

copy and paste the above json to the body in postman and you should get an auth-token in response. add that auth-token in the headers while sending the request for artists and it will work.

signup: http://localhost:3000/users/signup 

artists: http://localhost:3000/users/artist/search?name={artistName}

