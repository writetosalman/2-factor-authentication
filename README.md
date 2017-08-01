## 2 Factor Authentication
This is a 2 factor authentication project. 
You can use it to add 2 factor authentication to any project.

It supports both web as well as REST API.

It uses laravel at backend and angular 2 at the frontend.

For 2 Factor authentication, [authy](https://authy.com/) is used which has free mobile app as well as paid sms service.

You need to create an account with Authy and then insert its api keys in the .env file to authentication to work.

### Setup guide

After you have checkout the repo, you need to do following:

- Copy **.evn.example** and rename to **.evn**

- Edit **.env** to include your AUTHY api keys and mysql details.

- Change directory to ~/api in your terminal and then run following commands:
````
# composer install
# php artisan key:generate
# php artisan config:clear

````
- Run `php artisan migrate` to setup database

- After that you can start Laravel environment using command<br>
`php artisan serve`


### Thanks to following contributors

- Passport REST API module of laravel [link](https://laravel.com/docs/5.4/passport)

- [Barryvdh cors](https://github.com/barryvdh/laravel-cors) for cors modification
 
- Authy free service

- Authy web pages integration by [Raza Mehdi](https://github.com/srmklive/laravel-twofactor-authentication/)

You will need to install passport and Barryvdh cors on new installation. 

----------------
