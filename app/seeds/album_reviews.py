from app.models import db, AlbumReview, environment, SCHEMA
from sqlalchemy.sql import text

def seed_album_reviews():

    hometown1 = AlbumReview(
        album_id = 1,
        review = f"There are two kinds of people in America: those who leave, and those who stay. Either you were born to leave your hometown, and spend your adolescence and young adulthood plotting your escape, or see little need to ever go past the county line, unless its on vacation, or to land a better deal on a vehicle.",
        star_review = 4,
        user_id = 1
    )
    hometown2 = AlbumReview(
        album_id = 1,
        review = f"Nashville, Tennessee is full of leavers, very few stayers, and a not a few phonies, including many who moved to the town with the best of dreams and intentions, yet fell into the country music industry to ape whatever the hot musical commodity might be at the moment. Finding a native Nashvillian is like finding a good song on country radio. Good luck. There are a few though, though few would suspect this son of Taiwanese immigrants to be one of them.",
        star_review = 5,
        user_id = 2
    )
    hometown3 = AlbumReview(
        album_id = 1,
        review = f"Born and raised in Nashville, Gabe Lee has a greater birthright to making music in Nashville than most, and an authenticity others fail to muster. Most importantly though, Gabe Lee doesn't just have a penchant for wanting to make music for a living, he has that poet's heart, a keen sense of observation, an incredible voice for conveying emotion with an enviable level of expressionism and control, and the capability to put it all together in a way that has some professing him as a premier talent of our time. Those people might not be entirely wrong.",
        star_review = 4,
        user_id = 3
    )
    hometown4 = AlbumReview(
        album_id = 1,
        review = f"More Mellencamp and Springsteen than Hank and Lefty, and more Heartland rock than Harlan Howard, The Hometown Kid is a steeping out for Gabe Lee musically into a more full-bodied and universally inviting sound. You don't have to convince your buddies to listen intently to the lyrics to understand what you're raving about with this Gabe Lee guy anymore. Even if some of the lyrics fly right above their heads, the music will draw them in.",
        star_review = 3,
        user_id = 4
    )

    what_you1 = AlbumReview(
        album_id = 2,
        review = f"Unless you live under a rock, you're probably well aware that Asheville, NC's favorite son and top of the charts regular, Mr. Luke Combs has dropped a new record and it kicks all the ass. My honest to God first thought, starting about two songs in was that nearly three quarters of this record sounds as if they were hand selected by Kix and Ronnie personally. Something that makes the bone-a-fide, millennial, honky-tonker special, aside from his voice, delivery, and sound, is those he chooses to write and record with. We will dig deeper into that in some upcoming articles.",
        star_review = 3,
        user_id = 5
    )
    what_you2 = AlbumReview(
        album_id = 2,
        review = f"More and more Nashville artists seem to be going down the route of the ‘deluxe album’, meaning a re-release of their last album with a couple of new songs thrown in. We’re now at the fourth iteration of What You See is What You Get, having released five songs on the EP The Prequel, then added the pandemic-inspired Six Feet Apart earlier this year, now we’ve renamed it and thrown in another five songs. ",
        star_review = 4,
        user_id = 6
    )
    what_you3 = AlbumReview(
        album_id = 2,
        review = f"The idea of a deluxe album is curious, is it because the artist feels these songs just have to go with the previous recordings to complete that body of work? Or is it the more likely scenario that someone at the record label feels like it’d make more money to shove them on another album, boost sales and make a bit more cash? Either way, it’d shouldn’t be held against Combs, this is common practice now across the whole music industry.",
        star_review = 4,
        user_id = 7
    )

    db.session.add(hometown1)
    db.session.add(hometown2)
    db.session.add(hometown3)
    db.session.add(hometown4)
    db.session.add(what_you1)
    db.session.add(what_you2)
    db.session.add(what_you3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_album_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM album_reviews"))

    db.session.commit()
