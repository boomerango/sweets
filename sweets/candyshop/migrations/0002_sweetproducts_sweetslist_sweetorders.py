# Generated by Django 4.1.1 on 2022-09-16 21:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("candyshop", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="SweetProducts",
            fields=[
                ("ProductID", models.AutoField(primary_key=True, serialize=False)),
                ("ProductName", models.CharField(max_length=500)),
                ("ProductType", models.CharField(max_length=500)),
                ("ProductPhotoLink", models.CharField(max_length=500)),
                ("ProductWeight", models.DecimalField(decimal_places=2, max_digits=12)),
                ("ProductPortions", models.IntegerField(max_length=24)),
                ("ProductPrice", models.DecimalField(decimal_places=2, max_digits=12)),
                ("ProductDescription", models.CharField(max_length=2048)),
            ],
        ),
        migrations.CreateModel(
            name="SweetsList",
            fields=[
                ("IdOfPiece", models.AutoField(primary_key=True, serialize=False)),
                ("DateOfManufacture", models.DateField(auto_now=True)),
                ("DateOfExpiration", models.DateField()),
                (
                    "IDOfSweet",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="candyshop.sweetproducts",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="SweetOrders",
            fields=[
                ("OrderId", models.AutoField(primary_key=True, serialize=False)),
                ("Customer", models.CharField(max_length=500)),
                ("NumberOfSweets", models.CharField(max_length=500)),
                ("OrderStatus", models.CharField(max_length=500)),
                (
                    "IDOfSweet",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="candyshop.sweetproducts",
                    ),
                ),
                (
                    "ListOfOrders",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="candyshop.sweetslist",
                    ),
                ),
            ],
        ),
    ]
