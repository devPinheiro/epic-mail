import uuid from 'uuid';

export default [
  {
    id: uuid(),
    createdOn: Date(),
    subject: 'Andela Bootcamp 42',
    message: 'Congratulations, you just made it to Andela...',
    senderId: 1,
    receieverId: 2,
    parentMessageId: 1,
    status: 'sent',
  },

  {
    id: uuid(),
    createdOn: Date(),
    subject: 'Andela Bootcamp 42',
    message: 'Congratulations, you just made it to Andela...',
    senderId: 1,
    receieverId: 2,
    parentMessageId: 1,
    status: 'sent',
  },

  {
    id: uuid(),
    createdOn: Date(),
    subject: 'Andela Bootcamp 42',
    message: 'Congratulations, you just made it to Andela...',
    senderId: 1,
    receieverId: 2,
    parentMessageId: 1,
    status: 'unread',
  },
  {
    id: uuid(),
    createdOn: Date(),
    subject: 'Andela Bootcamp 42',
    message: 'Congratulations, you just made it to Andela...',
    senderId: 1,
    receieverId: 2,
    parentMessageId: 1,
    status: 'unread',
  },
];
