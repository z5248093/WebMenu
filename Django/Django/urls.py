"""Django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from Auth import views as Authviews
from Items import views as Itemsviews
from Order import views as Orderviews
from Booking import views as Bookingviews
from Assistance import views as Assistanceviews

urlpatterns = [
    path('login', Authviews.login),
    path('logout', Authviews.logout),
    path('signup', Authviews.signup),
    path('setRole', Authviews.setRole),
    path('deleteAccount', Authviews.deleteAccount),
    path('listAvailableItems/', Itemsviews.listAvailableItems),
    path('listUnavailableItems/', Itemsviews.listUnavailableItems),
    path('StopSupply/', Itemsviews.StopSupply),
    path('RestoreSupply/', Itemsviews.RestoreSupply),
    path('listItems', Itemsviews.listItems),
    path('listCags', Itemsviews.listCategories),
    path('queryItems', Itemsviews.queryItems),
    path('addItems', Itemsviews.addItems),
    path('deleteItems', Itemsviews.deleteItems),
    path('updateItems', Itemsviews.updateItems),
    path('addCategory', Itemsviews.addCategory),
    path('deleteCategory', Itemsviews.deleteCategory),
    path('updateCategory', Itemsviews.updateCategory),
    path('cart/add/<int:product_id>/', Orderviews.cart_add, name='cart_add'),
    path('cart/item_clear/<int:id>/', Orderviews.item_clear, name='item_clear'),
    path('cart/item_increment/<int:id>/',
         Orderviews.item_increment, name='item_increment'),
    path('cart/item_decrement/<int:id>/',
         Orderviews.item_decrement, name='item_decrement'),
    path('cart/cart_clear/', Orderviews.cart_clear, name='cart_clear'),
    path('cart/cart_detail/', Orderviews.cart_detail),

    path('cart/order/', Orderviews.create_order),
    path('cart/check_order/', Orderviews.check_order),

    path('cart/order_history/', Orderviews.order_history),
    path('order/status/0to1/', Orderviews.order_0to1),
    path('order/status/1to2/', Orderviews.order_1to2),
    path('order/status/0/', Orderviews.order_list_0),
    path('order/status/1/', Orderviews.order_list_1),


    path('order/status/0to1/', Orderviews.order_0to1),
    path('order/status/1to2/', Orderviews.order_1to2),
    path('order/status/0/', Orderviews.order_list_0),
    path('order/status/1/wait/', Orderviews.order_list_1wait),
    path('order/status/2/', Orderviews.order_list_2),
    path('order/status/not3/', Orderviews.order_list_notPayment),
    path('order/item/remove/', Orderviews.order_item_remove),
    
    
    path('listBookingDetails/', Bookingviews.listBookingDetails),
    path('addBooking/', Bookingviews.addBooking),
    path('deleteBooking/', Bookingviews.deleteBooking),
    path('updateBooking/', Bookingviews.updateBooking),
    path('listForwaitstaff/', Bookingviews.ListAllBooking_waitstaff),

    path('cart/payment/', Orderviews.payment),
    path('addAssistance/', Assistanceviews.addAssistance),
    path('deleteAssistance/', Assistanceviews.deleteAssistance),
    path('listAssistances/', Assistanceviews.listAssistances),
    path('listAllAssistances', Assistanceviews.listAllAssistances),
    path('completeAssistance', Assistanceviews.completeAssistance),

]
