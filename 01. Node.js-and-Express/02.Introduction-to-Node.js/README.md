1. Table of Contents
	Part I - Laying the Project Fundamentals
	Part II – Using Third-Party Modules
	Part III – Defining Database Models and Relations
	Part IV – Advanced Functionality 
	Part V – User Authentication
2. Project Specification
Design and implement a “Shop Stop” web application (containing routing and multiple web pages) using HTML5, CSS3 and Node.js. It must contain the following functionality:
3. Functionality
	User Login
		Login in current application using username and password of already registered user.
	User Register
		Register a new user by providing username and password.
	User Logout
		Logouts from the application.
	Product Create
		Creates a new product, makes currently logged in user as it’s publisher.
	Data must be saved in some sort of database.
		Product Buy
	Products may be bought by any user. One product could not be bought more than one time.
		Product Edit
	Edits product's information. Changes must be persisted in database.
		Product Delete
	Deletes specific product from database.
		Category Create
	Create a category which later on can be picked when a new product is created (uploaded).
		Products by Name
	List all products which name contains given text
		Products by Category
	List all products are in particular category (use the name of the category)

4. Routing
There will be different views which are displayed based on the routing (the URL). There are no strict rules of how the current application routing should look like but there are some common set of rules to follow:
	Use short and clear URL's
	Good examples
	"/user/login"
	"/category/{categoryName}/products"
	Follow the HTTP standards
	Proper usage of HTTP methods (GET, POST, PUT etc.)
	Follow the GET – POST – Redirect pattern
5. Models
	Here will be described the mandatory information that has to be provided for each model
6. User
	Username – string which is required and unique
	Password – string which is required and represents the hashed value of the user's password
	Created Products – collection of products created by given user
7. Product
	Name – string which is required and unique
	Description – string containing some additional information about the product
	Price – decimal number which is non-negative
	Creator – reference to the user who created the product
	Image Url – string containing reference to an image which displays the given product
	Is Bought – bool flag which is set to true whenever the user buys the product
	Category – reference to the category where the current product is placed in.
8. Category
	Name – string which is required and unique
	Products – collection of all products in given category
