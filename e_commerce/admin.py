from django.contrib import admin
from e_commerce.models import Estado, pulseira, clientes, Compra

# Register your models here.
admin.site.register(pulseira)
admin.site.register(Estado)
admin.site.register(clientes)
admin.site.register(Compra)

