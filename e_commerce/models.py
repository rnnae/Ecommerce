from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.
"""Tabela Pulseira"""


class Pulseira(models.Model):
    nome = models.CharField(max_length=200)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.nome


class Estado(models.Model):
    nome = models.CharField(max_length=100, verbose_name="Nome do Estado")
    sigla = models.CharField(max_length=2, unique=True, verbose_name="Sigla")

    def __str__(self):
        return f"{self.sigla} - {self.nome}"


"""Tabela Clientes"""


class Cliente(models.Model):
    nome = models.CharField(max_length=200, verbose_name="Nome")
    sobrenome = models.CharField(max_length=200, verbose_name="Sobrenome")
    email = models.EmailField(unique=True, verbose_name="E-mail")
    estado = models.ForeignKey(Estado, on_delete=models.PROTECT, verbose_name="Estado")
    endereco = models.TextField(verbose_name="Endereço")
    telefone = models.CharField(max_length=15, verbose_name="Telefone")
    cpf = models.CharField(max_length=9, unique=True, verbose_name="CPF")
    rg = models.CharField(max_length=9, unique=True, verbose_name="RG")
    senha = models.CharField(max_length=128, verbose_name="Senha")

    def set_senha(self, raw_password):
        """Método para criptografar a senha antes de salvar no banco."""
        self.senha = make_password(raw_password)

    def check_senha(self, raw_password):
        """Método para verificar a senha criptografada."""
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.senha)

    def __str__(self):
        return f"{self.nome} {self.sobrenome}"


class Compra(models.Model):
    clientes = models.ForeignKey(Cliente, on_delete=models.CASCADE, verbose_name="Cliente")
    pulseira = models.ForeignKey(Pulseira, on_delete=models.CASCADE, verbose_name="Pulseira")
    quantidade = models.PositiveIntegerField(verbose_name="Quantidade")
    data = models.DateTimeField(auto_now_add=True, verbose_name="Data da compra")

    def __str__(self):
        return f"Compra #{self.id} - {self.clientes} - {self.data}"

    @property
    def valor_total(self):
        return self.quantidade * self.pulseira.valor
