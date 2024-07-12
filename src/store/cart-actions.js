import { cartAction } from "./cart-slice";
import { uiActions } from "./ui-slice";
export function fetchDatafromDataBase() {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-auth-4c2bc-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Data from Firebase");
      }
      const resData = await response.json();
      return resData;
    };
    try {
      const cartData = await fetchData();
      dispatch(cartAction.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "fetching  data to cart is failed",
        })
      );
    }
  };
}
export function sendCartData(cart) {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "send cart data...",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-auth-4c2bc-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send cart data");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success...",
          message: "sent data to cart sucessfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error...",
          message: "seding  data to cart failed",
        })
      );
    }
  };
}
