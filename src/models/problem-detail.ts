import { HttpStatus } from './http-status';

export class ProblemDetail extends Error {
  /**
   * A URI refrence [RFC3986] that identifies the problem type.
   * This specification encourages that, when derefenced, it
   * provides human-readable documentation for the problem type
   * (e.g., using HTML). When this member is not present, it's
   * value is assumbed to be `about:blank`
   */
  readonly type: string;

  /**
   * A short, human readable summary of the problem type.
   * It SHOULD NOT change from occurrence to occurrence of the
   * problem, except for puposes of localization.
   */
  readonly title: string;

  /**
   * The HTTP status code generated by the origin server for this
   * occurence of the problem.
   */
  readonly status: HttpStatus | number;

  /**
   * A unique identifier to easily find the error in logs.
   */
  readonly identifier: string;

  /**
   * An error code that maps 1 to 1 with the type developers can program with
   */
  readonly code: string;

  /**
   * Creates a new problemdetail error object
   * @param type URI reference [RFC3986] that identifies the problem type
   * @param title Short human readable summary of the problem type
   * @param status HTTP status code generated by the origin server
   * @param identifier Unique identifier to easily find the error in the logs
   * @param code Error code that maps 1 to 1 with tyep type developers can program with
   */
  constructor(
    type: string,
    title: string,
    status: HttpStatus | number,
    identifier: string,
    code: string
  ) {
    super(title); // super constructor

    // see: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ProblemDetail.prototype);

    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
    Error.captureStackTrace(this, ProblemDetail);

    this.name = 'ProblemDetail';
    this.type = type;
    this.title = title;
    this.status = status;
    this.identifier = identifier;
    this.code = code;
  }
}
