const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { dirname } = require("path");
const fsPromises = fs.promises;

`
project title, description, installation instructions, usage information, contribution guidelines, and test instructions

`

const questions = [];

function writeToFile(fileName, data) {
	fileName = path.normalize(fileName);

	// get directory of target file
	dirName = fileName.split(path.sep);
	dirName.pop();
	dirName = dirName.join(path.sep);

	// ensure directory exists
	if (!fs.existsSync(dirName)) {
		fs.mkdirSync(dirName);
	}

	// write file
	return fsPromises.writeFile(fileName, data, "utf8");
}

function init() {
}

init();
