const categoryBigModel = require('../model/categoryBig.model');
const categoryValid = require('../validations/category.valid')

module.exports = {
  creatCategoryBig: async (req, res, next) => {
    const body = req.body;
    const newCategoryBig = await categoryBigModel.create(body);
    return res.status(201).json(newCategoryBig);
  },
  getCategoryBig: async (req, res, next) => {
    const getCateBig = await categoryBigModel.find();
    return res.status(200).json(getCateBig);
  },
  updateCategoryBig: async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const updateCateBig = await categoryBigModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updateCateBig);
  },
  deleteCategoryBig: async (req, res, next) => {
    const id = req.params.id;
    const deleCateBig = await categoryBigModel.findByIdAndDelete(id);
    return res.status(200).json(deleCateBig);
  },
};