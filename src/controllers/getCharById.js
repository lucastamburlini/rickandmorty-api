const URL = "https://rickandmortyapi.com/api/character"
const axios = require("axios")

const getCharById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios(`${URL}/${id}`);
        const { data } = response;

        if (data) {
            const character = {
                id: data.id,
                name: data.name,
                status: data.status,
                species: data.species,
                type: data.type,
                gender: data.gender,
                origin: data.origin?.name,
                location: data.location?.name,
                image: data.image,
            };
            res.status(200).json(character)
        } else {
            res.status(404).send('Character not found');
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getCharById
}

/* const getCharById = (req, res) => {
    const { id } = req.params
    axios(`${URL}/${id}`)
        .then((response) => response.data)
        .then(({ id, status, name, species, origin, image, gender }) => {
            if (name) {
                const character = {
                    id,
                    status,
                    name,
                    species,
                    origin,
                    image,
                    gender
                }
                res.status(200).json(character)
            } else {
                res.status(404).send('Character not found');
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(error.message);
        });
} */



/* const axios = require("axios")

const getCharById = (res, id) => {

    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
        .then((response) => response.data)
        .then((data) => {
            const character = {
                id: data.id,
                name: data.name,
                gender: data.gender,
                species: data.species,
                origin: data.origin?.name,
                image: data.image,
                status: data.status
            }

            return res
                .writeHead(200, { "Content-type": "application/json" })
                .end(JSON.stringify(character))
        })
        .catch(error => {
            return res
                .writeHead(500, { "Content-type": "text/plain" })
                .end(error.message)
        })
}


module.exports = { getCharById } */

