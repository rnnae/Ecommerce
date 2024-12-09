from django.http import HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render

from e_commerce.forms import PulseiraForm, CompraForm, ClienteForm
from e_commerce.models import Pulseira, Compra, Cliente


# Create your views here.
def index(request):
    return render(request, 'e_commerce/index.html')


def pulseiras(request):
    pulseiras = Pulseira.objects.order_by('nome')
    context = {'pulseiras': pulseiras}
    return render(request, 'e_commerce/pulseiras.html', context)


def show_pulseira(request, pulseira_id):
    pulseira = Pulseira.objects.get(id=pulseira_id)
    context = {'pulseira': pulseira}
    return render(request, 'e_commerce/pulseira.html', context)


def delete_pulseira(request, pulseira_id):
    pulseira = Pulseira.objects.get(id=pulseira_id)
    pulseira.delete()
    return HttpResponseRedirect(reverse('pulseiras'))


def update_pulseira(request, pulseira_id):
    pulseira = Pulseira.objects.get(id=pulseira_id)
    if request.method != 'POST':
        form = PulseiraForm(instance=pulseira)
    else:
        form = PulseiraForm(instance=pulseira, data=request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('pulseira', args=[pulseira_id]))
    context = {'pulseira': pulseira, 'form': form}
    return render(request, 'e_commerce/update_pulseira.html', context)


def new_pulseira(request):
    if request.method != 'POST':
        form = PulseiraForm()
    else:
        form = PulseiraForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('pulseiras'))
    context = {'form': form}
    return render(request, 'e_commerce/new_pulseira.html', context)


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


def show_clientes(request):
    clientes = Cliente.objects.order_by('nome')
    context = {'clientes': clientes}
    return render(request, 'e_commerce/clientes.html', context)


def update_cliente(request, cliente_id):
    cliente = Cliente.objects.get(id=cliente_id)
    if request.method != 'POST':
        form = ClienteForm(instance=cliente)
    else:
        form = ClienteForm(instance=cliente, data=request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('clientes'))
    context = {'cliente': cliente, 'form': form}
    return render(request, 'e_commerce/update_cliente.html', context)


def delete_cliente(request,cliente_id):
    cliente = Cliente.objects.get(id=cliente_id)
    cliente.delete()
    return HttpResponseRedirect(reverse('clientes'))

def new_compra(request, pulseira_id):
    pulseira = Pulseira.objects.get(id=pulseira_id)
    if request.method != 'POST':
        form = CompraForm(initial={'pulseira': pulseira})
    else:
        form = CompraForm(request.POST)
        if form.is_valid():
            compra = form.save(commit=False)
            compra.pulseira = pulseira
            compra.save()
            return HttpResponseRedirect(reverse('pulseiras'))
    context = {'form': form, 'pulseira': pulseira}
    return render(request, 'e_commerce/new_compra.html', context)


def relatorio_compras(request):
    compras = Compra.objects.order_by('data')
    total = 0
    for compra in compras:
        total += compra.valor_total
    context = {'compras': compras, 'total': total}
    return render(request, 'e_commerce/relatorio_compras.html', context)