from flask import Flask, render_template, request, jsonify, session
import datetime
import json
import os
import random
from dotenv import load_dotenv
from openai import OpenAI

# .env 파일에서 환경 변수 로드
load_dotenv()

# OpenAI API 키 가져오기
api_key = os.getenv("OPENAI_API_KEY")

# OpenAI 클라이언트 초기화
client = OpenAI(api_key=api_key)

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # 세션을 위한 시크릿 키

# 리뷰 데이터를 저장할 파일 경로
REVIEWS_FILE = 'reviews.json'

# 초기 리뷰 데이터
initial_reviews = [
    {
        "id": 1,
        "rating": 5,
        "review": "정말 좋은 제품입니다. 배송도 빠르고 품질도 훌륭해요!",
        "created_at": "2025-05-10T14:30:00",
        "language": "ko"
    },
    {
        "id": 2,
        "rating": 4,
        "review": "전반적으로 만족합니다. 다만 포장이 조금 아쉬웠어요.",
        "created_at": "2025-05-11T09:15:00",
        "language": "ko"
    },
    {
        "id": 3,
        "rating": 5,
        "review": "가격 대비 성능이 정말 좋습니다. 추천해요!",
        "created_at": "2025-05-12T18:45:00",
        "language": "ko"
    },
    {
        "id": 4,
        "rating": 3,
        "review": "보통이에요. 기대했던 것보다는 조금 아쉬운 면이 있네요.",
        "created_at": "2025-05-13T11:20:00",
        "language": "ko"
    },
    {
        "id": 5,
        "rating": 5,
        "review": "두 번째 구매인데 역시 만족합니다. 다음에도 구매할 예정이에요.",
        "created_at": "2025-05-14T16:05:00",
        "language": "ko"
    }
]

# 리뷰 데이터 파일 초기화
def init_reviews():
    if not os.path.exists(REVIEWS_FILE):
        with open(REVIEWS_FILE, 'w', encoding='utf-8') as f:
            json.dump(initial_reviews, f, ensure_ascii=False, indent=4)

