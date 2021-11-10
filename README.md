# NorthArk Banks

![NorthArk Logo](frontend/src/assets/NorthArk_TypeLogo.svg)

Initial project for the capstone project: NorthArk Banks.

**Remember not to push Plaid and Stripe API keys to git!**

## Design 
Palette and Logo designs can be found inside of the Figma file.
[Figma ProtoTyping WIP](https://www.figma.com/file/UMI1G9rYU3Sd6FDTomnjsB/NorthArk-Banks?node-id=0%3A1)


#### Project overview
This is a group project for students taking the Minos Labs Career Acceleration program. It's meant to give developers in our group a chance to gain experience working in an agile team, and to show what they can do.

##### **Short description**:
ArkNorth is a banking app that allows the user to login, view their banking information and transactions, and generate reports.

## How to setup and run the project
After you pull the project, you will need to install the npm packages in both the frontend and server directories separately. You can copy-paste this command into vscode terminal if you are in the NorthArk directory: 
```
cd frontend/
npm i
cd ../server/
npm i
cd ../
```

To run the project locally, you will need to set up a firestore database. Instructions on how to set one up are in the file titled "firebase_setup.md" in the root directory.

Once you have firestore setup, to run the front end, open a terminal and navigate to the frontend directory ```cd frontend/``` then use ```npm start``` to run the React app.

You can run the backend simultaneously by opening another terminal and ```cd server/``` => ```npm start``` to run the express server (once it is set up).

#### Tech stack related
- Front end language - JavaScript
  - React Library
    - Material UI
    - Emotion for custom styles
    - Context for state store
- Back end language - Node with Express
  - Plaid integration to come
- Database solution
  - Firebase oAuth for login
  - Firebase Firestore for user data
