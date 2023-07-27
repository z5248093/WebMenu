from django.http import HttpResponse
import json
from Booking.models import Booking_info
from django.views.decorators.csrf import csrf_exempt

def listBookingDetails(request):
    bookList = []
    books = Booking_info.objects.filter(customer_id=request.user.id)
    
    for book in books:
        bookObj = {
            "id": book.id,
            "party_size": book.party_size,
            "book_date": book.book_date,
            "seating_area": book.seating_area,
            "book_time": book.book_time,
            "customer_id": book.customer_id,
            "phone_number": book.phone_number,
            }
        bookList.append(bookObj)
        
    return HttpResponse(json.dumps(bookList))



def addBooking(request):
    
    if request.method == "POST":
        # book_id = request.POST.get("id")
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        book_party_size = body["party_size"]
        book_date = body["book_date"]
        book_seating_area = body["seating_area"]
        book_time = body["book_time"]
        #book_phone_number = body["phone_number"]
        book_customer_id = request.user.id
        book_name = request.user.username
 
        Booking_info.objects.create(
                                    party_size = book_party_size,
                                    book_date = book_date,
                                    seating_area = book_seating_area,
                                    book_time = book_time,
                                    customer_id = book_customer_id,
                                    #phone_number = 00000000,
                                    book_name = book_name
        )
    return HttpResponse("Congratulations! Successfully add new booking.")


def deleteBooking(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        booking_id = body["id"]
        Booking_info.objects.filter(id=booking_id).delete()
        
        return HttpResponse("Successfully delete booking.")
    

def updateBooking(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        book_id = body["id"]
        book_party_size = body["party_size"]
        book_date = body["book_date"]
        book_seating_area = body["seating_area"]
        book_time = body["book_time"]
        #book_phone_number = body["phone_number"]
             
        
        Booking_info.objects.filter(id=book_id).update(                                           
                                        party_size = book_party_size,
                                        book_date = book_date,
                                        seating_area = book_seating_area,
                                        book_time = book_time
                                        #phone_number = book_phone_number
                                        )
        
        return HttpResponse("Successfully update booking information.")
            


def ListAllBooking_waitstaff(request):
   
    bookList_waitstaff = []
    books = Booking_info.objects.order_by('-book_date', '-book_time').reverse()
    
    for book in books:
        bookObj = {
            "id": book.id,
            "book_name": book.book_name,
            "party_size": book.party_size,
            "book_date": book.book_date,
            "seating_area": book.seating_area,
            "book_time": book.book_time,
            "customer_id": book.customer_id
            #"phone_number": book.phone_number,
            }
        bookList_waitstaff.append(bookObj)
        
    return HttpResponse(json.dumps(bookList_waitstaff))