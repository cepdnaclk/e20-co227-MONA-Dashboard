from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")

# Create or access the database
db = client['manufacturing_db']

# Create or access the collections
products_collection = db['products']
parts_collection = db['parts']
machines_collection = db['machines']

# Clear existing collections (if needed)
products_collection.delete_many({})
parts_collection.delete_many({})
machines_collection.delete_many({})

# Step 1: Create 10 products with random parts
total_parts = 120
num_products = 10
product_ids = [f'P{i+1}' for i in range(num_products)]
parts_distribution = [total_parts // num_products] * num_products

# Distribute remaining parts to make the total 100
extra_parts = total_parts - sum(parts_distribution)
for i in range(extra_parts):
    parts_distribution[i % num_products] += 1

# Insert products into the database
products = [{'product_id': product_ids[i], 'num_parts': parts_distribution[i]} for i in range(num_products)]
products_collection.insert_many(products)

# Step 2: Create 24 machines, each with either 5, 10, or 15 parts capacity
machine_ids = [f'M{i+1}' for i in range(24)]
machine_capacities = [4, 6] * 12  # Ensures enough capacities for 24 machines
machines = [{'machine_id': machine_ids[i], 'capacity': machine_capacities[i]} for i in range(24)]
machines_collection.insert_many(machines)

# Step 3: Distribute the 100 parts among the products and assign them to machines sequentially
part_counter = 0
machine_index = 0
machine_parts = {machine_id: 0 for machine_id in machine_ids}  # Track how many parts each machine has

# Loop through products to assign parts
for i, product in enumerate(products):
    for _ in range(product['num_parts']):
        part_counter += 1

        # Fill the current machine to capacity before moving to the next
        while machine_parts[machine_ids[machine_index]] >= machines_collection.find_one({'machine_id': machine_ids[machine_index]})['capacity']:
            machine_index += 1  # Move to the next machine
            if machine_index >= len(machine_ids):
                machine_index = 0  # Reset to the first machine if all are checked

        machine_id = machine_ids[machine_index]
        machine_parts[machine_id] += 1

        # Create the part document
        part_doc = {
            'part_id': f'PART{part_counter}',
            'product_id': product['product_id'],
            'machine_id': machine_id
        }
        parts_collection.insert_one(part_doc)

print("Database setup complete with products, parts, and machines assigned sequentially with each machine filled to capacity before moving to the next.")
