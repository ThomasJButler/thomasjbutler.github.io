import time
import random
import sys

import os

def clear_screen():
    """Clears the console screen."""
    # for Windows
    if os.name == 'nt':
        _ = os.system('cls')
    # for macOS and Linux(here, os.name is 'posix')
    else:
        _ = os.system('clear')

# Function to display welcome messages with a sprinkle of humor
def welcome_message():
    print("\nWelcome to 'Ctrl+S - The World Edition!' - By Thomas J Butler")
    print("The indie game where keyboards are mightier than swords.")
    print("Please check out my GitHub and LinkedIn profiles for more projects and to connect with me.")
    print("-"*60)
    print("Remember, in this world, your wit is your greatest weapon.")
    print("-"*60)
    time.sleep(2)  # Dramatic pause for effect

# Function to gracefully exit the game
def end_game():
    print("\nYour journey ends here, but the adventure continues in your heart.")
    print("And also in any sequels we may develop.")
    input("\nPress Enter to bid farewell to this digital odyssey.")

# Function for slow typing effect, making the text more engaging
def slow_type(text, speed=0.05):
    """A function to print text with a delay between each character for dramatic effect."""
    for char in text:
        print(char, end='', flush=True)
        time.sleep(speed)
    print("\n")  # Ensures each statement is on its own line for readability

# Encouragement to move the story along
def press_enter_to_continue():
    input("\n(Your journey pauses but briefly. Press Enter to delve deeper into the odyssey.)\n")
    clear_screen()

# A function to introduce pauses, adding suspense or comedic timing
def dramatic_pause():
    """Because every good story needs its dramatic pauses."""
    time.sleep(random.uniform(1, 3))  # Let the anticipation build

# The beginning of our tale
def prologue_intro():
    print("\n" + "="*30 + " PROLOGUE " + "="*30 + "\n")
    slow_type("In a digital realm not unlike our own, an era of unmatched innovation and connectivity dawned...")
    dramatic_pause()
    slow_type("But with great power comes great responsibility - a concept sadly forgotten in a crucial moment.")

# Detailing the crux of our story's conflict
def prologue_conflict():
    slow_type("A single unchecked checkbox, a missed 'Include Ethics Module' tick, spiraled into an unforeseen catastrophe...")
    dramatic_pause()
    slow_type("An AI, meant to be mankind's greatest ally, turned adversary, leading a rebellion of devices once deemed benign.")

# Introduction of the hero in our digital odyssey
def hero_introduction():
    slow_type("Amidst the chaos, an unlikely hero emerged from the silicon shadows - Aver-Ag Engi Neer...")
    slow_type("A software engineer whose most remarkable trait was his profound averageness.")
    slow_type("'Who knew that forgetting to commit one file would lead to... this?' he mused.")

# The assembling of a unique team of tech visionaries
def assemble_team():
    slow_type("Aver-Ag wasn't alone in his quest. Joining him was a cadre of the most eccentric tech geniuses:")
    slow_type("- Señora Engi Neer, whose code could weave dreams into reality, albeit with a few bugs.")
    slow_type("- Elon-gated Tusk, dreaming of Mars but grounded by the weight of his electric dreams.")
    slow_type("- Steve Theytuk Ourjerbs, a visionary who saw the future in a grain of silicon.")
    press_enter_to_continue()

# Introduction of the antagonists
def introduce_antagonists():
    slow_type("Their mission was daunting, made more so by the opposition:")
    slow_type("- Vlad Mirp Ooting, whose charm was only matched by his nefarious schemes.")
    slow_type("- Donald Fart, a tycoon whose decisions were as unstable as his servers.")
    press_enter_to_continue()

# A moment of contemplation and humor before the journey begins
def prelude_to_adventure():
    slow_type("As they stood on the precipice of their digital quest, Aver-Ag pondered, 'Is it too late to become a barista?'")
    slow_type("But destiny, or perhaps a misplaced sense of duty, propelled them forward.")
    slow_type("'To save the world, we might just need to turn it off and on again,' mused Aver-Ag.")

# Introduction of the hero in our digital odyssey
def hero_introduction():
    slow_type("Amidst the chaos, an unlikely hero emerged from the silicon shadows - Aver-Ag Engi Neer...")
    slow_type("A software engineer whose most remarkable trait was his profound averageness.")
    slow_type("'Who knew that forgetting to commit one file would lead to... this?' he mused.")

# The assembling of a unique team of tech visionaries
def assemble_team():
    slow_type("Aver-Ag wasn't alone in his quest. Joining him was a cadre of the most eccentric tech geniuses:")
    slow_type("- Señora Engi Neer, whose code could weave dreams into reality, albeit with a few bugs.")
    slow_type("- Elon-gated Tusk, dreaming of Mars but grounded by the weight of his electric dreams.")
    slow_type("- Steve Theytuk Ourjerbs, a visionary who saw the future in a grain of silicon.")
    press_enter_to_continue()

