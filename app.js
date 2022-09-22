const inquirer = require('inquirer');

const promptUser = () => {
return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if(nameInput){
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your github username?',
            validate: githubInput => {
                if(githubInput){
                    return true;
                }
                else {
                    console.log('Please enter your github account name!')
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        }     
        
    ]);    
};



const promptProject = (portfolioData) =>{
    if (!portfolioData.projects){
        portfolioData.projects = [];
    }
    
    console.log(`
    =============
    Add a New Project
    =============
    `);
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'project-name',
            message: 'What is the name of your project'
        },
        {
            type: 'input',
            name: 'project-description',
            message: 'Provide some information about your project. (Required)',
            validate: descriptionInput => {
                if (descriptionInput){
                    return true;
                }
                else {
                    console.log('Please enter a description of your project!')
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'project-languages',
            message: 'What programming languages does your project use?',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput){
                    return true
                 }
                else {
                    console.log('Please enter the link to your project!')
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
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject){
            return promptProject(portfolioData)
        }
        else {
            return portfolioData;
        }
    });
}

promptUser()
.then(promptProject)
.then(portfolioData => {
    console.log(portfolioData);
});

/*
const fs = require('fs');
const generatePage = require('./src/page-template');

const pageHTML = generatePage(name, github);



fs.writeFile('index.html', pageHTML(name, github), err =>{
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');
});
*/