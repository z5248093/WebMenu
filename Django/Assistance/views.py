from django.shortcuts import render
from datetime import datetime
from Assistance.models import assistance_info
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, permission_required

import json

# Create your views here.
def addAssistance(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        table_number = body['table_number']
        
        newAst = assistance_info.objects.create(
                            table_number = table_number,
                            customer_id = request.user.id
        )
        
        return HttpResponse("Successfully added assistance!")
    
def deleteAssistance(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        assistance_id = body["assistance_id"]
        assistance_info.objects.filter(pk__in=[assistance_id]).delete()
        
        return HttpResponse("Successfully deleted assistance!")

def listAssistances(request):
    astList = []
    assistances = assistance_info.objects.filter(customer_id=request.user.id)
    
    for a in assistances:
        astObj = {
            "assistance_id": a.id,
            "table_number": a.table_number,
            "create_time": str(a.create_time.year) + '-' + str(a.create_time.month) + '-' + str(a.create_time.day) + " " +
            str(a.create_time.hour) + ':' + str(a.create_time.minute) + ':' + str(a.create_time.second),
            "is_completed": a.is_completed
            }
        astList.append(astObj) 
        
    return HttpResponse(json.dumps(astList))
        
def completeAssistance(request):
    if request.method == "POST":
        ast_id = request.POST.get("id")
        assistance = assistance_info.objects.filter(pk__in=[ast_id]).update(is_completed = True)
        
        return HttpResponse("Successfully solved this assistance")
    
def listAllAssistances(request):
    print(request.user.username)
    astList = []
    assistances = assistance_info.objects.filter(is_completed = False)
    
    for a in  assistances:
        print("test")
        astObj = {
            "id": a.id,
            "table_number": a.table_number,
            "create_time": str(a.create_time.year) + '-' + str(a.create_time.month) + '-' + str(a.create_time.day) + " " +
            str(a.create_time.hour) + ':' + str(a.create_time.minute) + ':' + str(a.create_time.second),
            "is_completed": a.is_completed
            }
        astList.append(astObj) 
        
    return HttpResponse(json.dumps(astList))
               