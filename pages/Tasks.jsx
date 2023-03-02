import React, { useState, useEffect, useRef } from 'react';
import TasksList from '../components/TasksList';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axios from 'axios';
import { FaExclamationTriangle } from 'react-icons/fa';

const Tasks = ({ alert, showAlert, user }) => {
  const [tasks, setTasks] = useState([]);
  const [taskAdded, setTaskAdded] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem('token');
  const url = `${import.meta.env.VITE_URL}/tasks/`;
  const inputRef = useRef(null);

  //* focus

  useEffect(() => {
    inputRef.current.focus();
  }, [isEditing, taskAdded]);

  //* allTasks

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  //* ajout tâche

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskAdded && !isEditing) {
      try {
        const { data } = await axios.post(
          url,
          { name: taskAdded },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const oneTask = {
          task_id: data.task.task_id,
          name: data.task.name,
        };
        setTasks([...tasks, oneTask]);
        showAlert('tâche ajoutée', 'success', true);
        setTaskAdded('');
      } catch (error) {
        console.log(error);
      }
      setIsEditing(false);
      setTaskAdded('');
    }

    //* édition tâche
    else if (taskAdded && isEditing) {
      const newTab = tasks.map((task) =>
        task.task_id === editId ? { ...task, name: taskAdded } : task
      );
      try {
        await axios.put(
          `${url}${editId}`,
          { name: taskAdded },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
      setTasks(newTab);
      showAlert('tâche modifiée', 'success', true);
      setIsEditing(false);
      setEditId(null);

      setTaskAdded('');
    } else {
      showAlert('veuillez saisir une tâche', 'danger', true);
    }
  };

  const editTask = async (id) => {
    setIsEditing(true);
    setEditId(id);
    const newTask = tasks.find((task) => task.task_id === id);
    setTaskAdded(newTask.name);
  };

  //* supprimer une tâche

  const deleteTask = async (id) => {
    try {
      const tasksFiltered = tasks.filter((task) => task.task_id !== id);
      showAlert('tâche supprimée', 'danger', true);
      setTasks(tasksFiltered);
      await axios.delete(`${url}${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
    setTaskAdded('');
  };

  //* supprimer toutes les tâches

  const deletAllTasks = async () => {
    try {
      await axios.delete(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTasks([]);
      showAlert('liste supprimée', 'danger', true);
    } catch (error) {
      console.log(error);
    }
    setIsEditing(false);
    setTaskAdded('');
  };

  //*checkbox

  //* barrer les tâches accomplies
  const checkTask = async (id) => {
    const tasksChecked = tasks.map((task) =>
      task.task_id === id ? { ...task, is_completed: !task.is_completed } : task
    );

    try {
      await axios.put(
        `${url}task-checked/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(tasksChecked);
    } catch (error) {
      console.log(error.response.data.msg);
    }
    setIsEditing(false);
    setTaskAdded('');
  };

  return (
    <>
      <section className='toDoSection'>
        <span style={{ color: 'white' }}>bienvenue {user.name}</span>
        <h2>Mes tâches</h2>
        <div className='alertSection'>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        </div>
        <div className='formCont'>
          <div className='inputToDo'>
            <form action='' onSubmit={handleSubmit}>
              <input
                type='text'
                value={taskAdded}
                onChange={(e) => setTaskAdded(e.target.value)}
                placeholder='saisissez une tâche'
                ref={inputRef}
              />
              <button className='submitBtn' type='submit'>
                {isEditing ? 'modifier' : 'ajouter'}
              </button>
            </form>
          </div>

          <TasksList
            tasks={tasks}
            deleteTask={deleteTask}
            editTask={editTask}
            checkTask={checkTask}
            isCompleted={isCompleted}
          />
          {tasks.length > 1 ? (
            <div className='deleteAll'>
              <button className='deleteAll' onClick={deletAllTasks}>
                Tout supprimer
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </section>
    </>
  );
};

export default Tasks;
