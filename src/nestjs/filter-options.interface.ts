import { ProblemDetailMessage } from '../models';

export interface FilterOptions {
  errorHandler?(problem: ProblemDetailMessage): void;
}
