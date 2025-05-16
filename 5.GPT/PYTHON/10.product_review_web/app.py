from flask import Flask, render_template, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
import sqlite3
from datetime import datetime

load_dotenv()

app = Flask(__name__)
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def init_db():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rating INTEGER NOT NULL,
            review TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hello')
def hello():
    return 'Hello, World!'

@app.route('/api/review', methods=['POST'])
def add_review():
    data = request.get_json()
    rating = data.get('rating')
    review = data.get('review')

    if not rating or not review:
        return jsonify({'error': 'Rating and review are required'}), 400

    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('INSERT INTO reviews (rating, review) VALUES (?, ?)', (rating, review))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Review added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)