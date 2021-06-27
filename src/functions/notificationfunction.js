import axios from "axios";
import BASE_URL from "../api";


const getNotifications = (
  userId,
  resturantId,
  notiDispatch,
) => {
  axios
    .post(`${BASE_URL}/api/notification/getNotification`, {
      userId,
    })
    .then((res) => {
      const { notification } = res.data;
      if (resturantId !== undefined) {
        axios
          .post(`${BASE_URL}/api/notification/getrestaurantNotification`, {
            resturantId,
          })
          .then((res1) => {
            const { restaurantNotification } = res1.data;
            notiDispatch({
              type: "GET_NOTIFICATIONS",
              payload: notification,
            });

            notiDispatch({
              type: "GET_NOTIFICATIONS_RESTAURANT",
              payload: restaurantNotification,
            });
          })
          .catch((err1) => console.log(err1));
      } else {
        notiDispatch({
          type: "GET_NOTIFICATIONS",
          payload: notification,
        });
      }
    })
    .catch((err) => console.log(err));
};

export { getNotifications };
