import React, {PropTypes} from 'react';
import NumberListRow from './NumberListRow';

const NumberList = ({numberList}) => {
  return (
    <table className="table table-bordered" align="center">
      <thead>
      <tr>
        <th className="text-center">Sorted Array Result</th>
      </tr>
      </thead>
      <tbody>
      {numberList.map(numberList =>
        <NumberListRow numberList={numberList} />
      )}
      {numberList.length == 0 &&
        <tr><td className="valign-center" colSpan="6">Data not found</td> </tr>
      } 
      </tbody>
    </table>
  );
};

NumberList.propTypes = {
  numberList: PropTypes.array.isRequired
};

export default NumberList;
