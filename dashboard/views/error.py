from django.views           import View
from django.shortcuts       import render, redirect
from .                      import lang

class Error( View ):
	def get(self, request):
		template = 'error' + lang.getTemplateByLanguage(request)
		return render(request, template)