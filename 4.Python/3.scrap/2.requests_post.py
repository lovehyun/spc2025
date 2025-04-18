import requests

print("--- POST ---")
url = 'https://jsonplaceholder.typicode.com/users'

# JS에서 불렀던 객체를, Python에서는 Dict라고 부름.. 딕셔너리
new_post = {
    "userId": 1,
    "title": "hello",
    "body": "world"
}

response = requests.post(url, json=new_post)
print(response.json())

print("--- PUT ---")
post_id = 1

updated_post = {
    "userId": 1,
    "title": "hello again",
    "body": "world again"
}

response = requests.put(f"{url}/{post_id}", json=updated_post)
print(response.json())

print("--- PATCH ---")
patch_data = {
    "name": "partial name change"
}

response = requests.patch(f"{url}/{post_id}", json=patch_data)
print(response.json())

print("--- DELETE ---")
response = requests.delete(f"{url}/{post_id}")
print(response.status_code)
print(response.json())
