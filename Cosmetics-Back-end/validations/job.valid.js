const joi = require('joi');

const accountSchema = joi.object({
  name: joi
    .string()
    .min(2)
    .message('Tên Quá Ngắn')
    .max(20)
    .message('Tên Quá Dài')
    .required(),
  detail: joi
    .string()
    .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
    .message('Password không hợp lệ')
    .required(),
  status: joi
    .string()
    .min(3)
    .message('Tên Không hợp lệ')
    .max(40)
    .message('Tên Quá Dài')
    .required(),
  dob: joi.string().required(),
  phone: joi.string().min(9).max(11).required(),
});
function accountValid(account) {
  return accountSchema.validate(account);
}
module.exports = accountValid;
