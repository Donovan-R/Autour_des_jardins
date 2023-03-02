import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

import { GrCheckbox, GrCheckboxSelected, GrTrash } from 'react-icons/gr';

const TasksList = ({ tasks, deleteTask, editTask, checkTask }) => {
  return (
    <div className='tasksList'>
      {tasks.map((task, index) => {
        const { task_id: id, name, is_completed } = task;
        return (
          <div className='taskCard' key={index} id={id}>
            <button onClick={() => checkTask(id)} className='checkBtn'>
              {is_completed ? <GrCheckboxSelected /> : <GrCheckbox />}
            </button>
            <div className='taskChecked'>
              {is_completed ? (
                <p>
                  <s className='checkedStripe'>{name}</s>
                </p>
              ) : (
                <p>{name}</p>
              )}
            </div>
            <div className='taskBtns'>
              <button onClick={() => deleteTask(id)} className='deleteBtn'>
                <GrTrash />
              </button>
              <button onClick={() => editTask(id)} className='editBtn'>
                <FaEdit />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TasksList;
