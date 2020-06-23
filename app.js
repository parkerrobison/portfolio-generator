const fs = require('fs');
const generatePage = require('./src/page-template.js'); 

const profileDataArgs = process.argv.slice(2, process.argv.length);
//these two variables are arrays.
// const name = profileDataArgs[0];
// const github = profileDataArgs[1];

//this is the condensed version of the code above. It is called assignment destructuring.
//it assigns elements of an array in a single expression
const [name, github] = profileDataArgs;

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
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!')
})

