import pymongo
from random import choice
from time import sleep
import datetime

# Replace these with your connection details
# Local database
#client = pymongo.MongoClient("mongodb://localhost:27017/")  # Assuming local MongoDB

# Atlas database
client = pymongo.MongoClient("mongodb+srv://Moona:Moona123@cluster0.ljmc52i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client["my_test"]  # Replace with your desired database name
collection = db["machines_1"]  # Replace with your desired collection name

#setmachine time
MachineTime = 5

# Field names
update_field_1 = "Status"
update_field_2 = "SuccessSlots"
update_field_3 = "FailureSlots"
update_field_4 = "TotalSlots"
update_field_5 = "StartedTime"
update_field_6 = "LastUpdatedTime"
update_field_7 = "Rate"

# Update all documents with zero values for specified fields
update = {"$set": {update_field_2: 0, update_field_3: 0, update_field_4: 0, update_field_7:0}}
result = collection.update_many({}, update) 

# Capture start time at the beginning
start_time = datetime.datetime.utcnow()  # Get current UTC time


while True:
    try:
        for document in collection.find():
            Rnumber = choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

            update = {"$inc": {},"$set": {}}  # Initialize empty update dictionary

            if Rnumber > 1:
                update["$inc"][update_field_2] = 1
                update["$inc"][update_field_4] = 1
                update["$set"][update_field_1] = 1  # Update status atomically
            elif Rnumber == 1:
                update["$inc"][update_field_3] = 1
                update["$inc"][update_field_4] = 1
                update["$set"][update_field_1] = -1  # Update status atomically
            else:
                update["$set"][update_field_1] = 0  # Update status atomically
                
            # Update LastUpdatedTime and StartedTime
            update["$set"][update_field_5] = start_time 
            current_time = datetime.datetime.utcnow()
            update["$set"][update_field_6] = current_time
            
            # calculate rate
            time_delta = current_time - start_time  # Calculate time difference
            success_slots = document.get(update_field_2, 0)
            if success_slots > 0 and time_delta.total_seconds() > 0:  # Avoid division by zero
                update["$set"][update_field_7] = round (success_slots / time_delta.total_seconds(),3)
            else:
                update["$set"][update_field_7] = 0.0  # Set rate to 0 if no success or no time elapsed

            collection.update_one({"_id": document["_id"]}, update)

        print("Updated all documents in the 'machines' collection!")
        sleep(MachineTime)

    except Exception as e:
        print(f"Error updating materials: {e}")
        break

# Close connection
client.close()
