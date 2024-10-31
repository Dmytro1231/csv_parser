import { existsSync, rmSync, mkdirSync } from 'fs'
import { parse, join, dirname, resolve } from 'path'
import { createInterface } from 'readline'
import { createArrayCsvWriter } from 'csv-writer'
import { chunkList, loadCsvFile } from './helpers.js'
import { initializeInputParameters } from './types_data.js'
import { originalHeaders } from './data.js'

const createFolder = (folderPath) => {
	if (existsSync(folderPath)) {
		rmSync(folderPath, { recursive: true })
	}
	mkdirSync(folderPath, { recursive: true })
}

const writeFiles = async (chunks, folder, filePath, delimiter) => {
	const progressBar = createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	console.log('Writing files')
	for (let index = 0;index < chunks.length;index++) {
		const chunk = chunks[index]
		const name = `${parse(filePath).name}_${index}.csv`
		const chunkFile = join(folder, name)

		const writer = createArrayCsvWriter({
			path: chunkFile,
			header: originalHeaders,
			fieldDelimiter: delimiter,
		})

		await writer.writeRecords(chunk)
		progressBar.write(`File ${index + 1} of ${chunks.length} written\n`)
	}

	progressBar.close()
}

const runCli = async () => {
	console.log("Starting cli")
	const parameters = await initializeInputParameters()
	const filePath = parameters.filePath
	const delimiter = parameters.separator
	const folder = join(dirname(filePath), `${parse(filePath).name}_parsed`)
	const content = await loadCsvFile(filePath)
	const chunks = chunkList(content, parameters.chunkSize)

	createFolder(folder)
	await writeFiles(chunks, folder, filePath, delimiter)

	console.log(`Finished. Files location:\n\n${resolve(folder)}`)
};

(async function main() {
	try {
		await runCli()
	} catch (error) {
		if (error instanceof Error && error.message === 'Cancelled') {
			console.log('Cancelling')
		} else {
			console.error('An error occurred:', error)
		}
	}
})()
