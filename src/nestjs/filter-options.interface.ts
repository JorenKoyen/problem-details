import { ProblemDetailMessage } from 'src/models';

export interface FilterOptions {
  errorHandler?(problem: ProblemDetailMessage): void;
}
