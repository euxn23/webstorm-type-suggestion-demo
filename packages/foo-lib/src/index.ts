import {createComponent} from './create-component'

// compiled to `import('react').FC` type, not `React.FC` by tsc spec.
export const LibComponent = createComponent()