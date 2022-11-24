const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.user,
    host: "localhost",
    database: "Node-APi",
    password: process.env.password,
    port: 5001
})

const createEmployee = (req, res) => {
    const { name, email } = req.body

    pool.query(
        "INSERT INTO employes (name, email) VALUES ($1, $2) RETURNING *",
        [name, email],
        (err, result) => {
            if (err) {
                console.log(err)
                throw err
            }
            res.status(200).json({
                msg: "successfully created",
                data: result.rows[0]
            })
        }
    )
}

const getEmployees = (req, res) => {
    pool.query("SELECT * FROM employes", (err, result) => {
        if (err) {
            console.log(err)
            throw err
        }
        res.status(200).json({
            data: result.rows
        })
    })
}

const getEmployeeById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query("SELECT * FROM employes WHERE id = $1", [id], (err, result) => {
        if (err) {
            console.log(err)
            throw err
        }
        res.status(200).json({
            data: result.rows
        })
    }
    )
}

const updateEmployee = (req, res) => {
    const { name, email } = req.body
    const id = parseInt(req.params.id)
    pool.query("UPDATE employes SET name = $1, email = $2 WHERE id = $3", [name, email, id], (err, result) => {
        if (err) {
            console.log(err)
            throw err
        }
        res.status(200).json({
            msg: "updated successfully"
        })
    })
}

const deleteEmployee = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query("DELETE FROM employes WHERE id = $1", [id], (err, result) => {
        if (err) {
            console.log(err)
            throw err
        }
        res.status(200).json({
            msg: "deleted successfully"
        })
    })
}

module.exports = {
    createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee
}