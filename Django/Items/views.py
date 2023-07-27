from datetime import datetime
from unicodedata import category, name
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.shortcuts import render
import json
from Items.models import items_info, items_category

# Create your views here.

def listCategories(request):
    cagList = []
    cags = items_category.objects.all()
    for c in cags:
        cagObj = {
            "id": c.id,
            "name": c.name
        }
        cagList.append(cagObj)
        
    return HttpResponse(json.dumps(cagList))

def listItems(request):
    if request.method == "GET":
        cag = request.GET.get("category")
        itemList = []
        items = items_info.objects.filter(category = cag)
        for i in items:
            itemsObj = {"id": i.id,
                        "name": i.name,
                        "price": i.price,
                        "image": str(i.image),
                        "description": i.description,
                        "ingredients": i.ingredients,
                        "category": i.category.name,
                        "offer_status": i.offer_status}
            itemList.append(itemsObj)
        
        return HttpResponse(json.dumps(itemList))


def queryItems(request):
    if request.method == "GET":
        keyword = request.GET.get("keyword")
        itemList = []
        items = items_info.objects.filter(name__icontains = keyword)
        for i in items:
            itemsObj = {"name": i.name,
                        "id": i.id,
                        "price": i.price,
                        "description": i.description,
                        "ingredients": i.ingredients,
                        "category": i.category.id,
                        "offer_status": i.offer_status,
                        "image": str(i.image)}
            itemList.append(itemsObj)
            
        return HttpResponse(json.dumps(itemList))    


def addItems(request):
    if request.method == "POST":
        item_name = request.POST.get("name")
        item_price = request.POST.get("price")
        item_image = request.POST.get("image")
        item_description = request.POST.get("description")
        item_ingredients = request.POST.get("ingredients")
        item_category = request.POST.get("category_id")
        item_offerStatus = request.POST.get("offer_status")
        
        if float(item_price) < 0:
            return HttpResponseBadRequest("Price cannot be negative.")
        
        if items_info.objects.filter(name = item_name).exists():
            return HttpResponseBadRequest("This item's name already exist!")
        
        newItem = items_info.objects.create(
                                            name = item_name,
                                            price = item_price,
                                            image = item_image,
                                            description = item_description,
                                            ingredients = item_ingredients,
                                            category_id = item_category,
                                            offer_status = item_offerStatus
                                            )
        
        return HttpResponse("Successfully add new items.")


def deleteItems(request):
    if request.method == "POST":
        item_id = request.POST.get("id")
        items = items_info.objects.filter(pk__in=[item_id]).delete()
        
        return HttpResponse("Successfully delete items.")


def updateItems(request):
    if request.method == "POST":
        item_id = request.POST.get("id")
        item_name = request.POST.get("name")
        item_price = request.POST.get("price")
        item_image = request.POST.get("image")
        item_description = request.POST.get("description")
        item_ingredients = request.POST.get("ingredients")
        item_category = request.POST.get("category_id")
        item_offerStatus = request.POST.get("offer_status")
        
        if float(item_price) < 0:
            return HttpResponseBadRequest("Price cannot be negative.")        
       
        if items_info.objects.filter(name = item_name).exclude(id = item_id).exists():
            return HttpResponseBadRequest("This item's name already exist!")      
        
        items = items_info.objects.filter(pk__in=[item_id]).update(                                           
                                            name = item_name,
                                            price = item_price,
                                            image = item_image,
                                            description = item_description,
                                            ingredients = item_ingredients,
                                            category_id = item_category,
                                            offer_status = item_offerStatus,
                                            update_time = datetime.now())
        
        return HttpResponse("Successfully update item.")

       
def addCategory(request):
    if request.method == "POST":
        cags_name = request.POST.get("name")
        
        if items_category.objects.filter(name = cags_name).exists():
            return HttpResponseBadRequest("This category's name already exist!")
        
        newCags = items_category.objects.create(name = cags_name)
        
        return HttpResponse("Successfully add new category.")


def deleteCategory(request):
    if request.method == "POST":
        cags_id = request.POST.get("id")
        cags = items_category.objects.filter(pk__in=[cags_id]).delete()
        
        return HttpResponse("Successfully delete category.")


def updateCategory(request):
    if request.method == "POST":
        cags_id = request.POST.get("id")
        cags_name = request.POST.get("name")
        
        if items_category.objects.filter(name = cags_name).exists():
            return HttpResponseBadRequest("This category's name already exist!")      
        
        items = items_category.objects.filter(pk__in=[cags_id]).update(name = cags_name)
        
        return HttpResponse("Successfully update category.")


def listAvailableItems(request):
    itemList = []
    avaitems = items_info.objects.filter(offer_status = True)
    
    for i in avaitems:
        itemsObj = {
            "item_id": i.id,
            "item_name": i.name,
            "picture": str(i.image)
        }
        itemList.append(itemsObj)
        
    return HttpResponse(json.dumps(itemList))


def listUnavailableItems(request):
    itemList = []
    unavaitems = items_info.objects.filter(offer_status = False)
    
    for i in unavaitems:
        itemsObj = {
            "item_id": i.id,
            "item_name": i.name,
            "picture": str(i.image)
        }
        itemList.append(itemsObj)
        
    return HttpResponse(json.dumps(itemList))


def StopSupply(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        id = body["item_id"]
        items = items_info.objects.filter(pk__in=[id]).update(offer_status = False)
        
        return HttpResponse("Setup successful.")

   
def RestoreSupply(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        id = body["item_id"]
        items = items_info.objects.filter(pk__in=[id]).update(offer_status = True)
        
        return HttpResponse("Setup successful.") 
        

