const fs = require("fs");
const fsPromises = fs.promises;

const licenses = [
	{
		name: "ISC License",
		badge: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
	},
	{
		name: "MIT License",
		badge: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
	},
	{
		name: "GNU General Public License v3.0",
		badge: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)"
	},
	{
		name: "Apache License 2.0",
		badge: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"
	},
]

function getLicenseBadge(licenseName) {
	const result = licenses.find((license) => {
		return license.name === licenseName;
	});

	if (result) {
		return result.badge;
	} else {
		return "";
	}
}

function generateMarkdown(answers) {
	const {
		title,
		description,
		installation,
		usage,
		contribution,
		test,
		license,
		githubUser,
		email
	} = answers;

	return fsPromises.readFile("src/template.md", "utf8").then((data) => {
		data = data.replace(/_badges/g, getLicenseBadge(license));
		data = data.replace(/_title/g, title);
		data = data.replace(/_description/g, description);
		data = data.replace(/_installation/g, installation);
		data = data.replace(/_usage/g, usage);
		data = data.replace(/_contribution/g, contribution);
		data = data.replace(/_test/g, test);
		data = data.replace(/_license/g, license);
		data = data.replace(/_githubUser/g, githubUser);
		data = data.replace(/_email/g, email);

		return data;
	});
}

module.exports = { generateMarkdown, licenses };
