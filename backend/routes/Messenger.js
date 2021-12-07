const router = require("express").Router();

const createConversationController = require("../controller/Messenger/createConversation");
const getConversationController = require("../controller/Messenger/getConversation");
const createMessageController = require("../controller/Messenger/createMessage");
const getMessageController = require("../controller/Messenger/getMessage");

router.post("/createconversation", createConversationController);
router.get("/getconversation/:userId", getConversationController);
router.post("/createmessage", createMessageController);
router.get("/getmessage/:conversationId", getMessageController);

module.exports = router;
