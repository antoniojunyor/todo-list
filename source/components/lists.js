import React, { Component } from 'react';
import Task from './task';

export default class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextTaskValue: '',
      listName: this.props.list.name
    }

    this.onChangeListName = this.onChangeListName.bind(this);
    this.toggleListInput = this.toggleListInput.bind(this);
  }

  onChangeListName(event) {
    this.setState({ listName: event.target.value }, () => this.props.onEditListName(this.state.listName));
  }

  toggleListInput(event) {
    if (event) event.preventDefault();
    if (this.state.listName) {
      document.querySelectorAll('.as-form-list-name input')[this.props.listIndex].classList.toggle('as-active-field');
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
      listIndex,
      onClickAddSubtask,
      showInputTask,
      showInputSubtask
    } = this.props;

    let addTask;

    const listTasks = list.tasks.map((task, index) => {
      return (
        <Task
          key={task.id}
          taskIndex={index}
          task={task}
          onClickDeleteTask={taskIndex => onClickDeleteTask(taskIndex, listIndex)}
          onClickDeleteSubtask={(subtaskIndex, taskIndex) => onClickDeleteSubtask(subtaskIndex, taskIndex, listIndex)}
          onChangeTask={taskIndex => onChangeTask(taskIndex, listIndex)}
          onChangeSubtask={(subtaskIndex, taskIndex) => onChangeSubtask(subtaskIndex, taskIndex, listIndex)}
          onClickAddSubtask={(nextSubtaskValue, taskIndex) => onClickAddSubtask(nextSubtaskValue, taskIndex, listIndex)}
          showInputSubtask={showInputSubtask}
        />
      );
    });

    if (showInputTask !== false) {
      addTask = (
        <li className="as-add-task">
          <form className="as-form-add-task" onSubmit={() => onAddTask(this.state.nextTaskValue, listIndex)} onChange={event => this.setState({ nextTaskValue: event.target.value })}>
            <input type="text" placeholder="Adicionar Tarefa"/>
            <button type="submit" className="as-button-add-task">Adicionar Tarefa</button>
          </form>
        </li>
      );
    }

    return (
      <li className="as-lists-item">
        <div className="as-list-header">
          <form className="as-form-list-name" onSubmit={this.toggleListInput}>
            <input type="text" value={this.state.listName} onChange={this.onChangeListName}/>
            <button type="submit">Alterar nome da lista</button>
          </form>

          <div className="as-list-actions">
            <button type="button" className="as-button-edit-list" onClick={this.toggleListInput}>Editar Lista</button>
            <button type="button" className="as-button-delete-list" onClick={() => onClickDeleteList(listIndex)}>Excluir Lista</button>
          </div>
        </div>

        <ul className="as-task-list">
          {addTask}
          {listTasks}
        </ul>
      </li>
    );
  }
}
