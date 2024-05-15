const ErrorReponse = require('../helpers/ErrorReponse');

module.exports = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.account.role)) {
      throw new ErrorReponse(403, 'Không Có Quyền Truy Cập');
    }
    next();
  };
};
