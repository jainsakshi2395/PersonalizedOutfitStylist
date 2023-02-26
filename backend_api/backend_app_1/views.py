from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .serializers import FileSerializer
from django.http import FileResponse, HttpResponse
from .models import File
import zipfile
from io import BytesIO
# Create your views here.


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            # img_path = File.objects.get(id=2)
            # img = open(img_path, 'rb')
            # img = open(img_path, 'rb')
            # img2 = open('media/bootstrap.jpeg', 'rb')
            # img_res = FileSerializer(img_path)
            # response = FileResponse(img2)
            # return HttpResponse(img_res, content_type="image/png")

            rc_files = File.objects.all()

            outfile = BytesIO()
            with zipfile.ZipFile(outfile, 'w') as zf:
                for item in rc_files:
                    zf.writestr(f"{item.remark}.png", item.file.read())

            response = HttpResponse(outfile.getvalue(), content_type='application/zip')
            response['Content-Disposition'] = 'attachment; filename=my_file.zip'
            return response

            # return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
