from django.shortcuts import render


def test_error_500(request):
    if request.method == "GET":
        context = {}
        context['error'] = "[*] Test error."

        return render(request, "error-500.html", context)
