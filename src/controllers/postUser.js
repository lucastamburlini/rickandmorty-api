const { User } = require("../DB_connection")

const postUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("Missing data")
        const response = await User.findOrCreate({ where: { email: email, password: password } })
        return res.json(response)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports = postUser