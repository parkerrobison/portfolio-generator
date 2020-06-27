const fs = require('fs');

const writeFile = fileContent => {
    // new is a Promise Object. It acts as a container that allows us to 
    // run code that at some point will be "pending"
    return new Promise((resolve, reject ) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if there is an error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                // return out of the function here to make sure that the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            // if everything went well, resolve the promise and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise ((resolve, reject) => {
        fs.copyFile('../src/style.css', '../dist/style.css', (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve ({
                ok: true,
                message: 'File copied'
            })
        })
    })
}

module.exports = { writeFile, copyFile };