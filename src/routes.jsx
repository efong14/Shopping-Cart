import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Errorpage from './components/Errorpage/Errorpage';
import Products from './components/Products/Products';
import Checkout from './components/Checkout/Checkout';

const routes = [
  {
    path: '/',
    element: <Navbar />,
    errorElement: <Errorpage />,
    children: [{ index: true, element: <Homepage /> }],
  },
  {
    path: 'nav',
    element: <Navbar />,
    children: [
      { path: 'products', element: <Products /> },
      { path: 'checkout', element: <Checkout /> },
    ],
  },
];

export default routes;
