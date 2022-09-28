# WikiDB
> A REST API made using Nodejs framework, coded in expressjs library and used mongoose to connect with the mongodb.
- Nodejs is the framework which runs our app.
- We use expressjs to ease our coding by using the express methods and techniques.
- This wraps up the server part.
- Now for Database connection we use mongoose(Object Data Mapper/Modelling library) to MongoDB.
- Mongoose also eases our coding by giving us simple methods to access the Database in a jiffy.

#### For an API to be RESTful we need to follow 2 important rules.
1. Use HTTP verbs(GET, POST, PUT, PATCH, DELETE).
2. Use specific pattern of Routes.

#### Restful Routing looks like the table below:
| HTTP Verbs 	| /articles 	            | /articles/John-The-Man 	                        |
|------------	|------------------------   |------------------------------------------------   |
| GET        	| Fetches all articles      | Fetches the article on John-The-Man               |
| POST       	| Creates a new article     |             ---------------------------           |
| PUT        	|      --------------       | Updates the whole article with new data           |
| PATCH     	|      --------------       | Updates only the required/passed parameter        |
| DELETE        | Deletes all articles      | Deletes only the specific article on John-The-Man |

> For demo run and see app.js file.