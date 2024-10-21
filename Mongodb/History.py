from pymongo import MongoClient
from datetime import datetime, timedelta
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['history']  # Database

# Create collections
machine_data_collection = db['Machines_data']
product_data_collection = db['Products_data']
part_data_collection = db['Parts_data']

# Clear previous data
machine_data_collection.delete_many({})
product_data_collection.delete_many({})
part_data_collection.delete_many({})

# Define materials
materials = ["GPPS", "TPR", "SAAS", "MABS", "ABS", "HIP"]

# Define the structure for machines, products, and parts
machines_info = {
    1: (1, [1, 2, 3, 4]), 2: (1, [5, 6, 7, 8, 9, 10]), 3: (1, [11, 12, 13, 14]),
    4: (2, [15, 16, 17, 18, 19, 20]), 5: (2, [21, 22, 23, 24]), 6: (3, [25, 26, 27, 28, 29, 30]),
    7: (3, [31, 32, 33, 34]), 8: (3, [35, 36, 37, 38, 39, 40]), 9: (4, [41, 42, 43, 44]),
    10: (4, [45, 46, 47, 48, 49, 50]), 11: (5, [51, 52, 53, 54]), 12: (5, [55, 56, 57, 58, 59, 60]),
    13: (6, [61, 62, 63, 64]), 14: (6, [65, 66, 67, 68, 69, 70]), 15: (6, [71, 72, 73, 74]),
    16: (7, [75, 76, 77, 78, 79, 80]), 17: (7, [81, 82, 83, 84]), 18: (8, [85, 86, 87, 88, 89, 90]),
    19: (8, [91, 92, 93, 94]), 20: (8, [95, 96, 97, 98, 99, 100]), 21: (9, [101, 102, 103, 104]),
    22: (9, [105, 106, 107, 108, 109, 110]), 23: (10, [111, 112, 113, 114]), 24: (10, [115, 116, 117, 118, 119, 120])
}

products_info = {i: f"Product {i}" for i in range(1, 11)}
parts_info = {i: f"Part {i}" for i in range(1, 121)}

# Function to insert machine data
def insert_machine_data(machine_id, machine_name, week_count):
    target_slots = random.randint(200, 500)
    total_slots = random.randint(180, target_slots)
    success_slots = random.randint(160, total_slots)
    failed_slots = total_slots - success_slots
    completed_slots = total_slots
    success_percentage = round((success_slots / total_slots) * 100, 2)
    completed_percentage = round((completed_slots / target_slots) * 100, 2)
    working_hours = random.randint(20, 40)
    production_rate = round(total_slots / working_hours, 2)

    machine_info = machines_info[machine_id]
    relevant_product = products_info[machine_info[0]]
    relevant_parts = machine_info[1]
    material = random.choice(materials)

    document = {
        "machine_id": f"M#{machine_id:03d}",
        "machine_name": machine_name,
        "target_slots_count": target_slots,
        "total_slots_count": total_slots,
        "success_slot_count": success_slots,
        "failed_slot_count": failed_slots,
        "completed_slot_count": completed_slots,
        "success_percentage": success_percentage,
        "completed_percentage": completed_percentage,
        "relevant_parts": relevant_parts,
        "relevant_product": relevant_product,
        "material": material,
        "working_hours": working_hours,
        "production_rate": production_rate,
        "week_count": week_count
    }
    machine_data_collection.insert_one(document)

# Function to insert product data
def insert_product_data(product_id, product_name, week_count):
    target_product_count = random.randint(30, 70)
    completed_product_count = random.randint(20, target_product_count)
    completed_percentage = round((completed_product_count / target_product_count) * 100, 2)

    document = {
        "product_id": f"PR#{product_id:03d}",
        "product_name": product_name,
        "target_product_count": target_product_count,
        "completed_product_count": completed_product_count,
        "completed_percentage": completed_percentage,
        "week_count": week_count
    }
    product_data_collection.insert_one(document)

# Function to insert part data
def insert_part_data(part_id, part_name, week_count):
    target_part_count = random.randint(70, 100)
    completed_part_count = random.randint(50, target_part_count)
    success_part_count = random.randint(40, completed_part_count)
    failed_part_count = completed_part_count - success_part_count
    success_percentage = round((success_part_count / completed_part_count) * 100, 2)

    relevant_product_id = (part_id - 1) // 12 + 1
    relevant_product_name = products_info[relevant_product_id]

    document = {
        "part_id": f"PP#{part_id:03d}",
        "part_name": part_name,
        "target_part_count": target_part_count,
        "completed_part_count": completed_part_count,
        "success_part_count": success_part_count,
        "failed_part_count": failed_part_count,
        "success_part_percentage": success_percentage,
        "relevant_product": relevant_product_name,
        "week_count": week_count
    }
    part_data_collection.insert_one(document)

# Get today's date and define week ranges for 1 week, 2 weeks, 1 month, 3 months, and 1 year
today = datetime.today()
time_ranges = {
    "1_week": today - timedelta(weeks=1),
    "2_weeks": today - timedelta(weeks=2),
    "1_month": today - timedelta(days=30),
    "3_months": today - timedelta(days=90),
    "1_year": today - timedelta(days=365)
}

# Insert data for different weeks
for week_count in range(1, 53):  # Simulating 52 weeks
    for machine_id in range(1, 25):
        insert_machine_data(machine_id, f"Machine {machine_id}", week_count)

    for product_id, product_name in products_info.items():
        insert_product_data(product_id, product_name, week_count)

    for part_id, part_name in parts_info.items():
        insert_part_data(part_id, part_name, week_count)

print("Data inserted for 1 week, 2 weeks, 1 month, 3 months, and 1 year.")