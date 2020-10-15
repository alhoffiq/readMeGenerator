const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "Please enter the title."
        },
        {
            name: "description",
            type: "input",
            message: "Enter a description."
        },
        {
            name: "instructions",
            type: "input",
            message: "Enter any installation instructions."
        },
        {
            name: "usage",
            type: "input",
            message: "Enter any usage information."
        },
        {
            name: "guidelines",
            type: "input",
            message: "Enter any contribution guidelines."
        },
        {
            name: "tests",
            type: "input",
            message: "Enter testing instructions"
        },
        {
            name: "gitHub",
            type: "input",
            message: "Enter your GitHub username."
        },
        {
            name: "email",
            type: "input",
            message: "Enter your contact Email."
        },
        {
            name: "license",
            type: "list",
            message: "Choose a license.",
            choices: [
                "Apache 2.0",
                "GNU GPL v3",
                "MIT",
            ]
        },
    ])
    .then(answers => {
        console.log("Answers received!");
        console.log(answers);
        let readMe = generateReadMe(answers);
        return writeFileAsync("README.md", readMe);
    });

function generateReadMe(answers) {
    let license = "";
    if (answers.license === "Apache 2.0") { license = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)" }
    else if (answers.license === "GNU GPL v3") { license = "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)" }
    else if (answers.license === "MIT") { license = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" }

    return `
# ${answers.title} ${license}
    
## Table of Contents
[Title](#${answers.title})

[Description](#Description)

[Installation](#Installation)

[Usage](#Usage)

[Contributions](#Contributions)

[Testing](#Testing)

[Contact](#Contact)

## Description

${answers.description}

## Installation

${answers.instructions}

## Usage

${answers.usage}

## Contributions

${answers.contributions}

## Testing

${answers.tests}

## Contact

[${answers.gitHub}](https://github.com/${answers.gitHub})

[${answers.email}](mailto:${answers.email})
`;
}