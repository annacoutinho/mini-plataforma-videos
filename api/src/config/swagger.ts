import { Express } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yaml'

export function setupSwagger(app: Express) {
  const file = fs.readFileSync(
    path.join(process.cwd(), 'src', 'openapi', 'openapi.yaml'),
    'utf8'
  )
  const spec = YAML.parse(file)

  app.get('/docs.json', (_req, res) => res.json(spec))
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }))
}
