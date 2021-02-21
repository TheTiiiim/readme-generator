const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { dirname } = require("path");
const fsPromises = fs.promises;

const { generateMarkdown, licenses } = require("./utils/generateMarkdown");

const questions = [
	{
		type: "input",
		name: "title",
		message: "Enter your project's title : ",
	},
	{
		type: "input",
		name: "description",
		message: "Enter your project's description : ",
	},
	{
		type: "input",
		name: "installation",
		message: "Enter your project's installation instructions : ",
	},
	{
		type: "input",
		name: "usage",
		message: "Enter your project's usage instructions : ",
	},
	{
		type: "input",
		name: "contribution",
		message: "Enter your project's contribution guidelines : ",
	},
	{
		type: "input",
		name: "test",
		message: "Enter your project's test instructions : ",
	},
	{
		type: "list",
		name: "license",
		message: "Enter your project's license : ",
		choices: licenses,
	},
	{
		type: "input",
		name: "githubUser",
		message: "Enter your github username : ",
	},
	{
		type: "input",
		name: "email",
		message: "Enter your email address : ",
	}
];

function writeToFile(filePath, data) {
	filePath = path.normalize(filePath);

	const { base, dir } = path.parse(filePath);

	// ensure directory exists
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	// write file
	return fsPromises.writeFile(filePath, data, "utf8").then((data) => {
		return {
			"base": base,
			"dir": dir
		};
	});
}

function init() {
	// get data
	inquirer.prompt(questions)
		// render markdwon
		.then(generateMarkdown)
		// write to file
		.then((rendered) => {
			writeToFile("output/README.md", rendered).then((pathData) => {
				const { base, dir } = pathData;
				console.log(`generated README at ${dir + path.sep + base}`)
			});
		})
}

init();
