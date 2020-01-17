## Self-Study Questions With Answers

1.	Mention two parts of Express that you learned about this week.

-	Express is a light and unopinionated framework that sits on top of Node.js and makes it easier to create web applications and services. 
-	The main features of express are Middleware, Routing, and Convenience Helpers.

2.	 Describe Middleware?

-	Middleware functions can get the request and response objects, operate on them, and (when specified) trigger some action. Examples are logging or security.

3.	 Describe a Resource?

-	A resource could be a document, a folder, or anything else. 
-	Is identified by a Uniform Resource Identifier (URI) used throughout HTTP for identifying resources
-	The identity and the location of resources on the Web are mostly given by a single URL.

4.	 What can the API return to help clients know if a request was successful?

-	An API can return a status code of 200 or 201 to show success of the request which will then return the data requested.

5.	 How can we partition our application into sub-applications?

-	You can separate your code so that it is cleaner and not overcrowded which is one of the things Express allows us to do.  We can have a central router that represents our API and imports are other routes into it
