# Personal blog site
The site is built on [Django](https://www.djangoproject.com/) and [ReactJs](https://react.dev/)

### Backend
For the backend service, I used Django rest framework for making all the API's. 
List of API's
```
api/ tags/ 
api/ new-tag/
api/ update-tag/<int:pk>/ 
api/ delete-tag/<int:pk>/ 
api/ posts/ 
api/ new-post/ 
api/ update-post/<int:pk>/ 
api/ delete-post/<int:pk>/
api/ detail-post/<int:pk>/ 
api/ posts/by_tag/<str:tag_id>/
api/ token/ 
api/ token/refresh/ 
api-auth/
```
For encryption I used JWT-authentication mechanism

### Frontend
For the frontend service, I used ReactJs. What I used in frontend service

- Tailwindcss
- Flowbite-React
- Moment ( time calculation)
- jwt-Decode
- ReactQuill (Richtext Editor)

### Yet to done

- [ ] Introduce Memcached for caching the blog data
- [ ] Introduce pagination


