# Implementation of a blog list application by Dila ONGUN

This app is created via [Create React App](https://create-react-app.dev/).
Creates an blog post and shows a list of blogs.

# Requirements

To run this project manually, you need Node.js installed on your environment. It also includes npm.
To check if they are installed on your environment, run and see available version successfully:

    $ node --version

    $ npm --version

# Start

To start the app, run the following commands:

    $ npm install

    $ npm run start

# Test

To test the app, run the following command:

    $ npm run test

## Languages & Tools

### JavaScript

- [React](http://facebook.github.io/react) is used as framework.

### TypeScript

- [TypeScript](https://www.typescriptlang.org/) is used.

### Eslint

- [Eslint](https://eslint.org/) is used to support code quality.

### Redux DevTools

- [Redux DevTool](https://github.com/reduxjs/redux-devtools) is used to monitor Redux activities easily over browser.

### CSS

- [SCSS](https://sass-lang.com/) is used for styling.
- [Material-UI](https://mui.com/) is used for some of the UI components.
- [Google Fonts](https://fonts.google.com/) and [Google Icons](https://fonts.google.com/icons) are used for font and icons.

### State Management

- [Redux](https://redux.js.org/) is used for state management.

### Page Routing

- [React Router](https://reactrouter.com/) is used for page routing.

### Responsiveness

- Responsiveness is supported with media query.

### Build

- [Webpack](https://webpack.js.org/) is used as build tool.

### Compiler

- [Babel](https://babeljs.io/) is used as compiler.

### Test

- [React Testing Library](https://testing-library.com/) and [Jest](https://jestjs.io/) are used for testing purposes.
- [Redux mock store](https://github.com/reduxjs/redux-mock-store) is used to create a mock Redux store.

# Further Improvements

- Additional eslint configurations might be useful in future.
- Additional features such as a new page to show details of a blog post.

# About Structure

My main concerns are readability, maintainability, reusability, clean code.

To provide these concerns, it is preferred a structure via folders:

- tests: Tests
- api: API requests
- components: Base helper components
- constants: Constants
- hooks: Custom hooks
- modules: Pages
- scss: Css utilities
- shared: Components that are used in modules
- store: Redux files

For CSS classNames, BEM naming convention is preferred.

All implementation assumes this application gets bigger. So, I focused on splitting everything into pieces.

To support clean code principle, I have implemented the components that have same functionality. (for ex. [BlogItem](https://github.com/dbtmn/assessment-blog-list/tree/main/src/shared/BlogItem))
If a component is used in similar purpose, I implemented it with different options. (for ex. [BlogList](https://github.com/dbtmn/assessment-blog-list/tree/main/src/shared/BlogList) is used in both Home and Blog pages. Home page renders it with size variant small and load more functionality, while Blog page renders it with size variant large and pagination functionality.)

# About features

User has ability to access two different pages. <br /> User accesses Home page as home page. In Home page:
- A banner image, navigation are available on top.
- Under the banner image, there are create a post and listing of blogs (with category Tech) functionalities.
    - User fills the form on the left hand-side and clicks the button. Text of the button is changed into Sending... in pending state. If request is successful, the text is changed into Saved! 
        - After 3 seconds, the form is cleared, the button text is changed into default.
        - If user creates a blog post with category Tech, then right hand-side the list is refreshed.
    - User clicks Load More on the right hand-side. Next page is added. Load More button stays at the bottom and a vertical scroll bar is visible for the list.
- User clicks Blog on the navigation. <br />

In Blog page:
- There are listing of blogs and pagination functionalities.
- User has ability to change page. <br />

Each blog item has details such as created date, category, image, content. Add,tionally, blog items have animation on hover.

The spaces to the right and left of the content are shrinked/enlarged, if screen width is changed for the breakpoints 800px and 1080px.
In Home page, a row has 1 item in blog listing, if screen width is smaller than 1080px.

For both of the pages, error and loading designs are available.