from flask import Flask, request, redirect, url_for, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        user = request.form['name']
        print("폼입력: ", user)
        # return render_template('user.html')
        return redirect(url_for("user", user=user))
    else:
        return render_template('login.html')

@app.route('/user')
@app.route('/user/<user>')
def user(user=None):
    return render_template('user.html', user=user)

if __name__ == '__main__':
    app.run(debug=True)
