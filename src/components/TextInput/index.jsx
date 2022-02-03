import "./styles.css";

export const TextInput = ({ searchString, handleChange }) => {
  return (
    <input
      className="text-input"
      placeholder={"Search..."}
      type="search"
      onChange={handleChange}
      value={searchString}
    />
  );
};
