from django import forms
from .models import Pulseira, Compra, Cliente, Estado


class PulseiraForm(forms.ModelForm):
    class Meta:
        model = Pulseira
        fields = ['nome', 'valor', 'quantidade']
        labels = {'nome': 'Nome', 'valor': 'Valor', 'quantidade': 'Quantidade'}
        widgets = {'valor': forms.NumberInput(attrs={'step': '0.01'})}


class CompraForm(forms.ModelForm):
    cliente = forms.ModelChoiceField(queryset=Cliente.objects.all(), label='Cliente')
    pulseira = forms.ModelChoiceField(queryset=Pulseira.objects.all(), label='Pulseira')

    class Meta:
        model = Compra
        fields = ['cliente', 'pulseira', 'quantidade']
        labels = {'quantidade': 'Quantidade'}


class ClienteForm(forms.Form):
    nome = forms.CharField(label='Nome', max_length=200)
    sobrenome = forms.CharField(label='Sobrenome', max_length=200)
    email = forms.EmailField(label='E-mail')
    estado = forms.ModelChoiceField(queryset=Estado.objects.all(), label='Estado')
    endereco = forms.CharField(label='Endereço', widget=forms.Textarea)
    telefone = forms.CharField(label='Telefone', max_length=15)
    cpf = forms.CharField(label='CPF', max_length=9)
    rg = forms.CharField(label='RG', max_length=9)
    senha = forms.CharField(label='Senha', widget=forms.PasswordInput)
    confirmar_senha = forms.CharField(label='Confirmar senha', widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = super().clean()
        senha = cleaned_data.get('senha')
        confirmar_senha = cleaned_data.get('confirmar_senha')

        if senha != confirmar_senha:
            raise forms.ValidationError('As senhas não coincidem.')
        return cleaned_data
