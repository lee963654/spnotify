from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    hometown_kid = Album(
        name="The Hometown Kid",
        artist_id = 1,
        artist_name = "Gabe Lee",
        album_picture="https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg",
        release_year = 2022
    )

    what_you_see = Album(
        name="What You See Ain't Always What You Get (Deluxe Edition)",
        artist_id = 2,
        artist_name = "Luke Combs",
        album_picture="https://spnotify.s3.us-east-2.amazonaws.com/whatyouseeis.jpg",
        release_year = 2020
    )

    starting = Album(
        name="Starting Over",
        artist_id = 3,
        artist_name = "Chris Stapleton",
        album_picture="https://spnotify.s3.us-east-2.amazonaws.com/chris-stapleton-starting-over.jpg",
        release_year = 2020
    )

    uncaged = Album(
        name="Uncaged",
        artist_id = 4,
        artist_name = "Zac Brown Band",
        album_picture="https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-uncaged.jpg"
    )

    honkytonk = Album(
        name="Honky Tonk Hell",
        artist_id = 1,
        artist_name = "Gabe Lee",
        album_picture = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-honkytonk.jpg"
    )

    this_one = Album(
        name= "This One's For You Too (Deluxe Edition)",
        artist_id = 2,
        artist_name="Luke Combs",
        album_picture = "https://spnotify.s3.us-east-2.amazonaws.com/luke-combs-this-ones-for-you-too.jpg"
    )

    you_get_what = Album(
        name = "You Get What You Give (Deluxe)",
        artist_id = 4,
        artist_name = "Zac Brown Band",
        album_picture = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-you-get.jpg"
    )

    from_a_room = Album(
        name = "From A Room: Volume 1",
        artist_id = 3,
        artist_name = "Chris Stapleton",
        album_picture = "https://spnotify.s3.us-east-2.amazonaws.com/chris-stapleton-from-a-room.jpg"
    )

    reunions = Album(
        name="Reunions",
        artist_id = 5,
        artist_name = "Jason Isbell and the 400 Unit",
        album_picture="https://spnotify.s3.us-east-2.amazonaws.com/jason-isbell-reunions.jpg"
    )

    db.session.add(hometown_kid)
    db.session.add(what_you_see)
    db.session.add(starting)
    db.session.add(uncaged)
    db.session.add(honkytonk)
    db.session.add(this_one)
    db.session.add(you_get_what)
    db.session.add(from_a_room)
    db.session.add(reunions)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
