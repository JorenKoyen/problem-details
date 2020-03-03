import { HttpStatus } from './http-status';
import { IsString, Min, Max, IsUrl, IsAlphanumeric } from 'class-validator';

export class ProblemDefinition {
  @IsUrl()
  type: string;

  @IsString()
  title: string;

  @Min(100) // minimum HTTP status code
  @Max(599) // maximum HTTP status code
  status: HttpStatus | number;

  @IsAlphanumeric()
  code: string;

  constructor(type: string, title: string, status: HttpStatus | number, code: string) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.code = code;
  }
}
