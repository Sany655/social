from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Images(models.Model):
  user = models.ForeignKey(to=User,on_delete=models.CASCADE)
  img = models.ImageField(upload_to='images')
  album = models.CharField(max_length=10)
  status = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now_add=True)

class Files(models.Model):
  owner = models.ForeignKey(to=User,on_delete=models.CASCADE)
  file = models.FileField(upload_to='Files')
  status = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
  user = models.OneToOneField(to=User,on_delete=models.CASCADE)
  phone = models.IntegerField(null=True)
  age = models.IntegerField(null=True)
  gender = models.CharField(max_length=15, choices=[("male","male"),("female","female")])
  status = models.CharField(max_length=6,choices=[("single","single"),("marred","marred")])
  address = models.CharField(max_length=100)
  bio = models.CharField(max_length=100)
  def __str__(self):
    return self.user.username

class Post(models.Model):
  owner = models.ForeignKey(to=User,on_delete=models.CASCADE)
  activity = models.CharField(max_length=50)
  title = models.CharField(max_length=50)
  img = models.ForeignKey(to=Images,on_delete=models.CASCADE,blank=True,null=True)
  file = models.ForeignKey(to=Files,on_delete=models.CASCADE,blank=True,null=True)
  content = models.TextField()
  status = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now_add=True)
  def __str__(self):
    return self.title+' By '+self.owner.username
  
class Comment(models.Model):
  owner = models.ForeignKey(to=User,on_delete=models.CASCADE)
  post = models.ForeignKey(to=Post,on_delete=models.CASCADE)
  comment = models.TextField()
  status = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now_add=True)

class PostReact(models.Model):
  owner = models.ForeignKey(to=User,on_delete=models.CASCADE)
  post = models.ForeignKey(to=Post,on_delete=models.CASCADE)
  react = models.TextField()
  status = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now_add=True)
  
class CommentReact(models.Model):
  owner = models.ForeignKey(to=User,on_delete=models.CASCADE)
  comment = models.ForeignKey(to=Comment,on_delete=models.CASCADE)
  react = models.TextField()
  status = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now_add=True)
  
class Friend(models.Model):
  owner = models.ForeignKey(to=User,on_delete=models.CASCADE,related_name='owner')
  followed_by = models.BooleanField(default=True)
  friend = models.ForeignKey(to=User,on_delete=models.CASCADE,related_name='friend')
  following = models.BooleanField(default=False)
  activity = models.CharField(max_length=10,choices=[('close','Close friend'),('family','Family member'),('friend','Friend'),('request','Request')],default=friend)
  status = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now_add=True)