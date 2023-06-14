from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    demo_two = User(
        username="Demo_Two", email="demo_two@aa.io", password="password"
    )
    john = User(
        username="Johnny", email="john@aa.io", password="password"
    )
    sally = User(
        username="Sally", email="sally@aa.io", password="password"
    )
    tom = User(
        username="Tom", email="tom@aa.io", password="password"
    )
    susan = User(
        username="Susan", email="susan@aa.io", password="password"
    )
    rachel = User(
        username="Rachel", email="rachel@aa.io", password="password"
    )
    gordon = User(
        username="Gordon", email="gordon@aa.io", password="password"
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demo_two)
    db.session.add(john)
    db.session.add(sally)
    db.session.add(tom)
    db.session.add(susan)
    db.session.add(rachel)
    db.session.add(gordon)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
