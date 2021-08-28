import TableInterface from "~/models/table/table.interface";

const tables: TableInterface[] = [
  {
    id: '123456987',
    name: 'Roller',
    inviteMax: 0,
    invites: []
  },
  {
    id: 'abloeoufcize',
    name: 'Dauphin',
    inviteMax: 0,
    invites: [
      {
          id: 'abcdef',
          badge: '',
          nom: 'doe',
          prenom: 'janne'
      }
    ]
  }
]

export default tables