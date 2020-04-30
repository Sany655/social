from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from django.http import HttpResponse,JsonResponse
from django.contrib import messages
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required
from .models import Post

# Create your views here.
@login_required
def posts(request):
  data = Post.objects.all()
  send = """"""
  for x in data:
    send += """<div class="card">
      <div class="card-header p-t-15">
        <div class="d-flex align-items-center justify-content-between m-b-30">
          <div class="w-4 d-flex align-items-center justify-content-between">
            <div class="avatar avatar-image m-r-15">
                      <img src="{% static 'images/avatars/thumb-3.jpg' %}"  alt="">
                  </div>
            <p class="" style="font-size:24px;">"""+x.owner.username+"""</p>
          </div>
          <div class="w-5"></div>
        </div>
      </div>
      <div class="card-body">
        <p>"""+x.content+"""</p>
        <hr>
        <div class="row">
          <div class="col-4">like</div>
          <div class="col-4 text-center">comment</div>
          <div class="col-4 text-right">share</div>
        </div>
      </div>
    </div>"""
  return HttpResponse(send)

def home(request):
  return render(request,'home.html')
  
def register(request):
  if request.method=='POST':
    fname = request.POST['firstname']
    lname = request.POST['lastname']
    uname = request.POST['username']
    email = request.POST['email']
    pass1 = request.POST['password']
    pass2 = request.POST['confirmPassword']
    if User.objects.filter(username=uname).exists():
      messages.info(request,"Username must be unique!")
      return render(request,'register.html')
    elif User.objects.filter(email=email).exists():
      messages.info(request,"Email must be unique")
      return render(request,'register.html')
    elif pass1!=pass2:
      messages.info(request,"password not matcting..")
      return render(request,'register.html')
    else:
      user = User.objects.create_user(username=uname,email=email,password=pass1)
      user = user(firstname=fname,lastname=lname)
      user.save()
      login(request,user)
      return redirect('home')
  else:
    return render(request,'register.html')

def userlogin(req):
  if req.method=="POST":
    username = req.POST['username']
    password = req.POST['password']
    user = authenticate(username=username,password=password)
    if user is not None:
      login(req, user)
      messages.success(req,"Welcome "+user.username)
      return redirect('home')
    else:
      messages.error(req,"Credentials are incorrect!")
      return redirect('home')
  else:
    return redirect('home')
      
@login_required
def userlogout(req):
  if req.method == 'POST':
    logout(req)
    messages.success(req,"Successfully loggedout!")
    return redirect('home')
  else:
    return redirect('home')