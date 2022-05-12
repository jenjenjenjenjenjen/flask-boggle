from crypt import methods
import re
from boggle import Boggle
from flask import Flask, render_template, request, redirect, session, jsonify, make_response, flash

boggle_game = Boggle()

app = Flask(__name__)

app.config["SECRET_KEY"] = 'ketchup'


@app.route('/')
def homepage():
    return render_template('base.html')

@app.route('/board', methods=['GET', 'POST'])
def make_board():
    if request.method == 'POST':
        board_session = session.get('board')
        score_session = session.get('score')
        guess = request.get_json()
        is_valid_word = boggle_game.check_valid_word(board_session, guess.get('guess'))
        if is_valid_word == "ok":
            return make_response(
                jsonify(
                    {"result": "ok"}
                )
            )
        elif is_valid_word == "not-on-board":
            return make_response(
                jsonify(
                    {"result": "not-on-board"}
                )
            )
        else:
            return make_response(
                jsonify(
                    {"result": "not-a-word"}
                )
            )
    else:
        board = boggle_game.make_board()
        session["board"] = board
        return render_template('board.html', board=board)





