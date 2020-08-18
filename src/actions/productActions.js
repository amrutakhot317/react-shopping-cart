import {
  FETCH_PRODUCTS,
  FILTER_PRODUCT_BY_SIZE,
  SORT_ORDER_PRODUCT_BY_PRICE,
} from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCT_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "Latest") {
    sortedProducts.sort((a, b) => (a._id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "Lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: SORT_ORDER_PRODUCT_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
