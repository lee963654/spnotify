from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    play1 = Playlist(
        name="My Playlist 1",
        user_id = 10,
        playlist_songs = [1, 2, 3,],
        private=True
    )

    play2 = Playlist(
        name="My Playlist 2",
        user_id = 9,
        playlist_songs = [1, 2, 3, 4, 5,],
        private=False
    )

    play3 = Playlist(
        name="My Playlist 3",
        user_id = 7,
        playlist_songs = [6, 7, 1, 5, 4, 2, 3, 8],
        private=False
    )

    db.session.add(play1)
    db.session.add(play2)
    db.session.add(play3)
    db.session.commit()









# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
