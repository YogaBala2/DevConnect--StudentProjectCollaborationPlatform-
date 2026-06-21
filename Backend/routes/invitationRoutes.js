const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getMyInvitations,
  acceptInvitation,
  declineInvitation,
} = require("../controllers/invitationController");

router.get(
  "/my",
  protect,
  getMyInvitations
);

router.put(
  "/accept/:id",
  protect,
  acceptInvitation
);

router.put(
  "/decline/:id",
  protect,
  declineInvitation
);

module.exports = router;