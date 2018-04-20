Steps to use this software (for Windows):

Get demo from https://github.com/chrizrodz/mobile-security-class

1.	Get oracle 12.1c from http://www.oracle.com/technetwork/database/enterprise-edition/downloads/index.html
	Download both packages, extract them, and combine them on your local machine
	Run setup.exe
	Deselect 'I wish to receive security updates' (if you wish) and click next.
	Select 'Create and configure database' and click next
	Select 'Desktop class' and click next
	Select ‘Use Windows Built-in Account’ and click next
	Set 'Global database name' and 'Password' to 'orcl' and 'password' (or whatever password you will remember)
	Make sure to uncheck the option “Create as Container Database”

	Open SQL Plus:
		When prompted for a username use: “sys as sysdba”
		When prompted for a password use: (anything will do)
		Type “show con_name” and verify that con_name is “ORCL”
		If con_name is not "ORCL", Type command “alter session set container = ORCL;”
		Type “create user admin identified by password;”
		If “ORA-01109: database not open” error is received run “alter database open;” then run previous command
		Type “grant dba to admin;” 
		Type “grant create session to admin;”
		Note: 'admin' and 'password' are what I used. You can change these if you feel, but remember to change the dbConfig in Server.js to reflect whatever you use
	
	Open Oracle 12c SQL Developer:
		Press the green plus button to add a new connection
		Connection Name: PRESENTATION (or whatever you want to put here)
		Username: admin (or whatever you used as a username above)
		Password: passwors (or whatever you used as a username above)
		Check “Save Password” if you desire
		Hostname: localhost
		Port: 1521
		Service Name: orcl
		Test the connection connects successfully
		“Save” then “Connect”
		
	You should have a new document that you can run SQL commands through (if not, click on the small '+' beside the connection you just made).
	Copy the code below an click on the green play button to run:
		CREATE TABLE USERS (
			FIRST_NAME VARCHAR2 (50 BYTE) NOT NULL,
			LAST_NAME VARCHAR2 (50 BYTE) NOT NULL,
			ROLE VARCHAR2 (5 BYTE) NOT NULL
		);
		
		COMMIT;
		
	Click on the small '+' beside 'Tables' and select the USERS table.
	The table should open to the columns the table contains.
	Click on the 'Data' tab and add a couple rows by clicking the '+' button.
	Note: ROLE is meant to be 'User' or 'Admin'.
		
2.	Open 2 terminals/command prompts and navigate to the folder in which this file is located.
	In the 1st terminal type 'npm install' to get all dependencies.
	Once complete, type 'npm start' to start the front-end of the app.
	In the 2nd terminal type 'node ./src/Server.js' to start the back-end of the app.
	The app can be viewed by opening your favorite web browser and navigating to localhost:3000
	Add a user by inserting the first and last name then clicking 'Add User'
	Text at the bottom of the page can be put into the 'Last Name' field after some text to inject SQL
	To compare the Vulnerable route to the Secure route switch the commented line in App.js (the submitUser function) from Vulnerable to Secure and vice versa
	
	Notes:
		Most code editing will take place on either App.js (front-end) or Server.js (back-end)
		Editing code can be done in your favorite text editor (I'm personally a fan of Visual Studio Code)
		
	When editing code, any changes to the front-end will be reflected after auto compiling
	However, changes to the back-end require the back-end to be restarted using 'node ./src/Server.js'
	The scripts are mostly commented and the README.md has a TON of information on how to develop the app further