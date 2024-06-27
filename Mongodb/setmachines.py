import pymongo
from random import choice

# Replace these with your connection details
#client = pymongo.MongoClient("mongodb://localhost:27017/")  # Assuming local MongoDB

# Atlas database
client = pymongo.MongoClient("mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/?retryWrites=true&w=majority&appName=monadash")


db = client["test"]  # Replace with your desired database name
collection = db["realtimeinfos"]  # Replace with your desired collection name

# Define the document structure
machine_data = [
    {
        "MachineNumber": i + 1,
        "MachineName": f"M#{i+1:03d}",
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

# Insert the documents into the collection
collection.insert_many(machine_data)

print("50 documents successfully inserted into the 'machines' collection!")

# List of materials
materials = ["GPPS", "TPR", "SAAS", "MABS", "ABS", "HIP"]

# Update all documents with random material
for document in collection.find():
    update = {"$set": {"Material": choice(materials)}}
    collection.update_one({"_id": document["_id"]}, update)

print("Material field updated with random values for all documents in the 'machines' collection!")
