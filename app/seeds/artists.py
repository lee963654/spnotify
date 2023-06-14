from app.models import db, User, Artist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_artists():
    gabe = Artist(
        name="Gabe Lee",
        about=f"Equal parts classic songwriter and modern-day storyteller, Gabe Lee has built his own bridge between country, folk and rock. Lee has been collecting stories for years, both onstage and off. With critically-acclaimed albums like 2019's farmland, 2020's Honky-Tonk Hell, and 2022's The Hometown Kid, Lee created a connection with his fanbase by delivering his own stories to an ever-growing audience. His fourth record, Drink the River, takes a different approach. This time, Lee isn't offering listeners a peek into his internal world; he's holding up a mirror to reflect their own.Storytelling has been an anchor of Lee's music since the very beginning. He launched his career as a genre-bending musician after returning to Tennessee, quickly progressing from dive bar gigs to high-profile opening slots (including shows with Jason Isbell, Los Lobos, and other artists who, like him, blurred the lines between roots-rock, country, and other forms of American folk music) to his own headlining shows. Throughout it all, he drew upon the narrative skills he'd sharpened as a student. If albums like Honky-Tonk Hell and The Hometown Kid often unfolded like autobiographical entries from his road journal, then Drink the River shows an even broader range of his storytelling abilities. Lee isn't just writing songs about himself; he's writing songs about all of us. And maybe, in doing so, he can bring us a little closer together.", artist_picture="https://secondbellfest.com/wp-content/uploads/2021/08/Gabe-Lee.jpg",
        about_picture="https://thebluegrasssituation.com/wp-content/uploads/2022/11/Gabe-Lee-photo-credit-Brooke-Stevens-e1667490656630.jpg",
    )

    luke = Artist(
        name="Luke Combs",
        about=f"Blending a love of classic country and Southern-fried soul -- a fusion inspired equally by fellow modern mavericks  and  -- Luke Combs updates these traditional sounds with a hint of modern R&B. This combination, which flourished on ballads, made Combs stand apart from both slick country-pop crooners and bro-country revelers, a distinction that helped him become a hit right out of the gate. His first single, 2016's Hurricane, launched a series of five number one Billboard Country Airplay hits in a row, including When It Rains It Pours, One Number Away, She Got the Best of Me, and Beautiful Crazy. All were pulled from his 2017 debut album, This One's for You (or its expanded reissue), a period that saw Combs become one of the biggest stars in Nashville. That status was cemented when he won the Country Music Association's Best New Artist award in 2018 and by the subsequent success of his sophomore album, 2019's What You See Is What You Get. Combs' fourth album, 2022's Growin' Up, was another chart-topper, and the first edition of a companion set he completed with 2023's Gettin' Old.",
        artist_picture="https://static.independent.co.uk/2022/07/04/12/newFile-16.jpg",
        about_picture="https://express-images.franklymedia.com/6616/sites/268/2021/06/08031417/Luke-Combs_Jim-Wright.jpg"
    )

    # stapleton = Artist(
    #     name="Chris Stapleton",
    #     about=f"Kentucky-born Chris Stapleton is an 8x Grammy, 14x CMA and 10x ACM Award-winner and one of the country’s most respected and beloved musicians. His most recent album, 2020's acclaimed Starting Over, recently won three awards at the 67th Annual GRAMMYs: Best Country Album, Best Country Solo Performance (“You Should Probably Leave”) and Best Country Song (“Cold”) in addition to earning Album of the Year honors at both the 54th Annual CMA Awards and 56th ACM Awards. The new album follows Stapleton's pair of Platinum-certified releases from 2017, From A Room: Volume 1 and From A Room: Volume 2, as well as his x5 Platinum breakthrough solo debut album, Traveller. Stapleton will continue his extensive “All-American Road Show” tour throughout the year with upcoming stops at Chicago’s Wrigley Field, DC’s Merriweather Post Pavilion and Long Island’s Northwell Health at Jones Beach Theater among many others. In addition to his work as a musician, Stapleton and his wife, Morgane, are founders of the Outlaw State of Kind charitable fund, which supports a variety of causes that are close to their heart.",
    #     artist_picture="https://musicrow.com/wp-content/uploads/2015/10/artistpr15-chris-stapleton.jpg",
    #     about_picture="https://www.redlightmanagement.com/wp-content/uploads/2020/08/Stapleton-1-scaled.jpg"
    # )

    # zac = Artist(
    #     name="Zac Brown Band",
    #     about=f"Zac Brown Band is a multi-platinum, Grammy Award-winning, Southern rock group led by front man, Zac Brown. Throughout their career spanning more than a decade, Zac Brown Band has had six consecutive albums reach the top 10 of the Billboard 200 and five consecutive albums debut at #1 on Billboard's Country Albums chart. To date, the group has won three Grammy Awards, including Best New Artist in 2010, sold more than 30 million singles, 9 million albums, amassed over 9.3 billion catalog streams to date, achieved 15 #1 radio singles and are the second act to top both the Country and Active Rock formats. Zac Brown Band has headlined 7 North American Tours and currently holds the record for most consecutive sold-out shows at the iconic Fenway Park. Since their debut, Zac Brown Band has developed a reputation with critics and fans alike as one of the most dynamic live performers, marked by strong musicianship that defies genre boundaries.",
    #     artist_picture="https://arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/TQ4VVYRXYQI6LDSE7TNTCTGX4M.jpg",
    #     about_picture="https://www.rollingstone.com/wp-content/uploads/2021/08/zbb-comeback.jpg"
    # )

    db.session.add(gabe)
    db.session.add(luke)
    # db.session.add(stapleton)
    # db.session.add(zac)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_artists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM artists"))

    db.session.commit()
