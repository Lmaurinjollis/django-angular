from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from api.models import Thread
from api.serializer import ThreadSerializer
from rest_framework.decorators import api_view


# GET list of thread, POST a new thread, DELETE all thread
@api_view(['GET', 'POST', 'DELETE'])
def thread_list(request):
    if request.method == 'GET':
        # Get all threads in DB
        threads = Thread.objects.all()
        # Serialize threads object
        threads_serializer = ThreadSerializer(threads, many=True)
        # Return in JSON those threads object's data
        return JsonResponse(threads_serializer.data, safe=False)

    elif request.method == 'POST':
        # Parse JSON object in request
        thread_data = JSONParser().parse(request)
        # Serialize the data to create a new thread
        thread_serializer = ThreadSerializer(data=thread_data)
        # If validators return no error
        if thread_serializer.is_valid():
            # The thread object is saved in DB
            thread_serializer.save()
            # Return 201 Response when object is saved
            return JsonResponse(thread_serializer.data, status=status.HTTP_201_CREATED)
        # Return 400 error if the JSON doesn't contains required data
        return JsonResponse(thread_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Delete and count all threas to delete
        count = Thread.objects.all().delete()
        # Return a 204 Response when everything is deleted
        return JsonResponse({'message': '{} Threads were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


# GET / PUT / DELETE thread
@api_view(['GET', 'PUT', 'DELETE'])
def thread_detail(request, pk):
    # find thread by pk (id)
    try:
        thread = Thread.objects.get(pk=pk)

        if request.method == 'GET':
            thread_serializer = ThreadSerializer(thread)
            return JsonResponse(thread_serializer.data)

        elif request.method == 'PUT':
            thread_data = JSONParser().parse(request)
            thread_serializer = ThreadSerializer(thread, data=thread_data)

            if thread_serializer.is_valid():
                thread_serializer.save()
                return JsonResponse(thread_serializer.data)

            return JsonResponse(thread_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            thread.delete()
            return JsonResponse({'message': 'Thread was deleted successfully!'},
                                status=status.HTTP_204_NO_CONTENT)

    except Thread.DoesNotExist:
        return JsonResponse({'message': 'The thread does not exist'},
                            status=status.HTTP_404_NOT_FOUND)


# GET all published thread
@api_view(['GET'])
def thread_list_published(request):
    # Get all threads in DB that are published
    threads = Thread.objects.filter(published=True)

    if request.method == 'GET':
        thread_serializer = ThreadSerializer(threads, many=True)
        return JsonResponse(thread_serializer.data, safe=False)
