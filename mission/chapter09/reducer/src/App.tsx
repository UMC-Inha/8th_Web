
import { RouterProvider, type RouteObject, createBrowserRouter } from 'react-router-dom'
import './App.css'
import UseReducerPage from './useReducerPage'
import UseReducerCompany from './UseReducerCompany';
import HomeLayout from './HomeLayout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <UseReducerPage />
      },
      {
        path: 'company',
        element: <UseReducerCompany />
      },
    ]
  }
];

const route = createBrowserRouter(routes);

function App() {

  return (
    <>
      <RouterProvider router={route}/>
    </>
  )
}

export default App
