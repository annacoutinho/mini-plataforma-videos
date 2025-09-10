import fs from 'fs/promises'
import path from 'path'

const DATA_FOLDER = path.join(process.cwd(), 'src', 'data')

export async function loadJsonFile<DataType>(
  fileName: string,
  defaultValue: DataType
): Promise<DataType> {
  try {
    const filePath = path.join(DATA_FOLDER, fileName)
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const parsedData = JSON.parse(fileContent) as DataType
    return parsedData
  } catch {
    console.log(`Não foi possível carregar ${fileName}, usando valor padrão`)
    return defaultValue
  }
}

export async function saveJsonFile<DataType>(
  fileName: string,
  data: DataType
): Promise<void> {
  try {
    const filePath = path.join(DATA_FOLDER, fileName)
    await fs.mkdir(DATA_FOLDER, { recursive: true })
    const formattedData = JSON.stringify(data, null, 2)
    await fs.writeFile(filePath, formattedData, 'utf-8')
    console.log(`Arquivo ${fileName} salvo com sucesso`)
  } catch (error) {
    console.error(`Erro ao salvar ${fileName}:`, (error as Error).message)
    throw error
  }
}

export async function fileExists(fileName: string): Promise<boolean> {
  try {
    const filePath = path.join(DATA_FOLDER, fileName)
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
