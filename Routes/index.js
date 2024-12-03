const express = require("express");
const router = new express.Router();
const leaderBoardController = require("../Controllers/leaderBoardController");
const User = require("../Models/users");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkJwt = jwt({
 // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
 secret: jwksRsa.expressJwtSecret({
  issuerBaseURL: `https://dev-2szf794g.us.auth0.com/`,
  cache: true,
  rateLimit: true,

  jwksRequestsPerMinute: 5,
  jwksUri: `https://dev-2szf794g.us.auth0.com/.well-known/jwks.json`,
 }),

 // Validate the audience and the issuer

 audience: "http://localhost:6000", //replace with your API's audience, available at Dashboard > APIs
 issuer: "https://dev-2szf794g.us.auth0.com/",
 algorithms: ["RS256"],
});

router.get("/:id", checkJwt, leaderBoardController.getUser);
router.get("/", checkJwt, leaderBoardController.getAllUser);
router.patch("/update/:id", checkJwt, async (req, res) => {
 try {
  const user = await User.findById(req.params.id);
  const updates = Object.keys(req.body);
  console.log(updates);
  updates.forEach((update) => (user[update] = req.body[update]));
  await user.save();
  console.log(req.body);
  res.json(user);
 } catch (err) {
  res.status(400).send(err.message);
 }
});

// router.get("/auth", checkJwt);

// router.post("/add", leaderBoardController.createUser);
// router.patch("/user/:id", leaderBoardController.updateUser);
// router.delete("/user/:id", leaderBoardController.removeUser);

module.exports = router;
