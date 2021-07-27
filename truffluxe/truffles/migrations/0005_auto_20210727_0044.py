# Generated by Django 3.2.5 on 2021-07-27 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('truffles', '0004_auto_20210723_1651'),
    ]

    operations = [
        migrations.AddField(
            model_name='truffle',
            name='cart',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='truffle',
            name='quantity',
            field=models.PositiveIntegerField(default=1),
            preserve_default=False,
        ),
    ]