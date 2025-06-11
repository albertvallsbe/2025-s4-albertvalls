import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	verbose: true,

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	collectCoverage: true,
	coverageDirectory: 'coverage',
	reporters: [
		'default',
		[
			'jest-html-reporter',
			{
				pageTitle: 'Test Report',
				outputPath: 'reports/test-report.html',
			},
		],
		[
			'jest-junit',
			{
				outputDirectory: 'reports',
				outputName: 'junit.xml',
			},
		],
	],
};

export default config;
