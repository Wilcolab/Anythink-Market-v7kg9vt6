/**
 * @route GET /:postId
 * @description Get all comments for a specific post, sorted by creation date (newest first).
 * @param {string} req.params.postId - The ID of the post to retrieve comments for.
 * @returns {Object[]} 200 - An array of comment objects.
 * @returns {Object} 500 - Internal server error.
 */

/**
 * @route DELETE /:commentId
 * @description Delete a comment by its ID.
 * @param {string} req.params.commentId - The ID of the comment to delete.
 * @returns {Object} 200 - Success message if the comment was deleted.
 * @returns {Object} 404 - Error message if the comment was not found.
 * @returns {Object} 500 - Internal server error.
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add another endpoint for deleting a comment
router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}); 