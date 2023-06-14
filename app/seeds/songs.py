from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    wide = Song(
        name="Wide Open",
        album_id = 1,
        lyrics=f"Woke up in a hotel room, Went lookin for something to do, Whole place shut down, but I'm wide open, I Packed up in a minute flat, Tell the county I'm comin back, To haunt all those hills I grew up rollin, Take it or leave it, it is what it is, They call me the hometown kid since I've been around, Since I've been around, When dad sold me his ol' 98, John Prine sticker on the tailgate, Said he didn't have the heart to put her down, Take care of her she'll take care of you, Son That's all that we gotta do, To keep all 4 wheels on the ground, Take it or leave it, there's no better advice, I have left to give you now, since I've been around, Oh since I've been around, There's an old stone wall by the edge of town, Keeps high water out of holy ground, It ain't no levee but it's seen it share of rain, Everyday gone by it's stood before, Peace parades and civil wars, All in all more of the same, Take it or leave it, you can't erase, What that bed of rock would say, since I've been around, Since I been around, Since I been around, Woke up in a hotel room, Went lookin' for something to do, Whole place shut down, but I'm wide open",
        song_url="https://youtu.be/bcFOcWrxlec",
        num_of_plays=15
    )

    over = Song(
        name="Over You",
        album_id = 1,
        lyrics = f"Gone and done it again, Run my emotion razor thin, Torn asunder some poor wonder, Found this side of the fence, And In my childish defense, We were binded more to break and less, To mend, Down the long abandoned road she winds, Kickin dust in my eyes, And the rain has all run out, Still my faith ain't come around, There's only fire and thunder burnin now, And I've had a hell of a time, Gettin over you, Gettin over you, Day by day, by and by, We may wither you and I, Love ain't no lawyer she don't fix no crime, Look how dirty she fights, Take me now this I pray, Grant me stealth flight angel wings, Fly me through the valley, to Williamson county, Where even the garbage is clean, And the rain has all run out, Still my faith ain't come around, There's only fire and thunder burnin now, And I've had a hell of a time, Oh well I've had a hell of a time, Gettin' over you, Gettin' over you, Gettin' over you, Gettin' over you",
        song_url="https://youtu.be/bcFOcWrxlec",
        num_of_plays = 20
    )

    rusty = Song(
        name = "Rusty",
        album_id = 1,
        lyrics = f"All the roads round here will get you where you're goin, All the roads round here will slow you down someday, When you grown up on the winding streets of Nashville, You're bound to know them all by name, I left that town as soon as time would let me, I drove as far as luck would have me drive, I once spent a summer hiding out in Bristol, Over 20 years ago I made you cry, But it's all gone now, Since it all broke down, Now I'm rusty, I been runnin outta steam, Too many miles on these poor tires, And not enough gasoline, Man I'm busted, Lord I got a longer way to go, Won't you send out an angel on patrol, For to save my soul, To save my soul, Used to run on nothin back in high school, Barely grown and actin like a man, When mama was around I drove her crazy, She'd say son when you get old you'll understand, Oh that it's all gone now, Since it all broke down, Now I'm rusty, I been runnin outta steam, Too many miles on these poor tires, And not enough gasoline, Man I'm busted, Lord I got a longer way to go, Won't you send out an angel on patrol, For to save my soul, Yea, for to save my soul, Mmm save my soul, Don't know where I'm gone, Where I'm gone, Don't know where I'm gone, Where I'm gone, Now I'm gone, Now I'm gone, Now I'm gone, Now I'm gone, Now I'm rusty, I been runnin outta steam, Too many miles on these poor tires, And not enough gasoline, Man I'm busted, Lord I got a longer way to go, Won't you send out an angel on patrol, Yea sweet salvation flyin' down the road, For to save my soul, For to save my soul, Yea for to save my soul, Ahh save my soul",
        song_url = "https://youtu.be/bcFOcWrxlec",
        num_of_plays = 42
    )

    rain = Song(
        name = "Never Rained Again",
        album_id = 1,
        lyrics = f"Storm rolls in like a runaway train, Blowin' out the porch light, Beatin' on a window pane, Still sounds like music to my ears, And even after all these years, If it had never rained again,, I might've never found you my friend, Would've never would've come back this way, I might've never heard the music playing, Or wondered out across the bar, Heard the cryin' of a steel guitar, yea, I'd be somewhere gettin burned, Waitin' on the weather to turn, If it had never rained again, Never rained again, All I had was just a name, Mmmm A couple gold top beers, And a pocketful of change, Those days there weren't much cash, Around to go, But there are some things, That won't be bought and can't be sold, If it had never rained again,, I might've never found you my friend, Would've never would've come back this way, I might've never heard the music playing, Or wondered out across the bar, Heard the cryin' of a steel guitar, I'd be in the sun to dry,, Cursin' at the clear blue sky, If it had never rained again, I'm sure by now you've grown tired of hearin', But that don't mean i'm ever growin' tired of sayin, If it had never rained again, I'd still be out there ridin' fences, Chasin' down a desperado's dream, I would've had my drink up on the bar, Ball game drowning out the steel guitar, Thinking it was just the same old song, Playin' along, If it had never rained again, Never rained again",
        song_url = "https://youtu.be/bcFOcWrxlec",
        num_of_plays = 34
    )

    buffalo = Song(
        name = "Buffalo Road",
        album_id = 1,
        lyrics = f"You could say that I awoke in this condition, Little heart barely beating gotta whole lotta healin to go, I used to be a smooth navigator, Saddle up and see you later, Who'dve thought my luck would turn around and knock me out cold, On the Buffalo Road, I came all this way to find a new direction, But the trouble makes it hardly ever worth the drive, I used to be a bad operator, Saddle up and see you later, I'm gonna fly this rusty ol' tractor of a soul, On up to the Buffalo Road, Yea, the Buffalo Road, Let's get lost somewhere way outside the city, Build a little track of fence on the greener side, I used to be a, Hard negotiator, Saddle up see you later, I never thought I'd find myself at home our here on the Buffalo Road, Mmmm the Buffalo Road, The Buffalo Road, Mmm the Buffalo Road, Yea, the Buffalo Road, Keep on shinin'"
    )






# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
