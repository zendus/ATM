const inquirer = require("inquirer");
const account = require("./account");
const classExport = require('./classExport');
const global = require("./global");



function moreOp() {
    inquirer.prompt({
        type: 'confirm',
        name: 'confirmMore',
        message: 'Do you want to perform another operation?',
        default: false
    }).then(answer => {
        if (answer.confirmMore === true) {
            return adminServices();
        } else {
            process.exit();
        }
    })
}


function debitAtm() {
    inquirer.prompt({
        type: 'input',
        name: 'money',
        message: 'Please enter amount',
        validate: function (value) {
            var pass = value.match(/^[\d]+$/);
            if (pass) {
                return true;
            }
            return 'Please enter a valid Amount';
        }
    }).then(answer => {
        if (answer.money <= account.amount) {
            account.withdraw(Number(answer.money));
            console.log('Cash removed!!!');
            return moreOp();
        } else {
            console.log("Error");
        }
    })

}


function creditAtm() {
    inquirer.prompt({
        type: 'input',
        name: 'money',
        message: 'Please enter amount',
        validate: function (value) {
            var pass = value.match(/^[\d]+$/);
            if (pass) {
                return true;
            }
            return 'Please enter a valid Amount';
        }
    }).then(answer => {
        account.creditAtm(Number(answer.money));
        console.log('Cash Added!!!');
        return moreOp();
    })
}

function admin() {
    inquirer.prompt(
        {
            type: 'password',
            mask: true,
            name: 'passkey',
            message: 'Please enter your passkey',
            validate: function (value) {
                var pass = value.match(
                    /^[\d]{4}$/);
                if (pass) {
                    return true;
                }

                return 'Please enter a valid Pass key!';

            }
        }
    ).then(answer => {
        return adminServices();
    });

}


function adminServices() {
    inquirer.prompt({
        type: 'list',
        name: 'opservice',
        message: 'Please select an option',
        choices: ['Credit ATM', 'Debit ATM', 'Check ATM Balance', 'Back to Welcome Page', 'Disable ATM', 'Enable ATM', 'Quit']

    }).then(answer => {
        if (answer.opservice === 'Credit ATM') {
            return creditAtm();
        } else if (answer.opservice === 'Debit ATM') {
            return debitAtm();
        } else if (answer.opservice === 'Back to Welcome Page') {
            return global.welcomePage();
            //process.exit();
        } else if (answer.opservice === 'Check ATM Balance') {
            console.log('The ATM current balance is ', '₦' + account.amount);
            return moreOp();
        } else if (answer.opservice === 'Enable ATM') {
            classExport.disableOrEnable(true);
            return moreOp();
        } else if (answer.opservice === 'Disable ATM') {
            classExport.disableOrEnable(false)
            return moreOp();
        } else {
            process.exit();
        }
    });
}

module.exports = {
    admin
}