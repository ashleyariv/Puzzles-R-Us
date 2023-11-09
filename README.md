# TrackerQue
This app was developed mostly for freelancers who are always handling stacks upon stacks of receipts in order to get their expenses paid back by the company or people they are working for. The idea is to write in the core details of your epxenses, tracking it by amount, category and a breif decription for the expense in order to not have to keep track of small pieces of paper that tend to fade over short periods of time. 

## Core Features 
-> Create an account or login in order to access your personal expense list.   

-> Edit your profile details or delete your account from your profile page.

-> Create an expense to add to your list of unpaid epxenses.

-> Once your expense is paid click the paid button to transfer it to your history page, and if that lick was unintentional then you can transfer it back to unpaid, not big deal. 

-> Delete an expense if you no longer want to keep track of it from your unpaid or history page. 

---
## Setup 
-> First install all the packages by opening a terminal, switching into the server directory and typing: 
```
pipenv install 
```
-> Then go into your virtual environment by typing:
```
pipenv shell
```
-> Start your server by typing into the shell: 
```
python app.py
```
-> In a new terminal, switch into the client directory and type:
```
npm install
```
-> After all your modules are downloaded you'll want to open up the app in your browser, do this by typing:
```
npm start
```