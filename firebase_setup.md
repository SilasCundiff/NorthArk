# How to create your own firebase app for testing

### create a firebase account and login

### Create new Firebase Project
Once you are logged in, you can see your projects. Create a new one for northark if you don't have one already.

![create project](/firebase%20tutorial/add_Project.png)

Select the defaults until you get to a screen that says your project is being built.

Once it's complete, click continue.

### Add the firebase config to your local project
Click on the empty html tag and use the default values to create the project.
![project setup](/firebase%20tutorial/setup.png)

When you get to this screen, copy the firebaseConfig object
![config file](/firebase%20tutorial/config.png)

Create a new file in your Northark/frontend/utils/ folder named ```firebase-config-object.js``` and paste the firebaseConfig object you copied into it. 
Add the keyword ```export``` before ```const``` and save the file.

![utils file](/firebase%20tutorial/utilsfile.png)


### Set up google oAuth

Back on the website, finish the setup process. Once you are back on the project dashboard page, you will see an option to set up authentication:

![auth setup](/firebase%20tutorial/setupauth.png)

Once you have clicked on it, it will ask you to select an auth provider. Select google, and fill in the information (you can use the default values.). Make sure you click the toggle in the top right of to enable google auth, and click save. 

If you did this properly, you should see:

![enabled google oauth](/firebase%20tutorial/enablegoogleauth.png)

### Finally, create a firestore database

![firebase setup](/firebase%20tutorial/firebasesetup.png)

Click on Cloud Firestore in the Project Overview to begin setup. You will want to create the Firestore in Test mode for now (not the default). You can use the rest of the default settings. 

Once complete, you should have a Cloud Firestore:

![firestore](/firebase%20tutorial/firestore.png)


That's it. You should be able to test user login and access the db from your local host now, as long as you have installed them using ```npm install```