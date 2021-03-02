const express = require("express"),
  usersRouter = new express.Router(),
  usersCtrl = require("../../controllers/users/users"),
  verifyToken = require("../../utils/serverAuth").verifyToken;

usersRouter.route("/").get(usersCtrl.index).post(usersCtrl.create);

usersRouter.post("/authenticate", usersCtrl.authenticate);

usersRouter.use(verifyToken);
usersRouter
  .route("/:id")
  .get(usersCtrl.show)
  .patch(usersCtrl.update)
  .delete(usersCtrl.destroy);

module.exports = usersRouter;
