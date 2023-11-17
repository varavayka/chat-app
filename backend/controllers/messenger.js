
const messengerHandler = (req, res) => {
  return res.status(200).json({authorization:true, message:'success'})
}

module.exports = messengerHandler;
