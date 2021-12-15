from django.views		   import View
from django.shortcuts	   import render, redirect
import json

from .                      import lang

class ChangeLang( View ):
	def get(self, request):
		path = lang.getPath(request)
		return redirect( path )