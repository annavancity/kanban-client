import React from 'react';
import DeleteModal from './DeleteModal';

const Card = ({task, /*changePriority,*/ statuses, changeTask, priorities, changeTaskStatus, deleteTask }) => {
  return (
    <div className="card mt-3">
      <h5 className= "card-header">{task.name}</h5>
      <div className="card-body">
        <h5 className="card-title">{task.description}</h5>
        <p className="card-text">{task.status}</p>
        <p className="card-text">Priority: {task.priority}
          {' '}
          <button
            onClick={() => changeTask({priority: task.priority + 1}, task._id)}
            disabled={task.priority === priorities[priorities.length - 1] }
            type="button" className="btn btn-primary btn-sm"
          >↑
          </button>
          {' '}
          <button
            onClick={() => changeTask({priority: task.priority - 1}, task._id)}
            disabled={task.priority === priorities[0]}
            type="button" className="btn btn-primary btn-sm"
          >↓
          </button>
        </p>

        <button
          onClick={() => changeTaskStatus(task, 'left')}
          disabled={statuses[0].title === task.status}
          type="button" className="btn btn-outline-primary btn-sm mt-2"
        >←
        </button>
        {' '}
        <button type="button" className="btn btn-outline-primary btn-sm mt-2">Update
        </button>
        {' '}
        <button
          onClick={() => changeTaskStatus(task, 'right')}
          disabled={statuses[statuses.length - 1].title === task.status}
          type="button" className="btn btn-outline-primary btn-sm mt-2"
        >→
        </button>
        < DeleteModal
          task = {task}
          deleteTask = {deleteTask}
        />
      </div>
    </div>
  );
};

export default Card;