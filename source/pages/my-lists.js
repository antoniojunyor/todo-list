import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

import Header from '../components/header';
import Lists from '../components/lists';

import { lists } from '../static';

export default class MyLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: []
    }
  }

  componentDidMount() {
    this.setState({ lists });
  }

  deleteList(listIndex) {
    let _lists = this.state.lists;
    _lists.splice(listIndex, 1);
    this.setState({ lists: _lists });
  }

  deleteTask(taskIndex, listIndex) {
    let lists = this.state.lists;
    lists[listIndex].tasks.splice(taskIndex, 1);
    this.setState({ lists });
  }

  deleteSubtask(subtaskIndex, taskIndex, listIndex) {
    let lists = this.state.lists;
    lists[listIndex].tasks[taskIndex].subtasks.splice(subtaskIndex, 1);
    this.setState({ lists });
  }

  taskStatus(taskIndex, listIndex) {
    let list = this.state.lists,
        task = list[listIndex].tasks[taskIndex];

    task.checked = !task.checked;
    for (let i = 0; i < task.subtasks.length; i++) {
      task.subtasks[i].checked = task.checked;
    }

    this.setState({ lists });
  }

  subtaskStatus(subtaskIndex, taskIndex, listIndex) {
    let list = this.state.lists,
        task = list[listIndex].tasks[taskIndex],
        subtask = task.subtasks[subtaskIndex],
        allSubtasksChecked = null;

    subtask.checked = !subtask.checked;

    for (let i = 0; i < task.subtasks.length; i++) {
      let currentValue = task.subtasks[i].checked;

      if (!currentValue) {
        allSubtasksChecked = false;
        break;
      } else {
        allSubtasksChecked = true;
      }
    }

    task.checked = allSubtasksChecked;
    this.setState({ lists });
  }

  addTask(nextTaskValue, listIndex) {
    let list = this.state.lists,
        task = list[listIndex].tasks;

    if (nextTaskValue) {
      const newTask = {
        id: uuidv1(),
        name: nextTaskValue,
        checked: false,
        subtasks: []
      }

      task.push(newTask);
      this.setState({ lists });
    }
  }

  addSubtask(nextSubtaskValue, taskIndex, listIndex) {
    let list = this.state.lists,
        task = list[listIndex].tasks[taskIndex];

    const newSubtask = {
      id: uuidv1(),
      name: nextSubtaskValue,
      checked: false
    }

    task.subtasks.push(newSubtask);
    this.setState({ lists });
  }

  editListName(value, listIndex) {
    let lists = this.state.lists;
    lists[listIndex].name = value;
    this.setState({ lists });
  }

  render() {
    const Taskslists = this.state.lists.map((list, index) => {
      return (
        <Lists
          key={list.id}
          listIndex={index}
          list={list}
          onClickDeleteList={listIndex => this.deleteList(listIndex)}
          onClickDeleteTask={(taskIndex, listIndex) => this.deleteTask(taskIndex, listIndex)}
          onClickDeleteSubtask={(subtaskIndex, taskIndex, listIndex) => this.deleteSubtask(subtaskIndex, taskIndex, listIndex)}
          onChangeTask={(taskIndex, listIndex) => this.taskStatus(taskIndex, listIndex)}
          onChangeSubtask={(subtaskIndex, taskIndex, listIndex) => this.subtaskStatus(subtaskIndex, taskIndex, listIndex)}
          onAddTask={(nextTaskValue, listIndex) => this.addTask(nextTaskValue, listIndex)}
          onClickAddSubtask={(nextSubtaskValue, taskIndex, listIndex) => this.addSubtask(nextSubtaskValue, taskIndex, listIndex)}
          onEditListName={value => this.editListName(value, index)}
        />
      );
    });

    return (
      <div className="as-lists-page">
        <Header />
        <div className="as-container">
          <ul className="as-lists">{Taskslists}</ul>
        </div>
      </div>
    );
  }
}
