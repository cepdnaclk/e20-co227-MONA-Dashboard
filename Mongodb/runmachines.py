import pymongo
from random import choice
from time import sleep
import datetime

# Replace these with your connection details
# Local database
#client = pymongo.MongoClient("mongodb://localhost:27017/")  # Assuming local MongoDB

# Atlas database
client = pymongo.MongoClient("mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/?retryWrites=true&w=majority&appName=monadash")

db = client["test"]  # Replace with your desired database name
collection1 = db["realtimeinfos"]  # Replace with your desired collection name
collection2 = db["dayinfos"]
collection3 = db["rateinfos"]

#setmachine time
MachineTime = 3

# Field names
update_field_0 = "MachineNumber"
update_field_1 = "Status"
update_field_2 = "SuccessSlots"
update_field_3 = "FailureSlots"
update_field_4 = "TotalSlots"
update_field_5 = "StartedTime"
update_field_6 = "LastUpdatedTime"
update_field_7 = "Rate"

update_field_11 = "SuccessItems"
update_field_12 = "FailureItems"
update_field_13 = "TotalItems"
update_field_14 = "SuccessRate"

target_document = {"Doc": 1 }  # Filter for the target document in collection 2

#sort the documents in ascending order of MachineNumber
collection1.find().sort("MachineNumber", 1)

# Update all documents with zero values for specified fields
update = {"$set": {update_field_2: 0, update_field_3: 0, update_field_4: 0, update_field_7:0}}
result = collection1.update_many({}, update) 

# Delete all documents in collection 3
collection3.delete_many({})

# Capture start time at the beginning
start_time = datetime.datetime.utcnow()  # Get current UTC time


while True:
    try:
        
        
        for document in collection1.find():
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
            success_slots = document.get(update_field_2)
            if success_slots > 0 and time_delta.total_seconds() > 0:  # Avoid division by zero
                update["$set"][update_field_7] = round (success_slots / time_delta.total_seconds(),3)
            else:
                update["$set"][update_field_7] = 0.0  # Set rate to 0 if no success or no time elapsed

            collection1.update_one({"_id": document["_id"]}, update)
            
            rate_info = {
                        "MachineNumber": document.get(update_field_0),
                        "Status": document.get(update_field_1), 
                        "SuccessSlots": document.get(update_field_2),
                        "FailureSlots": document.get(update_field_3),
                        "LastUpdatedTime": current_time,
                        "Rate": document.get(update_field_7),
                }
            
            # Insert the documents into the collection
            collection3.insert_one(rate_info)
            
        # Calculate the total sum using aggregation pipeline
        pipeline = [
            {
                "$group": {
                    "_id": None,  # Group all documents together
                    "SuccessItems": {"$sum": f"${update_field_2}"}, # Sum the specified field
                    "FailureItems": {"$sum": f"${update_field_3}"},  # Sum the specified field
                }
            }

        ]

        # Execute the aggregation and get the result (should be a list with one document)
        result = list(collection1.aggregate(pipeline))

        # Check if any documents were found in the source collection
        if result:
            SuccessItems = result[0]["SuccessItems"]  # Extract the total sum from the result
            FaliureItems = result[0]["FailureItems"]  # Extract the total sum from the result

            # Update the existing document in the target collection
            update_document_1 = {"$set": {"SuccessItems": SuccessItems}}  # Update only the total_sum field
            update_document_2 = {"$set": {"FailureItems": FaliureItems}}  # Update only the total_sum field

            # Perform update using update_one with upsert=False (don't create new documents)
            update_result_1 = collection2.update_one(target_document, update_document_1, upsert=False)
            update_result_2 = collection2.update_one(target_document, update_document_2, upsert=False)

            if update_result_1.matched_count == 1:
                print("Successfully updated total sum in the target collection.")
            else:
                print("No document found in the target collection to update.")
        else:
            print("No documents found in the source collection.")

        for document in collection2.find():
            update = {"$set": {}}
            success_items = document.get(update_field_11)
            failure_items = document.get(update_field_12)
            update["$set"][update_field_13] = success_items + failure_items
            if success_items > 0 and (success_items + failure_items) > 0:
                update["$set"][update_field_14] = round((success_items / (success_items + failure_items)) * 100, 2)
            else:
                update["$set"][update_field_14] = 0.0
            collection2.update_one({"_id": document["_id"]}, update)
            
                        
                        
            
        current_time2 = datetime.datetime.utcnow()
        print("Updated all documents in the 'realtimeinfos','dayinfos','rateinfos' collection!"+current_time2.strftime("%Y-%m-%d %H:%M:%S"))
        #sleep(MachineTime)

    except Exception as e:
        print(f"Error updating materials: {e}")
        break

# Close connection
client.close()
