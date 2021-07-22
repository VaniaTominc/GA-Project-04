# Generated by Django 3.2.5 on 2021-07-22 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Truffle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=50)),
                ('description', models.TextField(default=None)),
                ('use', models.CharField(default=None, max_length=500)),
                ('ingredients', models.CharField(default=None, max_length=500)),
                ('alergies', models.CharField(default=None, max_length=500)),
                ('life', models.CharField(default=None, max_length=50)),
                ('images', models.CharField(default=None, max_length=100)),
            ],
        ),
    ]
