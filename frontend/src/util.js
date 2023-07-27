const USER_INFO_KEY = "userInfoKey";
export const setUserInfo = (info) => {
  localStorage.setItem(USER_INFO_KEY, info);
};

export const getUserInfo = () => {
  let userInfo = {};
  try {
    userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY));
  } catch (error) { }
  return userInfo;
};
export const getRoleRouter = (loggedIn, roleName) => {
  console.log("NEVE " + roleName)
  let routers = [
    { path: "/menu", name: "Menu" },
    { path: "/booking", name: "Booking" },
    //{ path: "/edit-menu", name: "Edit Menu" },
    { path: "/shopping-cart", name: "Shopping Cart" },
    { path: "/pay-bill", name: "Pay Bill" },
    { path: "/need-assistance", name: "Need Assistance?" },
    { path: "/order-history", name: "Order History" },
    { path: "/", name: "Log out" },

  ];
  
  // console.log(JSON.parse(localStorage.getItem(USER_INFO_KEY)))
  if (!roleName) {
    return [
      { path: "/menu", name: "Menu" },
      { path: "/login", name: "Sign In" },
    ];
  }
  switch (roleName) {
    case "Manager":
      return  [
        { path: "/edit-menu", name: "Edit Menu" },
        { path: "/manage-accounts", name: "Manage Accounts" },
        { path: "/", name: "Log out" },
      ];
    case "Wait staff":
      return  [
        { path: "/orders", name: "Orders" },
        { path: "/all-bookings", name: "Bookings" },
        { path: "/needed-assistance", name: "Assistance" },
        { path: "/customer-bills", name: "Manage Bills" },
        { path: "/", name: "Log out" },
      ];
    case "Kitchen staff":
      return  [
        { path: "/kitchen-orders", name: "Orders" },
        { path: "/update-items", name: "Update Items"},
        { path: "/", name: "Log out" },
      ];
    case "Customer":
      return [
        { path: "/menu", name: "Menu" },
        { path: "/booking", name: "Booking" },
        { path: "/shopping-cart", name: "Shopping Cart" },
        { path: "/pay-bill", name: "Pay Bill" },
        { path: "/order-history", name: "Order History" },
        { path: "/need-assistance", name: "Need Assistance?" },
        { path: "/", name: "Log out" },
      ];
    default:
      return routers
  }
};

export const getColor = (roleName) => {
  let color = '#FE5B54'
  switch (roleName) {
    case "Manager":
      return  '#F28500'
    case "Wait staff":
      return '#7EC8E3'
    case "Kitchen staff":
      return  "#FFFF00"
    default:
      return color
  }
}
