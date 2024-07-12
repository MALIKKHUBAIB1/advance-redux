import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/Notification";
import { fetchDatafromDataBase, sendCartData } from "./store/cart-actions";
let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.ui.cartVisible);
  const notification = useSelector((state) => state.ui.notification);
  // console.log(notification);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDatafromDataBase());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    //FIXING THE BUG:  when we fetch data from data base it automtaiclyy sending the request to to the database beacuse the cart item is changed so that is the common problem solved by falg variable and one issue is that when we take flag vaible we it will aso send to the database but we dont want it
    if (cart.changed) {
      dispatch(
        sendCartData({
          items: cart.items || [],
          totalQuantity: cart.totalQuantity,
        })
      );
    }
  }, [cart, dispatch]);
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 3000); // Hide notification after 3 seconds

      return () => {
        clearTimeout(timer); // Clear the timeout if the component unmounts or notification changes
      };
    }
  }, [notification, dispatch]);
  return (
    <Fragment>
      <Layout>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
