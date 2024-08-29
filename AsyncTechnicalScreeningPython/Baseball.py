from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pyodbc
# Create an instance of the Flask class that is the WSGI application.

app = Flask(__name__)


# Cors function to allow for client calls
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})
# Flask route decorators map / and /hello to the hello function.
# To add other resources, create functions that generate the page contents
# and add decorators to define the appropriate resource locators for them.



API_URL = 'https://api.sampleapis.com/baseball/hitsSingleSeason'

# Fetch all players
@app.route('/api/players', methods=['GET'])
def get_players():
    response = requests.get(API_URL)
    data = response.json()
    # Check if the rank is blank in the list
    for index, player in enumerate(data):
        if not player.get('Rank'):
            player['Rank'] = str(index + 1)

    return jsonify(data)



# Fetch a specific player by ID

@app.route('/api/players/<int:id>', methods=['GET'])
def get_player(id):
    response = requests.get(API_URL)
    data = response.json()
    player = next((item for item in data if item["id"] == id), None)
    if player:
        return jsonify(player)
    else:
        return jsonify({"error": "Player not found"}), 404

# Update player data
@app.route('/api/players/<int:id>', methods=['PUT'])
def update_player(id):
    response = requests.get(API_URL)
    data = response.json()
    player = next((item for item in data if item["id"] == id), None)
    if player:
        player.update(request.json)
        return jsonify(player)
    else:
        return jsonify({"error": "Player not found"}), 404

# Get all the data from the players table
@app.route('/api/players/db', methods=['GET'])
def get_player_data():
  

    try:
        # Establish a connection to the SQL Server
        conn = get_connection()

        # Create a cursor object
        cursor = conn.cursor()

        # Define the SQL query
        sql_query = "SELECT * FROM players"

        # Execute the query
        cursor.execute(sql_query)

        # Fetch all rows from the executed query
        rows = cursor.fetchall()

        # Get column names
        columns = [column[0] for column in cursor.description]

        # Convert rows to list of dictionaries
        data = [dict(zip(columns, row)) for row in rows]

        # Convert data to JSON format
        json_data = json.dumps(data, indent=4)

        return json_data

    except pyodbc.Error as e:
        return f"Error connecting to the database: {e}"

    finally:
        # Close the cursor and connection
        cursor.close()
        conn.close()


# Create (Insert a New Player) into the current database s
@app.route('/api/players/db', methods=['POST'])
def create_player():
    player = request.json
    conn = get_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO Players (id, PlayerName, Rank,  AgeThatYear, Hits, Bats) VALUES (?, ?, ?, ?, ?, ?)"
    params = (player['id'], player['Player'], player['Rank'], player['AgeThatYear'], player['Hits'], player['Bats'])
    cursor.execute(sql, params)
    conn.commit()
    conn.close()
    return jsonify({"message": "Player added successfully!"}), 201

# Delete (Remove Player Data)
@app.route('/api/players/db/remove/<name>', methods=['DELETE'])
def delete_playerdb(name):
    conn = get_connection()
    cursor = conn.cursor()
    sql = "DELETE FROM Players WHERE Name = ?"
    params = (name,)
    cursor.execute(sql, params)
    conn.commit()
    conn.close()
    return jsonify({"message": "Player deleted successfully!"})

# Update (Modify Player Data)
@app.route('/api/players/db/<name>', methods=['PUT'])
def update_playerdb(name):
    player = request.json
    conn = get_connection()
    cursor = conn.cursor()
    sql = "UPDATE Players SET AgeThatYear = ?, Hits = ? WHERE PlayerName = ?"
    params = (player['AgeThatYear'], player['Hits'], name)
    cursor.execute(sql, params)
    conn.commit()
    conn.close()
    return jsonify({"message": "Player updated successfully!"})



# Database connection function
def get_connection():
    return pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost\\SQLEXPRESS;DATABASE=Baseball;Trusted_Connection=yes;TrustServerCertificate=true;')

@app.route('/')
@app.route('/hello')
def hello():
   # Render the page
   return "Hello Python!"

if __name__ == '__main__':
   # Run the app server on localhost:4449
   app.run('localhost', 55844)
