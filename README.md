# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29).


## Link

- Live Site URL: [Calculator app](https://inquisitive-peony-8a086a.netlify.app/)


## The challenge

The challenge required building a calculator application and i did using React.Completing it has further solidified my foundation in React development and strengthed my fondation in JS and css, on which equipped me with practical experience in building real-world applications.

Her is the detailes of the App component which is the main component of this solution. It manages the state variables using the useState hook and defines helper functions to handle calculations and user interactions. The component utilizes the useEffect hook to handle theme changes and applies different styles to buttons based on the current theme and element type.

### State

The App component manages the following state variables using the `useState` hook:

* `result` (string): Stores the current result displayed on the calculator.
* `prev_result` (string): Stores the previous result of the calculation.
* `last_click` (string): Stores the value of the last button clicked.
* `formulas` (array): Stores the formulas entered by the user.
* `theme` (number): Stores the current theme index.

### Helper Functions

The App component defines several helper functions to assist with calculations and user interactions:

* `resetAll()`: Resets all state variables to their initial values.
* `addZeroIfStartsWithDot(string)`: Adds a leading zero if the string starts with a dot.
* `removeLeadingZeros(string)`: Removes leading zeros from the string.
* `removeLastChar(str)`: Removes the last character from the string.
* `addDotIfNotPresent(str)`: Adds a dot to the string if it is not already present.
* `removeDotAtEnd(string)`: Removes the dot at the end of the string, if present.
* `removeExtraMinus(str)`: Removes extra minus signs from the string.
* `isMinus(token)`: Checks if a token is a minus sign.
* `evaluateExpression(expression)`: Evaluates the given expression and returns the result.
* `performOperation(operand1, operand2, operator)`: Performs the specified operation on the given operands and returns the result.
* `handleButton(event)`: Handles button clicks and updates the state variables accordingly.
* `selectAstyle(elem, th)`: Selects the appropriate style for a button based on the element and theme index.
* `createButtons()`: Dynamically creates the grid of buttons based on the `ButtonsChars` array.

### Lifecycle

The App component uses the `useEffect` hook to handle theme changes. It sets the body's class name based on the current theme. When the component is unmounted, it reverts the body's class name to the default.

### Rendering

The App component renders a container with the following elements:

* Navigation bar: Displays the app's logo and a theme toggle button.
* Display area: Displays the current result or the previous result.
* Operations grid: Displays the buttons for performing arithmetic operations.

### Styling

The App component applies different styles to the buttons based on the current theme and the element type. It utilizes inline styles to set the background color, text color, and box shadow of the buttons.
