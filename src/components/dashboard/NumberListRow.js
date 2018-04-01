import React, {PropTypes} from 'react';

const NumberListRow = ({numberList}) => {
  console.log("numberList---", numberList)  
  return (
    <tr>
      <td>{numberList}</td>
    </tr>
  );

};

export default NumberListRow;

