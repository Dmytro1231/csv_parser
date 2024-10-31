import { createReadStream } from 'fs'
import csv from 'csv-parser'
import { nbpieceCodes, accessibilityCodes, priorityUrbanArea } from './data.js'

export function chunkList(array, chunkSize) {
	const chunks = []
	for (let i = 0;i < array.length;i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize))
	}
	return chunks
}

export function loadCsvFile(filePath) {
	return new Promise((resolve, reject) => {
		console.log('Loading file...')
		const content = []
		let headers = []
		let headersCount = 0

		// Step 1: Read headers separately
		createReadStream(filePath)
			.pipe(csv({ separator: ';' }))
			.on('headers', (headerRow) => {
				headers = headerRow
				headersCount = headers.length
			})
			.on('data', (row) => {
				const fullRow = Object.values(row).slice(0, headersCount)
				const extend1 = fullRow[20].split(',')
				const extend2 = fullRow[21].split(',')

				// Trim the row and add extended fields
				let processedRow = fullRow.slice(0, fullRow.length - 4).concat(extend1, extend2)

				// Map fields to corresponding codes or values
				const priorityUrban = priorityUrbanArea[processedRow[8]] || 'Unknown'
				let nbpiece = processedRow[9]
				nbpiece = isNaN(nbpiece) ? nbpiece : nbpieceCodes[parseInt(nbpiece)] || 'Unknown'
				const accessibilityForDisabled = accessibilityCodes[parseInt(processedRow[14])] || 'Unknown'

				processedRow[8] = priorityUrban
				processedRow[9] = nbpiece
				processedRow[14] = accessibilityForDisabled

				content.push(processedRow)
			})
			.on('end', () => {
				console.log('File loaded successfully')
				resolve(content)
			})
			.on('error', (error) => {
				reject(error)
			})
	})
}
