const teamRouter = require("express").Router();
const { Team } = require('../../db/models')

teamRouter.get("/", async (req, res) => {
    try {
        const team = await Team.findAll()
        res.status(200).json(team)
    } catch (error) {
        console.log('Ошибка teamRouter team', error)
        res.sendStatus(500)
    }
});

teamRouter.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        const lawyer = await Team.findByPk(id)
        if (!lawyer) res.status(400).send('Такого адвоката нет')
        res.status(200).json(lawyer)
    } catch (error) {
        console.log('Ошибка teamRouter team', error)
        res.sendStatus(500)
    }
});

module.exports = teamRouter;