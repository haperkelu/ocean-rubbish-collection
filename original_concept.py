import time
import random

class SeaCleanerGame:
    def __init__(self):
        self.level = 1
        self.rubbish_collected = 0
        self.turtles_saved = 0
        self.time_remaining = 60 # Seconds
        self.speed = 10 # Movement speed
        self.lives = 3
        self.game_over = False

    def trigger_hazard(self, hazard_type):
        """Logic based on the student's whiteboard rules"""
        print(f"\n--- OH NO! Hit a {hazard_type}! ---")
        
        if hazard_type == "Jellyfish":
            self.time_remaining -= 5
            print("-5 Seconds!")
        
        elif hazard_type == "Baby Squid":
            self.speed -= 3
            print("Squirted! You are slowed down.")
            
        elif hazard_type == "Big Squid":
            self.time_remaining -= 10
            print("-10 Seconds!")

        elif hazard_type == "Shark":
            self.time_remaining -= 5
            self.speed -= 2
            print("-5 Seconds and slowed down!")

        elif hazard_type == "Boss":
            self.lives -= 1
            print("Giant Squid squirted! -1 LIFE!")

    def collect_rubbish(self):
        self.rubbish_collected += 1
        print(f"Collected Rubbish! Total: {self.rubbish_collected}")

    def save_turtle(self):
        self.turtles_saved += 1
        print(f"Saved a Turtle! Total: {self.turtles_saved}")

    def play_level_3(self):
        print("\n--- STARTING LEVEL 3 ---")
        print("Mission: 6 Rubbish, 2 Turtles. Time: 75s")
        self.time_remaining = 75
        self.rubbish_collected = 0
        self.turtles_saved = 0

        # Simulate gameplay loop
        while self.time_remaining > 0:
            time.sleep(0.5) # Simulate time passing
            self.time_remaining -= 1
            
            # Random events to simulate player interaction
            event = random.choice(["nothing", "rubbish", "turtle", "jellyfish", "squid"])
            
            if event == "rubbish":
                self.collect_rubbish()
            elif event == "turtle":
                self.save_turtle()
            elif event == "jellyfish":
                self.trigger_hazard("Jellyfish")
            elif event == "squid":
                self.trigger_hazard("Baby Squid")

            # Check if mission accomplished
            if self.rubbish_collected >= 6 and self.turtles_saved >= 2:
                print(f"\nLEVEL 3 COMPLETE with {self.time_remaining}s left!")
                return True
        
        print("OUT OF TIME!")
        return False

# --- RUNNING THE SIMULATOR ---
game = SeaCleanerGame()
game.play_level_3()
