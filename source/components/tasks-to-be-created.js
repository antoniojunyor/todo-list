import React, { Component } from 'react';

export default class TasksToBeCreated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: this.props.task.name
    }

    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField(event) {
    this.setState({ field: event.target.value }, () => this.props.onEditTaskName(this.state.field));
  }

  render() {
    return (
      <div className="as-form-group">
        <input
          type="text"
          className="as-form-control"
          value={this.state.field}
          onChange={this.onChangeField}
        />

        <button type="button" className="as-button-delete-task" onClick={() => this.props.onClickRemoveTask(this.props.taskIndex)}>Remover Tarefa</button>
      </div>
    );
  }
}
