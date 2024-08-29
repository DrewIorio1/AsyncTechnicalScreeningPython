from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pyodbc
# Create an instance of the Flask class that is the WSGI application.
# The first argument is the name of the application module or package,
# typically __name__ when using a single module.
app = Flask(__name__)


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


@app.route('/api/players/db/<int:id>', methods=['PUT'])
def update_playerdb(id):
    data = response.json(API_URL)
    player = next((item for item in data if item["id"] == id), None)
    if player:
        player.update(request.json)
        return jsonify(player)
    else:
        return jsonify({"error": "Player not found"}), 404


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
@app.route('/api/players/db/<name>', methods=['DELETE'])
def delete_player(name):
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
def update_player(name):
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
