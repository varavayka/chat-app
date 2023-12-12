
const messengerHandler = async (req, res) => {
  console.log(req)
  await wsSerever()
}

module.exports = messengerHandler;
