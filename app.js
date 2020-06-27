const fs = require('fs');
// // this statement the object in module.exports assignment will be reassigned to this variable.
const generatePage = require('./src/page-template'); 

// these two lines allow me to 1)pull data from dummy 2)add test mode if user keys in information after node app.js
const mockData = require('./dummy.js');
const testMode = process.argv[2];

//const profileDataArgs = process.argv.slice(2, process.argv.length);
//these two variables are arrays.
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];

//this is the condensed version of the code above. It is called assignment destructuring.
//it assigns elements of an array in a single expression
//const [name, github] = profileDataArgs;

// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }
//     console.log('================');

//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs)


//hardcoded
// the () is where a parameter would be
//const generatePage = () => 'Name: Jane, Github: janehub';

// interpolated code
// const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;

// multi line code. Put 'return' wherever you would like a line break to occur.

//these lines of code will write a file using the filesystem module. 
// the first parameter is the file name, the second is data, and the third  handles any errors.


const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: "input",
            name: 'github',
            message: 'Enter your GitHub Username (Required)',
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                } else {
                    console.log('Please enter your username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        }
    ]);
};

const promptProject = portfolioData => {
    // this checks if an array has been created.
    if(!portfolioData.projects){
    portfolioData.projects = [];
    }
    console.log(`
=================
Add a New Project
=================
`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please enter a project description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you do this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter the link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    //this pushes data up to the project array
    .then(projectData => {
        portfolioData.projects.push(projectData);
        // if confirmAddProject is true it runs the function again.
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    })
};

// this allows the user to key in -t to see if the code is working with preset answers
if (testMode === "-t") {
    generatePage(mockData);
    //if not the app will function as normal.
} else {
    
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        const pageHTML = generatePage(portfolioData);
        fs.writeFile('index.html', pageHTML, err => {
            if (err) throw err;

            console.log('Portfolio complete! Check out index.html to see the output!')
        })
    });
}
    



