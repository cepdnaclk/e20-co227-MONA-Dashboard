from pymongo import MongoClient
from datetime import datetime, timedelta
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Create the databases
db = client['production_db']

# Create collections
machine_collection = db['machines']
product_collection = db['products']
part_collection = db['parts']

# Delete previous data in the collections
machine_collection.delete_many({})
product_collection.delete_many({})
part_collection.delete_many({})

# Define materials and the machine to product-part mapping
materials = ["GPPS", "TPR", "SAAS", "MABS", "ABS", "HIP"]

machine_product_part_mapping = {
    1: {"product": 1, "parts": [1, 2, 3, 4]},
    2: {"product": 1, "parts": [5, 6, 7, 8, 9, 10]},
    3: {"product": [1, 2], "parts": [11, 12, 13, 14]},
    4: {"product": 2, "parts": [15, 16, 17, 18, 19, 20]},
    5: {"product": 2, "parts": [21, 22, 23, 24]},
    6: {"product": 3, "parts": [25, 26, 27, 28, 29, 30]},
    7: {"product": 3, "parts": [31, 32, 33, 34]},
    8: {"product": [3, 4], "parts": [35, 36, 37, 38, 39, 40]},
    9: {"product": 4, "parts": [41, 42, 43, 44]},
    10: {"product": [4, 5], "parts": [45, 46, 47, 48, 49, 50]},
    11: {"product": 5, "parts": [51, 52, 53, 54]},
    12: {"product": 5, "parts": [55, 56, 57, 58, 59, 60]},
    13: {"product": 6, "parts": [61, 62, 63, 64]},
    14: {"product": 6, "parts": [65, 66, 67, 68, 69, 70]},
    15: {"product": [6, 7], "parts": [71, 72, 73, 74]},
    16: {"product": 7, "parts": [75, 76, 77, 78, 79, 80]},
    17: {"product": 7, "parts": [81, 82, 83, 84]},
    18: {"product": 8, "parts": [85, 86, 87, 88, 89, 90]},
    19: {"product": 8, "parts": [91, 92, 93, 94]},
    20: {"product": [8, 9], "parts": [95, 96, 97, 98, 99, 100]},
    21: {"product": 9, "parts": [101, 102, 103, 104]},
    22: {"product": [9, 10], "parts": [105, 106, 107, 108, 109, 110]},
    23: {"product": 10, "parts": [111, 112, 113, 114]},
    24: {"product": 10, "parts": [115, 116, 117, 118, 119, 120]},
}

# Insert data into the machine collection
def insert_machine_data(machine_id, machine_name, material):
    document = {
        "machine_id": machine_id,
        "machine_name": machine_name,
        "material": material
    }
    machine_collection.insert_one(document)

# Insert data into the product collection
def insert_product_data(product_id, product_name):
    document = {
        "product_id": product_id,
        "product_name": f"Product {product_name}"
    }
    product_collection.insert_one(document)

# Insert data into the part collection
def insert_part_data(part_id, product_id, machine_id):
    document = {
        "part_id": part_id,
        "product_id": product_id,
        "machine_id": machine_id
    }
    part_collection.insert_one(document)

# Insert machine, product, and part data
for machine_id in range(1, 25):
    machine_name = f"M#{machine_id:03d}"
    assigned_material = random.choice(materials)

    # Insert machine data
    insert_machine_data(machine_id, machine_name, assigned_material)

    # Get product and part info for this machine
    machine_info = machine_product_part_mapping[machine_id]
    products = machine_info["product"]
    parts = machine_info["parts"]

    if isinstance(products, int):
        products = [products]

    # Insert product and part data
    for product_id in products:
        insert_product_data(product_id, product_id)  # Insert product data
        
        for part_id in parts:
            insert_part_data(part_id, product_id, machine_id)  # Insert part data

print("Machines, products, and parts data inserted into their respective databases.")