import { CategoriesRepositoryImpl } from "./impl/categories-repository-impl";
import { ProductsRepositoryImpl } from "./impl/products-repository-impl";
import { OrdersRepositoryImpl } from "./impl/orders-repository-impl";

export const categoriesRepository = new CategoriesRepositoryImpl();
export const productsRepository = new ProductsRepositoryImpl();
export const ordersRepository = new OrdersRepositoryImpl();
