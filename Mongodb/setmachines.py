import pymongo
from random import choice

# Replace these with your connection details
#client = pymongo.MongoClient("mongodb://localhost:27017/")  # Assuming local MongoDB

# Atlas database
client = pymongo.MongoClient("mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/?retryWrites=true&w=majority&appName=monadash")


db = client["test"]  # Replace with your desired database name
collection1 = db["realtimeinfos"]  # Replace with your desired collection name

print(" Enter the password to set the collection:")
if(input() == "1234"):
        

        # Define the document structure
        machine_data = [
        {
                "MachineNumber": i + 1,
                "MachineName": f"M#{i+1:03d}",
                "Material": "NA",  # Set to "NA" or your default material
                "Production": "NA",  # Set to "NA" or your default production
                "Status": 0,
                "StartedTime": None,  # Can be set to datetime.datetime.now() if needed
                "LastUpdatedTime": None,
                "StatusChangedTime": None,
                "SuccessSlots": 0,
                "FailureSlots": 0,
                "TotalSlots": 0,
                "TargetSlots": 20,
                "Rate": 0,
        }
        for i in range(25)
        ]



        # Insert the documents into the collection
        collection1.insert_many(machine_data)

        # List of materials
        materials = ["GPPS", "TPR", "SAAS", "MABS", "ABS", "HIP"]

        # Update all documents with random material
        for document in collection1.find():
                update = {"$set": {"Material": choice(materials)}}
                collection1.update_one({"_id": document["_id"]}, update)

        print("Material field updated with random values for all documents in the 'realtimeinfos' collection!")
        
        # List of materials
        production = ['Production I','Production II','Production III','Production IV','Production V']

        # Update all documents with random material
        for document in collection1.find():
                update = {"$set": {"Production": choice(production)}}
                collection1.update_one({"_id": document["_id"]}, update)

        print("Production field updated with random values for all documents in the 'realtimeinfos' collection!")

else:
        print("You have entered the wrong code")