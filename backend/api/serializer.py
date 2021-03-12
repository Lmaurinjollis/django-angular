from rest_framework import serializers
from api.models import Thread


class ThreadSerializer(serializers.ModelSerializer):
    # create a metadata class representing a thread object
    # like in the DB and following the Thread model
    class Meta:
        model = Thread
        fields = ('id', 'title', 'description', 'published')
