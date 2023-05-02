from django.shortcuts import render, redirect
from django.contrib.auth import login,logout, authenticate

import os


def webLogin(request):
    if request.method == 'GET':
        return render(request, 'auth-login.html')
    else:
        username = request.POST.get('username')
        password = request.POST.get('password')
        remember = request.POST.get('remember')
        # print(request.POST, username, password, remember)
        user = authenticate(username=username, password=password)
        # 如果存在该用户并且状态是激活的
        if user and user.is_active:
            # 使用Django的login()函数进行登陆
            login(request, user)
            # 如果记住登陆，则使用全局的过期时间，默认为2周
            if remember:
                # 设置为None，则表示使用全局的过期时间
                request.session.set_expiry(None)
            else:
                # 否则设为0，关掉浏览器就注销登陆状态了
                request.session.set_expiry(0)
            # 获取next页面（原本要访问的页面，因为没登陆所以转到login页面了），如果有的话则重定向到该页面
            next_url = request.GET.get('next')
            # print(next_url)
            if next_url:
                return redirect(next_url)
            else:
                return redirect('/dashboard/')
        else:
            return render(request, 'auth-login.html', {"error": "Wrong username or password."})

def webLogout(request):
    logout(request)
    return render(request, 'auth-login.html')

