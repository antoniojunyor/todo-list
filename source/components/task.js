import React, { Component } from 'react';

import Subtask from './subtask';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextSubtaskValue: ''
    }
  }

  addSubtask(nextSubtaskValue, taskIndex) {
    if (nextSubtaskValue) {
      this.props.onClickAddSubtask(nextSubtaskValue, taskIndex);
      this.setState({ nextSubtaskValue: '' });
    }
  }

  render() {
    const {
      task,
      onClickDeleteSubtask,
      onChangeSubtask,
      onChangeTask,
      onClickDeleteTask,
      taskIndex,
      showInputSubtask
    } = this.props;

    let listSubtasks, addSubtask;

    if (task.subtasks) {
      listSubtasks = task.subtasks.map((subtask, index) => {
        return (
          <Subtask
            key={subtask.id}
            subtaskIndex={index}
            subtask={subtask}
            onClickDeleteSubtask={subtaskIndex => onClickDeleteSubtask(subtaskIndex, taskIndex)}
            onChangeSubtask={subtaskIndex => onChangeSubtask(subtaskIndex, taskIndex)}
          />
        );
      });
    }

    if (showInputSubtask !== false) {
      addSubtask = (
        <li className="as-add-subtask">
          <form className="as-form-add-subtask" onSubmit={() => this.addSubtask(this.state.nextSubtaskValue, taskIndex)} onChange={event => this.setState({ nextSubtaskValue: event.target.value })}>
            <input type="text" placeholder="Adicionar subtarefa"/>
            <button type="submit" className="as-button-add-task">Adicionar subtarefa</button>
          </form>
        </li>
      );
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
          {addSubtask}
        </ul>
      </li>
    );
  }
}
