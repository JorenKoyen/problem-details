import { DefinitionFactory } from 'src/definition.factory';
import { ProblemDefinition } from 'src/models/problem-definition';
import { HttpStatus } from 'src/models/http-status';

const defs: ProblemDefinition[] = [
  {
    code: 'T1',
    status: HttpStatus.BAD_REQUEST,
    type: 'https://www.example.com/prob/T1',
    title: 'def 0'
  },
  {
    code: 'T2',
    status: HttpStatus.BAD_REQUEST,
    type: 'https://www.example.com/prob/T2',
    title: 'def 1'
  },
  {
    code: 'T3',
    status: HttpStatus.FORBIDDEN,
    type: 'https://www.example.com/prob/T3',
    title: 'def-2'
  }
];

describe('DefinitionFactory', () => {
  let factory: DefinitionFactory;

  beforeEach(() => {
    factory = new DefinitionFactory();
  });

  // -- register() -------------------------
  describe('register', () => {
    test('insert single definition', () => {
      factory.register(defs[0]);
      factory.register(defs[1]);
      expect(factory.getDefinitions().length).toBe(2);
    });

    test('should throw on duplicate code', () => {
      expect(() => {
        factory.register(defs[0]);
        factory.register(defs[0]);
      }).toThrowError(
        new Error('unable to register definition with allready existing code')
      );
    });

    test('should not accept wrong http status code', () => {
      const low = new ProblemDefinition(
        'https://wwww.example.com/prob',
        'error occured',
        99,
        'T1'
      );
      const high = new ProblemDefinition(
        'https://www.example.com/prob',
        'error occured',
        600,
        'T2'
      );

      expect(() => {
        factory.register(low);
      }).toThrow();

      expect(() => {
        factory.register(high);
      }).toThrow();
    });

    test('should not accept non URL type', () => {
      const malformedUrl = new ProblemDefinition('non url', 'error occured', 400, 'T1');
      expect(() => {
        factory.register(malformedUrl);
      }).toThrow();
    });

    test('should not accept non string value for title and code', () => {
      const malformed: any = {
        status: 400,
        type: 'https://www.example.com',
        code: 2,
        title: { my: 'object' }
      };
      expect(() => {
        factory.register(malformed);
      }).toThrow();
    });
  });

  // -- load() -----------------------------
  describe('load', () => {
    test('should insert all definitions', () => {
      factory.load(defs);
      expect(factory.getDefinitions().length).toBe(defs.length);
    });

    test('should not insert any definition', () => {
      const wrong = { ...defs[0], type: 'wrong' };

      expect(() => {
        factory.load([wrong, ...defs]);
      }).toThrow();

      expect(factory.getDefinitions().length).toBe(0);
    });
  });

  // -- getByCode() ------------------------
  describe('getByCode', () => {
    test('should return a definition', () => {
      factory.load(defs);
      expect(factory.getByCode(defs[0].code)).toEqual(defs[0]);
      expect(factory.getByCode(defs[1].code)).not.toEqual(defs[0]);
    });
    test('should throw an error when not found', () => {
      factory.load(defs);
      expect(() => {
        factory.getByCode('NON');
      }).toThrow();
    });
  });
});
