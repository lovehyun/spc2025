from diffusers import StableDiffusionPipeline

pipe = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5").to("cpu")

prompt = "A futuristic city at sunset, digital art"
image = pipe(prompt).images[0]

image.save('generated.png')
print('이미지 생성 완료')
