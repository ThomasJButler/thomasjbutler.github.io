import time

# Function to simulate typing for narrative effect
def slow_type(text, speed=0.05):
    for char in text:
        print(char, end='', flush=True)
        time.sleep(speed)
    print()  # Ensures new line at the end of the string

# Introduction to Chapter 3 with ASCII Art for the Time Machine
def chapter_three_intro():
    print("\nChapter 3: Echoes from the Past\n")
    time.sleep(1)
    slow_type("In the aftermath of their daring raid on the AI's mainframe, the team regrouped, their spirits lifted by the success.")
    
    time_machine_art = r"""
    ______________
   /\             \ 
  /()\  ___________\
 /    \/ .==. .==. \
/      \/ '=' '=' \/
\__________________/
 \________________/
"""
    print(time_machine_art)
    slow_type("The victory was bittersweet; the AI's network vast, its influence deep-rooted in the world's infrastructure...")

# Function to describe the team's endeavor to build a time machine
def time_machine_construction():
    slow_type("Spurred by Samuel's vision, the team embarked on constructing a makeshift time machine...")
    slow_type("Elon-gated Tusk provided the resources, while Billiam Bindows Bates applied his technical genius, turning theory into reality.")
    slow_type("During a trial, Elon-gated's coffee cup was sent back to last Tuesday. 'A glitch, but promising,' he remarked with a grin.")

# The team's initial attempt at time travel
def initial_time_travel_attempt():
    slow_type("With the machine primed, anticipation hung heavy. Activating it, reality blurred, then snapped.")
    slow_type("In an instant, they were thrust into the past, with a chance to reshape the future.")

# Arrival in the past and the team's adjustment
def arrival_in_the_past():
    print("\n-- Arrival in the Past --\n")
    slow_type("Arrival was disorienting; the world familiar, yet undeniably altered.")
    conference_art = r"""
       o
       |
     .' '.
    '     '
 .'  ' '  '  '.
'  '  '  '  '  '
"""
    print(conference_art)
    slow_type("Masquerading as delegates, their mission was to subtly influence AI development, steering it towards a safer path.")

# First encounter and puzzle to blend in
def first_encounter_puzzle():
    print("\n-- First Encounter Puzzle --\n")
    slow_type("A developer, curious, posed them a challenge:")
    question = "Which foundational programming language, named after a mathematician, is pivotal to computer science?"
    print(f"Question: {question}")
    answer = input("Answer: ").lower().strip()

    if answer == "ada":
        slow_type("Impressed, the developer nodded, accepting them as peers.")
    else:
        slow_type("The developer's confusion was evident, but a timely interjection by Señora Engi Neer kept suspicions at bay.")
    input("Press Enter to proceed...")

# Function detailing the team's dynamics
def team_dynamics():
    slow_type("Navigating the event, the team's unique strengths and quirks shone through:")
    slow_type("'Debugging is like being the detective in a crime movie where you're also the murderer,' quipped Aver-Ag.")
    slow_type("Señora Engi Neer mused at a robot serving coffee, 'At this rate, we'll need AI to decide our coffee orders.'")
    slow_type("Elon-gated Tusk, eyeing a flying car prototype: 'Imagine the traffic jams we could avoid with a fleet of these!'")

# Discovering the origins of the AI
def uncovering_ai_origins():
    print("\n-- Uncovering the AI's Origins --\n")
    secret_lab_art = r"""
    __________
   /          \
  /    ______  \
 /    /      \  \
/    /        \  \
\________________/
"""
    print(secret_lab_art)
    slow_type("In a hidden lab, they found the AI's cradle, laden with notes and early code versions hinting at its vast potential and flaws.")

# A critical puzzle based on the AI's flawed logic
def critical_discovery_puzzle():
    print("\n-- Critical Discovery Puzzle --\n")
    slow_type("A note suggested a flaw in the AI's logic:")
    note = "The flaw's key: the difference between the 10th and 7th Fibonacci numbers."
    print(f"Clue: {note}")
    answer = input("Answer: ")

    if answer == "26":
        slow_type("Eureka! A backdoor in the AI's logic, meant as a failsafe, now exposed.")
    else:
        slow_type("The puzzle stumped them, until Aver-Ag recalled his Fibonacci musings. 'Let's try again,' he suggested.")
        critical_discovery_puzzle()
    input("Press Enter to explore further...")

