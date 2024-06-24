import pymongo
from random import choice

# Replace these with your connection details
client = pymongo.MongoClient("mongodb+srv://Moona:Moona123@cluster0.ljmc52i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

# Define the database and collection
db = client["my_test"]  # Replace with your desired database name
collection = db["machines_1"]  # Replace with your desired collection name

# Define the document structure
machine_data = [
    {
        "MachineNumber": i + 1,
        "MachineName": f"m{i+1:02d}",
        "Material": "NA",  # Set to "NA" or your default material
        "Status": 0,
        "StartedTime": None,  # Can be set to datetime.datetime.now() if needed
        "LastUpdatedTime": None,
        "SuccessSlots": 0,
        "FailureSlots": 0,
        "TotalSlots": 0,
        "Rate": 0,
    }
    for i in range(50)
]

# Check if collection already exists and drop it for fresh insertion
if "machines_1" in db.list_collection_names():
    collection.drop()
    print("Existing collection dropped.")

# Insert the documents into the collection
collection.insert_many(machine_data)
print("50 documents successfully inserted into the 'machines_1' collection!")

# List of materials
materials = ["GPPS", "TPR", "SAAS", "MABS", "ABS", "HIP"]

# Update all documents with random material
for document in collection.find():
    new_material = choice(materials)
    update = {"$set": {"Material": new_material}}
    collection.update_one({"_id": document["_id"]}, update)
    print(f"Updated document ID {document['_id']} with material {new_material}")

print("Material field updated with random values for all documents in the 'machines_1' collection!")
