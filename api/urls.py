from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import ArticleViewSet, UserViewSet
    #ArticleList, ArticleDetails
    #article_list, article_details

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [

    path('', include(router.urls)),

    #path('articles', ArticleList.as_view()), #as_view() added when we pick class
    #path('articles/<int:pk>', ArticleDetails.as_view()),

   # path('articles', article_list),
   # path('articles/<int:pk>', article_details),
]