from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import *

urlpatterns = [
    path('users/signup/', SignupView.as_view(), name='user_signup'),
    path('users/login/', LoginView.as_view(), name='login'),
    path('user/update/', UpdateUserView.as_view(), name='user-update'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('user/delete/', DeleteUserView.as_view(), name='user-delete'),
    path('user/logout/', LogoutView.as_view(), name='logout'),
    path('movies/add_movie/', CreateMovieView.as_view(), name='movie-create'),
    path('movies/update/<int:pk>/', UpdateMovieView.as_view(), name='movie-update'),
    path('movies/delete/<int:pk>/', DeleteMovieView.as_view(), name='movie-delete'),
    path('movies/', ListMoviesView.as_view(), name='movie-list'),
    path('showDetails/create_show/', CreateShowDetailsView.as_view(), name='create-show'),
    path('show_details/update/<int:pk>/', UpdateShowDetailsView.as_view(), name='show-details-partial-update'),
    path('show_details/delete/<int:pk>/', DeleteShowDetailsView.as_view(), name='show-details-delete'),
    path('show_details/', ListShowDetailsView.as_view(), name='create-show'),
    path('bookings/book_show/', MovieTicketBookingView.as_view(), name='movie_ticket_booking'),
    path('bookings/update/<int:booking_id>/', UpdateBookingView.as_view(), name='update_booking'),
    path('bookings/cancel/<int:booking_id>/', CancelBookingView.as_view(), name='update_booking'),
]