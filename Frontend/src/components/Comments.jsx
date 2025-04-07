import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "sonner";
import { FaUser } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";

function Comments() {
  const { id } = useParams();
  const { user, luser } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const MAX_CHARACTERS = 200;
  const displayedComments = showAll ? comments : comments.slice(0, 4);

  const toggleReadMore = (commentId) => {
    setReadMore((prevStates) => ({
      ...prevStates,
      [commentId]: !prevStates[commentId],
    }));
  };

  useEffect(() => {
    if (!id) return;

    axios
      .get(`/placeComments/${id}`)
      .then((response) => {
        const { data } = response;
        if (data.comments) {
          setComments(data.comments);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error fetching Reviews.");
      });
  }, [id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) {
      toast.error("review cannot be empty.");
      return;
    }

    if (user || luser) {
      try {
        await axios.post("/postComment", {
          newComment,
          id,
        });
        const response = await axios.get(`/placeComments/${id}`);
        setComments(response.data.comments);
        setNewComment("");
        toast.success("Review posted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error posting the review.");
      }
    } else {
      toast.error("You must be logged in to post a Review.");
    }
  };

  const handleDelete = async (commentId) => {
    // console.log(commentId)
    try {
      await axios.delete("/comment/" + commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      toast.success("Review deleted succesfully");
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting the review");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-medium mb-6 text-gray-800">⭐Reviews</h2>

      <div className="mb-6">
        <textarea
          className=" resize-none w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          rows="1"
          placeholder="Write a Review..."
          value={newComment}
          onChange={(ev) => setNewComment(ev.target.value)}
        ></textarea>
        <button
          className="mt-4 px-6 py-2 bg-primary text-white font-medium rounded-lg transition"
          onClick={handlePostComment}
        >
          Post Review
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {displayedComments.length > 0 ? (
          displayedComments.map((comment) => {
            const isLongComment = comment.comment.length > MAX_CHARACTERS;

            return (
              <div
                key={comment._id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {comment.owner?.picture ? (
                      <img
                        className="h-7 w-7 rounded-full object-cover"
                        src={comment.owner.picture}
                        alt="img"
                      />
                    ) : (
                      <FaUser className="text-gray-600" />
                    )}
                    <p className="text-lg font-semibold text-gray-700 capitalize">
                      {comment.owner?.name || "Anonymous"}
                    </p>
                  </div>
                  <div>
                    {(user?.name === comment.owner?.name ||
                      luser?.name === comment.owner?.name) && (
                      <FaTrashAlt
                        onClick={() => handleDelete(comment._id)}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mt-1">
                    {comment?.createdAt
                      ? formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })
                      : "Unknown time"}
                  </p>
                </div>

                <p>
                  {readMore[comment._id] || !isLongComment
                    ? comment.comment
                    : `${comment.comment.slice(0, MAX_CHARACTERS)}...`}
                </p>
                {isLongComment && (
                  <p
                    onClick={() => toggleReadMore(comment._id)}
                    className="text-gray-500 cursor-pointer underline hover:text-black"
                  >
                    {readMore[comment._id] ? "Read less" : "Read more"}
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No Reviews yet. Be the first to Review!
          </p>
        )}

        {/* Show More Button */}
        {comments.length > 4 && (
          <div className="col-span-full flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
