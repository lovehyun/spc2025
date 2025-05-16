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
@app.route('/api/aisummary', methods=['GET'])
def get_ai_summary():
    # Get language parameter from URL, default to 'ko' (Korean) if not specified
    lang = request.args.get('lang', 'ko')

    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('SELECT rating, review FROM reviews')
    reviews = c.fetchall()
    conn.close()

    if not reviews:
        return jsonify({'error': '등록된 리뷰가 없습니다'}), 404

    reviews_text = "\n".join([f"평점: {r[0]}, 리뷰: {r[1]}" for r in reviews])

    # Step 1: Summarize in Korean
    summary_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "당신은 고객 리뷰를 요약하는 assistant입니다. 한글로 작성된 리뷰가 많을 것이며, 문맥을 잘 파악하여 자연스러운 한국어로 요약해주세요."
            },
            {
                "role": "user",
                "content": f"다음의 모든 고객 리뷰들을 읽고 종합적인 요약을 작성해주세요:\n{reviews_text}"
            }
        ]
    )

    korean_summary = summary_response.choices[0].message.content

    # Step 2: Translate the summary if needed
    if lang != 'ko':
        language_map = {
            'en': '영어',
            'ja': '일본어',
            'zh': '중국어'
        }
        target_language = language_map.get(lang, '한국어')

        translation_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": f"당신은 한국어를 {target_language}로 번역하는 전문 번역가입니다. 자연스러운 번역을 해주세요."
                },
                {
                    "role": "user",
                    "content": f"다음 텍스트를 {target_language}로 번역해주세요:\n{korean_summary}"
                }
            ]
        )
        final_summary = translation_response.choices[0].message.content
    else:
        final_summary = korean_summary

    return jsonify({
        'summary': final_summary,
        'total_reviews': len(reviews),
        'average_rating': sum(r[0] for r in reviews) / len(reviews),
        'language': lang
    })

if __name__ == '__main__':
    app.run(debug=True)
