from application.models import Freshmen, Sophomores, Juniors, Seniors, Events, Admins
from flask import redirect, render_template, request, flash, g, url_for
from application import app
from flask_login import login_user, logout_user, LoginManager, UserMixin, login_required, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField
from wtforms.validators import InputRequired, Email, Length
from flask_bootstrap import Bootstrap
from flask_bcrypt import Bcrypt
from application.forms import LoginForm
from werkzeug.security import generate_password_hash, check_password_hash
import os

Bootstrap(app)
bcrypt = Bcrypt(app)

APP_ROOT = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(APP_ROOT, 'static/img/gallery')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/resources")
def resources():
    return render_template("resources.html")

@app.route("/events", methods = ["GET", "POST"])
def event():
	events = Events.query.all()
	return render_template("events.html", events = events)

@app.route("/hours")
def hours():
	freshmens = Freshmen.query.all()
	sophomores = Sophomores.query.all()
	juniors = Juniors.query.all()
	seniors = Seniors.query.all()
	return render_template("hours.html", freshmens = freshmens, juniors = juniors, seniors = seniors, sophomores = sophomores)

@app.route("/board")
def board():
	return render_template("board.html")

@app.route("/gallery")
def gallery():
	idk = os.getcwd()
	xtr = os.listdir(idk + "/application/static/img/gallery")
	return render_template("gallery.html", xtr = xtr)

@app.route("/uploader", methods = ["POST"])
def uploader():
	file = request.files["file"]
	if file.filename == '':
		flash('No selected file')
		return render_template("upload.html")
	else:
		file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
		flash("Your photo has been submitted", category = "success")
		return render_template("upload.html")

# @app.route("/join", methods = ["GET", "POST"])
# def join():

# 	if request.method == "GET":
# 		return render_template("register.html")
# 	else:
# 		name = request.form.get("name")
# 		studentid = request.form.get("studentid")
# 		grade = request.form.get("grade")
# 		email = request.form.get("email")
# 		phonenumber = request.form.get("phonenumber")

# 		if grade == "freshmen":
# 			db.execute("INSERT INTO freshmen (name, studentid, grade, email, phonenumber) VALUES (:name, :studentid, :grade, :email, :phonenumber)", name = name, studentid = studentid, grade = grade, email = email, phonenumber = phonenumber)
# 		elif grade == "sophomore":
# 			db.execute("INSERT INTO sophomores (name, studentid, grade, email, phonenumber) VALUES (:name, :studentid, :grade, :email, :phonenumber)", name = name, studentid = studentid, grade = grade, email = email, phonenumber = phonenumber)
# 		elif grade == "junior":
# 			db.execute("INSERT INTO juniors (name, studentid, grade, email, phonenumber) VALUES (:name, :studentid, :grade, :email, :phonenumber)", name = name, studentid = studentid, grade = grade, email = email, phonenumber = phonenumber)
# 		elif grade == "senior":
# 			db.execute("INSERT INTO seniors (name, studentid, grade, email, phonenumber) VALUES (:name, :studentid, :grade, :email, :phonenumber)", name = name, studentid = studentid, grade = grade, email = email, phonenumber = phonenumber)
# 		else:
# 			flash("An error has occured. Contact Webmaster Ryan Ho", "warning")
# 			return redirect("/hours")

# 	flash(f"Congratulations, {name}! You have been successfully signed up! Welcome to EHT Interact :)", "success")
# 	return redirect("/hours")

@app.route('/login', methods = ['GET', 'POST'])
def login():
	form = LoginForm()

	if form.validate_on_submit():
		admin = Admins.query.filter_by(username = form.username.data).first()
		if admin and bcrypt.check_password_hash(admin.password, form.password.data):
			login_user(admin)
			return redirect(url_for('admin.index'))
		else:
			flash("Incorrect Username or Password.", "warning")
	return render_template("login.html", form = form)

@app.route('/logout')
def logout():
	logout_user()
	return redirect("/")

#Error Handeling
@app.errorhandler(404)
def error404(e):
	return render_template('404.html'), 404

@app.errorhandler(500)
def error500(e):
	return render_template("500.html"), 500

@app.errorhandler(400)
def error400(e):
	return render_template('400.html'), 400

@app.errorhandler(403)
def error403(e):
	return render_template("403.html"), 403