# 리뷰 데이터 불러오기
def load_reviews():
    if not os.path.exists(REVIEWS_FILE):
        init_reviews()
    
    with open(REVIEWS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

# 리뷰 데이터 저장하기
def save_reviews(reviews):
    with open(REVIEWS_FILE, 'w', encoding='utf-8') as f:
        json.dump(reviews, f, ensure_ascii=False, indent=4)

# GPT를 사용하여 리뷰 요약 생성
def generate_summary_with_gpt(reviews, language='ko'):
    # 평점 평균 계산
    avg_rating = sum(review['rating'] for review in reviews) / len(reviews) if reviews else 0
    
    # 리뷰 내용 추출
    review_texts = [review['review'] for review in reviews]
    
    # 언어별 프롬프트 설정
    language_prompts = {
        'ko': {
            'system': "당신은 상품 리뷰를 분석하고 요약하는 AI 도우미입니다.",
            'user': f"다음은 상품에 대한 {len(reviews)}개의 리뷰입니다. 평균 평점은 {avg_rating:.1f}/5입니다.\n\n" + 
                   "\n".join([f"- {text}" for text in review_texts]) + 
                   "\n\n이 리뷰들을 분석하여 한국어로 간결하게 요약해주세요. 긍정적인 점과 부정적인 점을 모두 포함해야 합니다."
        },
        'en': {
            'system': "You are an AI assistant that analyzes and summarizes product reviews.",
            'user': f"Here are {len(reviews)} reviews for a product. The average rating is {avg_rating:.1f}/5.\n\n" + 
                   "\n".join([f"- {text}" for text in review_texts]) + 
                   "\n\nPlease analyze these reviews and provide a concise summary in English. Include both positive and negative aspects."
        },
        'ja': {
            'system': "あなたは商品レビューを分析し、要約するAIアシスタントです。",
            'user': f"これは商品に関する{len(reviews)}件のレビューです。平均評価は{avg_rating:.1f}/5です。\n\n" + 
                   "\n".join([f"- {text}" for text in review_texts]) + 
                   "\n\nこれらのレビューを分析して、日本語で簡潔に要約してください。ポジティブな面とネガティブな面の両方を含めてください。"
        },
        'fr': {
            'system': "Vous êtes un assistant IA qui analyse et résume les avis sur les produits.",
            'user': f"Voici {len(reviews)} avis sur un produit. La note moyenne est de {avg_rating:.1f}/5.\n\n" + 
                   "\n".join([f"- {text}" for text in review_texts]) + 
                   "\n\nVeuillez analyser ces avis et fournir un résumé concis en français. Incluez les aspects positifs et négatifs."
        }
    }
    
    # 기본 언어가 없으면 한국어로 설정
    if language not in language_prompts:
        language = 'ko'
    
    try:
        # GPT API 호출
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # 또는 "gpt-4" 등 사용 가능한 최신 모델
            messages=[
                {"role": "system", "content": language_prompts[language]['system']},
                {"role": "user", "content": language_prompts[language]['user']}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        # 응답에서 요약 텍스트 추출
        summary_text = response.choices[0].message.content.strip()
        
        return {
            "summary": summary_text,
            "avg_rating": round(avg_rating, 1),
            "review_count": len(reviews),
            "generated_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
    
    except Exception as e:
        print(f"GPT API 호출 중 오류 발생: {e}")
        # 오류 발생 시 기본 메시지 반환
        default_messages = {
            'ko': f"리뷰 {len(reviews)}개를 분석한 결과, 평균 평점은 {avg_rating:.1f}/5입니다. (API 오류로 상세 요약을 생성할 수 없습니다)",
            'en': f"Analysis of {len(reviews)} reviews shows an average rating of {avg_rating:.1f}/5. (Detailed summary unavailable due to API error)",
            'ja': f"{len(reviews)}件のレビューの分析結果、平均評価は{avg_rating:.1f}/5です。(APIエラーのため詳細な要約を生成できません)",
            'fr': f"L'analyse de {len(reviews)} avis montre une note moyenne de {avg_rating:.1f}/5. (Résumé détaillé indisponible en raison d'une erreur d'API)"
        }
        
        return {
            "summary": default_messages.get(language, default_messages['ko']),
            "avg_rating": round(avg_rating, 1),
            "review_count": len(reviews),
            "generated_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }

# 언어 코드와 이름 매핑
LANGUAGES = {
    'ko': '한국어',
    'en': '영어 (English)',
    'ja': '일본어 (日本語)',
    'fr': '프랑스어 (Français)'
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/json')
def json_example():
    data = {
        "message": "This is a JSON response",
        "status": "success",
        "code": 200
    }
    return jsonify(data)

@app.route('/json/view')
def json_view():
    return render_template('json_viewer.html')

@app.route('/reviews')
def reviews():
    # 언어 설정 (기본값: 한국어)
    language = request.args.get('lang', 'ko')
    if language not in LANGUAGES:
        language = 'ko'
    
    # 세션에 언어 저장
    session['language'] = language
    
    # 리뷰 데이터 불러오기
    reviews = load_reviews()
    
    # AI 요약 생성 (GPT 사용)
    summary = generate_summary_with_gpt(reviews, language)
    
    return render_template('reviews.html', 
                          reviews=reviews, 
                          summary=summary, 
                          languages=LANGUAGES, 
                          current_language=language)

@app.route('/api/reviews')
def api_reviews():
    reviews = load_reviews()
    return jsonify(reviews)

@app.route('/api/summary')
def api_summary():
    language = request.args.get('lang', 'ko')
    if language not in LANGUAGES:
        language = 'ko'
    
    reviews = load_reviews()
    summary = generate_summary_with_gpt(reviews, language)
    
    return jsonify(summary)

if __name__ == '__main__':
    # 애플리케이션 시작 시 리뷰 데이터 초기화
    init_reviews()
    app.run(debug=True)
