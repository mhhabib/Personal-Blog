from rest_framework import serializers
from .models import Tag, Post

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class PostSerializer(serializers.ModelSerializer):
    # tag = TagSerializer()
    # class Meta:
    #     model = Post
    #     fields = ['id', 'user', 'title', 'body', 'create_date', 'update_date', 'tag', 'is_public', 'thumbnail_image']
    class Meta:
        model = Post
        fields = '__all__'
