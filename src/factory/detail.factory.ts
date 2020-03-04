import { DefinitionFactory } from './definition.factory';
import { ProblemDetail } from '../models/problem-detail';
import { v4 as uuid } from 'uuid';
import { ProblemDefinition } from '../models/problem-definition';
export class DetailFactory {
  private readonly definitionFactory: DefinitionFactory;

  constructor(definitionFactory: DefinitionFactory) {
    this.definitionFactory = definitionFactory;
  }

  /**
   * Creates a ProblemDetail error based on the passed code.
   * @param code Code refering to a definition
   */
  createFromCode(code: string) {
    const def = this.definitionFactory.getByCode(code);
    return this.create(def);
  }

  /**
   * Creates a ProblemDetail based on a definition.
   * @param definition Defintion of the problem
   */
  create(definition: ProblemDefinition) {
    const identifier = uuid();
    return new ProblemDetail(
      definition.type,
      definition.title,
      definition.status,
      identifier,
      definition.code
    );
  }
}
