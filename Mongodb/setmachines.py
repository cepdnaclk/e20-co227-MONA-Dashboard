import pymongo
from random import choice

# Replace these with your connection details
client = pymongo.MongoClient("mongodb://localhost:27017/")  # Assuming local MongoDB

# Uncomment and adjust this line if using MongoDB Atlas
# client = pymongo.MongoClient("mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/?retryWrites=true&w=majority&appName=monadash")

db = client["test"]  # Replace with your desired database name
collection1 = db["realtimeinfos"]  # Replace with your desired collection name
products_collection = db['productinfos']
parts_collection = db['partinfos']

print("Enter the password to set the collection:")
if input() == "1234":
    # Clear existing collections (if needed)
    products_collection.delete_many({})
    parts_collection.delete_many({})
    collection1.delete_many({})

    # Step 1: Create 10 products with random parts
    total_parts = 120
    num_products = 10
    product_ids = [(i+1) for i in range(num_products)]
    parts_distribution = [total_parts // num_products] * num_products

    # Distribute remaining parts to make the total 120
    extra_parts = total_parts - sum(parts_distribution)
    for i in range(extra_parts):
        parts_distribution[i % num_products] += 1

    # Insert products into the database
    products = [{'ProductNumber': product_ids[i], '#Parts': parts_distribution[i]} for i in range(num_products)]
    products_collection.insert_many(products)

    # Step 2: Create 24 machines
    machine_ids = [(i+1) for i in range(24)]
    machine_capacities = [4, 6] * 12  # Ensures enough capacities for 24 machines

    machine_data = [
        {
            "MachineNumber": i + 1,
            "MachineName": f"M#{i+1:03d}",
            "Status": 0,
            "Capacity": machine_capacities[i],
            "StartedTime": None,  # Can be set to datetime.datetime.now() if needed
            "LastUpdatedTime": None,
            "StatusChangedTime": None,
            "SuccessSlots": 0,
            "FailureSlots": 0,
            "TotalSlots": 0,
            "TargetSlots": 500,
            "ErrorPercentage": 0,
            "Rate": 0,
            "Info": f"This is Machine {i+1} with MachineName M#{i+1:03d}",
        }
        for i in range(24)
    ]

    # Insert the documents into the collection
    collection1.insert_many(machine_data)

    # Step 3: Distribute the parts among the products and assign them to machines sequentially
    part_counter = 0
    machine_index = 0
    machine_parts = {machine_id: 0 for machine_id in machine_ids}  # Track how many parts each machine has

    # Loop through products to assign parts
    for i, product in enumerate(products):
        for _ in range(product['#Parts']):
            part_counter += 1

            # Fill the current machine to capacity before moving to the next
            while True:
                machine = collection1.find_one({'MachineNumber': int(machine_ids[machine_index])})
                
                # Check if the machine exists and has capacity
                if machine and machine_parts[machine_ids[machine_index]] < machine['Capacity']:
                    break

                # Move to the next machine
                machine_index += 1
                if machine_index >= len(machine_ids):
                    machine_index = 0  # Reset to the first machine if all are checked

            machine_id = machine_ids[machine_index]
            machine_parts[machine_id] += 1

            # Create the part document
            part_doc = {
                'ProductNumber': product['ProductNumber'],
                'PartNumber': part_counter,
                'MachineNumber': machine_id
            }
            parts_collection.insert_one(part_doc)

    print("Part field updated with random values for all documents in the 'realtimeinfos' collection!")

else:
    print("You have entered the wrong code")
