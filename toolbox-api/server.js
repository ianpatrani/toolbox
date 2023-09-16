const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;

// Utilizo cors para que no falle las peticiones
app.use(cors());

// Defino una instancia de axios para no repetir codigo innecesariamente
const axiosWithAuth = axios.create({
  baseURL: "https://echo-serv.tbxnet.com",
  headers: {
    Authorization: "Bearer aSuperSecretKey",
  },
});

app.get("/files/data", async (req, res) => {
  try {
    // Recupero el listado de archivos
    const fileListResponse = await axiosWithAuth.get("/v1/secret/files");

    const fileList = fileListResponse.data.files;

    const formattedData = [];

    for (const file of fileList) {
      try {
        // De cada archivo recuperado descarga el contenido
        const fileResponse = await axiosWithAuth.get(`/v1/secret/file/${file}`);

        const fileData = fileResponse.data;
        // Se hace un split para poder capturar cada línea
        const lines = fileData.split("\n");

        for (const line of lines) {
          const parts = line.split(",");
          // Evaluo que la línea tenga los 4 campos pedidos
          if (parts.length === 4) {
            // Con trim saco espacios en blanco
            const [file, text, number, hex] = parts.map((part) => part.trim());

            // Evaluo que no tengan el mismo key/valor
            if (
              file &&
              text &&
              number &&
              hex &&
              file !== "file" &&
              text !== "text" &&
              number !== "number" &&
              hex !== "hex"
            ) {
              formattedData.push({
                file,
                text,
                number: parseInt(number),
                hex,
              });
            }
          }
        }
      } catch (error) {
        console.error(`Error al capturar el archivo ${file}: ${error.message}`);
      }
    }

    res.json(formattedData);
  } catch (error) {
    console.error(`Error al capturar el listado de archivos: ${error.message}`);
    res
      .status(500)
      .json({ error: "Error en el servidor al capturar listado de archivos" });
  }
});

app.listen(port, () => {
  console.log(`Api running on port ${port}`);
});

module.exports = app;
