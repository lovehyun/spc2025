from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI()

# 모델은 dall-e-2 or dall-e-3
# 사이즈 v2: 최대사이즈 1024x1024, 보통 512x512, 256x256
#        v3: 최소사이즈 1024x1024 보통 1024x1024, 1024x1792, 1792x1024
# 품질(v3 only): standard or hd
# 갯수: v2: 여러개가능, v3: 1개밖에 안됨
response = client.images.generate(
    model="dall-e-3",
    # prompt="A futuristic sci-fi cityscape at dusk, with glowing neon lights, hovering autonomous flying cars zooming through the sky, sleek metallic architecture, floating billboards, and a purple-orange cosmic sky filled with distant stars and planets. The scene is highly cinematic, ultra-detailed, 4K resolution, with dramatic lighting and deep perspective, inspired by Blade Runner and cyberpunk aesthetics.",
    # prompt="A digital nomad developer lying on a sunny beach under a clear blue sky, working on a laptop with a relaxed and focused expression. The scene features soft sand, turquoise waves, palm trees swaying gently, and a modern minimalist workspace setup beside them (like a backpack, wireless earbuds, coffee cup). The overall mood is peaceful, productive, and inspiring, with vibrant natural lighting and high detail",
    prompt="A dramatic sports poster scene: a young tennis player drenched in sweat, exhausted and kneeling on the court after an intense match, having just missed a shot. The player's eyes are fixated on a cold can of Hot6 energy drink placed near the baseline, with condensation glistening on the can under the sun. The atmosphere is tense yet hopeful, capturing a moment of recovery and focus. Vivid lighting, high contrast, dynamic composition, with a sense of energy and motion.",
    # size="512x512",
    size="1024x1024",
    quality="hd",
    n=1
)

image_url = response.data[0].url
print(image_url)

# 이미지 다운로드 및 저장
import urllib
urllib.request.urlretrieve(image_url, "DATA/generated_image.png")
