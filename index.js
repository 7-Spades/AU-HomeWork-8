const fs = require ("fs");
const util = require ("util")
const inquirer = require ("inquirer");
const axios = require ("axios");

fs.writeFile("README.md","", "utf8", function(err){
    if(err){
        return console.log(err)
    }
})

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser () {
return inquirer.prompt([
    {
        type: "input",
        message: "What's your GitHub username?",
        name: "username"
    },
    {
        type: "input",
        message: "What's the name you want to use for this project?",
        name: "realname"
    },
    {
        type: "input",
        message: "What's the name of your project?",
        name: "title"
    },
    {
        type: "input",
        message: "In a few words how would you summarize your project?",
        name: "description"
    }
])};

function txtinfo(answers){
return `
# ${answers.title}

## Table of Contents
  * (#Description)
  * (#Intstallation)
  * (#Usage)
  * (#Commonly Asked Questions, Thoughts, and Concerns)
  * (#Contributors)
  * (#Project Licence)

  ## Description
  ${answers.description}

  ## Installation
  program installation procedures can go here

  ## Usage
  The details of how your project works can go here 

  ## Commonly Asked Questions, Thoughts, and Concerns
  You can place commonly asked questions or Developer statements here

  ## Contributors
  This Project was completed thanks to the efforts of:
  * ${answers.realname}
     * Github link can go here
     * email can go here
  * if more than one contributor you can put their info here

  ## Project Licence
  MIT License Copyright (c) [year] [fullname]

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
`
}

function userinfo (answers){
    const queryUrl = `https://api.github.com/users/${answers.username}/repos?per_page=100`;
    axios.get(queryUrl).then(function(res){
        console.log(res);
    }).catch(function (err){
        console.log(err)
    })
};

promptUser()
.then( function (answers){
    const readinfo= txtinfo(answers);
    userinfo(answers)
    return writeFileAsync("README.md", readinfo)
}).catch(function(err){
    console.log(err);
});
