import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as hootService from "../../services/hootService";
import AuthorInfo from "../AuthorInfo/AuthorInfo";
import CommentForm from "../CommentForm/CommentForm";

const HootDetails = (props) => {
  const { hootId } = useParams();
  const { user } = useContext(UserContext);
  const [hoot, setHoot] = useState();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchHoot = async () => {
      try {
        setStatus("loading");
        const hootData = await hootService.show(hootId);
        setHoot(hootData);
        setStatus("done");
      } catch (error) {
        setStatus("error");
        setMessage(error.message);
      }
    };
    fetchHoot();
  }, [hootId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootId, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
  };

  if (!hoot) return;

  if (status === "loading") {
    return <progress />;
  }

  if (status === "error") {
    return (
      <main>
        <p>{message}</p>
      </main>
    );
  }

  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>
          <h1>{hoot.title}</h1>
          <Outlet />
          <p>
            {`${hoot.author.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>
          {hoot.author._id === user._id && (
            <>
              <Link to={`/hoots/${hootId}/edit`}>Edit</Link>
              <button onClick={() => props.handleDeleteHoot(hootId)}>
                Delete
              </button>
            </>
          )}
        </header>
        <p>{hoot.text}</p>
      </section>
      <section>
        <h2>Comments</h2>

        <Link to="comments/new">
          <button>Add Comments</button>
        </Link>

        <CommentForm handleAddComment={handleAddComment} />

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <AuthorInfo content={comment} />
              {/* <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p> */}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
