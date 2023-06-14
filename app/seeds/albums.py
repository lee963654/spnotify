from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    hometown_kid = Album(
        name="The Hometown Kid",
        artist_id = 1,
        album_picture="https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/d9/cf/72/d9cf72dc-46f5-8b1d-78ba-7355ca897f99/196925468442.jpg/1200x1200bf-60.jpg",

    )

    what_you_see = Album(
        name="What You See Ain't Always What You Get (Deluxe Edition)",
        artist_id = 2,
        album_picture="https://cdn.smehost.net/lukecombscom-usnashvilleprod/wp-content/uploads/2020/08/LC_WYSAAWYG_DELUXE_COVER_10X10_RGB-1000x1000.jpg"
    )

    # starting = Album(
    #     name="Starting Over",
    #     artist_id = 3,
    #     album_picture="https://www.umusic.ca/wp-content/uploads/2020/08/StartingOver_Cv.jpeg"
    # )

    # greatest = Album(
    #     name="Greatest Hits So Far...",
    #     artist_id = 4,
    #     album_picture="https://m.media-amazon.com/images/I/91CzWmHdi4L._UF1000,1000_QL80_.jpg"
    # )

    db.session.add(hometown_kid)
    db.session.add(what_you_see)
    # db.session.add(starting)
    # db.session.add(greatest)
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
