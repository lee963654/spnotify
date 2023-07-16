from app.models import db, PlaylistReview, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_reviews():
    review1 = PlaylistReview(
        review = f"Finally, we come to Forever After All, where Luke kicks off with talk about “cold beer” and we're firmly placing our feet back in Nashville cliché territory. As before, it's a big arena ballad with that big chorus and Comb's driving it along with his vocal.",

        playlist_id = 1,
        user_id = 1
    )
    review2 = PlaylistReview(
        review = f"Up next is Comb's version of a honky tonk song in My Kinda Folk. Musically it's a fun little song, filled again with the clichés of Nashville country music. It's a party song that'll surely work well after a few beers in a live setting. It's Music Row country without a doubt, but its done well.",

        playlist_id = 2,
        user_id = 2
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_playlist_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_reviews"))

    db.session.commit()
