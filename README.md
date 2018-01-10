# progress-bar-app



## Technologies Utilized & Prerequiste:

Machine should have the following: 

[node.js](https://nodejs.org/)

Basic editor, for e.g. [Sublime](https://www.sublimetext.com/)

Compass ``gem install compass``.

* This project is generated with [angular generator](https://github.com/yeoman/generator-angular).
 
* Grunt is used for building and deployment on local, and it is hosted on Bitbucket server.
 
* For creating a single page application, I have relied upon AngularJS.
 
* UI/UX are supported using BootStrap
 
* Google Maps api is used to display parking location.
 
* Used Sublime Text as IDE.

# How to install code in your machine

Clone the project in your machine using ``git id please``

Go to the project directory **Project Directory**

Install node modules using ``npm install``

Install bower components using ``bower install``

Install grunt client using ``npm install grunt-cli``

Now to run the application run ``grunt serve``

Here is the app up and running for you!!!

Build the App via `` grunt build ``

Test the App via `` grunt test ``

Checkout the documentation via `` grunt serve:docs ``


You can check the code coverage by going to the folder `` coverage\PhantomJS(folder) `` and open `` index.html ``


# Coding style

[Directory Structure ](https://scotch.io/tutorials/angularjs-best-practices-directory-structure#a-better-structure-and-foundation)


# garages-info

##Live
[Click here to go to Live Url Of this App](http://mohit_kanwar.bitbucket.org/garage/#/)




##Assumptions:
 * Login Page to support the login via email and pass, 'b@b.com' and 'b' respectively, which is stored in local storage.
 * Dashbaord page to show first 25 Parking Slots only
 * SpaceShort => slot for parking small Car
 * SpaceLong => slot for parking long Car
 * Grren State => shows Slot available
 * Show red state when application is not aware of any available parking slot
 * Red State => shows No Slot available as per the data.
 * map screen size is standard , which should fits users screen size.
 * The details page should show 
 * Available Short Spaces : [Available Short Spaces] / [Total Short Spaces]
 * Available Long Spaces : [Available Long Spaces] / [Total Long Spaces]
 * Map means geographical map.
 * Informal language is expected while communicating with users.
 * Available parking slots might change in between the user is on list page and when he goes on details page.
 * Most users use either of the following browsers
        * Chromium (Latest)
        * Firefox (Latest)
        * Safari (Latest)

##Improvements:

 * Pagination must be implemented.
 * Should handle calls via Intercetors
 * Images should be maintained in a Sprite instead.
 * The Map on details page is not responsive, It could be made responsive.
 * Error handling
 * Should implement loading effect in order to show the network latency
 * We can add some caching to improve performance

##Architecture:


***App.js***

 * This class serves as the initial router and modules manager for Angular App


***header.html***

 * This is the common view through out the app, having BACKBASE logo and the logout button, The common view is created via ui-view


***footer.html***

 * This is the common view through out the app, having dashboard icon which will take the user back to dashbaord, The common view is created via ui-view

***MainCtrl***

 * Main Controller acts as the parent controller, It handles the logout, return to dashboard, logged in like functionalities. Function resides in this controller can be accessed through out the app via Classical Inheritance feature of scope in AngularJS

***login.html***

 * This is the default view of the app. User is allowed only if the user if he/she has login credentials

***LoginCtrl***

 * This controller serves for logging activity and routing based on sucess or failure, On failure the respective text box becomes red, determing which of the email or password enetered is in correct


***dashboard.html***

 * User is routed on the dashbaord html if the login credentials are matched, where the list of available garages are displayed, where red and green falg will appear based on the availablity of the garage spaces

***DashbaordCtrl***

 * This Controller fetches the data, displays on the UI, and if user clicks on the any particular garage , it will redirects the user on to that detailed page

***garage.html***

 * It displays the details of the chosen parking slot along with the mapped location on google map

***GarageCtrl***

 * Garage Controller paints the map based on the positions fetched, It also displays the available slots for small and long cars

***commonFactory***

 * Main service of the application, which serves as the setters/getters of various values , also it fetches the data from API.

 * For more readability Documentation is also done , please refer to it, Angular  ng-docs is used for the purpose, can view via `` grunt serve:docs ``

