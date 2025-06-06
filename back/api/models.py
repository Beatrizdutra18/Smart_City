from django.db import models

class Ambiente(models.Model):
    sig = models.CharField(max_length=10)
    descricao = models.CharField(max_length=100)
    ni = models.CharField(max_length=20)
    responsavel = models.CharField(max_length=100)
    
class Sensor(models.Model):
    sensor = models.CharField(max_length=100)
    mac_address = models.CharField(max_length=100)
    unidade_med = models.CharField(max_length=50)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=255)

class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE)
    valor = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)