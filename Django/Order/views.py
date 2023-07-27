from django.shortcuts import render, redirect
from Items.models import items_info, items_category
from django.contrib.auth.decorators import login_required
from cart.cart import Cart
from django.http import HttpResponseBadRequest, HttpResponseRedirect, JsonResponse, HttpResponse
from django.template.loader import get_template
import json
from Order.models import Order_info, Order_total
from urllib.parse import unquote

def return_json(request):
    output = []
    cart = Cart(request)
    for i in cart.cart.keys():
        print('111')
        tmp = [
            cart.cart[i]['userid'],
            cart.cart[i]['product_id'],
            cart.cart[i]['name'],
            cart.cart[i]['quantity'],
            cart.cart[i]['price'],
            cart.cart[i]['image'],
            ]
        output.append(tmp)
    return output

def cart_add(request, product_id):
    product = items_info.objects.get(id=product_id)
    cart = Cart(request)
    
    cart.add(product)
    tmp = return_json(request)
    cart = []
    for i in tmp:
        product = {
                   'customer_id': i[0],
                   'food_id': i[1],
                   'name': i[2],
                   'quantity': i[3],
                   'price': i[4],
                   'image': unquote(unquote(i[5][1:])),
                  }
        cart.append(product)
    
    return HttpResponse(json.dumps(cart))


def item_clear(request, id):
    cart = Cart(request)
    product = items_info.objects.get(id=id)
    cart.remove(product)
    tmp = return_json(request)
    cart = []

    for i in tmp:
        product = {
                   'customer_id': i[0],
                   'food_id': i[1],
                   'name': i[2],
                   'quantity': i[3],
                   'price': i[4],
                   'image': unquote(unquote(i[5][1:])),
                  }
        cart.append(product)
    return HttpResponse(json.dumps(cart))



def item_increment(request, id):
    cart = Cart(request)
    product = items_info.objects.get(id=id)
    cart.add(product=product)
    tmp = return_json(request)
    cart = []
    sum = 0
    for i in tmp:
        sum = sum + float(i[4]) * int(i[3])
        product = {
                   'customer_id': i[0],
                   'food_id': i[1],
                   'name': i[2],
                   'quantity': i[3],
                   'price': i[4],
                   'image': unquote(unquote(i[5][1:])),
                  }
        cart.append(product)
    for item in cart:
        item['total_price'] = sum
    return HttpResponse(json.dumps(cart))



def item_decrement(request, id):
    cart = Cart(request)
    product = items_info.objects.get(id=id)
    cart.decrement(product=product)
    tmp = return_json(request)
    cart = []
    sum = 0
    for i in tmp:
        sum = sum + float(i[4]) * int(i[3])
        product = {
                   'customer_id': i[0],
                   'food_id': i[1],
                   'name': i[2],
                   'quantity': i[3],
                   'price': i[4],
                   'image': unquote(unquote(i[5][1:])),
                  }
        cart.append(product)
    for item in cart:
        item['total_price'] = sum
    return HttpResponse(json.dumps(cart))



def cart_clear(request):
    cart = Cart(request)
    cart.clear()
    tmp = return_json(request)
    cart = []

    for i in tmp:
        product = {
                   'customer_id': i[0],
                   'food_id': i[1],
                   'name': i[2],
                   'quantity': i[3],
                   'price': i[4],
                   'image': unquote(unquote(i[5][1:])),
                  }
        cart.append(product)
    return HttpResponse(json.dumps(cart))


def cart_detail(request):
    cart = Cart(request)
    tmp = return_json(request)
    cart = []
    sum = 0
    print(request.user.id)
    for i in tmp:
        if i[0] == request.user.id:
            sum = sum + float(i[4]) * int(i[3])
            product = {
                        'customer_id': i[0],
                        'food_id': i[1],
                        'name': i[2],
                        'quantity': i[3],
                        'price': i[4],
                        'image': unquote(unquote(i[5][1:])),
                        }
            cart.append(product)
    for item in cart:
        item['total_price'] = sum
    return HttpResponse(json.dumps(cart))


def create_order(request):
    cart = Cart(request)
    tmp = return_json(request)
    body_unicode = request.body.decode('utf-8')
    user_id = request.user.id ##        one customer only !!!!!!!!!!!!!!!!!!!!!!!!!!now
    body = json.loads(body_unicode)
    table_number_ = body['table_number']
    ##dining_way_ = request.POST.get('dining_way')
    orderinfo = Order_info.objects.create(
                              customer_id = user_id,
                              payment_status = 0, ##########change later
                              Dining_way = 0, ##########change later
                              table_number = table_number_, ##########change later
                              )
    orderinfo.save()
    sum = 0
    for i in tmp:
        product_id = i[1] 
        product_name = i[2]
        price = i[4]
        quantity = i[3]
        user = Order_info.objects.filter(customer_id = user_id)
        sum += float(price) * int(quantity)
        Order_total.objects.create(
                                   order_id = user[len(user) - 1], # get last user info
                                   product_id = product_id,
                                   product_name = product_name,
                                   price = price,
                                   quantity = quantity,
                                   status = 0,
                                   total_price = 0
                                   )
        for i in Order_total.objects.filter(order_id = user[len(user) - 1]):
            i.total_price = sum
            i.save()

        print(str(product_id) + ' ' + str(product_name) + ' ' + str(price) + ' ' + str(quantity))

    return HttpResponse('success')



