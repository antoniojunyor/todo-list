import React from 'react';

const Subtask = ({
  subtaskIndex,
  subtask,
  onClickDeleteSubtask,
  onChangeSubtask
}) => {
  return (
    <li className="as-subtask-item">
      <input type="checkbox" checked={subtask.checked} onChange={() => onChangeSubtask(subtaskIndex)}/>
      <span>{subtask.name}</span>
      <button className="as-button-delete-subtask" onClick={() => onClickDeleteSubtask(subtaskIndex)}>excluir subtarefa</button>
    </li>
  );
}

export default Subtask;