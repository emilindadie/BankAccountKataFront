# BankAccount kata Front
Think of your personal bank account experience When in doubt, go for the simplest solution

# Requirements
- Deposit and Withdrawal
- Account statement (date, amount, balance)
- Statement printing
 
# User Storiess
##### US 1:
**In order to** save money  
**As a** bank client  
**I want to** make a deposit in my account  
 
##### US 2: 
**In order to** retrieve some or all of my savings  
**As a** bank client  
**I want to** make a withdrawal from my account  
 
##### US 3: 
**In order to** check my operations  
**As a** bank client  
**I want to** see the history (operation, date, amount, balance)  of my operations  


# Api Dependance with swagger ui
[BankAccountApiNestJS](https://github.com/emilindadie/BankAccountApiNestJS)

# Other Api Dependance
[BankAccountkataApi](https://github.com/emilindadie/BankAccountKataApi)


# Link to see the interface
https://www.slideshare.net/secret/5VRmSQqnsNefsH

https://docs.google.com/presentation/d/1ykeXnn0tQDUygtBIWzQwovgqDhRP6ba_yfiJZgr2nso/edit?usp=sharing


# Configure proxy in local developement (package?json file replace:) 

```sh
"proxy": "http://localhost:${your_server_port}",
```

# Run api
```sh
$ npm run start
```

# Run tests
```sh
$ npm run test  
```

# Run tests with coverage
```sh
$ npm run test:cov 