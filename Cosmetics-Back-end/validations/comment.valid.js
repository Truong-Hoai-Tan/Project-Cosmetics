const joi = require('joi');

const commentSchema = joi.object({
  content: joi
    .string()
    .min(10)
    .message('Tên Quá Ngắn')
    .max(30)
    .message('Tên Quá Dài')
    .required(),
  start: joi.string().required(),
  account: joi.string().required(),
  createdAt: joi.date(),
});
function commentValid(comment) {
  return commentSchema.validate(comment);
}
module.exports = commentValid;
