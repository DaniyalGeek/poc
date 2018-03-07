This server is using MongoDB as database.
To server start you need to perform some actions.

1. Install NodeJS , npm , mongoDB.
2. Start mongoDB which will run in localhost on port predfined 27017.
3. Now extract folder merkazu open in terminal
4. run command "npm install" and after updating packaged run "node Server.js".
5. Now server will start and load models into database.


---------------------------------
---------------------------------
You need to create user first 
and then get JWT from /authenticate 
save this JWT and add into header or create querry by adding header field with name "X-access-token" or body variable with "token".

Other wise you will get error about authentication.


--------REST END POINTS ----------

	PATH:	/user'
	METHOD: GET,PUT,POST,DELETE
	BODY: 	{
				"username":"testing",
				"password":"testing",
				"tags":"testing",
				"permissions":"testing,testing1",
				"family_name":"testing",
				"given_name":"testing",
				"contact_mobile":"1234567",
				"contact_land":"testing",
				"email":"asdf@gmail.com"
				}
----------------------------------
		
	PATH:	/authenticate'
	METHOD: POST
	BODY: 	{
				"username":"testing",
				"password":"testing"
				}
	RESPONE: {
		you will receive token
	}
-----------------------------------
	PATH:	/category'
	METHOD: GET,PUT,POST,DELETE
	BODY: 	{
					 "title":"15",
					 "summary":"THis is summary",
					 "tags":"testing,yellow"
					 }
--------------------------------
	PATH:	/course'
	METHOD: GET,PUT,POST,DELETE
	BODY: {
			"title":"Course4",
			"summary":"THis is course summary",
			"tags":"black"
			}
--------------------------------

	PATH:	/contentblock'
	METHOD: GET,PUT,POST,DELETE
	BODY:
			{
		"type":"type",
		"order":123456,
		"pre_step":98765,
		"course_id":"59c7a2028b9fd0e004de8aa6",
		"content":"This is content"
		}
--------------------------------
	PATH:	/exam'
	METHOD: GET,PUT,POST,DELETE
	BODY: 
			{
		"title":"title",
		"contentID":"59c7b021b1ca86800526f07c",
		"evaluation":"This is evaluation"
		}
--------------------------------
	PATH:	/answer'
	METHOD: GET,PUT,POST,DELETE
	BODY:     {  
		 "exam_id": "59c7b719acbcc13706b32c63",
        "body": "i am answer 2",
        "correct": false
    }
--------------------------------

	PATH:	/question'
	METHOD: GET,PUT,POST,DELETE
	BODY:
			{
		"query":"i am question 1",
		"exam_id":"59c7b719acbcc13706b32c63",
		"type":"multiSelect"
		}