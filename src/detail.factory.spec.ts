import { DetailFactory } from './detail.factory';
import { DefinitionFactory } from './definition.factory';
import { ProblemDetail } from './models/problem-detail';

describe('DetailFactory', () => {
  let detailFactory: DetailFactory;

  beforeEach(() => {
    const definitionFactory = new DefinitionFactory();
    definitionFactory.load([
      {
        code: 'T1',
        status: 400,
        title: 'testing error',
        type: 'https://www.example.com/support/T1'
      },
      {
        code: 'T2',
        status: 404,
        title: 'another error',
        type: 'https://www.example.com/support/T2'
      }
    ]);

    detailFactory = new DetailFactory(definitionFactory);
  });

  describe('create', () => {
    test('should create a problem detail object', () => {
      const problem = detailFactory.createFromCode('T1');

      expect(problem).not.toBeNull();
      expect(problem).toBeInstanceOf(ProblemDetail);
    });

    test('should create a problem based on a definition', () => {
      const problem = detailFactory.create({
        code: 'T1',
        status: 400,
        title: 'testing error',
        type: 'https://www.example.com/support/T1'
      });

      expect(problem).not.toBeNull();
      expect(problem).toBeInstanceOf(ProblemDetail);
    });
  });
});
