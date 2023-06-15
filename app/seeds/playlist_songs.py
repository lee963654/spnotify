from app.models import db, PlaylistSongs, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    song1 = PlaylistSongs(
        playlist_id = 1,
        song_id = 1
    )
    song2 = PlaylistSongs(
        playlist_id = 2,
        song_id = 2
    )
    song3 = PlaylistSongs(
        playlist_id = 2,
        song_id = 1
    )
    song4 = PlaylistSongs(
        playlist_id = 2,
        song_id = 3
    )
    song5 = PlaylistSongs(
        playlist_id = 3,
        song_id = 4
    )
    song6 = PlaylistSongs(
        playlist_id = 3,
        song_id = 5
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
