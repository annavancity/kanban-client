import React from 'react';
import Card from './Card';

const Column = ({status, tasks}) => {
  return (
    <div className="col">
      <h2>{status}</h2>
      {tasks.filter((task) => task.status === status).map((task) =>
        < Card task = {task}/>
      )}
      <p></p>
    </div>
  );
};

export default Column;