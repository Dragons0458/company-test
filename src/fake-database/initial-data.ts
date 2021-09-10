import { AnimalNode } from 'src/fake-database/interfaces/animal-node';

export const data: AnimalNode = {
  id: '1',
  label: 'root',
  children: [
    {
      id: '2',
      label: 'ant',
      children: [],
    },
    {
      id: '3',
      label: 'bear',
      children: [
        {
          id: '4',
          label: 'cat',
          children: [],
        },
        {
          id: '5',
          label: 'dog',
          children: [
            {
              id: '6',
              label: 'elephant',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: '7',
      label: 'frog',
      children: [],
    },
  ],
};
