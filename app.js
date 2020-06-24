const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: "input",
            name: 'github',
            message: 'Enter your GitHub Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
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
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
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

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
    

// const fs = require('fs');
// // this statement the object in module.exports assignment will be reassigned to this variable.
// const generatePage = require('./src/page-template.js'); 

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
// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!')
// })

