from django.contrib import admin
from django.contrib.auth.models import User
from .models import Post,Comment,Images,Profile

# Register your models here.
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Images)
admin.site.register(Profile)