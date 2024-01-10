from rest_framework import serializers
from .models import Tag, Post

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    # tag = serializers.CharField(source='tag.name', read_only=True)
    class Meta:
        model = Post
        fields = '__all__'
