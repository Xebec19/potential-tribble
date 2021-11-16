import express,{ Request, Response } from "express"
const app = express()
const port = process.env.PORT || 4002

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})