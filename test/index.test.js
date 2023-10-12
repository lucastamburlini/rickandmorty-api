const app = require("../src/app");
const session = require("supertest");
const agent = session(app)

describe("Route test", () => {

    describe('GET /rickandmorty/character/:id', () => {
        it('Responds with status: 200', async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        })

        it('Responds to an object with the properties: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await agent.get('/rickandmorty/character/1');
            expect(response.body).toHaveProperty("id", "name", "species", "gender", "status", "origin", "image");
        });

        it('If there is an error, respond with status: 500', async () => {
            await agent.get('/rickandmorty/character/none').expect(500);
        })
    })

    describe("GET /rickandmorty/login", () => {
        it("Correct information: most return: { access: true }", async () => {
            const { body } = await agent.get("/rickandmorty/login/?email=ejemplo@gmail.com&password=hola1234*")
            expect(body.access).toEqual(true)
        })

        it("Incorrect information: most return: { access: false }", async () => {
            const { body } = await agent.get("/rickandmorty/login/?email=correoincorrecto@gmail.com&password=contraseniaincorrecta")
            expect(body.access).toEqual(false)
        })
    })

    describe("POST /rickandmorty/fav", () => {
        const testCharA = { id: 1, name: "test A" }
        const testCharB = { id: 2, name: "test B" }

        it("Returns an array with the information sent", async () => {
            const { body } = await agent.post("/rickandmorty/fav").send(testCharA)
            expect(body).toContainEqual(testCharA)
        })

        it("Returns an array with all characters", async () => {
            const { body } = await agent.post("/rickandmorty/fav").send(testCharB)
            expect(body).toContainEqual(testCharA)
            expect(body).toContainEqual(testCharB)
        })
    })

    describe("DELETE /rickandmorty/fav/:id", () => {
        const testCharA = { id: 1, name: "test A" }
        const testCharB = { id: 2, name: "test B" }

        it("If the character is not deleted, the same array is returned", async () => {
            const { body } = await agent.delete("/rickandmorty/fav/3312")
            expect(body).toContainEqual(testCharA)
            expect(body).toContainEqual(testCharB)
        })
    })


})



