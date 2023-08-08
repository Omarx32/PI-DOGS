const allowedUsers = require("../utils/allowedUsers");
const { User } = require("../DB_connection");
const { Op } = require("sequelize");

function login(req, res) {
  const { email, password } = req.query;
  let access = false;

  allowedUsers.forEach((user) => {
    if (user.email === email && user.password === password) {
      access = true;
    }
  });

  return res.json({ access }); 
}
