const Message = require("../../models/Message");

const getMessageController = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = getMessageController;
