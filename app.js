const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 3001

const API_KEY = 'Bearer aSuperSecretKey'
const API_URL = 'https://echo-serv.tbxnet.com/v1/secret'
const API_AUTH = { headers: { Authorization: API_KEY } }

app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
)

app.get('/', (req, res) => {
    res.send('Healthy OK')
})

app.get('/files/list', async (req, res) => {
    try {
        const filesResponse = await axios.get(`${API_URL}/files`, API_AUTH)
        const files = filesResponse.data.files
        res.status(200).json({ files })
    } catch (error) {
        console.error('Error in /files/list:', error.message)
        res.status(500).json({ message: 'Error fetching file list' })
    }
})

app.get('/files/data', async (req, res) => {
    const { fileName } = req.query
    if (!fileName) {
        return res.status(400).json({ message: 'Param fileName is required' })
    }

    try {
        const filesResponse = await axios.get(`${API_URL}/files`, API_AUTH)
        const files = filesResponse.data.files

        if (!files.includes(fileName)) {
            return res.status(404).json({ message: `File name not found` })
        }

        const fileResponse = await axios.get(`${API_URL}/file/${fileName}`, API_AUTH)
        const parsedData = processCSV(fileResponse.data)
        res.status(200).json({ file: fileName, lines: parsedData })
    } catch (error) {
        console.error('Error in /files/data:', error.message)
        res.status(500).json({ message: 'Error processing file data' })
    }
})

function processCSV(content) {
    const lines = content.split('\n').slice(1)
    const formattedLines = []
    lines.forEach((line) => {
        const [file, text, number, hex] = line.split(',')
        if (file && text && number && hex) {
            formattedLines.push({ text, number: parseInt(number, 10), hex })
        }
    })
    return formattedLines
}

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
}

module.exports = app