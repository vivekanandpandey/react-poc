### `Project Overview`

This Application is represting the Financial Asset Overview that allows users to view financial asset data in a table format. Users can sort the data based on different columns and navigate through multiple pages using pagination controls or complete data load one time with vertical scroll.

The screenshot below showcases the main page of the application. This page presents users with a table displaying key financial asset data, including ticker, price, and asset class. Users can interact with the table by sorting columns and navigating through multiple pages using pagination controls. This user-friendly interface allows for easy exploration and analysis of financial asset information.

<img width="1297" alt="Screenshot 2024-04-23 at 7 44 50 AM" src="https://github.com/vivekanandpandey/react-poc/assets/30744442/0cf28212-32ce-4711-bfe3-771290e44b31">

### Before starting belows script Make sure latest Node is installed in your Desktop/Laptop

Refer below link to install node, if dont have node in your machine:

https://nodejs.org/en/download

## Available Scripts

In the project directory, you can run:
### `npm i --legacy-peer-deps`

install all dependent node module requird for ths project.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage`

npm run coverage create the test report in LCOV format. once npm run coverage command complete follow below path to get report 
<fromProjectPath/coverage/locov-report/index.html

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.




## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



# Generic Components 

## Overview

This project provides a set of generic components for use in web applications. These components are designed to be flexible, customizable, and easy to integrate into various projects. The library includes components such as tables, sorting, and pagination, offering solutions for common UI requirements.

## Features

- **Table Component**: Display tabular data with support for sorting and pagination.
- **Sorting Component**: Sort data in ascending or descending order based on specified columns.
- **Pagination Component**: Paginate through large datasets for improved performance and user experience.

## How to Use generic components

 ## Table Component
 
import { Table } from '<fromProjectPath>/src/components/table/Table';


  < Table
	 
  data={data}
  
  columns={columns}
  
  pagination={{ isPaginationRequired: true, pageSize: 10 }}
  
  sort={{ isSortRequired: true, defaultSortKey: 'columnName', defaultSortOrder: 'asc' }}
	
/>
  
#### Table Props Description

- **data**: Mandatory props: Array of objects representing the data to be displayed.
 
- **columns**: Mandatory props: Array of objects defining the columns of the table.
 
 - **pagination**: Optional props : default is false : Configuration object if need  paginated data: other wise data table will render complete date with verticle scroll
 
 - **sort**: Optional props : default is false : Configuration object for sorting if sorting requird.
 
## Sorting Component

import { Sorting } from '<fromProjectPath>/src/components/sorting';

<Sorting
	
  data={data}
	
  columns={columns}
	
  onSort={handleSort}
/>

## Sorting Props Description

- **data**: Array of objects representing the data to be sorted.

- **columns**: Array of objects defining the columns of the table.

- **onSort**: Function to handle sorting.

import { Pagination } from '<fromProjectPath>/src/components/pagination';

## Pagination Component

<Pagination

  onPageChange={handlePageChange}
	
  totalCount={totalCount}
	
  pageSize={pageSize}
	
  siblingCount={siblingCount}
	
  currentPage={currentPage}
/>

### Pagination Props Description

- **onPageChange**: Function to handle page change event.

- **totalCount**: Total number of items.

- **pageSize**: Number of items per page.

- **siblingCount**: Number of sibling pages to display.
 
- **currentPage**: Current page number.



#### Below images is the snapshot of the code coverage:
<img width="1438" alt="Screenshot 2024-04-23 at 6 22 33 PM" src="https://github.com/vivekanandpandey/react-poc/assets/30744442/5c37d5f2-fe00-41e5-a4cd-9cc639be5c59">




