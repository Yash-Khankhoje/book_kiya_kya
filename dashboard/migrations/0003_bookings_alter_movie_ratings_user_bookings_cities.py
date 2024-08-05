# Generated by Django 4.1.10 on 2024-08-04 05:14

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_showdetails'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bookings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tickets', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('total_bill', models.FloatField(blank=True, null=True)),
                ('booking_date', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(default='Pending', max_length=20)),
                ('show_details', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.showdetails')),
            ],
        ),
        migrations.AlterField(
            model_name='movie',
            name='ratings',
            field=models.FloatField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
        migrations.CreateModel(
            name='User_Bookings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('booking', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.bookings')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Cities',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('city', models.CharField(max_length=30)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cities', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]