const joi = require('joi');

const productSchema = joi.object({
  name: joi
    .string()
    .min(5)
    .message('Tên Quá Ngắn')
    .max(100)
    .message('Tên Quá Dài')
    .required(),
  img: joi.string().required(),
  price: joi.string(),
  description: joi.string(),
  status: joi.string()
});
function productValid(product) {
  return productSchema.validate(product);
}
module.exports = productValid;
