Overview -

1.  Front end Angular 
   - Fetch data from the baseball API & Display list
   - Implement a click event to show player descriptions & edit. 
    
2. Web Server (Python)- Set up an Express server. 
   - Create endpoints to fetch and update player data & API and handle data correction. 
3. Database SQL Server
   - Implement CRUD on player data. 

Python WebServer AsyncBaseball

1. At Project level need to incorporate flask, flask_cors and pyodbc in order for the application to run

	pip install flask		- For webservice
	pip install flask_cors  - For connection with front end web client 
	pip install pyodbc		- For database connecton

2. Currenlty web client is developed with port "4200"
	If port is changed Baseball.py line  CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}}) will need to be updated

3. Inorder run Webservice independently, right click on Baseball.py and select "Start with Debugging" 

Utility App

1.	Packages added to run the  Asynch Utility

	dotnet add package Microsoft.EntityFrameworkCore				-  Core package for Entity Framework Core.
	dotnet add package Microsoft.EntityFrameworkCore.SqlServer		-  Provider for SQL Server.
	dotnet add package Microsoft.EntityFrameworkCore.Tools			- Used for migrations

2. Assumption	
	
	A database called “Baseball” is created prior to running the utility

To initialize database. 
1.Create-Baseball-DB.sql
2.Create-Player-Table.sql
3.Either Run AsynUtity or Run Bulk-Load-Player-Data.sql

