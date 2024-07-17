from pymongo import MongoClient
from datetime import datetime, timedelta
import random

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')

# Create the database
db = client['machine_data_db']

# Create the collection
machine_data_collection = db['machine_data']

# Delete previous data in the collection
machine_data_collection.delete_many({})

# Define materials and production types
materials = ["GPPS", "TPR", "SAAS", "MABS", "ABS", "HIP"]
production_types = ['Production I', 'Production II', 'Production III', 'Production IV', 'Production V']

def insert_machine_data(machine_id, machine_name, date, shift, total_slots, target_slots, success_slots, failed_slots, daily_production_rate, production_type, material, total_working_time_per_shift):
    document = {
        "machine_id": machine_id,
        "machine_name": machine_name,
        "date": datetime.strptime(date, '%Y-%m-%d'),
        "shift": shift,
        "total_slots": total_slots,
        "target_slots": target_slots,
        "success_slots": success_slots,
        "failed_slots": failed_slots,
        "daily_production_rate": round(daily_production_rate, 3),
        "production_type": production_type,
        "material": material,
        "total_working_time_per_shift": total_working_time_per_shift
    }
    machine_data_collection.insert_one(document)

# Get today's date
end_date = datetime.today()

# Get the date 365 days before yesterday
start_date = end_date - timedelta(days=365 + 1)

for i in range(25):
    machine_id = i + 1
    machine_name = f"M#{machine_id:03d}"
    current_date = start_date
    assigned_production_type = random.choice(production_types)
    while current_date <= end_date:
        # Select one material for the day
        assigned_material = random.choice(materials)
        for shift in ['day', 'night']:
            # Generate random data for the shift
            total_slots = random.randint(80, 120)
            target_slots = random.randint(90, 110)
            success_slots = random.randint(70, total_slots)
            failed_slots = total_slots - success_slots
            daily_production_rate = round(random.uniform(0.5, 1.5), 3)  # Set daily production rate to a random value between 0.5 and 1.5

            # Generate total working time in hours and minutes
            total_working_hours = random.randint(8, 12)
            total_working_minutes = random.randint(0, 59)
            total_working_time_per_shift = f"{total_working_hours}h {total_working_minutes}m"

            insert_machine_data(
                machine_id=machine_id,
                machine_name=machine_name,
                date=current_date.strftime('%Y-%m-%d'),
                shift=shift,
                total_slots=total_slots,
                target_slots=target_slots,
                success_slots=success_slots,
                failed_slots=failed_slots,
                daily_production_rate=daily_production_rate,
                production_type=assigned_production_type,
                material=assigned_material,
                total_working_time_per_shift=total_working_time_per_shift
            )
        
        current_date += timedelta(days=1)

print("Data for all 25 machines over one year inserted.")
