import Home from "../component/home";
import Category from "../component/category";

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
}
];

export default routes;