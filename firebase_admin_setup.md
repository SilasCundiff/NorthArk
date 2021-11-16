# Set up your firebase admin credentials for the server to use

First go into your firebase console.
Click the cogwheel in the top left -> Project Settings -> Service Accounts.
On the Firebase Admin SDK tab, click Generate new private key.

![generate key](/firebase%20tutorial/generatekey.png)

It will give you a json file with a long name that you will need to paste into your NorthArk/server folder.

Next, create a .env file in the server folder if you don't already have one. Inside of that file, paste the following:

```GOOGLE_APPLICATION_CREDENTIALS="./{your-json-file-name}.json"```

It should look like: 

![generate key](/firebase%20tutorial/create.env.png)

## Important!

Add the file to your .gitignore file so you don't accidentally push your api credentials to git. 

Make sure not to remove other people's file name from the git ignore.

![generate key](/firebase%20tutorial/addtoignore.png)