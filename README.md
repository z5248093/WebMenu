# Set Up Instructions
 
## BACKEND 
To run the backend you first need to following the steps below 

### INSTALL DJANGO

$sudo apt update
$sudo apt install python3-django


### INSTALL MYSQL

*Step 1. Install mysql*

  > sudo apt install mysql-server

*Step 2. Set up password*

  > sudo mysql –user=root mysql 

  > mysql > UPDATE mysql.user SET authentication_string=null WHERE User='root';

  > mysql > flush privileges;
  
Replace "your_password" with your desired password

  > mysql > ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password_here';  

  > mysql > flush privileges;

  > mysql > exit

### INSTALL PYTHON MODULES

> sudo apt-get install python3-pymysql

> sudo apt install python3-pip

> pip install django-cors-headers

> pip install django-shopping-cart

> pip install mysql-connector-python


### SET UP DATABASE
*Step 1.create databas*

 > mysql -u root -p
 > mysql> CREATE DATABASE waitmanagement;

Then you will need to change a line in the settings.py file found in capstone-project-3900-m18b-nofail/Django/Django/settings.py. On line 107 you will have to change ‘PASSWORD’: ‘password’ -> ‘PASSWORD’: ‘password_you_defined_above’.

*Step 2.make migration*

 > cd capstone-project-3900-m18b-nofail/Django
 
 > python3 manage.py makemigrations
 
 > python3 manage.py migrate

*Step 3. Initialize database values*

To initialize the authentication groups and add some items to the menu you will need to run the following mysql commands. There are five files in capstone-project-3900-m18b-nofail/sqlFiles 
 that must be run in the following order. Replace “home/lubuntu” with the path where you cloned the repo or extracted the files.

 > mysql> source /home/lubuntu/capstone-project-3900-m18b-nofail/sqlFiles/auth_group.sql

 > mysql> source /home/lubuntu/capstone-project-3900-m18b-nofail/sqlFiles/auth_group.sql

 > mysql> source /home/lubuntu/capstone-project-3900-m18b-nofail/sqlFiles/auth_user_group.sql

 > mysql> source /home/lubuntu/capstone-project-3900-m18b-nofail/sqlFiles/items_items_category.sql

 > mysql> source /home/lubuntu/capstone-project-3900-m18b-nofail/sqlFiles/items_items_info.sql

### RUN THE BACKEND
> python3 manage.py runserver

## FrontEnd
### INSTALL NODE
> sudo apt install curl

> curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh

> sudo apt install nodejs

> sudo apt install npm


### RUN FRONT-END
>$cd capstone-project-3900-m18b-nofail/frontend

>npm install

>npm start


If there is an error about the max number of watchers can update the max watchers for a quick fix using the command below

>sudo sysctl -w fs.inotify.max_user_watches=100000



## User Accounts

### Customer Account
username: manager_1

password: 123456

### Wait Staff Account
username: waitStaff_1

password: 123456

### Kitchen Staff Account
username: kitchenStaff_1

password: 123456


### Manager Staff Account
username: manager_1

password: 123456



## NOTE
The project is based on a real-world situation. Hence we design the restaurant logo, and name the restaurant as “RESUTANTABLE”. User pages have different colors for navigation’s bar to identify different types of user.

Please note that if you want to log in to several different accounts at the same time. Please log in accounts in different browsers. For example, log in account A in browser 1 and account B in browser 2. In addition to your system's browser, Google Chrome and Firefox are recommended. 

This is because in reality, users will log into their own accounts on their own devices. Our project simulates such a situation. If you want to implement multiple account logins on one device, you must use different kinds of browsers to simulate different devices. For example, you can use Chrome to use customer account, Firefox to use wait staff account, Edge to use kitchen staff account and Safari to use manager account.

And for a better experience, please log out of your account after using it.




