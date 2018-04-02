import React from 'react';

import Subtask from './subtask';

const Task = ({
  taskIndex,
  task,
  onClickDeleteTask,
  onClickDeleteSubtask,
  onChangeTask,
  onChangeSubtask
}) => {
  let listSubtasks;

  if (task.subtasks) {
    listSubtasks = task.subtasks.map((subtask, index) => {
      return (
        <Subtask
          key={index}
          subtaskIndex={index}
          subtask={subtask}
          onClickDeleteSubtask={subtaskIndex => onClickDeleteSubtask(subtaskIndex, taskIndex)}
          onChangeSubtask={subtaskIndex => onChangeSubtask(subtaskIndex, taskIndex)}
        />
      );
    });
  }

  return (
    <li className="as-task-item">
      <div className="as-task-checkbox-container">
        <input type="checkbox" defaultChecked={task.checked ? 'checked' : ''} onChange={() => onChangeTask(taskIndex)}/>
        <span>{task.name}</span>
        <button className="as-button-delete-task" onClick={() => onClickDeleteTask(taskIndex)}>excluir tarefa</button>
      </div>

      <ul className="as-subtask-list">
        {listSubtasks}
        <li className="as-add-subtask">
          <form className="as-form-add-subtask">
            <input type="text" placeholder="Adicionar subtarefa"/>
            <button className="as-button-add-task">Adicionar subtarefa</button>
          </form>
        </li>
      </ul>
    </li>
  );
}

export default Task;
