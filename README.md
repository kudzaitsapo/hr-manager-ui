# HR Manager Web User Interface

### What on earth is this?
Right, this is a web application for an HR management project I did over the weekend for the fun of it. 

### How do I run it?
First, you need to have the Web API running on your machine/server. Once it's running, you need to run the following commands inside the project folder:
- `npm install` 
- `npm run start`

### What does this project even look like?
Well, it looks like this:


![login page](https://raw.githubusercontent.com/kudzaitsapo/hr-manager-ui/main/screenshots/login-page.png)


![dashboard](https://raw.githubusercontent.com/kudzaitsapo/hr-manager-ui/main/screenshots/dashboard.png)


### What if I want to develop more features?
You're free to do whatever you wish, there are no restrictions. Well, as long as you understand the code anyways ...

#### Issues
Please note that there are a few issues with the system in total.
- The authentication mechanism is broken, meaning that when the JWT token expires, it doesn't end the session, but you'll get 401 errors with each API call.
- The employee creation page is weird ...
