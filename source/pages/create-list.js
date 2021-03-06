import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

import Header from '../components/header';
import Lists from '../components/lists';
import TasksToBeCreated from '../components/tasks-to-be-created';

export default class CreateList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      savedList: [],
      tasks: [],
      name: '',
      task: '',
      validList: null,
      addTaskEnabled: false
    }

    this.onChangeInputForm = this.onChangeInputForm.bind(this);
    this.createList = this.createList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.verifyKey = this.verifyKey.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  createList() {
    if (!this.state.name) return false;

    let savedList = this.state.savedList;
    const newList = {
      id: uuidv1(),
      name: this.state.name,
      tasks: this.state.tasks
    };

    if (this.state.task) {
      const task = {
        id: uuidv1(),
        name: this.state.task,
        checked: false,
        subtasks: []
      }

      newList.tasks.push(task);
    }

    savedList.push(newList);
    this.setState({ savedList }, () => this.resetForm());
  }

  onChangeInputForm(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.setState({ addTaskEnabled: (this.state.task) });
    });
  }

  addTask() {
    let tasks = this.state.tasks;

    if (!this.state.task) return false;

    const newTask = {
      id: uuidv1(),
      name: this.state.task,
      checked: false,
      subtasks: []
    }

    tasks.push(newTask);
    this.setState({
      tasks,
      task: '',
      addTaskEnabled: false
    });
  }

  verifyKey(event) {
    if (event.keyCode == '13') {
      this.addTask();
    } else if (event.keyCode == '27') {
      this.setState({ task: '' });
    }
  }

  removeTask(taskIndex) {
    let tasks = this.state.tasks;
    tasks.splice(taskIndex, 1);
    this.setState({ tasks });
  }

  resetForm() {
    this.setState({
      lists: [],
      tasks: [],
      name: '',
      task: '',
      addTaskEnabled: false
    });
  }

  deleteList(listIndex) {
    let savedList = this.state.savedList;
    savedList.splice(listIndex, 1);
    this.setState({ savedList });
  }

  deleteTask(taskIndex, listIndex) {
    let savedList = this.state.savedList;
    savedList[listIndex].tasks.splice(taskIndex, 1);
    this.setState({ savedList });
  }

  editTaskName(value, taskIndex) {
    let tasks = this.state.tasks;
    tasks[taskIndex].name = value;
    this.setState({ tasks });
  }

  taskStatus(taskIndex, listIndex) {
    let savedList = this.state.savedList,
        task = savedList[listIndex].tasks[taskIndex];

    task.checked = !task.checked;
    this.setState({ savedList });
  }

  editListName(value, listIndex) {
    let savedList = this.state.savedList;
    savedList[listIndex].name = value;
    this.setState({ savedList });
  }

  render() {
    let createdTasks, TasksLists;

    if (this.state.tasks) {
      createdTasks = this.state.tasks.map((task, index) => {
        return (
          <TasksToBeCreated
            key={index}
            taskIndex={index}
            task={task}
            onClickRemoveTask={taskIndex => this.removeTask(taskIndex)}
            onEditTaskName={value => this.editTaskName(value, index)}
          />
        );
      });
    }

    if (this.state.savedList.length) {
      TasksLists = this.state.savedList.map((list, index) => {
        return (
          <Lists
            key={list.id}
            listIndex={index}
            list={list}
            showInputTask={false}
            showInputSubtask={false}
            onClickDeleteList={this.deleteList}
            onClickDeleteTask={this.deleteTask}
            onEditListName={value => this.editListName(value, index)}
            onChangeTask={(taskIndex, listIndex) => this.taskStatus(taskIndex, listIndex)}
          />
        );
      });
    }

    return (
      <div className="as-create-lists-page">
        <Header/>

        <div className="as-container-create-list-page">
          <form className="as-form-creat-list" onSubmit={event => this.createList(event)}>
            <fieldset>
              <legend>Criar Lista</legend>
              <div className="as-form-group">
                <label className="as-sr-only" htmlFor="list-name">Digite o nome da lista ...</label>
                <input
                  type="text"
                  name="name"
                  id="list-name"
                  className="as-form-control"
                  placeholder="Digite o nome da lista ..."
                  value={this.state.name}
                  onChange={this.onChangeInputForm}
                  autoFocus
                />
              </div>

              <div className="as-tasks-group">{createdTasks}</div>

              <div className="as-form-group">
                <label className="as-sr-only" htmlFor="add-task">Adicionar Tarefa</label>
                <input
                  type="text"
                  name="task"
                  id="add-task"
                  className="as-form-control"
                  placeholder="Adicionar Tarefa"
                  value={this.state.task}
                  onChange={this.onChangeInputForm}
                  onKeyUp={this.verifyKey}
                />

                <button type="button" className={`as-button-add-task ${!this.state.addTaskEnabled ? 'as-button-disabled' : ''}`} onClick={this.addTask}>Adicionar Tarefa</button>
              </div>

              <div className="as-form-group as-form-actions">
                <button type="button" className="as-button-green" onClick={this.resetForm}>Cancelar</button>
                <button type="button" className="as-button-orange" onClick={this.createList}>Criar Lista</button>
              </div>
            </fieldset>
          </form>

          <ul className="as-lists">{TasksLists}</ul>
        </div>
      </div>
    );
  }
}
