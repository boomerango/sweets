# Generated by Django 4.1.1 on 2022-09-16 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Departments",
            fields=[
                ("DepartmentId", models.AutoField(primary_key=True, serialize=False)),
                ("DepartmentName", models.CharField(max_length=500)),
            ],
        ),
    ]