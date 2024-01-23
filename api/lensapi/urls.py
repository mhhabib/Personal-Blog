from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    MyTokenObtainPairView,
    TagListView,
    CreateTag,
    UpdateTag,
    DeleteTag,
    PostListView,
    CreatePost,
    UpdatePost,
    DeletePost,
    PostDetailView,
    PostsByTagView,
    PostsByVisitorCountView
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("tags/", TagListView.as_view(), name="tag-list"),
    path("new-tag/", CreateTag.as_view(), name="new-tag"),
    path("update-tag/<int:pk>/", UpdateTag.as_view(), name="update-tag"),
    path("delete-tag/<int:pk>/", DeleteTag.as_view(), name="delete-tag"),
    path("posts/", PostListView.as_view(), name="post-list"),
    path("new-post/", CreatePost.as_view(), name="new-post"),
    path("update-post/<int:pk>/", UpdatePost.as_view(), name="update-post"),
    path("delete-post/<int:pk>/", DeletePost.as_view(), name="delete-post"),
    path("detail-post/<int:pk>/", PostDetailView.as_view(), name="detail-post"),
    path("posts/by_tag/<int:tag_id>/", PostsByTagView.as_view(), name="posts-by-tag"),
    path("posts/by_view/", PostsByVisitorCountView.as_view(), name="posts-by-view"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
