import React from 'react';
import { useHistory } from 'react-router-dom';

const TopBar = ({ home }) => {
  let history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const goHome = () => {
    history.push(`${home}`);
  };

  return (
    <div className='row' style={{ marginTop: '20px' }}>
      <div className='col s6 l6 left-align'>
        <button
          className='btn waves-effect waves-light white text-primary'
          onClick={goBack}
        >
          <i class='material-icons '>arrow_back</i>
        </button>
      </div>
      <div className='col s6 l6 right-align'>
        {home !== '' && (
          <button
            class='btn waves-effect waves-light white text-primary'
            onClick={goHome}
          >
            <i class='material-icons'>home</i>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
