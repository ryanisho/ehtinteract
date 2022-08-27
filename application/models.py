from application import db, app, login
from flask_admin.contrib.sqla import ModelView
from flask_admin import Admin, AdminIndexView, BaseView, expose
from flask_login import login_user, logout_user, LoginManager, UserMixin, login_required, current_user
from flask import Flask, request, render_template
import os
#Default Hours Function
i = 0
def default():
	global i
	i += 0
	return i

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

class Freshmen(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(256), unique = True, nullable = False)
	email = db.Column(db.String(256), unique = True, nullable = False)
	grade = db.Column(db.String(256), nullable = False)
	hours = db.Column(db.Integer, nullable = False, default = i)
	studentid = db.Column(db.Integer, nullable = False, unique = True)

	def __repr__(self):
		return f"freshmen('{self.name}', '{self.hours}')"

class Sophomores(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(256), unique = True, nullable = False)
	email = db.Column(db.String(256), unique = True, nullable = False)
	grade = db.Column(db.String(256), nullable = False)
	hours = db.Column(db.Integer, nullable = False, default = i)
	studentid = db.Column(db.Integer, nullable = False, unique = True)

	def __repr__(self):
		return f"sophomores('{self.name}', '{self.hours}')"

class Juniors(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(256), unique = True, nullable = False)
	email = db.Column(db.String(256), unique = True, nullable = False)
	grade = db.Column(db.String(256), nullable = False)
	hours = db.Column(db.Integer, nullable = False, default = i)
	studentid = db.Column(db.Integer, nullable = False, unique = True)

	def __repr__(self):
		return f"juniors('{self.name}', '{self.hours}')"


class Seniors(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(256), unique = True, nullable = False)
	email = db.Column(db.String(256), unique = True, nullable = False)
	grade = db.Column(db.String(256), nullable = False)
	hours = db.Column(db.Integer, nullable = False, default = i)
	studentid = db.Column(db.Integer, nullable = False, unique = True)


	def __repr__(self):
		return f"seniors('{self.name}', '{self.hours}')"

#----------------------------------------------------------------#

class Events(db.Model):
	id = db.Column(db.Integer, primary_key = True)
	name = db.Column(db.String(256), nullable = False)
	description = db.Column(db.Text, nullable = False)
	location = db.Column(db.String(256), nullable = False)
	date = db.Column(db.String(256), nullable = False)
	time = db.Column(db.String(256), nullable = False)
	hours = db.Column(db.Integer, nullable = False)
	attendee = db.Column(db.Integer, nullable = False)
	signup = db.Column(db.Text)


	def __repr__(self):
		return f"events('{self.name}', '{self.description}', '{self.location}', '{self.date}', '{self.hours}', '{self.id}', '{self.time}')"

class Signups(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable = False)
    event_name = db.Column(db.String(256), nullable = False)

    def __repr__(self):
    	return f"signups('{self.name}', '{self.id}', '{self.event_name}')"

class Upload(BaseView):
	def is_accessible(self):
		return current_user.is_authenticated
	@expose('/', methods = ["GET", "POST"])
	def index(self):
		return self.render('upload.html')
#---------------------------------------------------------#

class Admins(UserMixin, db.Model):
	id = db.Column(db.Integer, primary_key = True)
	username = db.Column(db.String(20), unique = True)
	password = db.Column(db.String(90))

@login_manager.user_loader
def loader_user(admins_id):
	return Admins.query.get(admins_id)

class DefaultView(AdminIndexView):
	def is_accessible(self):
		return current_user.is_authenticated

class MyModelView(ModelView):
	def is_accessible(self):
		return current_user.is_authenticated

admin = Admin(app, index_view = DefaultView(), name='Administration Panel', template_mode='bootstrap3')
admin.add_view(MyModelView(Freshmen, db.session))
admin.add_view(MyModelView(Sophomores, db.session))
admin.add_view(MyModelView(Juniors, db.session))
admin.add_view(MyModelView(Seniors, db.session))
admin.add_view(MyModelView(Events, db.session))
admin.add_view(Upload(name = 'Upload', endpoint = 'upload'))
# admin.add_view(ModelView(Admins, db.session))