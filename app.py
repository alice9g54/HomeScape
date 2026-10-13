from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables frontend-to-backend communication across ports

# Mock Property Database
PROPERTIES = [
    {
        "id": 1,
        "title": "Modern Urban Villa",
        "price": "$450,000",
        "location": "Downtown",
        "bedrooms": 3,
        "bathrooms": 2
    },
    {
        "id": 2,
        "title": "Cozy Suburban Home",
        "price": "$280,000",
        "location": "Suburbs",
        "bedrooms": 4,
        "bathrooms": 3
    }
]

# Route 1: Fetch all properties
@app.route('/api/properties', methods=['GET'])
def get_properties():
    return jsonify({"success": True, "data": PROPERTIES}), 200

# Route 2: Handle contact form submissions
@app.route('/api/contact', methods=['POST'])
def handle_contact():
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('email'):
        return jsonify({"success": False, "message": "Missing required fields"}), 400
        
    # Process or log form input
    print(f"Received message from {data['name']} ({data['email']}): {data.get('message', '')}")
    
    return jsonify({
        "success": True, 
        "message": "Thank you! Your message has been received."
    }), 200

if __name__ == '__main__':
    # Runs backend API on port 5000
    app.run(debug=True, port=5000)