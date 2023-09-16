# Documentation

Documentacion para consumir y testear la API

## Rutas de la API

### Listar Archivos

- **Descripción:** Esta ruta devuelve una lista de archivo

- **Método:** GET

- **Ruta:** `/files/data`

- **Respuesta Exitosa (200 OK):**

  - Formato de respuesta: JSON
  - Estructura de respuesta:
    ```json
    {{
    "file": "test2.csv",
    "text": "yaKrItTIyEyOlmepTkvKkNhkqzeLW",
    "number": 9660704741,
    "hex": "6b5238a3854fb1339d84910edb15b459"
    },
    {
    "file": "test2.csv",
    "text": "yaKrItTIyEyOlmepTkvKkNhkqzeLW",
    "number": 9660704741,
    "hex": "6b5238a3854fb1339d84910edb15b459"
    },
    ...
    }
    ```

## Test ejecution

Para ejecutar las pruebas:

1. Instalar Node.js.

2. Instalar las dependencias de la API:

   ```bash
   npm install
   ```

3. Correr el comando test

   ```
   npx mocha .\tests\test.js
   ```
