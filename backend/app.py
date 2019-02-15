from flask import Flask, render_template, request, redirect, jsonify, url_for, flash
from sqlalchemy import create_engine, asc
from sqlalchemy.orm import sessionmaker
from database_setup import Category, Base, Helper_Category, Helper, Users
import datetime
from flask import session as login_session
import random
import string
from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import httplib2
import json
from flask import make_response
import requests

app = Flask(__name__)

# Connect to Database and create database session
engine = create_engine('sqlite:///helpers.db?check_same_thread=False')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/helper', methods=['GET', 'POST'])
def helpProvider():
    if request.method == 'GET':
        return render_template('help_provider.html')
    else:
        if (request.form['name'] and
                request.form['email'] and
                request.form['telephone_number']):
            helper = Helper(name=request.form['name'],
                            email=request.form['email'],
                            telephone_number=request.form['telephone_number'])
            if request.form['category']:
                category = session.query(Category).filter_by(id=request.form['category'])
                helper.categories.append(category)
            session.add(helper)
            session.commit()
            flash("Helper added successfully.")
        else:
            flash("Please enter helper's name, email and telephone number.")

        flash("new item has been added")


@app.route('/', methods=['GET','POST'])
def matchUsers():
    if request.method == 'GET':
        return render_template('help.html')
    else:
        pubkey= session.query(Users).filter_by(id=1)
        provider= session.query(Helper).filter_by(time=datetime.datetime.now())
        if provider != None:
            print (provider.name)


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=80)