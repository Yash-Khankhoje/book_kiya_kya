from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
            email=email,
            username=username,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = UserManager()

class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    genres = models.CharField(max_length=255)
    description = models.TextField()
    language = models.CharField(max_length=100)
    ratings = models.FloatField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    imageURL = models.URLField()
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='movies')

    def __str__(self):
        return self.name
    
from django.db import models
from django.utils import timezone
from django.core.validators import MaxValueValidator
from .models import Movie

class ShowDetails(models.Model):
    id = models.AutoField(primary_key=True)
    showDate = models.DateField(default=timezone.now)
    city = models.CharField(max_length=30, null=False)
    theaterName = models.CharField(max_length=70, null=False)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    timing = models.TimeField()
    totalSeats = models.IntegerField(validators=[MaxValueValidator(limit_value=300)])
    availableSeats = models.IntegerField(validators=[MaxValueValidator(limit_value=300)])
    occupiedSeats = models.IntegerField(validators=[MaxValueValidator(limit_value=300)])
    ticketPrice = models.FloatField()
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='show_details_created')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.movie.name} - {self.theaterName} ({self.showDate})"
    
class Bookings(models.Model):
    show_details = models.ForeignKey(ShowDetails, on_delete=models.CASCADE)
    tickets = models.PositiveIntegerField(validators=[MinValueValidator(1)])
    total_bill = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Pending')

class User_Bookings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    booking = models.ForeignKey(Bookings, on_delete=models.CASCADE)

