import Home from "../component/home";
import Category from "../component/category";
import Product from '../containers/product';
import AddProduct from '../containers/product/product-add';
const routes = [
{
  path: '/',
  component: Home,
  exact: true
},
{
  path: '/category',
  component: Category,
  exact: true
},
{
path: '/product',
component: Product,
exact: true
},
{
path: '/product/add',
component: AddProduct,
exact: true
}
];

export default routes;