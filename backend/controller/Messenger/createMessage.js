const Message = require("../../models/Message");

const createMessageController = async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    sender: req.body.senderId,
    text: req.body.text,
  });
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = createMessageController;
