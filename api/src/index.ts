import dotenv from 'dotenv'
import { createServer } from './http/server'

dotenv.config()

const app = createServer()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`[HTTP] Server running on http://localhost:${PORT}`)
})
