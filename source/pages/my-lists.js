import React, { Component } from 'react';

import Header from '../components/header';
import Lists from '../components/lists';

import { lists } from '../static';

export default class MyLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
    }
  }

  componentDidMount() {
    this.setState({ lists });
  }

  deleteList(listIndex) {
    let _lists = this.state.lists;
    _lists.shift(listIndex);
    this.setState({ lists: _lists });
  }

  deleteTask(taskIndex, listIndex) {
    let _lists = this.state.lists;
    _lists[listIndex].tasks.shift(taskIndex);
    this.setState({ lists: _lists });
  }

  deleteSubtask(subtaskIndex, taskIndex, listIndex) {
    let _lists = this.state.lists;
    _lists[listIndex].tasks[taskIndex].subtasks.shift(subtaskIndex);
    this.setState({ lists: _lists });
  }

  taskStatus(taskIndex, listIndex) {
    let _list = this.state.lists,
        _task = _list[listIndex].tasks[taskIndex];

    _task.checked = !_task.checked;
    for (let i = 0; i < _task.subtasks.length; i++) {
      _task.subtasks[i].checked = _task.checked;
    }

    _list[listIndex].tasks[taskIndex] = _task;

    this.setState({ list: _list });
  }

  subtaskStatus(subtaskIndex, taskIndex, listIndex) {
    let _list = this.state.lists,
        _task = _list[listIndex].tasks[taskIndex],
        _subtask = _task.subtasks[subtaskIndex],
        allSubtasksChecked = null;

    for (let i = 0; i < _task.subtasks.length; i++) {
      if (_task.subtasks[i].checked === false) {
        allSubtasksChecked = false;
        break;
      } else {
        allSubtasksChecked = true;
      }
    }

    _task.checked = allSubtasksChecked;
    _list[listIndex].tasks[taskIndex] = _task;
    _subtask.checked = !_subtask.checked;
    _list[listIndex].tasks[taskIndex].subtasks[subtaskIndex] = _subtask;
    this.setState({ list: _list });
  }

  addTask(nextTaskValue, listIndex) {
    let _list = this.state.lists,
        _task = _list[listIndex].tasks;

    if (nextTaskValue) {
      const newTask = {
        name: nextTaskValue,
        checked: false,
        subtasks: []
      }

      _task.push(newTask);
      this.setState({ list: _list });
    }
  }

  addSubtask(nextSubtaskValue, taskIndex, listIndex) {
    let _list = this.state.lists,
        _task = _list[listIndex].tasks[taskIndex];

    const newSubtask = {
      name: nextSubtaskValue,
      checked: false
    }

    _task.subtasks.push(newSubtask);
    this.setState({ list: _list });
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
        />
      );
    });

    return (
      <div className="as-lists-page">
        <Header />
        <div className="as-container">
          <ul className="as-lists">
            {Taskslists}
          </ul>
        </div>
      </div>
    );
  }
}
