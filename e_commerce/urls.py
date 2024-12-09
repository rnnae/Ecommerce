from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('new_pulseira', views.new_pulseira, name='new_pulseira'),
    path('new_compra/<pulseira_id>/', views.new_compra, name='new_compra'),
    path('new_cliente/', views.new_cliente, name='new_cliente'),
    path('clientes/', views.show_clientes, name='clientes'),
    path('cliente/<cliente_id>/', views.update_cliente, name='cliente'),
    path('delete_cliente/<cliente_id>/', views.delete_cliente, name='delete_cliente'),
    path('pulseiras/', views.pulseiras, name='pulseiras'),
    path('pulseira/<int:id>/', views.show_pulseira, name='pulseira'),
    path('delete_pulseira/<pulseira_id>/', views.delete_pulseira, name='delete_pulseira'),
    path('update_pulseira/<pulseira_id>/', views.update_pulseira, name='update_pulseira'),
    path('compras/', views.relatorio_compras, name='compras'),
    path('pulseiras/pulseira_perola/', views.pulseira_perola, name='pulseira_perola'),
    path('pulseiras/pulseira_labradorita/', views.pulseira_labradorita, name='pulseira_labradorita'),
    path('pulseiras/pulseira_apatita/', views.pulseira_apatita, name='pulseira_apatita'),
    path('pulseiras/pulseira_em_prata/', views.pulseira_em_prata, name='pulseira_em_prata'),
]