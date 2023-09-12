import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Column from './components/Column';
function App() {

  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState(['to do', 'in progress', 'review', 'done'])

  const getTasks = () => {
    axios.get('http://localhost:3000/tasks')
      .then((res) =>
        setTasks(res.data)
      )
      .catch((error) =>
        console.log(error)
      )
  }
  const getExampleFromServer = () => {
     axios.post('http://localhost:3000/tasks', {
       name: 'Learn JS',
       description: 'React',
       priority: 1,
       status: 'in progress'
     })
       .then(function (response) {
         console.log(response);
       })
       .catch( (error) => {
         console.log(error);
       })
       .finally(function () {
         console.log('done');
       });
   }

   useEffect(() => {
     getExampleFromServer();
     getTasks()
   }, [])


  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <div className="container text-center">
        <div className="row align-items-start">
          {statuses.map((status) =>
            <Column status = {status}
                    tasks = {tasks}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
