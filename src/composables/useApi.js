export const fetchCategories = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (Math.random() > 0.8) throw new Error("Ошибка загрузки категорий");

  return [
    { id: 1, name: "Электроника" },
    { id: 2, name: "Одежда" },
    { id: 3, name: "Книги" },
    { id: 4, name: "Спорт" },
  ];
};

export const fetchProducts = async (categoryId) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (Math.random() > 0.9) throw new Error("Ошибка загрузки товаров");

  const productsByCategory = {
    1: [
      { id: 101, name: "Смартфон", price: 29999 },
      { id: 102, name: "Ноутбук", price: 59999 },
      { id: 103, name: "Наушники", price: 4999 },
    ],
    2: [
      { id: 201, name: "Футболка", price: 1999 },
      { id: 202, name: "Джинсы", price: 3999 },
      { id: 203, name: "Куртка", price: 7999 },
    ],
    3: [
      { id: 301, name: "Художественная литература", price: 599 },
      { id: 302, name: "Научная книга", price: 1299 },
      { id: 303, name: "Детская книга", price: 399 },
    ],
    4: [
      { id: 401, name: "Мяч футбольный", price: 2999 },
      { id: 402, name: "Гантели", price: 1999 },
      { id: 403, name: "Коврик для йоги", price: 1499 },
    ],
  };

  return productsByCategory[categoryId] || [];
};

export const submitOrder = async (orderData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (Math.random() > 0.7)
    throw new Error("Ошибка сервера при обработке заказа");

  return {
    id: Math.floor(Math.random() * 1000),
    ...orderData,
    createdAt: new Date().toISOString(),
  };
};
