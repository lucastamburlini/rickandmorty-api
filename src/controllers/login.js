const { User } = require("../DB_connection")

const login = async (req, res) => {
    try {
        const { email, password } = req.query;
        if (!email || !password) return res.status(400).send("Missing data");
        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(404).json({ error: "User not found" });


        return user.password === password
            ? res.json({ access: true })
            : res.status(403).send("Incorrect password")

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = login