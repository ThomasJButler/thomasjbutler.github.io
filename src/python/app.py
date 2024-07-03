from flask import Flask, request, jsonify, render_template
from chapters.ctrls import run_game, handle_input

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_game', methods=['POST'])
def start_game():
    response = run_game()
    return jsonify(response=response)

@app.route('/handle_input', methods=['POST'])
def handle_input_route():
    user_input = request.json.get('user_input')
    response = handle_input(user_input)
    return jsonify(response=response)

if __name__ == '__main__':
    app.run(debug=True)
