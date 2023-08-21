import {nanoid} from 'nanoid';

const POSTS = [
  {
    id: nanoid(),
    createdAt: '3 Hours ago',
    createBy: 'Dennis Reynolds',
    comments: ['hello', 'world'],
    likes: ['apar', 'praful'],
    saves: ['apar', 'praful'],
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Post_Danmark_Post_boxes_in_F%C3%A5borg%2C_Denmark.jpg/1200px-Post_Danmark_Post_boxes_in_F%C3%A5borg%2C_Denmark.jpg',
  },
  {
    id: nanoid(),
    createdAt: '4 Hours ago',
    createBy: 'Apar Gautam',
    comments: ['hello', 'world'],
    likes: ['apar', 'praful'],
    saves: ['apar', 'praful'],
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Post_Danmark_Post_boxes_in_F%C3%A5borg%2C_Denmark.jpg/1200px-Post_Danmark_Post_boxes_in_F%C3%A5borg%2C_Denmark.jpg',
  },
  {
    id: nanoid(),
    createdAt: '11 Hours ago',
    createBy: 'Praful Shrestha',
    comments: ['hello', 'world'],
    likes: ['apar', 'praful'],
    saves: ['apar', 'praful'],
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Post_Danmark_Post_boxes_in_F%C3%A5borg%2C_Denmark.jpg/1200px-Post_Danmark_Post_boxes_in_F%C3%A5borg%2C_Denmark.jpg',
  },
  {
    id: nanoid(),
    createdAt: '6 Hours ago',
    createBy: 'Manuj Karki',
    comments: ['hello', 'world'],
    likes: ['apar', 'praful', 'manuj'],
    saves: ['apar', 'praful'],
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Post_Danmark_Post_boxes_in_F%C3%A5borg%2C_Denmark.jpg/1200px-Post_Danmark_Post_boxes_in_F%C3%A5borg%2C_Denmark.jpg',
  },
];
const MESSAGES = [
  {
    id: nanoid(),
    name: 'Malenia',
    text: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat. Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
  },
  {
    id: nanoid(),
    name: 'Mclardia',
    text: 'Borgar',
  },
  {
    id: nanoid(),
    name: 'Radahn',
    text: 'death ',
  },
  {
    id: nanoid(),
    name: 'Hourah',
    text: 'may thoust thy strhgithqlsk hqoiwf',
  },
  {
    id: nanoid(),
    name: 'Malena',
    text: 'Hello there Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
  },
  {
    id: nanoid(),
    name: 'Melina',
    text: 'arisenow',
  },
];
const CONVERSATION = [
  {
    id: nanoid(),
    sender: 'Charlie Kelly',
    receiver: 'Malenia',
    text: 'we are going to c da lions',
  },
  {
    id: nanoid(),
    sender: 'Charlie Kelly',
    receiver: 'Malenia',
    text: 'they are doing a feed thing at the zoo',
  },
  {
    id: nanoid(),
    sender: 'Malenia',
    receiver: 'Charlie Kelly',
    text: 'when?',
  },
  {
    id: nanoid(),
    sender: 'Malenia',
    receiver: 'Charlie Kelly',
    text: 'see the lions or sealions? also is matt going to be there?',
  },
];
export {MESSAGES, CONVERSATION, POSTS};
