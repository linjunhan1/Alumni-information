const multer = require('koa-multer')
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 设置文件的存储目录，需提前创建
    cb(null, './public/LeaveMessageImg')
  },
  filename(req, file, cb) {
    // 设置 文件名
    const name = file.originalname
    // 设置文件的后缀名，
    //我这里取的是上传文件的originalname属性的后四位，
    // 即： .png，.jpg等，这样就需要上传文件的后缀名为3位
    const extension = name.substring(name.length - 4)
    cb(null, 'img-' + Date.now() + extension)
  }
})

const upload = multer({ storage: storage })

module.exports = upload
