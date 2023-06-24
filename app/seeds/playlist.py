from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists(song_list):
    play1 = Playlist(
        name="My Playlist 1",
        user_id = 10,
        private = False,
        songs = [song_list[0], song_list[1], song_list[2], song_list[3], song_list[4], song_list[5]]
    )

    play2 = Playlist(
        name="My Playlist 2",
        user_id = 9,
        private=False,
        songs= [song_list[2], song_list[3]]
    )

    play3 = Playlist(
        name="My Playlist 3",
        user_id = 7,
        private=False,
        songs= [song_list[10], song_list[4], song_list[15]]
    )

    play4 = Playlist(
        name="My Playlist 4",
        user_id = 1,
        private=False,
        songs= [song_list[11], song_list[4], song_list[12], song_list[6]]
    )

    play5 = Playlist(
        name="My Playlist 5",
        user_id = 8,
        private=False,
        songs= [song_list[10], song_list[20], song_list[25], song_list[17], song_list[14], song_list[16], song_list[26]]
    )

    db.session.add(play1)
    db.session.add(play2)
    db.session.add(play3)
    db.session.add(play4)
    db.session.add(play5)
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
