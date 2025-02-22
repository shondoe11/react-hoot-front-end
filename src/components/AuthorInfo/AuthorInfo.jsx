const AuthorInfo = ({ content }) => {
  return (
    <div>
      <img alt="The user's avatar" />
      <section>
        <p>{content.author.username}</p>
        <div>
          <p>{new Date(content.createdAt).toLocaleDateString()}</p>
        </div>
      </section>
    </div>
  );
};

export default AuthorInfo;
