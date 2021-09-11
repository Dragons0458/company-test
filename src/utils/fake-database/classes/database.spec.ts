import { HttpException } from '@nestjs/common';
import { data } from '../initial-data';
import { Database } from './database';

describe('Fake database', () => {
  describe('Checks if populateData method populate the data correctly', () => {
    const database = new Database();

    database.populateData(data);

    it('Checks data', () => {
      expect(database.currentAnimalNode).toStrictEqual(data);
    });

    it('Checks indexedData property', () => {
      expect((database as any).indexedData.has('6')).toBeTruthy();
    });

    it('Checks indexedParents property', () => {
      expect((database as any).indexedParents.has('6')).toBeTruthy();
    });
  });

  describe('Checks getNode method', () => {
    const database = new Database();

    it("If the node doesn't exists throw an error", () => {
      const t = () => database.getNode('');

      expect(t).toThrow(HttpException);
    });

    it('Checks that returns a node', () => {
      const nodeId = database.getNode('1').id;

      expect(nodeId).toStrictEqual('1');
    });
  });

  describe('Checks addNode method', () => {
    const database = new Database();

    it("If the parent node doesn't exists throw an error", () => {
      const t = () => database.addNode('', null);

      expect(t).toThrow(HttpException);
    });

    describe('Checks new inserted node', () => {
      const node = {
        id: '2',
        label: 'test',
        children: [],
      };

      database.addNode('1', node);

      it('Checks that root has a new child', () => {
        expect.assertions(2);
        const children = database.currentAnimalNode.children;

        expect(children.length).toStrictEqual(1);

        expect(children[0]).toStrictEqual(node);
      });

      it('Checks indexedData property', () => {
        expect((database as any).indexedData.has('2')).toBeTruthy();
      });

      it('Checks indexedParents property', () => {
        expect((database as any).indexedParents.has('2')).toBeTruthy();
      });
    });
  });

  describe('Checks updateParentNode method', () => {
    const database = new Database();

    it("If the node or parent node don't exists throw an error", () => {
      const t = () => database.updateParentNode(null, null);

      expect(t).toThrow(HttpException);
    });

    describe('Checks the change of the parent', () => {
      const node = {
        id: '2',
        label: 'test',
        children: [
          {
            id: '3',
            label: 'test 0',
            children: [],
          },
        ],
      };

      database.addNode('1', node);
      database.updateParentNode('3', '1');

      it('Checks that the parent change is correct', () => {
        const { id } = database.currentAnimalNode.children[1];

        expect(id).toStrictEqual('3');
      });

      it('Checks indexedParents property', () => {
        expect((database as any).indexedParents.get('3').id).toStrictEqual('1');
      });
    });
  });

  describe('Checks deleteNode method', () => {
    const database = new Database();

    it("If the node doesn't exists throw an error", () => {
      const t = () => database.deleteNode(null);

      expect(t).toThrow(HttpException);
    });

    describe('Checks deleted node', () => {
      const node = {
        id: '2',
        label: 'test',
        children: [],
      };

      database.addNode('1', node);
      database.deleteNode('2');

      it("Checks that new node doesn't exists", () => {
        expect(database.currentAnimalNode.children.length).toStrictEqual(0);
      });

      it('Checks indexedData property', () => {
        expect((database as any).indexedData.has('2')).toBeFalsy();
      });

      it('Checks indexedParents property', () => {
        expect((database as any).indexedParents.has('2')).toBeFalsy();
      });
    });
  });
});
