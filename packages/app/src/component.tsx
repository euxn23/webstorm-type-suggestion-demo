import React from 'react'
import {LibComponent} from 'foo-lib'

export const Component = <LibComponent /> // `type import('react').FC` is suggested as react component (in JSX) only when already imported.
export const Component2 = LibComponent // suggested correctly as non-component.