from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import logout
from django.db.models import Q

class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Please provide both username and password.'}, status=status.HTTP_400_BAD_REQUEST)

        User = get_user_model()

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        if not check_password(password, user.password):
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
    
class UserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            logout(request)
            return Response({'message': 'Logout successful.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        try:
            User = get_user_model()

            for key, value in data.items():
                if hasattr(user, key) and key not in ['is_staff', 'is_superuser']:
                    setattr(user, key, value)
                else:
                    return Response({'error': f'Cannot update {key} field.'}, status=status.HTTP_400_BAD_REQUEST)

            user.save()
            return Response({'message': 'User updated successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DeleteUserView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            user = request.user
            user.delete()
            return Response({'message': 'User deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CreateMovieView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        try:
            serializer = MovieSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateMovieView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, pk):
        try:
            movie = Movie.objects.get(pk=pk)

            # Check if the movie exists
            if not movie:
                return Response({'error': 'Movie not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Partial update - update only the fields provided in the request data
            serializer = MovieSerializer(movie, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Movie.DoesNotExist:
            return Response({'error': 'Movie not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeleteMovieView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, pk):
        try:
            movie = Movie.objects.get(pk=pk)

            # Check if the movie exists
            if not movie:
                return Response({'error': 'Movie not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Delete the movie
            movie.delete()
            return Response({'message': 'Movie deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Movie.DoesNotExist:
            return Response({'error': 'Movie not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListMoviesView(APIView):
    def get(self, request):
        try:
            queryset = Movie.objects.all()

            # Filtering based on request parameters
            name = request.query_params.get('name')
            if name:
                queryset = queryset.filter(name__icontains=name)

            ratings = request.query_params.get('ratings')
            if ratings:
                queryset = queryset.filter(ratings=float(ratings))

            language = request.query_params.get('language')
            if language:
                queryset = queryset.filter(language__iexact=language)

            genres = request.query_params.get('genres')
            if genres:
                genre_filters = Q()
                for genre in genres.split('/'):
                    genre_filters |= Q(genres__icontains=genre.strip())
                queryset = queryset.filter(genre_filters)

            serializer = MovieSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CreateShowDetailsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        try:
            serializer = ShowDetailsSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateShowDetailsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def put(self, request, pk):
        try:
            show_details = ShowDetails.objects.get(pk=pk)

            # Check if the show details exists
            if not show_details:
                return Response({'error': 'Show details not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Partial update - update only the fields provided in the request data
            serializer = ShowDetailsSerializer(show_details, data=request.data, partial=True, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ShowDetails.DoesNotExist:
            return Response({'error': 'Show details not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DeleteShowDetailsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def delete(self, request, pk):
        try:
            show_details = ShowDetails.objects.get(pk=pk)

            # Check if the show details exists
            if not show_details:
                return Response({'error': 'Show details not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Delete the show details
            show_details.delete()
            return Response({'message': 'Show details deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except ShowDetails.DoesNotExist:
            return Response({'error': 'Show details not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListShowDetailsView(APIView):
    def get(self, request):
        try:
            show_details = ShowDetails.objects.all()
            serialized_data = []
            for show_detail in show_details:
                serialized_data.append({
                    'id': show_detail.id,
                    'showDate': show_detail.showDate,
                    'city': show_detail.city,
                    'theaterName': show_detail.theaterName,
                    'movieName': show_detail.movie.name,  # Fetch movie name instead of movie ID
                    'timing': show_detail.timing,
                    'totalSeats': show_detail.totalSeats,
                    'availableSeats': show_detail.availableSeats,
                    'occupiedSeats': show_detail.occupiedSeats,
                    'ticketPrice': show_detail.ticketPrice,
                    'creator': show_detail.creator.username if show_detail.creator else None,
                    'created': show_detail.created
                })
            return Response(serialized_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class MovieTicketBookingView(APIView):
    def post(self, request):
        try:
            # Extract data from request
            show_details_id = request.data.get('show_details_id')
            tickets = int(request.data.get('tickets'))
            booking_date = timezone.now()

            # Retrieve show details
            show_details = ShowDetails.objects.get(pk=show_details_id)

            # Check if show details exist and if enough seats are available
            if not show_details:
                return Response({'error': 'Show details not found.'}, status=status.HTTP_404_NOT_FOUND)
            if tickets > show_details.availableSeats:
                return Response({'error': 'Not enough seats available.'}, status=status.HTTP_400_BAD_REQUEST)

            # Calculate total bill
            total_bill = tickets * show_details.ticketPrice

            # Update ShowDetails
            show_details.availableSeats -= tickets
            show_details.occupiedSeats += tickets
            show_details.save()

            # Create Booking
            booking = Bookings.objects.create(
                show_details=show_details,
                tickets=tickets,
                total_bill=total_bill,
                booking_date=booking_date,
                status='Completed'
            )

            # Associate user with booking
            user_booking = User_Bookings.objects.create(user=request.user, booking=booking)

            return Response({'message': 'Tickets booked successfully.'}, status=status.HTTP_201_CREATED)
        except ShowDetails.DoesNotExist:
            return Response({'error': 'Show details not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e), 'status': 'Failed'}, status=status.HTTP_400_BAD_REQUEST)
        

class UpdateBookingView(APIView):
    def put(self, request, booking_id):
        try:
            # Retrieve booking
            booking = Bookings.objects.get(pk=booking_id)

            # Check if booking exists and if it belongs to the logged-in user
            if not booking:
                return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)
            
            # Check if the booking belongs to the logged-in user
            user_booking = User_Bookings.objects.filter(booking=booking, user=request.user)
            if not user_booking:
                return Response({'error': 'You are not authorized to update this booking.'}, status=status.HTTP_403_FORBIDDEN)

            # Extract data from request
            tickets = int(request.data.get('tickets', booking.tickets))

            # Retrieve associated show details
            show_details = booking.show_details

            # Calculate total bill
            total_bill = tickets * show_details.ticketPrice

            # Update availableSeats and occupiedSeats
            show_details.availableSeats += booking.tickets
            show_details.occupiedSeats -= booking.tickets
            show_details.availableSeats -= tickets
            show_details.occupiedSeats += tickets
            show_details.save()

            # Update booking
            booking.tickets = tickets
            booking.total_bill = total_bill
            booking.save()

            return Response({'message': 'Booking updated successfully.'}, status=status.HTTP_200_OK)
        except Bookings.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class CancelBookingView(APIView):
    def delete(self, request, booking_id):
        try:
            # Check if the booking exists
            booking = Bookings.objects.get(pk=booking_id)
            if not booking:
                return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)

            # Check if the booking belongs to the logged-in user
            user_booking = User_Bookings.objects.filter(booking=booking, user=request.user)
            if not user_booking:
                return Response({'error': 'You are not authorized to cancel this booking.'}, status=status.HTTP_403_FORBIDDEN)

            # Update ShowDetails
            show_details = booking.show_details
            show_details.availableSeats += booking.tickets
            show_details.occupiedSeats -= booking.tickets
            show_details.save()

            # Cancel booking
            booking.status = 'Canceled'
            booking.save()

            return Response({'message': 'Booking canceled successfully.'}, status=status.HTTP_200_OK)
        except Bookings.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)