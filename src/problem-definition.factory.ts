import { ProblemDefinition } from './models/problem-definition';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ProblemDefinitionFactory {
  /**
   * Stores all the registered problem details to help
   * aid the developer in reusing exceptions.
   */
  private definitionsMap = new Map<string, ProblemDefinition>();

  private isValid(definition: ProblemDefinition) {
    // transfor non literal objects to class objects
    // (needed for validation)
    definition = plainToClass(ProblemDefinition, definition);

    // validate definition
    const validationErrros = validateSync(definition);
    return validationErrros.length === 0;
  }

  /**
   * Registers a definition to the internal map so developers
   * only need to reference the `code`, instead of throwing a
   * completely new problem detail object.
   * @param definition Definition that needs to be registered
   */
  public register(definition: ProblemDefinition) {
    if (!this.isValid(definition)) {
      throw new Error('malformed definition, please check documentation');
    }

    if (this.definitionsMap.get(definition.code) !== undefined) {
      throw new Error('unable to register definition with allready existing code');
    }

    // insert definition into the map
    this.definitionsMap.set(definition.code, definition);
  }

  /**
   * Loads an array of definitions into the defintions map
   * @param definitions Array of defintions
   */
  public load(definitions: ProblemDefinition[]) {
    definitions.forEach(def => this.register(def));
  }

  /**
   * Returns a copy all registered definitions
   */
  public getDefinitions() {
    return Array.from(this.definitionsMap.values());
  }

  /**
   * Returns a definition based on the matching code.
   * @param code Refrence to a registered definition
   */
  public getByCode(code: string) {
    const def = this.definitionsMap.get(code);
    if (!def) throw new Error('unable to get definition of non existing code');
    return def;
  }
}
