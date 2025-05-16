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

@app.route('/api/review', methods=['GET'])
def get_reviews():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('SELECT id, rating, review, created_at FROM reviews ORDER BY created_at DESC')
    reviews = c.fetchall()
    conn.close()

    reviews_list = [
        {
            "id": review[0],
            'rating': review[1],
            'review': review[2],
            'created_at': review[3]
        }
        for review in reviews
    ]

    return jsonify(reviews_list)

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

@app.route('/api/review/<int:review_id>', methods=['DELETE'])
def delete_review(review_id):
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('DELETE FROM reviews WHERE id = ?', (review_id,))

    if c.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Review not found'}), 404

    conn.commit()
    conn.close()
    return jsonify({'message': 'Review deleted successfully'}), 200

@app.route('/api/aisummary', methods=['GET'])
def get_ai_summary():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('SELECT rating, review FROM reviews')
    reviews = c.fetchall()
    conn.close()

    if not reviews:
        return jsonify({'error': 'No reviews found'}), 404

    reviews_text = "\n".join([f"Rating: {r[0]}, Review: {r[1]}" for r in reviews])

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "당신은 고객 리뷰를 요약해주는 도우미입니다."},
            {"role": "user", "content": f"다음 리뷰들을 다 읽고 전체적으로 요약한 문장으로 만들어주세요:\n{reviews_text}"}
        ]
    )

    summary = response.choices[0].message.content

    return jsonify({
        'summary': summary,
        'total_reviews': len(reviews),
        'average_rating': sum(r[0] for r in reviews) / len(reviews)
    })

if __name__ == '__main__':
    app.run(debug=True)