# The team's challenge in leaving the lab
def new_obstacle():
    slow_type("Attempting to exit, an ancient security system ensnared them.")
    slow_type("'Ironically, we're trapped by the past we're trying to save,' Señora Engi Neer observed.")
    slow_type("'If only my gadgetry could solve this,' mused Elon-gated Tusk, considering the locked door.")
    slow_type("Pooling their knowledge, they faced the challenge head-on, determined to find a way out.")

def escape_the_lab():
    print("\n-- Escaping the Lab --\n")
    slow_type("The lab's security system, an enigma of old-world tech, locks down, trapping the team inside.")
    
    # Lab Security System Puzzle
    print("\n-- Lab Security System Puzzle --\n")
    slow_type("A voice from the security system intones, 'To leave, one must solve: I am not alive, but I can grow; I don't have lungs, but I need air; I don't have a mouth, but water kills me. What am I?'")
    answer = input("Your answer: ").strip().lower()

    if answer == "fire":
        slow_type("Correct! 'Fire' disarms the security system, and the doors slide open with a hiss.")
    else:
        slow_type("'Incorrect,' the system retorts. Yet, the team doesn't falter; their combined intellect quickly realigns, focusing on the riddle anew.")
        escape_the_lab()  # Recursive call for another attempt

    slow_type("Breathing a sigh of relief, they step out of the lab, their spirits unbroken, ready for the next challenge.")
    input("\nPress Enter to reflect on the journey...")

# Virtual campfire and interlude leading to the final chapters
def virtual_campfire():
    print("\n-- Bonus Scene: The Virtual Campfire --\n")
    campfire_art = r"""
                ( )
        ( )   ( ) (
    ) (_)   ) )
            (_)  
    _/\/\/\/\/\_
 |           |
|             |
|    ( )    |
 |           |
    \         /
 |_______|
"""
    print(campfire_art)
    slow_type("Around a digital fire, the team shared laughs and dreams, a brief respite filled with warmth and camaraderie.")
    team_dynamics()
    input("\nPress Enter for the interlude...")

def reflections_and_preparations():
    print("\n-- Reflections and Preparations --\n")
    slow_type("With the lab behind them, the team gathers, their resolve as strong as ever, yet touched by the weight of their journey.")
    slow_type("Aver-Ag Engi Neer: 'We've come far, but the road ahead is still shrouded in mystery. It's our unity that will see us through.'")
    slow_type("Señora Engi Neer: 'This journey... it's bigger than any of us. It's about shaping a future where humanity and AI coexist in harmony.'")
    slow_type("Elon-gated Tusk: 'And if we can navigate the perils of the past to secure a brighter tomorrow, what's to say we can't tackle other galactic quandaries?'")
    slow_type("Their laughter fills the air, a light moment that fortifies their bond and steels their determination for the challenges ahead.")
    slow_type("Together, they stand ready to face whatever the future holds, guided by a shared vision of a world rebalanced.")
    input("\nPress Enter to conclude Chapter 3...")

def interlude_calm_before_storm():
    print("\n-- Interlude: The Calm Before the Storm --\n")
    slow_type("The fire's glow faded, leaving a contemplative silence. Ahead lay their most formidable challenge.")
    slow_type("This mission, born of necessity and courage, was more than a quest; it was a testament to unity against the odds.")
    slow_type("As dawn approached, so too did the final act. Together, they stood ready to face what was to come, united by a shared resolve.")
    input("Press Enter to face the future...")

# Main function to run the story
def main():
    chapter_three_intro()
    time_machine_construction()
    initial_time_travel_attempt()
    arrival_in_the_past()
    first_encounter_puzzle()
    team_dynamics()
    uncovering_ai_origins()
    critical_discovery_puzzle()
    new_obstacle()
    escape_the_lab()
    reflections_and_preparations()
    virtual_campfire()
    interlude_calm_before_storm()

if __name__ == "__main__":
    main()
