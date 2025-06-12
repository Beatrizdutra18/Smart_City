from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sensores/', SensorListCreateView.as_view(), name='sensor-list'),
    path('sensores/<int:pk>/', SensorDetailView.as_view(), name='sensor-detail'),
    path('ambientes/', AmbienteViewSet.as_view()),
    path('ambientes/<int:pk>', AmbienteUpdateDestroy.as_view()),
    path('historico/', HistoricoViewSet.as_view()),
    path('historico-all/', HistoricoGetAll.as_view()),
    path('importar/', upload, name='upload_xlsx'),
    path('grafico/<str:tipo>/', grafico_medida, name='grafico-medida'),
]
