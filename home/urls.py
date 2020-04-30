from django.urls import path
from . import views


urlpatterns = [
  path('',views.home,name="home"),
  path('posts',views.posts,name="posts"),
  path('register',views.register,name="register"),
  path('login',views.userlogin,name="login"),
  path('logout',views.userlogout,name="logout")
]