// __tests__/test.js
// these imports are something you'd normally configure Jest to import for you
// automatically. Learn more in the setup docs: https://testing-library.com/docs/react-testing-library/setup#cleanup
import '@testing-library/jest-dom/extend-expect'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react'
import {render, fireEvent} from '@testing-library/react'

test('Testing test cases...', () => {
    expect(true).toBeTruthy();
    const testMessage = 'Test Message'
    const {queryByText, getByLabelText, getByText} = render(
        <div>
            <button label='show'>Show</button>
            <p>{testMessage}</p>
        </div>,
    )
  
    // query* functions will return the element or null if it cannot be found
    // get* functions will return the element or throw an error if it cannot be found
    
    // expect(queryByText(testMessage)).toBeNull()
  
    // the queries can accept a regex to make your selectors more resilient to content tweaks and changes.
    // fireEvent.click(getByLabelText(/show/i))
  
    // .toBeInTheDocument() is an assertion that comes from jest-dom
    // otherwise you could use .toBeDefined()
    expect(getByText(testMessage)).toBeInTheDocument()
});

