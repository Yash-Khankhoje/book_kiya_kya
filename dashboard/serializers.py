from rest_framework import serializers
from .models import *
from decimal import Decimal

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_staff', 'is_superuser']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'name', 'genres', 'description', 'language', 'ratings', 'imageURL', 'creator']
        read_only_fields = ['creator']

    def create(self, validated_data):
        request = self.context.get('request')
        creator = request.user if request and request.user.is_authenticated else None
        movie = Movie.objects.create(creator=creator, **validated_data)
        return movie
    
class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Cities
        fields = ['id', 'city']

        def create(self, validated_data):
            request = self.context.get('request')
            creator = request.user if request and request.user.is_authenticated else None
            city = Cities.objects.create(creator=creator, **validated_data)
            return city
    
class ShowDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowDetails
        fields = ['id', 'showDate', 'city', 'theaterName', 'movie', 'timing', 'totalSeats', 'availableSeats', 'occupiedSeats', 'ticketPrice', 'creator', 'created']
        read_only_fields = ['creator']

    def create(self, validated_data):
        request = self.context.get('request')
        creator = request.user if request and request.user.is_authenticated and request.user.is_superuser else None
        show_details = ShowDetails.objects.create(creator=creator, **validated_data)
        return show_details
    
class BookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookings
        fields = ['id', 'show_details', 'tickets', 'total_bill', 'booking_date', 'status']
        read_only_fields = ['total_bill', 'status']

class User_BookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Bookings
        fields = ['id', 'user', 'booking']
