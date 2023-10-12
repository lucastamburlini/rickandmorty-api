const { Favorite } = require("../DB_connection")

const postFav = async (req, res) => {
    try {
        const { id, name, origin, status, image, species, gender } = req.body;
        if (!id || !name || !origin || !status || !image || !species || !gender) return res.status(401).send("Missing data");

        await Favorite.findOrCreate({ where: { id: id, name: name, origin: origin, status: status, image: image, species: species, gender: gender } })

        const allFavorites = await Favorite.findAll()
        return res.json(allFavorites)

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}
module.exports = postFav
