const express = require("express")
const server = express()
const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT
const dbEmp = require("./connectionDB")

server.use(express.json())

server.get('/employees', dbEmp.getEmployees)
server.get('/employee/:id', dbEmp.getEmployeeById)
server.post('/addEmp', dbEmp.createEmployee)
server.put('/updateEmployee/:id', dbEmp.updateEmployee)
server.delete('/deleteEmployee/:id', dbEmp.deleteEmployee)

server.listen(PORT, () => {
    console.log(`server is started on port ${PORT}`)
})
