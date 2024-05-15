const joi = require('joi');

const accountSchema = joi.object({
  name: joi
    .string()
    .min(8)
    .message('Tên Quá Ngắn')
    .max(30)
    .message('Tên Quá Dài')
    .required(),
  img: joi.string(),
});
function categoryValid(category) {
  return accountSchema.validate(category);
}
module.exports = categoryValid;
