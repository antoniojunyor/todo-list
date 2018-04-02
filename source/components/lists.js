import React, { Component } from 'react';
import Task from './task';

export default class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextTaskValue: ''
    }
  }

  render() {
    const {
      list,
      onClickDeleteTask,
      onClickDeleteSubtask,
      onChangeTask,
      onChangeSubtask,
      onClickDeleteList,
      onAddTask,
      onChangeFormAddTask,
      listIndex
    } = this.props;

    const listTasks = list.tasks.map((task, index) => {
      return (
        <Task
          key={index}
          taskIndex={index}
          task={task}
          onClickDeleteTask={taskIndex => onClickDeleteTask(taskIndex, listIndex)}
          onClickDeleteSubtask={(subtaskIndex, taskIndex) => onClickDeleteSubtask(subtaskIndex, taskIndex, listIndex)}
          onChangeTask={taskIndex => onChangeTask(taskIndex, listIndex)}
          onChangeSubtask={(subtaskIndex, taskIndex) => onChangeSubtask(subtaskIndex, taskIndex, listIndex)}
        />
      );
    });

    return (
      <li className="as-lists-item">
        <div className="as-list-header">
          <input type="text" defaultValue={list.name}/>
          <div className="as-list-actions">
            <button type="button" className="as-button-edit-list">Editar Lista</button>
            <button type="button" className="as-button-delete-list" onClick={() => onClickDeleteList(listIndex)}>Excluir Lista</button>
          </div>
        </div>

        <ul className="as-task-list">
          <li className="as-add-task">
            <form className="as-form-add-task" onSubmit={() => onAddTask(this.state.nextTaskValue, listIndex)} onChange={event => this.setState({ nextTaskValue: event.target.value })}>
              <input type="text" placeholder="Adicionar Tarefa"/>
              <button type="submit" className="as-button-add-task">Adicionar Tarefa</button>
            </form>
          </li>

          {listTasks}
        </ul>
      </li>
    );
  }
}
