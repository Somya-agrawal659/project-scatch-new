const multer = require('multer');

//here memory is the RAM
const storage = multer.memoryStorage();
const upload = multer({storage:storage})
module.exports = upload;
