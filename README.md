# Spnotify

This is a Spotify clone where you can listen to country music!
Live site on https://spnotify.onrender.com

## Technologies used:
<div>

  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
  ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

## Features
* User can sign up, login with existing credintials, or login with one of two demo-users.
* Logged in users can listen to music.
* Logged in users can create their own playlist and add or remove songs to the playlist.
* Logged in users can edit or delete any of their own playlists.
* Logged in users can write a review for any public playlists other than their own.
* Logged in users can write a review for an album.
* Logged in users can follow and unfollow an artist and see all of the artists they are following in their profile page.
  
## Landing Page
![image](https://spnotify.s3.us-east-2.amazonaws.com/spnotify+landing+screenshot.png)

## All Artists Page
![image](https://spnotify.s3.us-east-2.amazonaws.com/spnotify+all+artists+page.png)

## Song Page
![image](https://spnotify.s3.us-east-2.amazonaws.com/spnotify+song+page.png)

## Playlist Page
![image](https://spnotify.s3.us-east-2.amazonaws.com/spnotify+playlist+page.png)

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
