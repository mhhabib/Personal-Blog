# Generated by Django 4.2.4 on 2024-01-24 15:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("lensapi", "0007_alter_post_slug"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="slug",
            field=models.SlugField(max_length=250, unique=True),
        ),
    ]