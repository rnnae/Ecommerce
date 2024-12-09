from django import forms
from django.contrib.auth.hashers import make_password

from .models import Pulseira, Compra, Cliente, Estado


class PulseiraForm(forms.ModelForm):
    class Meta:
        model = Pulseira
        fields = ['nome', 'valor', 'quantidade', 'imagem']
        labels = {'nome': 'Nome', 'valor': 'Valor', 'quantidade': 'Quantidade', 'imagem': 'Imagem'}
        widgets = {'valor': forms.NumberInput(attrs={'step': '0.01'})}


class CompraForm(forms.ModelForm):
    cliente = forms.ModelChoiceField(queryset=Cliente.objects.all(), label='Cliente')

    class Meta:
        model = Compra
        fields = ['cliente', 'quantidade']
        labels = {'quantidade': 'Quantidade'}

class ClienteForm(forms.ModelForm):
    estado = forms.ModelChoiceField(queryset=Estado.objects.all(), label='Estado')

    class Meta:
        model = Cliente
        fields = ['nome', 'sobrenome', 'email', 'estado', 'endereco', 'telefone', 'cpf', 'rg', 'senha']
        labels = {
            'nome': 'Nome',
            'sobrenome': 'Sobrenome',
            'email': 'E-mail',
            'endereco': 'Endereço',
            'telefone': 'Telefone',
            'cpf': 'CPF',
            'rg': 'RG',
            'senha': 'Senha'
        }
        widgets = {'senha': forms.PasswordInput()}

    def save(self, commit=True):
        cliente = super().save(commit=False)
        cliente.senha = make_password(self.cleaned_data['senha'])
        if commit:
            cliente.save()
        return cliente
