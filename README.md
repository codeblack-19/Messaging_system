## FastText Instant Messaging App

This application was created with the create-react-app frameword, which is used for frontend development in almost every part of the world. 

This frontend application communticates with an external Api which handles all the database 
and authentication operation. 

## Main Component 
* An Api to communicate with the client
* The Use of Auth0 for authentication
* The use of Mongodb as database

## App features 
* A single paged application with two pane
* left pane for selecting user for chat
* right pane for chating selected users
* A login and a resgistion

## FUNCTIONAL REQUIREMENT (Api Endpoints)
* There are "10" major API endpoints on the server-side and they are as follows;

1. POST '/signup'  - This Api is called to register a user onto the platform.

2. GET '/getUser/:id' - This Api when called returns user details by the id.

3. GET '/getisOnline' - This Api gets list of users who are currently logged in. 

4. GET '/OpenChart/:uid/:oid' - This Api is called to retrieve current chat session between sender and recipient. 

5. POST '/message'  - This Api is called to send a message to be delivered to recipient.

6. GET '/message/:uid/:oid'  - This Api called returns an array of all messages between sender and recipient. 

7. GET '/getUserId/:id' - This Api when called gets the id of a user

8. GET '/offline/:id' - This Api when called gets the id of logged out user.

9. POST '/blockuser' - This Api when called adds user details to list of blocked users.

10. POST '/unblock' - This Api when called removes blocked user to list of unblocked.


* API payloads are all in JSON format.
