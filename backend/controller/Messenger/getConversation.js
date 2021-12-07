const Conversation = require("../../models/Conversation");

const getConversationController = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = getConversationController;
