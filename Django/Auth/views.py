from django.shortcuts import redirect, render, HttpResponse
from django.contrib import auth
from django.contrib.auth.models import User, Group, Permission
from django.http import HttpResponseBadRequest, HttpResponseRedirect, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

@csrf_exempt
def login(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("passwd")
        login = request.POST.get("login")
        signup = request.POST.get("signup") 
        
        if signup:
            return HttpResponseRedirect('/signup')

        if login:
            user = auth.authenticate(username = username, password = password)
            if user is None:
                return HttpResponseBadRequest("Wrong username or password.")
            else:
                auth.login(request, user)
                
                if User.objects.filter(pk=user.id, groups__name='Customer').exists():
                    resp = {'Role': "Customer", 'msg': "Successful login as a customer!"}
                    return HttpResponse(json.dumps(resp))
                if User.objects.filter(pk=user.id, groups__name='Wait staff').exists():
                    resp = {'Role': "Wait staff", 'msg': "Successful login as a wait staff!"}
                    return HttpResponse(json.dumps(resp))                    
                if User.objects.filter(pk=user.id, groups__name='Kitchen staff').exists():
                    resp = {'Role': "Kitchen staff", 'msg': "Successful login as a kitchen staff!"}
                    return HttpResponse(json.dumps(resp)) 
                if User.objects.filter(pk=user.id, groups__name='Manager').exists():
                    resp = {'Role': "Manager", 'msg': "Successful login as a manager!"}
                    return HttpResponse(json.dumps(resp))                                                 
                

@csrf_exempt
def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("passwd")
        back = request.POST.get("back")
        signup = request.POST.get("signup")
        if back:
            return HttpResponseRedirect('/login')
               
        if signup:
            if len(username) < 3 or len(password) < 6:
                return HttpResponseBadRequest("Username is at least 3 characters. Password is at least 6 characters.")
            if User.objects.filter(username = username):
                return HttpResponseBadRequest("User already exist!")
            
            new_user = User.objects.create_user(username = username, password = password)                
            new_user.save()
            customer_group = Group.objects.get(name = "Customer")
            new_user.groups.add(customer_group)
            user = auth.authenticate(username = username, password = password)
            auth.login(request, user)
            respmsg = {'Role': "Customer", "content": "Successful signup!", "status_code": 200}
            return HttpResponse(json.dumps(respmsg)) 
        
def logout(request):
    auth.logout(request)
    return HttpResponse("Logout.")

def permissions(request):
    customer_group = Group.objects.get(name = "Customer")
    manager_group = Group.objects.get(name = "Manager")
    
    p_view_cags = Permission.objects.get(id__in=[28])
    
    customer_group.permissions.add(p_view_cags)
    manager_group.permissions.add(p_view_cags)
    
    return HttpResponse("Initialize permissions.")
    
def setRole(request):
    if request.method == "POST":
        username = request.POST.get("username")
        role = request.POST.get("role")
        
        if User.objects.filter(username = username).exists() == False:
            return HttpResponse("No account exists for this username.")
        
        if role == "Wait staff":
            user = User.objects.get(username = username)
            user.groups.clear()
            waitStaff_group = Group.objects.get(name = "Wait staff")
            user.groups.add(waitStaff_group)
            return HttpResponse("Successfully converted the account to a wait staff account.")
        
        elif role == "Kitchen staff":
            user = User.objects.get(username = username)
            user.groups.clear()
            kitchenStaff_group = Group.objects.get(name = "Kitchen staff")
            user.groups.add(kitchenStaff_group)
            return HttpResponse("Successfully converted the account to a kitchen staff account.")   
        
        elif role == "Manager":
            user = User.objects.get(username = username)
            user.groups.clear()
            manager_group = Group.objects.get(name = "Manager")
            user.groups.add(manager_group)
            return HttpResponse("Successfully converted the account to a manager account.")
        
        elif role == "Customer":
            user = User.objects.get(username = username)
            user.groups.clear()
            customer_group = Group.objects.get(name = "Customer")
            user.groups.add(customer_group)
            return HttpResponse("Successfully converted the account to a customer account.")
        
def deleteAccount(request):
    if request.method == "POST":
        username = request.POST.get("username") 
        if User.objects.filter(username = username).exists() == False:
            return HttpResponse("No account exists for this username.")        
        
        user = User.objects.filter(username = username).delete()
        
        return HttpResponse("Successfully delete the account.")   