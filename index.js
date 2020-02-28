var fs = require ("fs");
var inquirer = require ("inquirer");

inquirer.prompt([
    {
        type: "input",
        message: "What's your GitHub Username?",
        name: "username"
    },
    {
        type: "password",
        message: "What's your GitHub password?",
        name: "password"
    },
    {
        type: "input",
        message: "What's the name of your project?",
        name: "Title"
    },
    {
        type: "input",
        message: "In a few words how would summarize your project?",
        name: "description"
    }
]).then(answers =>{
    console.log (answers)
});

fs.writeFile("README.md", process.argv, function(err){
    if(err){
        return console.log(err)
    }
    console.log("File creation was a success!")
});