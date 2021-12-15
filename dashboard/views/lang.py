def getUserConfig(request):
    user_config = ''
    if(request.session.get("user_config")):
          user_config = request.session["user_config"]
    else:
        userLanguage = request.environ.get('HTTP_ACCEPT_LANGUAGE').split(',', 1)[0]
        #if userLanguage == 'zh-CN' or userLanguage == 'zh':
        #    user_config = {'language': 'Chinese','thisPath': '/dashboard'}
        #else:
        #    user_config = {'language': 'English','thisPath': '/dashboard'}
        user_config = {'language': 'English','thisPath': '/dashboard'}
        request.session['user_config'] = user_config
        request.session.modified = True
    return user_config

def getTemplateByLanguage(request):
    user_config = getUserConfig(request)
    user_config['thisPath'] = request.path

    request.session['user_config'] = user_config
    request.session.modified = True

    if user_config['language'] == 'Chinese':
        return '_cn.html'
    else:
        return '.html'


def getPath(request):
    user_config = getUserConfig(request)
    if user_config['language'] == 'English':
        user_config['language'] = 'Chinese'
    else:
        user_config['language'] = 'English'

    request.session['user_config'] = user_config
    request.session.modified = True

    return user_config['thisPath']
