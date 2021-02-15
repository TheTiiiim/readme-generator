const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { dirname } = require("path");
const fsPromises = fs.promises;

`
project title, description, installation instructions, usage information, contribution guidelines, and test instructions

`

const questions = [];

function writeToFile(inputPath, data) {
	inputPath = path.normalize(inputPath);

	// get directory of target file
	let dirArray = inputPath.split(path.sep);
	const fileName = dirArray.pop();

	dirName = dirArray.join(path.sep) + path.sep;

	// ensure directory exists
	if (!fs.existsSync(dirName)) {
		fs.mkdirSync(dirName);
	}

	// write file
	return fsPromises.writeFile(inputPath, data, "utf8").then((data) => {
		return {
			"fileName": fileName,
			"path": dirName
		};
	});
}

function init() {
}

init();
