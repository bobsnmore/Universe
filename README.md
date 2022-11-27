# Universe Id Fetcher (https://github.com/Stratiz/Universe-Id-Fetcher)

With the loss of `https://api.roblox.com/` and its replacement endpoints being locked behind an authorized only request, I've made a tutorial on how you can use the new API in order to fetch a universe Id from a place Id and wrapped it up into a single, deployable application.

This project is a deployable NodeJs server application that resolves a Roblox UniverseId from a single or many PlaceIds.

## How to use
After deploying the application with the steps below, you'll be able to send a request directly to `http://[YOUR_SERVER_IP]/universeId?placeIds=PLACE_ID`

You can chain up to 50 of the placeId querys. For example:

`http://[YOUR_SERVER_IP]/universeId?placeIds=PLACE_ID1&placeIds=PLACE_ID2&placeIds=PLACE_ID3`
This would return a JSON response of:
`[UNIVERSE_ID_1, UNIVERSE_ID_2, UNIVERSE_ID_3]`

## NOTE: THERE IS A CHEAPER & EASIER OPTION!

Setting this up on your own will run you at least $6 a month and is not easy. If you're looking for a cheaper and easier option, check out my Universe Id Provider service which will only run you $1 a month!

## https://uid.stratiz.net/

## Requirements
- A VPS (Virtual Private Server) with a static IP address.
  
  This project will not work on sites such as Repl.it and Glitch. You must use a VPS from a cloud host.
   
    Heres a couple cheap provider options that'll run you anywhere from 3-6$ USD a month:
   - https://www.vultr.com/ (My favorite)
   - https://www.digitalocean.com/

- Familiar with command line interfaces
- (Optional) a domain

## Setup
For this tutorial, we'll be using Debian 11 x64 and Vultr. You may a different host and OS but you'll need to translate accordingly. 

For reference, heres is the repository link: https://github.com/Stratiz/Universe-Id-Fetcher
### Setting up the VPS (Vultr)
1. Make an account at https://www.vultr.com/
2. Setup billing on the page it directs you to.
3. Navigate to the "Products" tab on the left side. (If you dont see "Deploy new instance", press the big plus button on the upper right side.)
4. Select the following options:
    - Choose Server: **Cloud Compute**
    - CPU & Storage Technology: **AMD High Performance**
    - Server Location: **(Select any of them)**
    - Server Image: **Debian**
    - Server Size: **Cheapest one**
    - Enable Auto Backups: **Off** (Not really worth the extra dollar since its easy to re-deploy the app)
    - Additional features: **(All off except for Enable IPv6)**
  
5. With everything configured, press "Deploy Now" and wait for it to boot up.
6. Click on the instance and then press the little computer icon to the right of the title. (A new window should pop up)
7. When it asks you to login, type `root`, press enter and then paste in the password from the overview page we were just at. (To paste, Ctrl+V will not work, you'll need to use the little side menu when on the left of the new window.)
8. Run the following commands:
   - `sudo su` (Switches to admin user, it may ask you for your password again)
   - `apt install git` (Installs git, may ask for confirmation)
   - `apt install npm` (Installs the node package manager, It may ask for confirmation, type Y and press enter)
   - `npm i -g pm2` (Installs pm2 globally)
   - `cd ~` (Changes directory to root directory)
   - `mkdir apps` (makes a new folder called apps)
   - `cd apps` (moves into the apps directory)
   - `git clone https://github.com/Stratiz/Universe-Id-Fetcher` (Clones the repository into the directory)
   - `cd Universe-Id-Fetcher` (Move into the cloned repo)
   - `npm i` (Install the required packages from the repo)
   - `ufw allow 80` (Allow port 80 HTTP through the firewall)
   - `pico .env` (Create and open `.env` in a text editor)
      
      Inside this file, enter the following information (We'll get the cookie in a moment)
      ```
      COOKIE=PASTE_COOKIE_HERE
      ```
      DONT CLOSE THIS YET.

      
9. Now that the server is configured, we need to get a cookie! **(DO NOT USE YOUR OWN ACCOUNT FOR THIS, MAKE A DIFFERENT ONE)**
10. Follow the steps here and grab your cookie: https://noblox.js.org/tutorial-VPS%20Authentication.html (Chome bugs out for me, I'd use Firefox when making the proxy if possible)
11. Grab the .ROBLOXSECURITY cookie and paste it into your `.env` file from earlier that you should have open still.
12. While in the file, press Ctrl+X, it'll ask to save, press Y and then enter.
13. To start the server, run the following command: `pm2 start pm2_starter.cjs`
14. Server should start up and you'll have a valid endpoint!
15. If you want to use this in roblox you'll need a domain. You can buy a domain from google @ https://domains.google.com for about $12 a year.

## (Optional) Setting up an API key
An API makes sure that you're the only one accessing your newly created API endpoint. This project is already setup to take an API key.
1. Open your `.env` file from earlier
2. Add a new line and add the following:
    ```
    API_KEY=YOUR_KEY_HERE_CAN_BE_ANYTHING
    ```
3. Save the file the same way as before and run `pm2 restart pm2_starter`
4. Now every time you make a request you'll have to set the `Authorization` header equal to your API key, otherwise you'll get a 403 Unauthorized response. (Code sample is located here: https://uid.stratiz.net/)
## Testing
1. Now that everything is setup, you can test your application by using https://ReqBin.com/
2. For the URL, use `http://YOUR_VPS_IP/universeIds?placeIds=ANY_PLACE_ID`
3. __IF YOU SETUP AN API KEY, OTHERWISE, SKIP__: On the Authorization tab, click "Custom" and paste the API key into the "Header" field
4. Press "Send" and you should get a 200 OK response with the universe id inside. If not, make sure you completed all the steps properly.


Done! Your server should be ready for you to use. Dont forget to get a domain!

I'll be adding/rewriting information for clarity as I get feedback.