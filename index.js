#!/usr/bin/env node

const { execSync } = require('child_process');
const { MultiSelect } = require('enquirer');

function getBranches() {
  try {
    return execSync('git branch | grep -v "*"')
      .toString()
      .trim()
      .split('\n')
      .map(str => str.trim())
  } catch(e) {}
}

const choices = getBranches();

if (!choices) return;

const prompt = new MultiSelect({
  message: 'Which branches do you wish to delete?',
  choices: getBranches()
});

prompt.run().then(branchesToDelete => {
  const branchesStr = branchesToDelete.join(' ');
  try {
    execSync(`git branch -D ${branchesStr}`)
    console.log('Successfully deleted branches: ' + branchesToDelete.join(', '));
  } catch(e) {
    console.log(e.message);
  }
})
