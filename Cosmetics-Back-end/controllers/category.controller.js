const categoryModel = require('../model/category.model');
const categoryValid = require('../validations/category.valid')

module.exports = {
  creatCategory: async (req, res, next) => {
    const body = req.body;
    // const file = req.file;
    const { error, value } = categoryValid(body)
    if (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.message,
      });
    }
    // body.img = file.filename
    const newCategory = await categoryModel.create(body);
    return res.status(201).json(newCategory);
  },
  getCategory: async (req, res, next) => {
    const getCate = await categoryModel.find();
    return res.status(200).json(getCate);
  },
  updateCategory: async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const updateCate = await categoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updateCate);
  },
  deleteCategory: async (req, res, next) => {
    const id = req.params.id;
    const deleCate = await categoryModel.findByIdAndDelete(id);
    return res.status(200).json(deleCate);
  },
};
