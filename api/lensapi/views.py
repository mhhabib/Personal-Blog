from .models import Tag, Post
from rest_framework import generics, permissions
from cryptography.fernet import Fernet
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .serializers import TagSerializer, PostSerializer
import hashlib

# Token authorizations
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = [
        "/api/token",
        "/api/token/refresh",
    ]
    return Response(routes)


# Main Api section starts here
# Hash value generation for post-details url


def generate_short_encrypted_key(input_string, length=8):
    secret_key = Fernet.generate_key()
    cipher_suite = Fernet(secret_key)
    encrypted_data = cipher_suite.encrypt(input_string.encode())
    hash_object = hashlib.sha256(encrypted_data)
    short_key = hash_object.hexdigest()[:length]

    return short_key


# Post Tag control section
class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CreateTag(generics.CreateAPIView):
    queryset = Tag
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]


class UpdateTag(generics.RetrieveUpdateAPIView):
    queryset = Tag
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]


class DeleteTag(generics.RetrieveDestroyAPIView):
    queryset = Tag
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]


# Post creation control section
class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CreatePost(generics.CreateAPIView):
    queryset = Post
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser,)
    permission_classes = [permissions.IsAuthenticated]


class UpdatePost(generics.RetrieveUpdateAPIView):
    queryset = Post
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]


class DeletePost(generics.RetrieveDestroyAPIView):
    queryset = Post
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]


class PostDetailView(generics.RetrieveAPIView):
    queryset = Post
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        post.visitor_count+=1
        post.save()
        serializer=PostSerializer(post)
        return Response({"post_details": serializer.data})


class PostsByTagView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        tag_id = self.kwargs["tag_id"]
        return Post.objects.filter(tag_id=tag_id)
    
class PostsByVisitorCountView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Post.objects.order_by('-visitor_count')[:5]