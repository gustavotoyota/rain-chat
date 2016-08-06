from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from django.utils import timezone
from models import Message

def chat(request):
    return render(request, 'chat/chat.html', {})
    
def send(request):
    if request.is_ajax() and request.method == 'POST':
        message = Message()
        message.author = request.POST['author']
        message.text = request.POST['text']
        message.time = timezone.now()
        message.save()
        
        return JsonResponse({'time': message.time})
    else:
        raise Http404
        
def recv(request):
    if request.is_ajax() and request.method == 'POST':
        if request.POST.get('last_time', '') == '':
            return JsonResponse({'time': timezone.now(), 'messages': []})
        else:            
            messages = Message.objects.filter(time__gt = request.POST['last_time']).order_by('time')
            message_list = [{'author': message.author, 'text': message.text, 'time': message.time} for message in messages]
            
            return JsonResponse({'time': timezone.now(), 'messages': message_list})
    else:
        raise Http404