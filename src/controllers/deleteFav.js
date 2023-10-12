const {Favorite} = require('../DB_connection');

const deleteFav = async (req, res) => {
    try {

        const { id } = req.params
        console.log("ID recibido:", id);
        await Favorite.destroy({ where: { id } })


        const allFavorites = await Favorite.findAll()
        return res.status(200).json(allFavorites)

    } catch (error) {
        console.error("Error en deleteFav:", error);
        return res.status(500).json({ error: error.message })
    }
}
module.exports = deleteFav