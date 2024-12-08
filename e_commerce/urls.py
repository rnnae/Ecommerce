from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('new_pulseira', views.new_pulseira, name='new_pulseira'),
    path('new_compra/', views.new_compra, name='new_compra'),
    path('new_cliente/', views.new_cliente, name='new_cliente'),
    path('clientes/', views.show_clientes, name='clientes'),
    path('cliente/<cliente_id>/', views.update_cliente, name='cliente'),
    path('delete_cliente/<cliente_id>/', views.delete_cliente, name='delete_cliente'),
    path('pulseiras/', views.pulseiras, name='pulseiras'),
    path('pulseira/<pulseira_id>/', views.show_pulseira, name='pulseira'),
    path('delete_pulseira/<pulseira_id>/', views.delete_pulseira, name='delete_pulseira'),
    path('update_pulseira/<pulseira_id>/', views.update_pulseira, name='update_pulseira'),
    path('compras/', views.relatorio_compras, name='compras'),
]