import P from 'prop-types';
import './styles.css';

export const TextInput = ({ searchString, handleChange }) => {
  return (
    <input
      className="text-input"
      placeholder={'Search...'}
      type="search"
      onChange={handleChange}
      value={searchString}
    />
  );
};

TextInput.propTypes = {
  searchString: P.string.isRequired,
  handleChange: P.func.isRequired,
};
