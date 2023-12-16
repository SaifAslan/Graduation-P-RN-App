import { ICart } from "../interfaces/cart";

export 
const calcTotal = (cart: ICart): number => {
  const total = cart.items.reduce(
    (total, item) => total + item.product.sell_price * item.quantity,
    0,
  );
  return total;
};

