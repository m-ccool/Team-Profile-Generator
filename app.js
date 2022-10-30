const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const util = require('util');
const Logger = require('./logger');
const writeFileAsync = util.promisify(fs.writeFile);


const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const log = new Logger();


const teamMembersArray = [];

const cliIntroQuestion = {
    type: 'list',
    message: `
    Welcome! To the Team Profile Generator Console Application.

    This program will walk you through prompts to build your work team's HTML website.
    Submit information specific to each memeber, and the program will generate a personalized card.

    Do you wish to continue?`,
    choices: ['Yes, Start Building Team Page', 'No, Close Application'],
    name: 'cliIntroQ'
};

const managerQuestions = [
    {
        type: 'input',
        message: "What is the Manager's name?",
        name: 'managerName',
    },
    {
        type: 'input',
        message: "What is the Manager's ID number?",
        name: 'managerId',
        validate: function (num) {
            numbers = /^[0-9]+$/.test(num);
            if (numbers) {
                log.green(`        ----------Number Formatting Accepted----------`);
				return true;
            } else {
                log.red(`        ----------Please enter a valid ID Number that does not include anything other than numbers (No letters or symbols)----------`);
				return false;
            }
        },
    },
    {
        type: 'input',
        message: "What is the Manager's email?",
        name: 'manageEmail',
        validate: function (emailInput) {
            emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);

            if (emailFormat) {
                log.green(`        ----------Email Formatting Accepted----------`);
				return true;
            } else {
                log.red(`        ----------Please enter a valid email----------`);
				return false;
            }
        },
    },
    {
        type: 'input',
        message: "What is the Manager's office number",
        name: 'managerOfficeNumber'
    },
];

const endManagerQuestions = {
    type3: 'list',
    message: 'Would you like to add another team member to the team?',
    choices: ['Yes', 'No'],
    name: 'teamSize',
};

const teamMemberRolePick = {
    type: 'list',
    message: 'Is this team member an Engineer or an Intern?',
    choices: ['Engineer', 'Intern'],
    name: 'teamMemberRoleType',
};

const engineerQuestions = [
    {
        type: 'input',
        message: "What is the Engineer's name?",
        name: 'engineerName',
    },
    {
        type: 'input',
        message: "What is the Engineer's ID number?",
        name: 'managerId',
        validate: function (num) {
            numbers = /^[0-9]+$/.test(num);
            if (numbers) {
                log.green(`        ----------Number Formatting Accepted----------`);
				return true;
            } else {
                log.red(`        ----------Please enter a valid ID Number that does not include anything other than numbers (No letters or symbols)----------`);
				return false;
            }
        },
    },
    {
        type: 'input',
        message: "What is the Engineer's email?",
        name: 'engineerEmail',
        validate: function (emailInput) {
            emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);

            if (emailFormat) {
                log.green(`        ----------Email Formatting Accepted----------`);
				return true;
            } else {
                log.red(`        ----------Please enter a valid email----------`);
				return false;
            }
        },
    },
    {
        type: 'input',
        message: "What is the Engineer's GitHub Username?",
        name: 'engineerGithub'
    },
];

const internQuestions = [
    {
        type: 'input',
        message: "What is the Intern's name?",
        name: 'internName',
    },
    {
        type: 'input',
        message: "What is the Intern's ID number?",
        name: 'internId',
        validate: function (num) {
            numbers = /^[0-9]+$/.test(num);
            if (numbers) {
                log.green(`        ----------Number Formatting Accepted----------`);
				return true;
            } else {
                log.red(`        ----------Please enter a valid ID Number that does not include anything other than numbers (No letters or symbols)----------`);
				return false;
            }
        },
    },
    {
        type: 'input',
        message: "What is the Intern's email?",
        name: 'internEmail',
        validate: function (emailInput) {
            emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput);

            if (emailFormat) {
                log.green(`        ----------Email Formatting Accepted----------`);
				return true;
            } else {
                log.red(`        ----------Please enter a valid email----------`);
				return false;
            }
        },
    },
    {
        type: 'input',
        message: "What is the Intern's school",
        name: 'internSchool'
    },
];

function cliIntro() {
	inquirer.prompt(cliIntroQuestion).then((appStart) => {
		if (appStart.cliIntroQ === 'Yes, Start Building Team') {
			log.green('Please Submit Manager Profile Information');
			managerInfo();
		} else {
			log.yellow(`
        ------------------------------------------------------------
        ---------------------Application Closed---------------------
        ------------------------------------------------------------
            `);
		}
	});
}

function managerInfo() {
    inquirer.prompt(managerQuestions).then((managerBuild) => {
		let manager = new Manager(managerBuild.managerName, managerBuild.managerId, managerBuild.manageEmail, managerBuild.managerOfficeNumber);
		teamMembersArray.push(manager);
		teamSizeInfo();
	});
}

function teamSizeInfo() {
    inquirer.prompt(endManagerQuestions).then((teamSize) => {
        if (teamSize.teamSize === 'Yes') {
            teamMemberLoop();
        }
        if (teamSize.teamSize === 'No') {
            renderHTML(teamMembersArray);
        }
    });
}

function teamMemberLoop() {
    inquirer.prompt(teamMemberRolePick).then((teamrole) => {
        if (teamrole.teamMemberRoleType === 'Engineer') {
			log.blue('Please Submit Engineer Profile Information');
			inquirer.prompt(engineerQuestions).then((engineerBuild) => {
				let engineer = new Engineer(engineerBuild.enginnerName, engineerBuild.engineerId, engineerBuild.engineerEmail, engineerBuild.engineerGithub);
				teamMembersArray.push(engineer);
				teamSizeInfo();
			});
		} else if (teamrole.teamMemberRoleType === 'Intern') {
			log.magenta('Please Submit Intern Profile Information');
			inquirer.prompt(internQuestions).then((internBuild) => {
				let intern = new Intern(internBuild.internName, internBuild.internId, internBuild.internEmail, internBuild.internSchool);
				teamMembersArray.push(intern);
				teamSizeInfo();
			});
		}
	});
}

async function renderHTML(file) {
	const htmlProfilePage = render(file);

	await writeFileAsync(outputPath, htmlProfilePage).then(function () {
		log.green(`
        ----------------------------------------------------------------
        ---------------------Team Profile Completed---------------------
        ----------------------------------------------------------------
        `);
	});
}

cliIntro();