# Generated by Django 3.2.5 on 2021-07-22 21:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('truffles', '0001_initial'),
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Categories',
            new_name='Category',
        ),
    ]
