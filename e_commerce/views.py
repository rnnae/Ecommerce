from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render

from e_commerce.forms import PulseiraForm, CompraForm, ClienteForm
from e_commerce.models import Pulseira


# Create your views here.
def index(request):
    return render(request, 'e_commerce/index.html')


def pulseiras(request):
    pulseiras = Pulseira.objects.order_by('nome')
    context = {'pulseiras': pulseiras}
    return render(request, 'e_commerce/pulseiras.html')


def new_pulseira(request):
    if request.method != 'POST':
        form = PulseiraForm()
    else:
        form = PulseiraForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('pulseira'))
    context = {'form': form}
    return render(request, 'e_commerce/new_pulseira.html', context)


def new_compra(request):
    if request.method != 'POST':
        form = CompraForm()
    else:
        form = CompraForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('index'))
    context = {'form': form}
    return render(request, 'e_commerce/new_compra.html', context)


def new_cliente(request):
    if request.method != 'POST':
        form = ClienteForm()
    else:
        form = ClienteForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('index'))
    context = {'form': form}
    return render(request, 'e_commerce/new_cliente.html', context)