# Problem Details

HTTP problem details model based on [RFC7808](https://tools.ietf.org/html/rfc7807). This package wraps the default `Error` object in javascript to throw extensive errors which are previously defined.

### Basic Example

```javascript
import { ProblemDetail, ProblemDefinition } from 'problem-details';

// create definition
const definition = new ProblemDefinition(
  'https://www.example.com/support/C001', // type -> must be URL
  'You do not have enough credit.', // title -> short instructive message
  400, // status -> HTTP status code
  'C001' // code -> code used by developer
);

// register definition
ProblemDetail.factory.register(definition);

// ...
// throw error
throw new ProblemDetail('C001');
```
