# Generated by Django 4.2.4 on 2023-08-13 15:50

from django.db import migrations, models
import django.db.models.deletion
import lensapi.models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="Post",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("body", models.TextField()),
                ("create_date", models.DateTimeField(auto_now_add=True)),
                ("update_date", models.DateTimeField(auto_now=True)),
                ("is_public", models.BooleanField(default=True)),
                (
                    "thumbnail_image",
                    models.ImageField(
                        upload_to=lensapi.models.Post.thumbnail_image_upload_to
                    ),
                ),
                (
                    "tag",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="lensapi.tag"
                    ),
                ),
            ],
        ),
    ]