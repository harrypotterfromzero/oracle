const { Router } = require("express");
const router = Router();
const Config = require("../public/js/config");

router.get("/", async (req, res) => {
  sql = "select * from CONTCTSM1 where CONTACT_NAME like 'CONH%'";
  let result = await Config.Open(sql, [], false);
  Users = [];
  result.rows.map((user) => {
    let userSchema = {
      "contactName": user[0],
      "fullName": user[85],
      "trungTam": user[4],
      "phongBan": user[82]
    };
    Users.push(userSchema);
  });
//   console.log(result);
  console.log(Users);
  res.render("contacts",{
    Users:Users
  })

});

//CREATE

router.post("/addUser", async (req, res) => {
  const { username, firstname, lastname } = req.body;

  sql =
    "insert into person(username,firstname,lastname) values (:username,:firstname,:lastname)";

  await Config.Open(sql, [username, firstname, lastname], true);

  res.status(200).json({
    username: username,
    firstname: firstname,
    lastname: lastname,
  });
});

//UPDATE
router.put("/updateUser", async (req, res) => {
  const { codu, username, firstname, lastname } = req.body;

  sql =
    "update person set username=:username, firstname=:firstname, lastname=:lastname where codu=:codu";

  await Config.Open(sql, [username, firstname, lastname, codu], true);

  res.status(200).json({
    codu: codu,
    username: username,
    firstname: firstname,
    lastname: lastname,
  });
});

//DELETE
router.delete("/deleteUser/:codu", async (req, res) => {
  const { codu } = req.params;

  sql = "update person set state=0 where codu=:codu";

  await Config.Open(sql, [codu], true);

  res.json({ msg: "Usuario Eliminado" });
});

module.exports = router;
