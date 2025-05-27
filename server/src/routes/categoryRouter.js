const categoryRouter = require("express").Router();
const { Category, Project } = require('../../db/models')

categoryRouter.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: {
                model: Project,
                as: "categories",     
            }
        });
        res.status(200).json(categories)
    } catch (error) {
        console.log('Ошибка categoryRouter team', error)
        res.sendStatus(500)
    }
});

module.exports = categoryRouter;

