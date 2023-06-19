from django.views.generic.edit import FormView
from django.contrib.auth import authenticate, login

from django.contrib.auth.models import User
from django import forms

from django.core.validators import RegexValidator #正则验证
from django.core.exceptions import ValidationError #用于自定义表单错误信息

class RegisterForm(forms.Form):
    username = forms.CharField(
        label='Username',
        help_text='Username should not contain space or @.',
        max_length=20,
        initial='',
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        validators=[RegexValidator(
            regex=r'^[\u4E00-\u9FA5A-Za-z0-9_]+$',
            message="The user name can contain only digits, letters, and _",
        )],
        )

    email = forms.EmailField(
        label='Email',
        help_text='Email is for find back password.',
        max_length=50,
        initial='',
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        )

    password = forms.CharField(
        label='Password',
        help_text='Password length need to be 6~18.',
        min_length=6,
        max_length=18,
        error_messages=
        {"max_length": "The length cannot exceed 18 characters",
         "min_length": "The length cannot less than 6 characters",
         "required": "password cannot be empty."
         },
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        )

    confirm_password = forms.CharField(
        label='Confirm Password',
        min_length=6,
        max_length=18,
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        )

    def clean_username(self):
        username = self.cleaned_data['username']
        if ' ' in username or '@' in username:
            raise forms.ValidationError('User Name Cannot Contain @.')
        res = User.objects.filter(username=username)
        if len(res) != 0:
            raise forms.ValidationError('Used User Name.')
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        res = User.objects.filter(email=email)
        if len(res) != 0:
            raise forms.ValidationError('Used Email Address.')
        return email

    def clean(self):
        cleaned_data = super(RegisterForm, self).clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password and confirm_password:
            if password != confirm_password:
                raise forms.ValidationError('Different Password Inputed.')

    def save(self):
        username = self.cleaned_data['username']
        email = self.cleaned_data['email']
        password = self.cleaned_data['password']
        user = User.objects.create_user(username, email, password)
        user.save()


class Register(FormView):
    template_name = 'auth-register.html'
    form_class = RegisterForm
    success_url = '/'

    def form_valid(self, form):
        form.save()
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password')
        user = authenticate(username=username, password=password)
        login(self.request, user)
        return super(Register, self).form_valid(form)