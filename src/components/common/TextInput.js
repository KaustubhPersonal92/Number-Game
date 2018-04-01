import React, {PropTypes} from 'react';

const TextInput = ({id,name, label, onChange,onSelect, disabled, placeholder, type, value, error, iconClass, labelName, iconClass2, spanClass}) => {
  let wrapperClass = 'form-group input-group  ';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <span className={spanClass}><i className={iconClass +' '+ iconClass2}></i></span>
      <label>{labelName}</label>
      <input
        id = {id}
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <div className="help-block">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};

TextInput.defaultProps = {
  type: 'text'
}

export default TextInput;
