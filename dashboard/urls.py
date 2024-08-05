from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import *
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('users/signup/', csrf_exempt(SignupView.as_view()), name='user_signup'),
    path('users/login/', csrf_exempt(LoginView.as_view()), name='login'),
    path('user/update/', csrf_exempt(UpdateUserView.as_view()), name='user-update'),
    path('users/', csrf_exempt(UserListView.as_view()), name='user-list'),
    path('user/', csrf_exempt(UserDetailView.as_view()), name='user-detail'),
    path('user/delete/', csrf_exempt(DeleteUserView.as_view()), name='user-delete'),
    path('user/logout/', csrf_exempt(LogoutView.as_view()), name='logout'),
    path('cities/add_city/', csrf_exempt(CreateCityView.as_view()), name='city-create'),
    path('cities/', csrf_exempt(ListCitiesView.as_view()), name='cities-list'),
    path('movies/add_movie/', csrf_exempt(CreateMovieView.as_view()), name='movie-create'),
    path('movies/update/<int:pk>/', csrf_exempt(UpdateMovieView.as_view()), name='movie-update'),
    path('movies/delete/<int:pk>/', csrf_exempt(DeleteMovieView.as_view()), name='movie-delete'),
    path('movies/', csrf_exempt(ListMoviesView.as_view()), name='movie-list'),
    path('showDetails/create_show/', csrf_exempt(CreateShowDetailsView.as_view()), name='create-show'),
    path('show_details/update/<int:pk>/', csrf_exempt(UpdateShowDetailsView.as_view()), name='show-details-partial-update'),
    path('show_details/delete/<int:pk>/', csrf_exempt(DeleteShowDetailsView.as_view()), name='show-details-delete'),
    path('show_details/', csrf_exempt(ListShowDetailsView.as_view()), name='create-show'),
    path('bookings/book_show/', csrf_exempt(MovieTicketBookingView.as_view()), name='movie_ticket_booking'),
    path('bookings/update/<int:booking_id>/', csrf_exempt(UpdateBookingView.as_view()), name='update_booking'),
    path('bookings/cancel/<int:booking_id>/', csrf_exempt(CancelBookingView.as_view()), name='update_booking'),
    path('bookings/', csrf_exempt(UserBookingsListView.as_view()), name='list-user-bookings'),
    path('bookings/booking_detail/<int:booking_id>/', csrf_exempt(BookingDetailView.as_view()), name='booking-detail'),
]