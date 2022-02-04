import './styles.css';
import P from 'prop-types';

export const PostCard = ({ title, id, body, cover }) => {
  return (
    <div className="post">
      <img src={cover} alt={title} />
      <div className="post-content">
        <h2>
          {id}: {title}
        </h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  id: P.number.isRequired,
  cover: P.string.isRequired,
  title: P.string.isRequired,
  body: P.string.isRequired,
};
