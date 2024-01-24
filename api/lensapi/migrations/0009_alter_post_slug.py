# Generated by Django 4.2.4 on 2024-01-24 15:22

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("lensapi", "0008_alter_post_slug"),
    ]

    operations = [
        migrations.AlterField(
            model_name="post",
            name="slug",
            field=models.SlugField(default=uuid.uuid1, unique=True),
        ),
    ]
