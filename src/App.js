import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Column from './components/Column';
import CreateModal from './components/CreateModal';
import {Button} from 'reactstrap';
function App() {

  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState(['to do', 'in progress', 'review', 'done']);
  const [priorities, setPriorities] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]);

  const createTask = (newTask) => {
    axios.post(`http://localhost:3000/tasks`, newTask)
      .then(res =>
      getTasks()
      )
      .catch(error => alert (`Couldn't create a new task`)
      )
  }
  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
      .then((res) =>
        getTasks()
      )
      .catch((error) =>
        alert('Error! Task was not deleted')
      )
  }
  const changeTaskStatus = (task, direction) => {
    const newStatusesStringArray = statuses.map((status) => status.status); /*used to be status.name*/
    const currentStatusIndex = newStatusesStringArray.indexOf(task.status);
    const newStatusIndex = currentStatusIndex + (direction === 'right' ? +1 : -1);
    const newStatus = newStatusesStringArray[newStatusIndex];
    axios.patch(`http://localhost:3000/tasks/${task._id}`, {status: newStatus})
      .then((res) =>
        getTasks()
      )
      .catch((error) =>
        alert('Error! Task status was not changed')
      )
  }
/*  const changePriority = (id, priority) => {
    axios.patch(`http://localhost:3000/tasks/${id}`, {priority})
      .then(res =>
        getTasks()
      )
      .catch((error) =>
        console.log(error)
      )
  }*/
  const getTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then((res) =>
        setTasks(res.data)
      )
      .catch((error) =>
        console.log(error)
      )
  }

  const getStatuses = () => {
    axios.get('http://localhost:3000/statuses')
      .then((res) =>
        setStatuses(res.data)
      )
      .catch((error) =>
        console.log(error)
      )
  }

  const changeTask = (updatedTask, id) => {
    axios.patch(`http://localhost:3000/tasks/${id}`, updatedTask)
      .then((res) =>
        getTasks()
      )
      .catch( (error) => {
        alert(`Error! Task wasn't updated`);
      })
  }

  const createStatus = (newStatus) => {
     axios.post('http://localhost:3000/statuses', newStatus)
       .then(function (response) {
         getStatuses();
       })
       .catch( (error) => {
         console.log(error);
       })
       .finally(function () {
         console.log('done');
       });
   }

/*   const postStatusesFromServer = () => {
     axios.post('http://localhost:3000/statuses', { name: 'to do'})
       .then(function (response) {
         console.log(response);
       })
       .catch( (error) => {
         console.log(error);
       })
       .finally(function () {
         console.log('status request done');
       });
   }*/

   useEffect(() => {
     getStatuses();
     /*postStatusesFromServer();*/
     getTasks();
   }, [])

/*console.log(tasks)*/
  return (
    <div className="App">
      <h1>Kanban Board</h1>
      < CreateModal
        statuses = {statuses}
        priorities = {priorities}
        createTask = {createTask}
      />
      <div className="container text-center">
        <div className="row align-items-start">
          {statuses.map((status) =>
            <Column status = {status}
                    tasks = {tasks}
                    key = {status._id}
                    changeTask = {changeTask}
                    priorities = {priorities}
                    changeTaskStatus = {changeTaskStatus}
                    deleteTask = {deleteTask}
                    statuses = {statuses}
                    /*changePriority = {changePriority}*/
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
