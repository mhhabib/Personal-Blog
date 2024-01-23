# Generated by Django 4.2.4 on 2024-01-23 15:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("lensapi", "0004_remove_tag_user"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="post",
            options={"ordering": ["-create_date"]},
        ),
        migrations.AddField(
            model_name="post",
            name="visitor_count",
            field=models.IntegerField(default=0),
        ),
    ]
