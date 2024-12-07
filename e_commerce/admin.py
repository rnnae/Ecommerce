from django.contrib import admin
from e_commerce.models import Estado, Pulseira, Cliente, Compra

# Register your models here.
admin.site.register(Pulseira)
admin.site.register(Estado)
admin.site.register(Cliente)
admin.site.register(Compra)

