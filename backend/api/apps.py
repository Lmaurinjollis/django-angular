from django.apps import AppConfig


# For this project we named this API code api but
# in fact this is not a good name and this api should be named
# thread at least to be coherent and readable
class ApiConfig(AppConfig):
    name = 'api'
