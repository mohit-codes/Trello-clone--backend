const { ALLOWED_DOMAINS } = require("./constants");

function checkDomainAccess(origin) {
  return ALLOWED_DOMAINS.some((domain) => origin.includes(domain));
}

const corsOptions = {
  origin: function (origin, callback) {
    if (checkDomainAccess(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = { corsOptions };
