import { HttpException } from '@nestjs/common';
import { AppService } from './app.service';

describe('AppService', () => {
  it('Checks getTree method', () => {
    const appService = new AppService(null);

    const tree = appService.getTree();
    const rootKeys = Object.keys(tree['1'].children[0]);

    expect(rootKeys[0]).toStrictEqual('2');
  });

  describe('Checks deleteNode method', () => {
    const appService = new AppService(null);

    it('If the node has children reject', () => {
      const t = () => appService.deleteNode('1');

      expect(t).toThrow(HttpException);
    });
  });
});
