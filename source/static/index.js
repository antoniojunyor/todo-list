import uuidv1 from 'uuid/v1';

export const lists = [
  {
    id: uuidv1(),
    name: 'Lista 1',
    tasks: [
      {
        id: uuidv1(),
        name: 'Tarefa 1',
        checked: false,
        subtasks: [
          {
            id: uuidv1(),
            name: 'Subtarefa 1',
            checked: false
          },
          {
            id: uuidv1(),
            name: 'Subtarefa 2',
            checked: false
          },
          {
            id: uuidv1(),
            name: 'Subtarefa 3',
            checked: false
          },
        ]
      },
      {
        id: uuidv1(),
        name: 'Tarefa 2',
        checked: false,
        subtasks: []
      }
    ]
  },
  {
    id: uuidv1(),
    name: 'Lista 2',
    tasks: [
      {
        id: uuidv1(),
        name: 'Tarefa 1',
        checked: false,
        subtasks: []
      }
    ]
  },
  {
    id: uuidv1(),
    name: 'Lista 3',
    tasks: [
      {
        id: uuidv1(),
        name: 'Tarefa 1',
        checked: false,
        subtasks: []
      }
    ]
  }
]
