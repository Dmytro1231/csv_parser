import { existsSync, lstatSync } from 'fs'
import { homedir } from 'os'
import { number, input } from '@inquirer/prompts'

const loadFilePath = async () => {
	const filePath = await input(
		{
			name: 'filePath',
			message: 'Enter file to upload:',
			default: homedir(),
			validate: input => {
				if (!existsSync(input)) {
					return 'File does not exist'
				}
				if (!lstatSync(input).isFile()) {
					return 'Input is not a file'
				}
				return true
			}
		}
	)
	return filePath
}

const loadChunkSize = async () => {
	const chunkSize = await number(
		{
			name: 'chunkSize',
			message: 'Enter chunk size:',
			default: 100000,
			validate: input => (input > 0 ? true : 'Chunk size must be greater than 0')
		}
	)
	return chunkSize
}

const loadSeparator = async () => {
	const separator = await input(
		{
			name: 'separator',
			message: 'Separator:',
			default: ','
		}
	)
	return separator
}

export const initializeInputParameters = async () => {
	console.log("Initializing input")
	const filePath = await loadFilePath()
	const chunkSize = await loadChunkSize()
	const separator = await loadSeparator()

	return { filePath, chunkSize, separator }
}