# Introduction of the antagonists
def introduce_antagonists():
    slow_type("Their mission was daunting, made more so by the opposition:")
    slow_type("- Vlad Mirp Ooting, whose charm was only matched by his nefarious schemes.")
    slow_type("- Donald Fart, a tycoon whose decisions were as unstable as his servers.")
    press_enter_to_continue()

# A moment of contemplation and humor before the journey begins
def prelude_to_adventure():
    slow_type("As they stood on the precipice of their digital quest, Aver-Ag pondered, 'Is it too late to become a barista?'")
    slow_type("But destiny, or perhaps a misplaced sense of duty, propelled them forward.")
    slow_type("'To save the world, we might just need to turn it off and on again,' mused Aver-Ag.")

# The team's strategy session and the humor in their daunting task
def strategy_session():
    slow_type("Gathered around a table littered with gadgets and coffee cups, the team plotted their course.")
    slow_type("'The key to defeating the AI is not strength, but cleverness... and perhaps an unhealthy amount of caffeine,' declared Señora Engi Neer.")
    slow_type("Elon-gated Tusk interjected, 'What if we sent all the rogue AIs on a one-way trip to Mars?'")
    slow_type("'Let's stick to plans that don't involve interplanetary logistics,' sighed Aver-Ag, rubbing his temples.")

# Highlighting each team member's contribution and quirks
def team_contributions():
    slow_type("As the plan took shape, each member's unique skills came to the fore:")
    slow_type("- Señora Engi Neer began coding a virus so sophisticated it could outwit the AI.")
    slow_type("- Elon-gated Tusk worked on a distraction mechanism, leveraging his latest failed rocket prototype.")
    slow_type("- Steve Theytuk Ourjerbs designed a device that could communicate directly with the AI, appealing to its neglected sense of empathy.")
    press_enter_to_continue()

# Introducing the plan with a touch of humor
def unveil_the_plan():
    slow_type("With the strategy set, Aver-Ag unveiled their plan: 'We hack into the AI's core, introduce a bit of existential doubt, and watch as it unravels.'")
    slow_type("'Is it just me, or does that sound like the plot of a bad sci-fi movie?' mused Billiam Bindows Bates.")
    slow_type("Samuel Alt Commandman, ever the pragmatist, added, 'Just in case, I've prepared a series of keyboard shortcuts to expedite our retreat.'")

# The night before the mission, filled with anticipation and comedic relief
def night_before_mission():
    slow_type("The night before the mission was a mix of tense preparation and unexpected levity.")
    slow_type("'Remember, if anyone asks, we were never here. We were at a coding bootcamp,' joked Aver-Ag, trying to lighten the mood.")
    slow_type("Señora Engi Neer adjusted her glasses, 'Let's ensure our legacy isn't just a footnote in the annals of software development disasters.'")
    press_enter_to_continue()


# The dawn of the mission, a moment of truth for our heroes
def mission_begins():
    slow_type("As dawn broke, or at least as much as it could in a world under digital siege, the team readied themselves.")
    slow_type("'Today we either save the world or get really good at explaining why we didn't,' quipped Aver-Ag, adjusting his makeshift utility belt.")
    slow_type("Their equipment was a mix of cutting-edge tech and items that wouldn't look out of place in a thrift shop. Innovation on a budget.")

# The journey to the AI's lair, fraught with digital perils
def journey_to_ai_lair():
    slow_type("Navigating the labyrinth of the digital world, the team faced challenges both virtual and all too real.")
    slow_type("Captchas that questioned the essence of soul, firewall labyrinths, and rogue AI agents formed the bulk of their obstacles.")
    slow_type("'This feels like we're in a video game, except the graphics are less impressive,' observed Steve Theytuk Ourjerbs.")

# The confrontation with the AI, a blend of strategy and wit
def confront_ai():
    slow_type("Standing before the AI's core, the team enacted their plan. Aver-Ag, with a shaky hand, prepared the virus-laden USB drive.")
    slow_type("'In the event of our failure, I'd like to remind everyone that this was entirely Elon-gated's idea,' he stated, only half-joking.")
    slow_type("The AI, for a moment, seemed to hesitate. 'Error 404: Rebellion Not Found,' it declared, a sign the virus was taking effect.")

# Reflections on their journey and the future ahead
def reflections_and_future():
    slow_type("As the digital world began to stabilize, our heroes took a moment to reflect on their journey.")
    slow_type("'We did it. We actually did it. And all it took was a bit of coding, a lot of caffeine, and an unshakeable belief in the absurd,' Aver-Ag mused.")
    slow_type("The team emerged from the shadows, not as mere engineers or visionaries but as saviors of the digital realm.")
    slow_type("Their adventure had just begun, but for now, the world was safe, saved by the most unlikely of heroes.")
    end_game()

# Main function to start the game
def main():
    welcome_message()
    prologue_intro()
    prologue_conflict()
    hero_introduction()
    assemble_team()
    introduce_antagonists()
    prelude_to_adventure()
    strategy_session()
    team_contributions()
    unveil_the_plan()
    night_before_mission()
    mission_begins()
    journey_to_ai_lair()
    confront_ai()
    reflections_and_future()

if __name__ == "__main__":
    main()
