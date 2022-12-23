const postcssPresetEnv = require("postcss-preset-env");

const config = {
	plugins: [
		postcssPresetEnv({
			stage: 1
		})
	]
};

module.exports = config;
