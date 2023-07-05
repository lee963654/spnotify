from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    wide = Song(
        name="Wide Open",
        album_id = 1,
        artist_id = 1,
        artist_name = "Gabe Lee",
        album_name = "The Hometown Kid",
        lyrics=f"Woke up in a hotel room, Went lookin for something to do, Whole place shut down, but I'm wide open, I Packed up in a minute flat, Tell the county I'm comin back, To haunt all those hills I grew up rollin, Take it or leave it, it is what it is, They call me the hometown kid since I've been around, Since I've been around, When dad sold me his ol' 98, John Prine sticker on the tailgate, Said he didn't have the heart to put her down, Take care of her she'll take care of you, Son That's all that we gotta do, To keep all 4 wheels on the ground, Take it or leave it, there's no better advice, I have left to give you now, since I've been around, Oh since I've been around, There's an old stone wall by the edge of town, Keeps high water out of holy ground, It ain't no levee but it's seen it share of rain, Everyday gone by it's stood before, Peace parades and civil wars, All in all more of the same, Take it or leave it, you can't erase, What that bed of rock would say, since I've been around, Since I been around, Since I been around, Woke up in a hotel room, Went lookin' for something to do, Whole place shut down, but I'm wide open",
        song_url="https://spnotify.s3.us-east-2.amazonaws.com/Y2Mate.is+-+Wide+Open-gGE8jaEFJxI-160k-1657089260026.mp3",
        num_of_plays=157,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg"
    )

    over = Song(
        name="Over You",
        album_id = 1,
        artist_id = 1,
        artist_name = "Gabe Lee",
        album_name = "The Hometown Kid",
        lyrics = f"Gone and done it again, Run my emotion razor thin, Torn asunder some poor wonder, Found this side of the fence, And In my childish defense, We were binded more to break and less, To mend, Down the long abandoned road she winds, Kickin dust in my eyes, And the rain has all run out, Still my faith ain't come around, There's only fire and thunder burnin now, And I've had a hell of a time, Gettin over you, Gettin over you, Day by day, by and by, We may wither you and I, Love ain't no lawyer she don't fix no crime, Look how dirty she fights, Take me now this I pray, Grant me stealth flight angel wings, Fly me through the valley, to Williamson county, Where even the garbage is clean, And the rain has all run out, Still my faith ain't come around, There's only fire and thunder burnin now, And I've had a hell of a time, Oh well I've had a hell of a time, Gettin' over you, Gettin' over you, Gettin' over you, Gettin' over you",
        song_url="https://spnotify.s3.us-east-2.amazonaws.com/Y2Mate.is+-+Over+You-bczbsxFTHVA-160k-1657088235334.mp3",
        num_of_plays = 202,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg"
    )

    rusty = Song(
        name = "Rusty",
        album_id = 1,
        artist_id = 1,
        artist_name = "Gabe Lee",
        album_name = "The Hometown Kid",
        lyrics = f"All the roads round here will get you where you're goin, All the roads round here will slow you down someday, When you grown up on the winding streets of Nashville, You're bound to know them all by name, I left that town as soon as time would let me, I drove as far as luck would have me drive, I once spent a summer hiding out in Bristol, Over 20 years ago I made you cry, But it's all gone now, Since it all broke down, Now I'm rusty, I been runnin outta steam, Too many miles on these poor tires, And not enough gasoline, Man I'm busted, Lord I got a longer way to go, Won't you send out an angel on patrol, For to save my soul, To save my soul, Used to run on nothin back in high school, Barely grown and actin like a man, When mama was around I drove her crazy, She'd say son when you get old you'll understand, Oh that it's all gone now, Since it all broke down, Now I'm rusty, I been runnin outta steam, Too many miles on these poor tires, And not enough gasoline, Man I'm busted, Lord I got a longer way to go, Won't you send out an angel on patrol, For to save my soul, Yea, for to save my soul, Mmm save my soul, Don't know where I'm gone, Where I'm gone, Don't know where I'm gone, Where I'm gone, Now I'm gone, Now I'm gone, Now I'm gone, Now I'm gone, Now I'm rusty, I been runnin outta steam, Too many miles on these poor tires, And not enough gasoline, Man I'm busted, Lord I got a longer way to go, Won't you send out an angel on patrol, Yea sweet salvation flyin' down the road, For to save my soul, For to save my soul, Yea for to save my soul, Ahh save my soul",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Y2Mate.is+-+Rusty-hDIycfEGYeI-160k-1657088408901.mp3",
        num_of_plays = 421,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg"
    )

    rain = Song(
        name = "Never Rained Again",
        album_id = 1,
        artist_id = 1,
        artist_name = "Gabe Lee",
        album_name = "The Hometown Kid",
        lyrics = f"Storm rolls in like a runaway train, Blowin' out the porch light, Beatin' on a window pane, Still sounds like music to my ears, And even after all these years, If it had never rained again,, I might've never found you my friend, Would've never would've come back this way, I might've never heard the music playing, Or wondered out across the bar, Heard the cryin' of a steel guitar, yea, I'd be somewhere gettin burned, Waitin' on the weather to turn, If it had never rained again, Never rained again, All I had was just a name, Mmmm A couple gold top beers, And a pocketful of change, Those days there weren't much cash, Around to go, But there are some things, That won't be bought and can't be sold, If it had never rained again,, I might've never found you my friend, Would've never would've come back this way, I might've never heard the music playing, Or wondered out across the bar, Heard the cryin' of a steel guitar, I'd be in the sun to dry,, Cursin' at the clear blue sky, If it had never rained again, I'm sure by now you've grown tired of hearin', But that don't mean i'm ever growin' tired of sayin, If it had never rained again, I'd still be out there ridin' fences, Chasin' down a desperado's dream, I would've had my drink up on the bar, Ball game drowning out the steel guitar, Thinking it was just the same old song, Playin' along, If it had never rained again, Never rained again",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Y2Mate.is+-+Never+Rained+Again-ISkTYuffiyo-160k-1657088639311.mp3",
        num_of_plays = 683,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg"
    )

    buffalo = Song(
        name = "Buffalo Road",
        album_id = 1,
        artist_id = 1,
        artist_name = "Gabe Lee",
        album_name = "The Hometown Kid",
        lyrics = f"You could say that I awoke in this condition, Little heart barely beating gotta whole lotta healin to go, I used to be a smooth navigator, Saddle up and see you later, Who'dve thought my luck would turn around and knock me out cold, On the Buffalo Road, I came all this way to find a new direction, But the trouble makes it hardly ever worth the drive, I used to be a bad operator, Saddle up and see you later, I'm gonna fly this rusty ol' tractor of a soul, On up to the Buffalo Road, Yea, the Buffalo Road, Let's get lost somewhere way outside the city, Build a little track of fence on the greener side, I used to be a, Hard negotiator, Saddle up see you later, I never thought I'd find myself at home our here on the Buffalo Road, Mmmm the Buffalo Road, The Buffalo Road, Mmm the Buffalo Road, Yea, the Buffalo Road, Keep on shinin'",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Y2Mate.is+-+Buffalo+Road-AYlhQNFt9qw-160k-1657088840583.mp3",
        num_of_plays = 168,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg"
    )

    blue = Song(
        name = "Blue Collar Boys",
        album_id = 2,
        artist_id = 2,
        artist_name="Luke Combs",
        album_name = "What You See Ain't Always What You Get (Deluxe Edition)",
        lyrics = f"We were just river kids, Pickin' up stones like David did, Watchin' them long necks break off of Freight Train Bridge, We went to church in a Detroit car, Our daddies drank draft at the local bar, With an achin' back just like old granddad did, And we like cold keg beer and fixin' up trucks, Old bird dogs and the woman we love, Maxwell House steamin' out of a coffee cup, We say our prayers, send 'em to the sky, Bust our backs, barely getting by, Carolina to California, up to Illinois, Yeah, there's guys like us, Blue collar boys, We're the white paint peeling off a picket fence, The rust stains covering a Craftsman wrench, When the sun's coming up, you can bet we're clocking in, Cash our paycheck, two day break, and do it again, We like cold keg beer and fixin' up trucks, Old bird dogs and the woman we love, Maxwell House steamin' out of a coffee cup, We say our prayers, send 'em to the sky, Bust our backs, barely getting by, Carolina to California, up to Illinois, Yeah, there's guys like us, Blue collar boys, We're worn out boots and old Levi's, The wind behind the Stars and Stripes, And we like cold keg beer and fixin' up trucks, Old bird dogs and the woman we love, Maxwell House steamin' out of a coffee cup, We say our prayers, send 'em to the sky, Bust our backs, barely getting by, Carolina to California, up to Illinois, Yeah, there's guys like us, Yeah, there's guys like us, Blue collar boys, Blue collar boys",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/%5BYT2mp3.info%5D+-+Blue+Collar+Boys+(320kbps).mp3",
        num_of_plays = 455,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/whatyouseeis.jpg"
    )

    every = Song(
        name = "Every Little Bit Helps",
        album_id = 2,
        artist_id = 2,
        artist_name="Luke Combs",
        album_name = "What You See Ain't Always What You Get (Deluxe Edition)",
        lyrics = f"This futon I crashed on in college, well, it ain't our bed, But at least it don't smell like you, Patron up on the counter, well, it ain't your red, And them long stems are long gone too, Put that record on, took your pictures off the shelf, Oh, 'cause every little bit helps, It might not get me all the way over you, But every little bit gets me a little bit closer to, Walkin' right out of the valley of the shadow of death, Step by step I'm gettin', Out from under that spell you put on me, And oh you just left, and I know I might only be, One night into your goodbye gone kinda hell, Oh, but every little bit helps, And it's fine if I might as well spin my tires to the other side of town, But at least I'm out of this house, And this dive's tired of playin' man it ain't my sound, But at least they're playin' it loud, Two beers in but a day-long gone come 12, Oh, 'cause every little bit helps, It might not get me all the way over you, But every little bit gets me a little bit closer to, Walkin' right out of the valley of the shadow of death, Step by step, I'm gettin', Out from under that spell you put on me, And oh you just left, and I know I might only be, One night into your goodbye gone kinda hell, Oh, but every little bit helps, Every sip, every drink that girl and her wink, It ain't much but I think that every little bit helps, Might not get me all the way over you, But every little bit gets me a little bit closer to, Walkin' right out of the valley of the shadow of death, Step by step I'm gettin', Out from under that spell you put on me, And oh, you just left, and I know I might only be, One night into your goodbye gone kinda hell, Oh, but every little bit helps, Yeah, every little bit helps",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/%5BYT2mp3.info%5D+-+Every+Little+Bit+Helps+(320kbps).mp3",
        num_of_plays = 851,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/whatyouseeis.jpg"
    )

    leaving = Song(
        name = "Even Though I'm Leaving",
        album_id = 2,
        artist_id = 2,
        artist_name="Luke Combs",
        album_name = "What You See Ain't Always What You Get (Deluxe Edition)",
        lyrics =f"Daddy, I'm afraid, won't you stay a little while?, Keep me safe 'cause there's monsters right outside, Daddy, please don't go, I don't wanna be alone, 'Cause the second that you're gone they're gonna know, Before he went to bed, he grabbed my hand and said, Just 'cause I'm leaving, It don't mean that I won't be right by your side, When you need me, And you can't see me in the middle of the night, Just close your eyes and say a prayer, It's okay, I know you're scared, When I'm not here, but I'll always be right there, Even though I'm leaving, I ain't going nowhere, Dad, we've all been late and Uncle Sam don't like to wait, He's got a big old plane that's gonna take me far away, I know I act tough but there's a churning in my gut, 'Cause I just can't call you up when things get rough, Before I left, he hugged my neck and said, Just 'cause you're leaving, It don't mean that I won't be right by your side, When you need me, And you can't see me in the middle of the night, Just close your eyes and say a prayer, It's okay, I know you're scared, I might be here, but I'll always be right there, Even though you're leaving, I ain't going nowhere, Daddy, I'm afraid, won't you stay a little while?, I never thought I'd see the day I had to say goodbye, Daddy, please don't go, I can't do this on my own, There's no way that I can walk this road alone, Daddy grabbed my hand and said, Just 'cause I'm leaving, It don't mean that I won't be right by your side, When you need me, And you can't see me in the middle of the night, Just close your eyes and say a prayer, It's okay, boy, I ain't scared, I won't be here, But I'll always be right there, Even though I'm leaving, I ain't going nowhere, I ain't going nowhere.",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Day+That+I+Die+(feat.+Amos+Lee).mp3",
        num_of_plays = 493,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/whatyouseeis.jpg"
    )

    lonely = Song(
        name = "Lonely",
        album_id = 1,
        artist_id = 1,
        artist_name = "Gabe Lee",
        album_name="The Hometown Kid",
        lyrics = f"I used to cut outta work, Just to get home early, Shake off the suit and tie, Throw on a pair of jeans, How we used to get around, I hate to say it's been awhile, Ain't it funny to think, We ain't got nowhere to be, But If I ever get away from here, I'll bring you back a couple souvenirs, Write me down a couple things you like, Some Willie Nelson and a box of wine, You're gonna need it on a cloudy day, When all you wanna do is numb the pain, Cause feelin' kinda lonely, Ain't what it used to be, I used to lay on the couch, Turn up the radio loud, I'd watch the sunshine in, Drive all my worries out, You know it isn't everyday, The workin' the people get a break, Go on and cancel the shows, we ain't got nowhere to go, But If I ever get away from here, I'll bring you back a couple souvenirs, Write me down a couple things you like, Some Willie Nelson and a box of wine, You're gonna need it on a cloudy day, When all you wanna do is numb the pain, Cause feelin' kinda lonely, Ain't what it used to be, Oh no, Feelin' kinda lonely, Ain't what it used to be",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-Lonely.mp3",
        num_of_plays = 488,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg"
    )

    one_of_these = Song(
        name = "One of These Days",
        artist_id = 1,
        album_id = 1,
        artist_name="Gabe Lee",
        album_name = "The Hometown Kid",
        lyrics = f"One of these days I'm gonna turn me loose, Get a little more lovin' on these dusty boots, From cheap motels to fancy dressing rooms, Another night another town, One of these days I'm gonna take a drive, Gas ol dolly up one dollar at a time, Say me a little prayer that pesky engine light, Gets tired of messin' with me, Once I get rollin baby long enough, I prolly ain't comin' back, I love it here but honey there's the rub, I'm gonna keep on making you sad, What's there to do, What more can you say?, I've tried to be honest in my own stubborn way, But it's tragic, there you have it, Would I love you just the same, One of these days, One of these days, One of these Days I swear I'm gonna turn it all around, I mean better than I was, But let's not get ahead of ourselves just now, I still gotta make a livin and make certain ends meet, Aw Hell, another song and another drink, Once I get rollin baby long enough, I prolly ain't comin' back, I love it here but honey there's the rub, I'm gonna keep on making you sad, What's there to do, What more can you say, I've tried to be honest in my own stubborn way, But it's tragic, there you have it, Would I love you just the same, One of these days, One of these days, One of these days, One of these days, One of these days, One of these days, One of these days, One of these days",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-One+of+These+Days.mp3",
        num_of_plays = 741,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg"
    )

    longer = Song(
        name = "Longer I Run - Hammer Down",
        artist_id = 1,
        album_id = 1,
        artist_name="Gabe Lee",
        album_name = "The Hometown Kid",
        lyrics = f"I'm always runnin' behind, I don't know what it is, I'm guessin' that old Nissan engine, Got something to do with it, Like the day we broke down, Way out over on, The high roller side of town, Took all our money, To get our wheels back on the ground, There's not a doubt in my mind, I'll be seein' you soon, Lord knows I've been drivin', The early mornin' into the afternoon, And don't you send me no trouble, Cuz I'll be there in time, There's too many shadows, Out on those county roads tonight, And the longer I run, Longer he runs, And the more I grow tired, From chasing a feelin', Chasing a feelin', Of a restless numb kind, It's so kind, The longer I stay, Within the more of a mess, I tend to make, What a mess he makes, I ain't leavin', I just don't feel like comin' home today, No, no, All of my life, I have been dreamin', Of a way to keep my years of self abuse, From gettin' even, Today I saw an eagle, Flying over a crimson evening sun, Like a vision that this livin', Is far from just begun, And the longer I run, Longer he runs, And the more I grow tired, From chasing a feelin', Chasing a feelin', Of a restless numb kind, It's so kind, The longer I stay, Within the more of a mess, I tend to make, What a mess he makes, I ain't leavin', I just don't feel like comin' home today, ohhh, I ain't leavin', I just don't feel like comin' home today, Hm, mmm, not today, Standing outside now, Out of the house, Now nothin' goes in, And nothin' comes out, All that to say, It's like I've been here before, Caught staring at the wrong side of the door, And I, I can't shake a feelin', There's a gun at my back, I could pray for survival, With a hand on a bible, But God only knows, What is or ain't broke, So go on lay the steel hammer down, Well there I have done it again, Locked my keys in the car, And that's why today, I probably won't get to far, I could tell you a story, Of a luckier man, I wouldn't know where to start, But I've seen where it ends, And I, I don't want no trouble, I'm just tryin' to get by, Seems longer you ramble, And the harder you handle, God only knows, If I'll ever get home, So go on lay the steel hammer down, Go on, on and on, And lay the steel hammer down",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-Longer+I+Run+-+Hammer+Down.mp3",
        num_of_plays = 544,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/hometownkid.jpg"
    )

    honky_tonk = Song(
        name = "Honky Tonk Hell",
        artist_id = 1,
        album_id = 5,
        artist_name="Gabe Lee",
        album_name = "Honky Tonk Hell",
        lyrics = f"18 wheeler, back road dealer, hundred different ways to ride, If you'd have seen what I seen, Done what I done you'd be lookin for a place to hide, Even if I had a shiny silver dollar, Every time I passed the promised land, I'd still be 2 bucks shy, at the back of line, Cause they ain't ever gonna let me in, When my pride got the best of me, When my pride got the best of me, I was a stuck up no good son of a gun til the good lord set me free, Found a way to put it all together, Tried to make the whole world see, Foolish pride begone Glory Saint Mary, Hallelujah let me be, Cold hard money cash and clothes, livin it up everyday, Weekend trips down to Vegas right up until the repo came, There I was on the ground with the shit comin down, Til I saw shimmering light, Lady Luck in a 2 piece bikini, Come to fly me home through the night, When the dealer got ahold of me, When the dealer got ahold of me, I was a rollin, reelin, two time cheating, Til the good lord set me free, Found a way to put it altogether, Tried to make the whole world see, Dirty dealin begone Glory St. Mary, Hallelujah let me be, Now Honky Tonk Hell is a hell of a place, They got a big old dance room hall, Seats reserved for all the folks down in Nashville, Writing phony ass country songs, And if people ever get to askin, Mr. Gabe Lee how you end up here?, I look'em dead in the eye, And my only reply is to hit'em with a mile long stare, When the devil got ahold of me, When the devil got ahold of me, I felt a black hole way down deep in my heart, Until the good lord set me free, Found a way to put it altogether, Tried to make the whole world see, Punk ass devil begone Glory Saint Mary, Hallelujah let me be, Punk ass devil begone Glory Saint Mary, Hallelujah let me be",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-Honky+Tonk+Hell.mp3",
        num_of_plays = 543,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-honkytonk.jpg"
    )

    heart_breaker = Song(
        name = "Heartbreaker's Smile",
        artist_id = 1,
        album_id = 5,
        artist_name="Gabe Lee",
        album_name = "Honky Tonk Hell",
        lyrics = f"Jamie's gone, wisp in the wind, Never thought the day I would see, Her up and ditchin the band, Go ahead, don't believe me, I ain't got no one to please, If all you're doing is hangin around, Looking for somebody to leave, Shine on shine on, You can have whatever you like whenever you want, Swearing like the captain of the riverboat queens hauling, All your money down to New Orleans, She gotta heartbreakers, heartbreakers smile, There I was to meet her, before she broke me down, Standing in the wind and the rain Just talkin it out, After all the rock bottom shootin stars, You've had the fortune to find, How few are meant to rough it alone, While most of us are meant for leaving behind, Shine on shine on, You can go wherever you, Like whenever you want, Light as a feather, All skin and bone, trailing down the 40 back to San Anton, She got a heartbreakers, heartbreakers smile, Here she come runnin from preacher, Screamin honey I'm scared to death, I been waitin on the by and by, I ain't seen or heard a sign of it yet and, She says Lordy I'm ready to go Lordy I'm ready to go, Drop everything you're doing tonight, And meet me by the side of the road, Shine on shine on, you can have whatever you like, Whenever you want, With the sun in the sky her hair in the breeze, She could flag her any freighter here to TN, She gotta heartbreakers heartbreakers smile, Yeah she gotta heartbreakers, heartbreaker's smile",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-Heartbreaker's+Smile.mp3",
        num_of_plays = 850,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-honkytonk.jpg"
    )

    thirty_seconds = Song(
        name = "Thirty Seconds at a Time",
        artist_id = 1,
        album_id = 5,
        artist_name="Gabe Lee",
        album_name = "Honky Tonk Hell",
        lyrics = f"There's a spot out by the train tracks, All the local girls and boys like to get stoned, Their minds are filled with destinations, But they ain't nearly brave enough to go alone, So they wander through the rail yard making faces at the moon, The only trick they've ever been taught to do, To take a breath and close their eyes, 30 seconds at a time, There's a park outside the city, a former psychic calls her home, She's half as old and twice as pretty, As the doctor's misreport would have you know, She has a vision every morning, She sees the world through busted shards of glass, Sellin' last week's magazine outside the laundromat, Slowin' down traffic at the light, 30 seconds at a time, Bumped into Jesus at the diner, Where he was blessing a bowl of mac and cheese, Now there's a man who spends his whole life fighting evil, Best fill that boy up, With all the carbs that he can eat, He says the king's buffet upstairs is overcrowded, And the TV's always stuck on CNN, Says he just wants to catch the score before the work comes in, Fast food commercials flicker by, 30 seconds at a time",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-30+Seconds+at+a+Time.mp3",
        num_of_plays = 569,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-honkytonk.jpg"
    )

    emmylou = Song(
        name = "Emmylou",
        artist_id = 1,
        album_id = 5,
        artist_name="Gabe Lee",
        album_name = "Honky Tonk Hell",
        lyrics = f"Well darlin, this ain't like nothing you've ever seen before, This is the ending of it all, And I know sometimes the leavin is all it takes, To tear you apart, Sometimes all there's left to do is carry on, I try to wake up everyday, I, Try to find me something to do, But when the morning breaks and the sun comes shining through, I can never hardly move, I just lay in bed stuck here thinkin of you, Emmylou, Now it sure seems like you've been saying you don't miss me, Anywhere half as much as I miss you, And I've been playin all the numbers, On the chance of you comin back but it's, Just another way to lose, I can see the tattoo on your shoulders, Every night that mockingbird still haunts my dreams, He gets to chirping and a calling whenever I'm not around, Raggin on me every time he sings, I try to wake up everyday, I try to find me something to do, But when the morning breaks and the sun comes shining through, I can never hardly move, I just lay in bed stuck here thinkin of you, Emmylou",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-Emmylou.mp3",
        num_of_plays = 123,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/gabe-lee-honkytonk.jpg"
    )

    starting_over = Song(
        name = "Starting Over",
        artist_id = 3,
        album_id = 3,
        artist_name = "Chris Stapleton",
        album_name = "Starting Over",
        lyrics = f"Well, the road rolls out like a welcome mat, To a better place than the one we're at, And I ain't got no kinda plan, But I've had all of this town I can stand, And I got friends out on the coast, We can jump in the water and see what floats, We've been saving for a rainy day, Let's beat the storm and be on our way, And it don't matter to me, Wherever we are is where I wanna be, And honey, for once in our life, Let's take our chances and roll the dice, I can be your lucky penny, you can be my four-leaf clover, Starting over, This might not be an easy time, There's rivers to cross and hills to climb, Some days we might fall apart, And some nights might feel cold and dark, But nobody wins, afraid of losing, And the hard roads are the ones worth choosing, Someday we'll look back and smile, And know it was worth every mile, And it don't matter to me, Wherever we are is where I wanna be, And honey, for once in our life, Let's take our chances and roll the dice, I can be your lucky penny, you can be my four-leaf clover, Starting over, Starting over, It don't matter to me, Wherever we are is where I wanna be, And honey, for once in our life, Let's take our chances and roll the dice, I can be your lucky penny, you can be my four-leaf clover, Starting over, Starting over, Ooh, ooh, ooh, ooh, Ooh, ooh, ooh, ooh",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Chris+Stapleton+-+Starting+Over+(Lyrics).mp3",
        num_of_plays = 457,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/chris-stapleton-starting-over.jpg"
    )

    joy = Song(
        name = "Joy Of My Life",
        artist_id = 3,
        album_id = 3,
        artist_name = "Chris Stapleton",
        album_name = "Starting Over",
        lyrics = f"I tiptoed in the room, I know you got to have your rest, She says, 'Come lay beside me', 'I been waitin' since you left', She's sweet to me, Must be the luckiest man alive, Did I tell you, baby, You are the joy of my life?, First time that I saw you, mmm, You took my breath away, I might not get to Heaven, But I walked with the angels that day, She takes me by the hand, I am the luckiest man alive, Did I tell you, baby, You are the joy of my life?, Some may have their riches, Some may have their worldly things, As long as I have you, I'll treasure each and every day, Just take me by the hand, I am the luckiest man alive, Did I tell you, baby, You are the joy of my life?, Did I tell you, baby, You are the joy of my life?",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Chris+Stapleton+-+Joy+Of+My+Life+(Official+Audio).mp3",
        num_of_plays = 123,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/chris-stapleton-starting-over.jpg"
    )

    day_that_i = Song(
        name = "The Day That I Die (feat. Amos Lee)",
        artist_id = 4,
        album_id = 4,
        artist_name = "Zac Brown Band",
        album_name = "Uncaged",
        lyrics = f"Early morning in a motel room, Sunshine tryin' to creep on through, Lost sleep but I found a tune, Stuck inside my head, Cigarettes and tank of gas, Headed off to nowhere fast, Gotta find a way to make this feeling last, 'Cause I believe that I, Was born with a song inside of me, Never question why, I just kept on chasing that melody, And as time goes by, It's funny how time will make you realize, We're running out of it, On the day that I die, I want to say that I, Was a man who really lived and never compromised, And when I've lived out my days until the very end, I hope they find me in my home, a guitar in my hands, I hope they find me in my home with my guitar in my hands, Whoa-oh whoa, Whoa, A part I don't want to be ashamed of, Good peole aren't supposed to be of, I found peace with this path I took, As I laid down my head, Now cross roads, you gotta choose, Which way do we win or lose, And every bone in my soul says I sing on through, And I beleive that I, Was born with a song inside of me, Never question why, I just keep on singing these melodies, As time goes by, It's funny how time will make you realize, We're running out of it, On a day that I die, I wanna say that I, Was a man who really lived and never compromised, And when I've lived out my days, until the very end, I hope they find me in my home, guitar in my hands, I hope they find me in my home with my guitar in my hands, Whoa-oh whoa, Whoa, Whoa-oh whoa, Whoa, We all go, We all go, It's all over, 'Fore you know, I believe that I, Was born with a song inside of me, Never question why, I just keep on singing these melodies, And as time goes by, It's funny how time can make you realize, We're running out of it, On a day that I die, I will say that I, Was a man who really loved and never compromised, And while I live out my days, until the very end, You can find me in my home, guitar in my hands, And you can find me in my home with my guitar in my hands, Whoa-oh whoa, Whoa, Whoa-oh whoa, Whoa",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Day+That+I+Die+(feat.+Amos+Lee).mp3",
        num_of_plays = 789,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-uncaged.jpg"
    )

    goodbye = Song(
        name = "Goodbye in Her Eyes",
        artist_id = 4,
        album_id = 4,
        artist_name = "Zac Brown Band",
        album_name = "Uncaged",
        lyrics = f"I could tell that it was over, When her lips met mine, It was an emptiness in her voice, Hesitation when she smiled, She didn't have to say a word, It was just so plain to see, She had found what she'd been looking for, And I knew it wasn't me, I saw goodbye in her eyes, I don't think I can change it, There's no way to disguise, We will never make it, Sometimes I feel like a clown, Who can't wash off his make-up, The life she wanted, it was gone, Prince Charming, I wasn't, But I would trade a thousand Babylons, To be in her arms tomorrow, But like the tide her love has come and gone, And it's time for me to go, I saw goodbye in her eyes, I don't think I can change it, There's no way to disguise, We will never make it, Now she sees right through me, Should I hold on to what we've got, Is it just a waste of time?, One thing that I know for sure, I saw goodbye in her eyes, I saw goodbye in her eyes, I know you got somebody new now, All my candles have burned out, He's gonna love the way you shine, So did I, So don't smile at me if it ain't what you need, (Goodbye), With that goodbye in your eyes, I know that I can't change it (Now you see right through me), There's no way to disguise, We will never make it, I saw goodbye in your eyes, I know that I can't change it (Now you see right through me), Should I hold on (Goodbye in your eyes), We will never make it (Now you see right through me), Should I hold on (Goodbye in your eyes), Is it just a waste of time?, One thing that I know for sure, I saw goodbye in your eyes, I saw goodbye in your eyes, I know that it's over",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-Goodbye+in+Her+Eyes+(Greatest+Hits+Version).mp3",
        num_of_plays = 416,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-uncaged.jpg"
    )

    jump = Song(
        name = "Jump Right In",
        artist_id = 4,
        album_id = 4,
        artist_name = "Zac Brown Band",
        album_name = "Uncaged",
        lyrics = f"The southern wind sings again an island lullaby, Baby, powder beach under my feet has got me rolling, And the breeze through crackling leaves like a daytime campfire burning, And the ship is off to sea, and the wake it is a churning, As the southern wind sings again an island lullaby, You can jump right in, Let the music pull you in, You can jump right in, Oh, and lose yourself again, As the southern wind sings again an island lullaby, There's a place the locals go, no one knows where to find it, And the river starts to flow inside the clouds of Misty Mountain, The water from this stone below becomes a blue-green fountain, As the southern wind sings again an island lullaby, You can jump right in, Let the music pull you in, You can jump right in, Oh, and lose yourself again, As the southern wind sings again an island lullaby, La-la-la-la-la-la, la-la-la-la-la, La-la-la-la-la-la, la-la-la-la-la, La-la-la-la-la-la, la-la-la-la-la, La-la-la-la-la-la, la-la-la, You can find me where the music meets the ocean, If you get the notion, stop on by and play a while, Simple tune to get your love light glowing, Keep your heart wide open, disappear just like the tide, Let it roll on by, And jump right in, Let the music pull you in, You can jump right in, Oh, and lose yourself again, As the southern wind sings again an island lullaby, Southern wind sings again an island lullaby, Island lullaby",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-Jump+Right+In+(Greatest+Hits+Version).mp3",
        num_of_plays = 782,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-uncaged.jpg"
    )

    annie = Song(
        name = "Sweet Annie",
        artist_id = 4,
        album_id = 4,
        artist_name = "Zac Brown Band",
        album_name = "Uncaged",
        lyrics = f"I've been burnin' bright, For so long I can't remember, Pretty girls and late night bars seem to be my line of work, Believe me when I say, I can't stay this high forever, This man has had all he can stand, time to lay this body down, Sweet Annie, Can I stay with you a while?, 'Cause this road's been puttin' miles on my heart, Sweetheart, I've been livin' in a fantasy, But one day lightnin' will strike, And my bark will lose its bite, But don't give up on me, Sweet Annie, Sweet Annie, I know I promised you a life, But with an empty bed and the words I said don't carry any weight, If I could take back yesterday, find a way to start it over, Turn around, put that bottle down and I'd pray it's not too late, Sweet Annie, Can I stay with you a while?, 'Cause this road's been puttin' miles on my heart, Sweetheart, I've been livin' in a fantasy, But one day lightnin' will strike, And my bark will lose its bite, But don't give up on me, What will be will be, Sweet Annie, Turn out the light, These hands they long to hold you, Fall all over you, all over again, Come a little closer so I could show you, My heart still beats fast for you, All over, and over again, Sweet Annie, Can I stay with you a while?, 'Cause this road's been puttin' miles on my heart, Sweetheart, I've been livin' in a fantasy, But one day lightnin' will strike, And my bark will lose its bite, But don't give up on me, Sweet Annie",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-Sweet+Annie.mp3",
        num_of_plays = 345,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-uncaged.jpg"
    )

    memories = Song(
        name = "Memories Are Made Of",
        artist_id = 2,
        album_id = 6,
        artist_name = "Luke Combs",
        album_name = "This One's For You Too (Deluxe Edition)",
        lyrics = f"Cheap boat, six-pack of something light, A fireball burning up a blue sky, A Mercury 93, wasn't even half past noon, Our first taste of freedom after high school, Breaking hearts, curfews and mamma's rules, I just laugh, thinking 'bout all the shit we got into, Yeah, those were the days we thought we'd never lose, But we did, and we miss, How it was when we were just kids, Lookin' back on the past, Wouldn't much but it's what we had, Just a couple buds and a good buzz is all it was, But that's what memories are made of, It's been so long since me and Katy first met, We lost touch as all of the years went, Flying past, fading fast, wishing I could make her mine, There's some things, the same, to take you right back, I see her face every time I hear that, Lanyard Skyward, vinyl spinning, I'm in her arms in my mind, Yeah, those were the days we thought we'd never lose (never lose), But we did, and we miss, How it was when we were just kids, Lookin' back on the past, Wasn't much but it's what we had, Just a good buzz from a summer love was all it was, Yeah, that's what memories are made of, Yeah, those were the days we thought we'd never lose, But we did, and we miss, How it was when we were just kids, Lookin' back on the past, Wasn't much but it's what we had, Just a couple buds and a good buzz was all it was, Yeah, a summer love was all it was, But that's what memories are made of",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Luke+Combs+-+Memories+Are+Made+Of+(Audio).mp3",
        num_of_plays = 489,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/luke-combs-this-ones-for-you-too.jpg"
    )

    lonely_one = Song(
        name = "Lonely One",
        artist_id = 2,
        album_id = 6,
        artist_name = "Luke Combs",
        album_name = "This One's For You Too (Deluxe Edition)",
        lyrics = f"Honey, how's that drink goin' down?, Seems a little stiff for 2 p.m., Holler if you need anything, I've got an ear to lend, I'll be right here cuttin' limes, Countin' cash and stockin' beers, I've got an idea what's on your mind, So in the meantime, think on this, I've seen girls like you in here before, Watched broken hearts break, Through that door a time or two, And I'll bet he packed all his things, You set out to curse his name and have a few, And I'll bet you're doin' your best to move on, Well, you're not the only, lonely one, This ain't my first rodeo, I've seen the other side of this bar, Pourin' salts on an open wound, Sittin' right there where you are, And I know it probably stings right now, Somehow more than that Jim Beam, But that clock on the wall will cure it all, Even though that ain't how it seems, I've seen girls like you in here before, Watched broken hearts break, Through that door a time or two, And I'll bet he packed all his things, You set out to curse his name and have a few, And I'll bet you're doin' your best to move on, Well, you're not the only, lonely one, I've see",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Luke+Combs+-+Lonely+One+(Audio)+(1).mp3",
        num_of_plays = 415,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/luke-combs-this-ones-for-you-too.jpg"
    )

    when_it_rains = Song(
        name = "When It Rains It Pours",
        artist_id = 2,
        album_id = 6,
        artist_name = "Luke Combs",
        album_name = "This One's For You Too (Deluxe Edition)",
        lyrics = f"Sunday morning, man, She woke up fightin' mad, Bitchin' and moanin' on and on, 'Bout the time I had, And by Tuesday you could say, That girl was good as gone, Then when Thursday came around I was all alone, So I went for a drive to clear my mind, Ended up at a Shell on I-65, Then I won a hundred bucks on a scratch-off ticket, I bought two 12-packs and a tank of gas with it, She swore they were a waste of time, Oh, but she was wrong, I was caller number five on a radio station, Won a four day, three night beach vacation, Deep sea señorita fishin' down in Panama, And I ain't gotta see my, Ex-future-mother-in-law anymore, Oh Lord, when it rains it pours, Now she was sure real quick to up and apologize, When she heard about my newfound luck, On that FM dial, And it's crazy how lately now, It just seems to come in waves, What I thought was gonna be the death of me, Was my saving grace, It's got me thinkin' that her leavin', Is the only logical reason, That I got the last spot in the Hooters' parking lot, And the waitress left her number on my check with a heart, She picked up on the first ring when I gave her a call, And I only spent five bucks at the Moose Club raffle, Won a used 4-wheeler and three free passes, For me and two of my buddies to play a round of golf, And I ain't gotta see my, Ex-future-mother-in-law anymore, Oh Lord, when it rains it pours, When it rains it pours, Well I've been on one hell of a redneck roll, For three weeks now, And it all started on the day that she walked out, Then I won a hundred bucks on a scratch-off ticket, Bought two 12-packs and a tank of gas with it, She swore they were a waste of time, Oh, but she was wrong, And I was caller number five on a radio station, Won a four day three night beach vacation, Deep sea señorita fishin' down in Panama, And I ain't gotta see my, Ex-future-mother-in-law anymore, Oh Lord, when it rains it pours, When it rains it pours",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Luke+Combs+When+It+Rains+It+Pours+Lyrics.mp3",
        num_of_plays = 474,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/luke-combs-this-ones-for-you-too.jpg"
    )

    be_careful = Song(
        name = "Be Careful What You Wish For",
        artist_id = 2,
        album_id = 6,
        artist_name = "Luke Combs",
        album_name = "This One's For You Too (Deluxe Edition)",
        lyrics = f"Couldn't wait to ride out of that one horse town, Didn't see no use in sticking around, I was green and busting at the seams to leave, I was sitting on G, waiting on O, The day I hit eighteen, I hit the road, Traded that county maintain for a four lane city street, But sometimes things ain't what you think they're gonna be, What you want ain't always what you need, Don't know what you got 'til it's gone, And you're out on your own, All you want is what you can't get back, Once you let it go, then you know what you have, Don't hold a candle to what you had, Sometimes what you think you'll find, It ain't quite what real life has in store, So be careful what you wish for, She was holding on just a little too tight, Talked a little too much about the rest of our lives, I broke her heart thinking freedom would set me free, Well sometimes things ain't what you think they're gonna be, Don't know what you got 'til it's gone, And you're out on your own, All you want is what you can't get back, Once you let it go, then you know what you have, Don't hold a candle to what you had, Sometimes what you think you'll find, It ain't quite what real life has in store, So be careful what you wish for, 'Cause these city lights can't shine quite like the stars, I wish I could wish her back into my arms, Don't know what you got 'til it's gone, And you're out on your own, All you want is what you can't get back, Once you let it go, then you know what you have, Don't hold a candle to what you had, Sometimes what you think you'll find, It ain't quite what real life has in store, And you can't get her back no more, So be careful what you wish for, Be careful what you wish for",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Luke+Combs+-+Be+Careful+What+You+Wish+For+(Audio)+(1).mp3",
        num_of_plays = 685,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/luke-combs-this-ones-for-you-too.jpg"
    )

    i_got_away = Song(
        name = "I Got Away With You",
        artist_id = 2,
        album_id = 6,
        artist_name = "Luke Combs",
        album_name = "This One's For You Too (Deluxe Edition)",
        lyrics = f"Well, I got caught in Panama City, Tryin' to buy some beer for some Georgia girls, And I got wore out by my daddy, For stealin' cigarettes from the Smokes and more, And all my friends would get away, Seems I'd get caught, plain as day, I took the blame for every little thing, But I got away with you, And somehow l still ain't been found out, It's a crazy truth, Like l strolled out the gates of Alcatraz, And l walked in the Louvre, And the Mona Lisa's hanging in my house, I bust out of Buckingham with the crown jewels, And l got away with you, Well lookin' like you do, On its damn own, should be a crime, Let alone a fool like me, Hand in hand with you, should be doin' time, But here we are runnin' free, Guess someone turned the other cheek, 'Cause there ain't no blue lights in the rear view, Guess I got away with you, And somehow l still ain't been found out, It's a crazy truth, Like l strolled out the gates of Alcatraz, And l walked in the Louvre, Now the Mona Lisa's hanging in my house, I bust out of Buckingham with the crown jewels, And l got away with you, I'll take it all, the fails, the falls, The county jails and one phone calls, I'd do it all again if I had to, 'Cause I got away with you, Somehow girl, I still ain't been found out, It's a crazy truth, Like l strolled out the gates of Alcatraz, And l walked in the Louvre, Now the Mona Lisa's hanging in my house, I bust out of Buckingham with the crown jewels, And l got away with you, When l got away with you, Yeah, I got away with you",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Luke+Combs+-+I+Got+Away+with+You+(Audio).mp3",
        num_of_plays = 510,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/luke-combs-this-ones-for-you-too.jpg"
    )

    colder_weather = Song(
        name = "Colder Weather",
        artist_id = 4,
        album_id = 7,
        artist_name = "Zac Brown Band",
        album_name = "You Get What You Give (Deluxe)",
        lyrics = f"She'd trade Colorado if he'd take her with him, Closes the door before the winter lets the cold in, And wonders if her love is strong enough to make him stay, She's answered by the tail lights, shinin' through the window pane, He said, 'I wanna see you again, But I'm stuck in colder weather, Maybe tomorrow will be better, Can I call you then?', She said, 'You're a ramblin man', And you ain't ever gonna change, You got a gypsy soul to blame, And you were born for leavin', At a truck stop diner just outside of Lincoln, The night is black as the coffee he was drinkin', And in waitress' eyes he sees the same ol' light is shinin', He thinks of Colorado and the girl he left behind him, He said, 'I wanna see you again, But I'm stuck in colder weather, Maybe tomorrow will be better, Can I call you then?', She said, 'You're a ramblin' man, And you ain't never gonna change, You got a gypsy soul to blame, And you were born for leavin', born for leavin', Well, it's a windin' road when you're in the lost and found, You're a lover, I'm a runner and we go 'round and 'round, And I love you but I leave ya, I don't want you but I need ya, You know it's you that calls me back here, baby, Oh, I wanna see you again, But I'm stuck in colder weather, Maybe tomorrow will be better, Can I call you then?, 'Cause I'm a ramblin' man, (I ain't ever gonna change) I ain't ever gonna change, Gotta gypsy soul to blame, And I was born for leavin', Born for leavin', When I close my eyes, I see you, No matter where I am, I can smell your perfume through these whisperin' pines, I'm with your ghost again, It's a shame about the weather, But I know soon we'll be together, And I can't wait 'til then, I can't wait 'til then",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-Colder+Weather.mp3",
        num_of_plays = 793,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/zac-brown-band-you-get.jpg"
    )

    halos = Song(
        name = "Broken Halos",
        artist_id = 3,
        album_id = 8,
        artist_name = "Chris Stapleton",
        album_name = "From A Room: Volume 1",
        lyrics = f"Seen my share of, Broken halos, Folded wings that used to fly, They've all gone, Wherever they go, Broken halos that used to shine, Angels come down, From the heavens, Just to help us on our way, Come to teach us, Then they leave us, And they find some other soul to save, Seen my share of, Broken halos, Folded wings that used to fly, They've all gone, Wherever they go, Broken halos that used to shine, Broken halos that used to shine, Don't go looking, For the reasons, Don't go asking, Jesus why?, We're not meant to know the answers, They belong to the by and by, They belong to the by and by, Seen my share of, Broken halos, Folded wings that used to fly, They've all gone, Wherever they go, Broken halos that used to shine, Broken halos that used to shine, Broken halos that used to shine, Broken halos that used to shine",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/Chris+Stapleton+-+Broken+Halos+(Official+Audio).mp3",
        num_of_plays = 823,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/chris-stapleton-from-a-room.jpg"
    )

    river = Song(
        name = "River",
        artist_id = 5,
        album_id = 9,
        artist_name = "Jason Isbell and the 400 Unit",
        album_name = "Reunions",
        lyrics = f"The river is my saviour, 'Cause she used to be a cloud, She's happy just to lay there, When she used to be so proud, And even when she dries up, A thousand years from now, I'll lay myself beside her, And call her name out loud, The river is my saviour, The only one I'll ever need, Wash my head when I've been sinning, Wash my knuckles when they bleed, Protect me from my neighbor, All this jealously and greed, Take the body to the delta, Hide the weapon in the weeds, But now I'm tired and a little bit confused, Regarding what I meant to do, and what I did, The men I've hired, They all seem to be afraid of me, They turn their eyes away from me like kids, The river hears my secrets, Things I cannot tell a soul, Like the children that I've orphaned, And the fortune that I stole, The neighbor who asked questions, 'Til he washed up on the shoal, But I've done the law some favors, So nobody has to know, Now I'm tired, and I just can't get to sleep, I've been awoke from among these sheep, For all my life, The lake of fire, it consumes me in my dreams, And last night, I woke up screaming at my wife, The river is my saviour, She's running to the sea, And to reach her destination, Is to simply cease to be, And running 'til you're nothing, Sounds a lot like being free, So I'll lay myself inside her, And I'll let her carry me",
        song_url = "https://spnotify.s3.us-east-2.amazonaws.com/jason-isbell-River.mp3",
        num_of_plays = 748,
        album_cover = "https://spnotify.s3.us-east-2.amazonaws.com/jason-isbell-reunions.jpg"
    )



    db.session.add(wide)
    db.session.add(over)
    db.session.add(rusty)
    db.session.add(rain)
    db.session.add(buffalo)
    db.session.add(blue)
    db.session.add(every)
    db.session.add(leaving)
    db.session.add(lonely)
    db.session.add(one_of_these)
    db.session.add(longer)
    db.session.add(honky_tonk)
    db.session.add(heart_breaker)
    db.session.add(thirty_seconds)
    db.session.add(emmylou)
    db.session.add(starting_over)
    db.session.add(joy)
    db.session.add(day_that_i)
    db.session.add(goodbye)
    db.session.add(jump)
    db.session.add(annie)
    db.session.add(memories)
    db.session.add(lonely_one)
    db.session.add(when_it_rains)
    db.session.add(be_careful)
    db.session.add(i_got_away)
    db.session.add(colder_weather)
    db.session.add(halos)
    db.session.add(river)

    db.session.commit()

    song_list = [wide, over, rusty, rain, buffalo, blue, every, leaving, lonely, one_of_these, longer, honky_tonk, heart_breaker, thirty_seconds, emmylou, starting_over, joy, day_that_i, goodbye, jump, annie, memories, lonely_one, when_it_rains, be_careful, i_got_away, colder_weather, halos, river]
    return song_list



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
