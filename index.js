#!/usr/bin/env node

const {execSync} = require("child_process");
const { MultiSelect } = require('enquirer');

const branches = execSync('git branch | grep -v "*"')
    .toString()
    .trim()
    .split('\n')
    .map(str => str.trim())

const prompt = new MultiSelect({
    message: 'Which branches do you wish to delete?',
    choices: branches
});

prompt.run().then(branchesToDelete => {
    const branchesStr = branchesToDelete.join(' ');
    execSync(`git branch -D ${branchesStr}`)
})
