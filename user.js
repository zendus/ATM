const inquirer = require("inquirer");
const classExport = require('./classExport');
const account = require("./account");
const global = require("./global");
const ATM = require(".");

function savings() {
    return userServices();
}

function current() {
    return userServices();
}

function userServices() {
    inquirer.prompt({
        type: 'list',
        name: 'services',
        message: 'Please select an Option',
        choices: ['Withdraw', 'Check Balance', 'Back to Welcome Page', 'Quit']
    }).then(answer => {

        if (classExport.check) {
            if (answer.services === 'Withdraw') {
                return withdraw();
            } else if (answer.services === 'Quit') {
                console.log('Thank You for Banking with Us!');
                process.exit();
            } else if (answer.services === 'Check Balance') {
                console.log('Your current account balance is', '₦' + account.amount);
                return moreUs();
            } else {
                console.log("Welcome page");
                global.welcomePage()
            }
        }
        else {
            console.log("Out Of Service")
            moreUs();
        }
    });
}




function userAccount() {
    console.log('Welcome dear user');
    inquirer.prompt({
        type: 'list',
        name: 'services',
        message: 'Please select an account type',
        choices: ['Savings', 'Current']
    }).then(answer => {
        if (answer === 'Savings') {
            savings();
        } else {
            current();
        }
    });
}

function moreUs() {
    inquirer.prompt({
        type: 'confirm',
        name: 'confirmMore',
        message: 'Do you want to perform another operation?',
        default: false
    }).then(answer => {
        if (answer.confirmMore === true) {
            return userServices();
        } else {
            console.log('Thank You for Banking with Us!');
            process.exit();
        }
    })
}

function withdraw() {
    inquirer.prompt({
        type: 'input',
        name: 'amount',
        message: 'Please enter amount',
        validate: function (value) {
            var pass = value.match(/^[\d]+$/);
            if (pass) {
                return true;
            }
            return 'Please enter a valid Amount';
        }
    }).then(answer => {
        if (account.amount === 0) {
            console.log('Cant perform operation, Please see the nearest operator...')
            return moreUs();
        }
        else if (answer.amount < account.amount) {
            console.log('Withdrawal Successful!!!');
            account.withdraw(answer.amount)
            console.log('Your remaining balance is ', '₦' + account.amount)
            return moreUs();
        } else {
            console.log('Insufficient Fund');
            return userServices();
        }
    });
}

function user() {
    inquirer.prompt(
        {
            type: 'password',
            mask: true,
            name: 'passkey',
            message: 'Please enter your passkey',
            validate: function (value) {
                var pass = value.match(/^[\d]{4}$/);
                if (pass) {
                    return true;
                }

                return 'Please enter a valid Pass key!';
            }
        }
    ).then(answer => {
        return userAccount();
    });

}

module.exports = { user };