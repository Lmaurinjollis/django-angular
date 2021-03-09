from rest_framework import serializers
from api.models import Thread


class ThreadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Thread
        fields = ('id', 'title', 'description', 'published')
