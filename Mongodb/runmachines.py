import pymongo
from random import choice
from random import sample
import time
import datetime
from datetime import datetime, timezone, timedelta
import sys

# Replace these with your connection details
# Local database
#client = pymongo.MongoClient("mongodb://localhost:27017/")  # Assuming local MongoDB

# Atlas database
client = pymongo.MongoClient("mongodb+srv://bhagya:bhagya123@monadash.v8cvc3k.mongodb.net/?retryWrites=true&w=majority&appName=monadash")

db = client["test"]  # Replace with your desired database name
collection1 = db["realtimeinfos"]  # Replace with your desired collection name
collection3 = db["rateinfos"]

#setmachine time
MachineTime = 1

# Field names
update_field_0 = "MachineNumber"
update_field_1 = "Status"
update_field_2 = "SuccessSlots"
update_field_3 = "FailureSlots"
update_field_4 = "TotalSlots"
update_field_5 = "StartedTime"
update_field_6 = "LastUpdatedTime"
update_field_7 = "Rate"
update_field_8 = "StatusChangedTime"
update_field_9 = "Production"

def reset_doc():
        # Update all documents with zero values for specified fields
        update = {"$set": {update_field_1:"off", update_field_2: 0, update_field_3: 0, update_field_4: 0, update_field_7:0}}
        collection1.update_many({}, update) 

        # Delete all documents in collection 3
        collection3.delete_many({})

        # Number of documents to set "off" (adjust if needed)
        documents_to_enable = 23

        # Randomly select document IDs to disable
        disabled_ids = sample(list(collection1.distinct("_id")), documents_to_enable)

        # Update documents with selected IDs
        update_result = collection1.update_many({"_id": {"$in": disabled_ids}}, {"$set": {update_field_1: 0}})

        # Print results
        print(f"{update_result.modified_count} documents updated successfully.")
        
        pass

inputword=input("Do you want to restart (r) or continue (c) all machines ")
if inputword in("R","r"):
        print("All Machines restarted and continue to run...")
        reset_doc()
elif inputword in("C","c"):
        print("All Machines continue to run...")
else:
        print("Invalid input. Please enter 'R' or 'C'.")
        sys.exit()
        


# Capture start time at the beginning
start_time = datetime.now(timezone(timedelta(hours=5, minutes=30)))  # Get current UTC time

while True:
    try:
        
        
        for document in collection1.find():
            if document.get(update_field_1)!="off":
                Rnumber = choice([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

                update = {"$inc": {},"$set": {}}  # Initialize empty update dictionary
                
                if ((Rnumber > 1 and document.get(update_field_1)==1)or (Rnumber == 1 and document.get(update_field_1)==-1) or (Rnumber == 0 and document.get(update_field_1)==0)):
                    None
                else:
                    update["$set"][update_field_8] = datetime.now(timezone(timedelta(hours=5, minutes=30)))
                    
                collection1.update_one({"_id": document["_id"]}, update)
                

                if Rnumber > 1:
                    update["$inc"][update_field_2] = 1
                    update["$inc"][update_field_4] = 1
                    update["$set"][update_field_1] = 1  # Update status automically
                elif Rnumber == 1:
                    update["$inc"][update_field_3] = 1
                    update["$inc"][update_field_4] = 1
                    update["$set"][update_field_1] = -1  # Update status automically
                else:
                    update["$set"][update_field_1] = 0
                    
                # Update LastUpdatedTime and StartedTime
                update["$set"][update_field_5] = start_time 
                
                current_time = datetime.now(timezone(timedelta(hours=5, minutes=30)))
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
                            "Production": document.get(update_field_9)
                    }
                
                # Insert the documents into the collection
                collection3.insert_one(rate_info)
                
                
            else:
                continue
            
 
        current_time2 = datetime.now(timezone(timedelta(hours=5, minutes=30)))
        print("Updated all documents in the 'realtimeinfos','rateinfos' collection!"+current_time2.strftime("%Y-%m-%d %H:%M:%S"))
        #sleep(MachineTime)

    except Exception as e:
        print(f"Error updating materials: {e}")
        break
    
    except KeyboardInterrupt:
        print("** User interrupted!**")
        # Prompt user for confirmation (optional)
        confirm = input("Do you want to stop (y/n) or restart (r)? ")
        if confirm.lower() == 'y':
            print("Stopping program...")
            break  # Exit the loop
        elif confirm.lower() == 'r':
            print("Restarting program...")
            reset_doc()
            
        else:
            print("Continuing...")

# Close connection
client.close()