def check_order(request):
    user_id = request.user.id
    user = Order_info.objects.filter(customer_id = user_id, payment_status = 0)   
    if not user:
        return HttpResponse(json.dumps([]))
    order_list = Order_total.objects.filter(order_id = user[len(user) - 1])
    return_order = []

    for i in order_list:
        product = {
                   'product_id': i.product_id,
                   'product_name': i.product_name,
                   'price': i.price,
                   'quantity': i.quantity,
                   'status': i.status,
                   'total_price': i.total_price,
                  }
        return_order.append(product)
    return HttpResponse(json.dumps(return_order))


def order_history(request):
    if request.method == "GET":
        user_id = request.user.id
        history = []
        user_order = Order_info.objects.filter(customer_id = user_id, payment_status = 1)
        
        for i in user_order :
            #assume status '3' is completed order
            all_order = Order_total.objects.filter(order_id = i)
            for j in all_order:
                tmp = {'product_id': j.product_id,
                    'product_name': j.product_name,
                    'price': j.price,
                    'quantity': j.quantity,
                    'status': j.status,
                    'total_price': j.total_price,
                    'time': str(j.create_at)[:19]}
                history.append(tmp)
        
    return HttpResponse(json.dumps(history))


def payment(request):
    if request.method == "POST":
        user_id = request.user.id
        Order_info.objects.filter(customer_id = user_id, payment_status = 0).update(payment_status = 1)

    return HttpResponse('success pay the bill!')

# for kitchen staff to use
# when status = 1, that means the kitchen staff complete that food, and now the wait staff can send the food
def order_0to1(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        order_id = body['order_id']
        food_id = body['product_id']
        order = Order_info.objects.filter(id=order_id)
        Order_total.objects.filter(order_id = order[len(order) - 1], product_id = food_id, status = 0).update(status = 1)
    return HttpResponse('success complete the food!')

# for wait staff to use
# when status = 2, that means the wait staff have sent the food to customer
def order_1to2(request):
    if request.method == "POST":
        order_id = request.POST.get('order_id')
        food_id = request.POST.get('product_id')
        order = Order_info.objects.filter(id=order_id)
        Order_total.objects.filter(order_id = order[len(order) - 1], product_id = food_id, status = 1).update(status = 2)
    return HttpResponse('success send the food!')
  
# for kitchen staff to use
def order_list_0(request):
    order_list = Order_total.objects.filter(status = 0).order_by('create_at')
    return_order = []
    
    
    for i in order_list:
        product = {
                   'product_id': i.product_id,
                   'product_name': i.product_name,
                   'quantity': i.quantity,  
                   'status': 'uncompleted', 
                   'order_id': i.order_id.id,                   
                   'create_at': str(i.create_at)[:19],
                  }
        return_order.append(product)
        
    return HttpResponse(json.dumps(return_order))
     
      

def order_list_1(request):
    order_list = Order_total.objects.filter(status = 1).order_by('create_at') | Order_total.objects.filter(status = 2).order_by('create_at')
    return_order = []

    for i in order_list:
        product = {
                    'product_id': i.product_id,
                   'product_name': i.product_name,
                   'quantity': i.quantity,  
                   'status': 'completed', 
                   'order_id': i.order_id.id,                   
                   'create_at': str(i.create_at)[:19],
                  }
        return_order.append(product)
    return HttpResponse(json.dumps(return_order))   

def order_list_1wait(request):
    
    order_list = Order_total.objects.filter(status = 1).order_by('create_at')
    return_order = {}
   
    for i in order_list:
        tmp = {
            'table_number':i.order_id.table_number,
            'product_id': i.product_id,
            'product_name': i.product_name,
            'price': i.price,
            'quantity': i.quantity,  
            'status': i.status, 
            'total_price': i.total_price,
            'create_at': str(i.create_at)[:19], 
        }
        if i.order_id.id in return_order:
            return_order[i.order_id.id].append(tmp)
        else:
            return_order[i.order_id.id] = [tmp]

        
    return HttpResponse(json.dumps(return_order))   

# for wait staff to use
def order_list_2(request):
    order_list = Order_total.objects.filter(status =2).order_by('create_at')
    return_order = {}

    for i in order_list:
      
        tmp = {
            'table_number':i.order_id.table_number,
            'product_id': i.product_id,
            'product_name': i.product_name,
            'price': i.price,
            'quantity': i.quantity,  
            'status': i.status, 
            'total_price': i.total_price,
            'create_at': str(i.create_at)[:19], 
        }
        if i.order_id.id in return_order:
            return_order[i.order_id.id].append(tmp)
        else:
            return_order[i.order_id.id] = [tmp]
        
    return HttpResponse(json.dumps(return_order))  

# for wait staff to use
def order_list_notPayment(request):
    order_list = Order_info.objects.filter(payment_status=0)
    return_order = {}

    for j in order_list:
        all_order = Order_total.objects.filter(order_id = j).order_by('order_id')
        print(all_order)
        for i in all_order:
            tmp = {
            'table_number':i.order_id.table_number,
            'product_id': i.product_id,
            'product_name': i.product_name,
            'price': i.price,
            'quantity': i.quantity,  
            'status': i.status, 
            'total_price': i.total_price,
            'create_at': str(i.create_at)[:19], 
        }
            if i.order_id.id in return_order:
                return_order[i.order_id.id].append(tmp)
            else:
                return_order[i.order_id.id] = [tmp]
        
    return HttpResponse(json.dumps(return_order))  

# for wait staff to use
def order_item_remove(request):
    if request.method == "POST":
        order_id = request.POST.get('order_id')
        food_id = request.POST.get('product_id')    
        order = Order_info.objects.filter(id=order_id)
        Order_total.objects.filter(order_id = order[len(order) - 1], product_id = food_id).delete()
    return HttpResponse('success delete the food!')
