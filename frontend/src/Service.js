import axios from "axios";
const removeCardQuantity = async (id) => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/item_decrement/${id}/`,
    method: "GET",
  });
};
const addCardQuantity = async (id) => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/item_increment/${id}/`,
    method: "GET",
  });
};
const getCardDetail = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/cart_detail/`,
    method: "GET",
  });
};
const cartOrder = async (id) => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/order/`,
    method: "POST",
    data: { table_number: id || 0 }
  });
};
const checkOrder = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/check_order/`,
    method: "GET",
  });
};
const getOrderHistory = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/order_history/`,
    method: "GET",
  });
};
const cardClear = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/cart_clear/`,
    method: "GET",
  });
};
const cartItemClear = async (id) => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/item_clear/${id}/`,
    method: "GET",
  });
}

const cartPayment = async (id) => {
  return await axios({
    url: `http://127.0.0.1:8000/cart/payment/`,
    method: "POST",
  });
}

const getlistBookingDetails = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/listBookingDetails/`,
    method: "GET",
  });
}
const addBooking = async (params) => {
  return await axios({
    url: `http://127.0.0.1:8000/addBooking/`,
    method: "POST",
    data: { ...params }
  });
}
const updateBooking = async (params) => {
  return await axios({
    url: `http://127.0.0.1:8000/updateBooking/`,
    method: "POST",
    data: { ...params }
  });
}
const deleteBooking = async (id) => {
  return await axios({
    url: `http://127.0.0.1:8000/deleteBooking/`,
    method: "POST",
    data: {
      id
    }
  });
}
const getOrder = async (status) => {
  return await axios({
    url: `http://127.0.0.1:8000/order/status/${status}/`,
    method: "GET",
  });
}
const orderStatusChange = async (params) => {

  return await axios({
    url: `http://127.0.0.1:8000/order/status/0to1/`,
    method: "POST",
    data: {
      ...params
    }
  });
}
const getSuppliesList = async (type) => {
  if (type === 1) {
    return await axios({
      url: `http://127.0.0.1:8000/listAvailableItems/`,
      method: "GET",
    });
  } else {
    return await axios({
      url: `http://127.0.0.1:8000/listUnavailableItems/`,
      method: "GET",
    });
  }
}
const suppliesStatusChange = async (type, id) => {
  if (type === 1) {
    return await axios({
      url: `http://127.0.0.1:8000/RestoreSupply/`,
      method: "POST",
      data: {
        item_id: id
      }
    });
  } else {
    return await axios({
      url: `http://127.0.0.1:8000/StopSupply/`,
      method: "POST",
      data: {
        item_id: id
      }
    });
  }
}

const readyOrders = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/order/status/1/wait/`,
    method: "GET"
  });
}

const readyToPayOrders = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/order/status/not3/`,
    method: "GET"
  });
}

const allBookings = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/listForwaitstaff/`,
    method: "GET"
  });
}

const getListAllAssistances = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/listAllAssistances`,
    method: "GET"
  });
}

const addAssistance = async (table_number) => {
  //let param = new URLSearchParams();
  //param.append("table_number", table_number);
  return await axios({
    url: `http://127.0.0.1:8000/addAssistance/`,
    method: "POST",
    data: {
      table_number: table_number
    }
  });
}


const getListAssistances = async () => {
  return await axios({
    url: `http://127.0.0.1:8000/listAssistances/`,
    method: "GET",

  });
}
const deleteAssistance = async (id) => {
  return await axios({
    url: `http://127.0.0.1:8000/deleteAssistance/`,
    method: "POST",
    data: {
      assistance_id: id
    }
  });
}

export { getListAssistances, deleteAssistance, getlistBookingDetails, addBooking, updateBooking, removeCardQuantity, addCardQuantity, getCardDetail, cartOrder, checkOrder, getOrderHistory, getOrder, cardClear, cartItemClear, cartPayment, deleteBooking, readyOrders, allBookings, getListAllAssistances, addAssistance, readyToPayOrders, orderStatusChange, getSuppliesList, suppliesStatusChange };
