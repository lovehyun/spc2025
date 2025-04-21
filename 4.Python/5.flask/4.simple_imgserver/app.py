from flask import Flask, jsonify, url_for
from flask_cors import CORS # pip install flask-cors
import random

app = Flask(__name__)
# CORS(app) # 누구든지 나의 서버로 정보를 보낼수 있다

# 올바르게 하는건?? 내가 아는, 인지된 서버만 접속하게 CORS를 제한적으로 허용해야함
CORS(app, resources={r"/random-cat": {"origins": ["http://127.0.0.1:3000", "http://localhost:3000"]}})

cat_images = [
    "cat1.jpg",
    "cat2.jpg",
    "cat3.jpg",
]

@app.route('/random-cat')
def random_cat():
    random_image = random.choice(cat_images)
    # image_url = 'static/' + random_image
    image_url = url_for('static', filename=f'images/{random_image}', _external=True)
    print(image_url)
    
    return jsonify({"url": image_url})

if __name__ == "__main__":
    app.run(debug=True)
