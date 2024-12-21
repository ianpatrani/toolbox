# CLI

# Install dependencies (use --force for macOS):
   ```bash
   npm install -f
   ```
# Server
 ```bash
   node app.js
   ```

#  Dev:
   ```bash
   npm start
   ```

#  Lint:
   ```bash
   npm run lint
   ```

#  Test:
   ```bash
   npm test
   ```

# API

# **List files:**
   ```http
   GET /files/list
   ```

# **List files by fileName param:**
   ```http
   GET /files/data?fileName={fileName}
   ```
