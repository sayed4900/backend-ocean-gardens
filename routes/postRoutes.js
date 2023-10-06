const express = require("express");
const upload = require("../middleware/multer");

const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");


const router = express.Router();

router.get('/', postController.getAllPosts)
router.get("/:id",authController.protect, postController.getPost);
router.post("/creatPost", upload.single('file') ,authController.protect, postController.makePost);
// likes
router.put(
    "/updateLikes/:id",
    authController.protect,
    postController.updateLikes
);
router.put(
    "/updateFavourites/:id",
    authController.protect,
    postController.updateFavourities
);

router.delete('/deletePost/:id',authController.protect, postController.deletePost)


module.exports = router;
