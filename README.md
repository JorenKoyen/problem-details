# Problem Details

HTTP problem details model based on [RFC7807](https://tools.ietf.org/html/rfc7807). This package wraps the default `Error` object to throw better defined errors which are previously registered. This ensures that thrown errors are more consistent.

### Basic Example

```javascript
import { ProblemDefinition, DetailFactory, DefinitionFactory } from 'problem-details';

// setup definition factory
const definitionFactory = new DefinitionFactory();
definitionFactory.load([
  {
    code: 'C001',
    status: 400,
    title: 'You do not have enough credit',
    type: 'https://www.example.com/support/C001'
  }
]);

// setup detail factory
const detailFactory = new DetailFactory(definitionFactory);

// ...
// throw error
throw detailFactory.createFromCode('C001');
```
