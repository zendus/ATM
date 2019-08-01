const inquirer = require("inquirer");
const user = require("./user");
const admin = require("./admin");


function welcomePage() {
    console.log('===========================');
    console.log('Welcome to Zendus Bank!');
    console.log('===========================');

    inquirer.prompt(
        {
            type: 'list',
            name: 'status',
            message: 'Please select an option',
            choices: ['User', 'Admin', 'Quit']
        }
    ).then(answer => {
        if (answer.status === "User") {
            console.log(user.user())
        } else if (answer.status === 'Admin') {
            return admin.admin();
        } else {
            console.log('Thank You for Banking with Us!');
            process.exit();
        }
    });
}

exports.welcomePage = welcomePage;