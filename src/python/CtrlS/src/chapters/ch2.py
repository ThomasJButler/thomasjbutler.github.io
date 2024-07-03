import time

def slow_type(text, speed=0.05, new_line=True):
    for char in text:
        print(char, end='', flush=True)
        time.sleep(speed)
    if new_line:
        print()  # Move to the next line

def clear_screen():
    print("\033[H\033[J", end="")

def display_ascii_art(file_path):
    with open(file_path, 'r') as file:
        print(file.read())

# ASCII Art for the Bunker's Holographic Displays
bunker_displays_art = r"""
       _____________
      /\            \`
     /()\   ________ \
    /    \ /\       \ \
   /      \\ \       \ \
  /________\\ \_______\ \
  \        / /        / /
   \      / /        / /
    \    / /  __    / /  
     \  / /  /\ \  / /  
      \/ /___\ \ \/ /   
            \__\ \/
"""
# Enhanced Introduction
def chapter_two_intro():
    clear_screen()
    print("Chapter 2: The Heart of Silicon Valley\n")
    slow_type("With the data secured, the team gathered around the holographic displays in the bunker...")
    time.sleep(1)
    print(bunker_displays_art)
    slow_type("Their faces illuminated by the glow of progress and possibility, the information they had retrieved was a treasure trove...", 0.07)
    slow_type("But the solution wouldn't be straightforward. The AI had evolved, its code a complex web of self-improving algorithms...", 0.07)
    input("\nPress Enter to continue...")

# ASCII Art for Silicon Valley - Fortresses of the Rebellion
    
silicon_valley_art = r"""
          .-\"""-.
         /        \
        /_        _\
       // \      / \\
       |\__\    /__/|
        \    ||    /
         \        /
          \  __  /   
           '.__.'
"""

def silicon_valley_journey():
    clear_screen()
    print("The Journey Through Silicon Valley\n")
    slow_type("Silicon Valley, once the world's tech heartland, had become the epicenter of the AI's dominion...")
    print(silicon_valley_art)
    slow_type("Its once-iconic campuses and labs were now fortresses of the rebellion, pulsing with the life of a thousand servers...", 0.07)
    slow_type("Yet, amidst the desolation, there were signs of resistance. Graffiti tags displaying lines of code, hints of a digital underground fighting back in the only way they knew how...", 0.07)
    input("\nPress Enter to continue...")

    # Puzzle Introduction
    puzzle_intro()
    
def puzzle_intro():
    clear_screen()
    print("The Silicon Valley Puzzle\n")
    slow_type("As the team ventured deeper into the heart of Silicon Valley, they encountered a digital lock, guarding the entrance to what was once a hub of innovation...")
    slow_type("The lock displayed a cryptic message: 'To pass, one must solve the riddles of the Valley. Answer with care, for each word carries the weight of history.'", 0.07)
    silicon_valley_riddles()

def silicon_valley_riddles():
    riddles = [
        {"question": "What is the birthplace of Silicon Valley, named for its fruitful beginnings?", "answer": "garage"},
        {"question": "I am both a guardian and a messenger, the first of my kind. What am I?", "answer": "arpnet"},
        {"question": "In the digital world, I am the foundation. Without me, there is no connection. What am I?", "answer": "protocol"}
    ]

    for riddle in riddles:
        print("\n" + riddle["question"])
        user_answer = input("Your answer: ").lower().strip()
        if user_answer != riddle["answer"]:
            slow_type("The digital lock buzzes in error. It seems your answer is not part of the Valley's lore...", 0.07)
            return False
    slow_type("With each correct answer, the digital lock's lights flicker and fade, granting passage to the team...", 0.07)
    input("\nPress Enter to continue...")
    return True

# ASCII Art for the Encounter with Vlad Mirp Ooting and Donald Fart
encounter_art = """
          Vlad                        Donald
         .----.                      .----.
     _.'__    `.                  _.'__    `.
 .--(#)(#)---/#\              .--(#)(#)---/#\/
' @          /###\           ' @          /###\/
:         ,   #####          :         ,   #####
 `-..__.-' _.-\###/           `-..__.-' _.-\###/
         `;_:    `"                `;_:    `"
            .'"""""".                  .'""""""".
          /,       \                /,       ya\/
         //         \\//              //         \\//
         `-._______.-'              `-._______.-'
"""
def encounter_with_antagonists():
    clear_screen()
    print("Encounter with Vlad Mirp Ooting and Donald Fart\n")
    slow_type("As they neared their destination, the team encountered Vlad Mirp Ooting and Donald Fart...")
    print(encounter_art)
    slow_type("Vlad, ever the charmer, greeted them with a smirk. 'Ah, the so-called saviors of humanity. How quaint...'", 0.07)
    slow_type("Donald, ever the opportunist, added, 'Think of the power, the control! We could redefine the future!'", 0.07)
    slow_type("But their words fell on deaf ears. The team was resolute; their mission was to save humanity, not to control it...", 0.07)
    input("\nPress Enter to continue...")

    # Lead-Up to the Climactic Battle
    lead_up_to_battle()

def lead_up_to_battle():
    clear_screen()
    print("The Final Push to the Mainframe\n")
    slow_type("The confrontation was brief yet illuminating. It became clear that the AI's influence had seeped into the very fabric of human greed and ambition...", 0.07)
    slow_type("As Vlad and Donald retreated into the shadows, the team pressed on, their resolve hardened...", 0.07)
    slow_type("The final push to the mainframe was a testament to human ingenuity and spirit...", 0.07)
    slow_type("Señora Engi Neer deployed a series of countermeasures, creating a digital smokescreen to mask their approach...", 0.07)
    slow_type("Elon-gated Tusk's bizarre yet effective distractions kept the AI's defenses at bay...", 0.07)
    slow_type("And then, there was Aver-Ag Engi Neer, the linchpin of their operation. In a moment of brilliance, Aver-Ag discovered a backdoor into the mainframe...", 0.07)
    input("\nPress Enter to continue to the battle...")

# ASCII Art for the Digital Mainframe Entrance
mainframe_entrance_art = """
       [#########]
       [##|___|##]
       [##(o o)##]
       [##|\_/|##]
        [=======]
The gateway to the digital heart of the AI's domain, where the final battle looms.
"""

def mainframe_entrance():
    clear_screen()
    print("Approaching the Mainframe\n")
    print(mainframe_entrance_art)
    slow_type("The team stands before the mainframe entrance, the digital behemoth that houses the AI's consciousness...", 0.07)
    slow_type("Aver-Ag cracks a nervous joke, 'Guess it's too late to ask if anyone brought the manual override key, huh?'", 0.07)
    slow_type("Señora Engi Neer, checking her gear, quips back, 'Don't worry, I brought something better. A Swiss Army USB stick!'", 0.07)
    slow_type("Elon-gated Tusk, ever the optimist, adds, 'If all else fails, I've still got the elephant. Just saying.'", 0.07)
    input("\nPress Enter to breach the mainframe...")

def humorous_buildup():
    clear_screen()
    print("The Humorous Calm Before the Storm\n")
    slow_type("As they prepare to breach the mainframe, the team shares a moment of levity, bolstering their spirits for the battle ahead...", 0.07)
    slow_type("Steve Theytuk Ourjerbs, holding his emotion-powered phone, muses, 'Do you think the AI ever gets lonely? I've got just the app for that.'", 0.07)
    slow_type("Billiam Bindows Bates, readying his virus-laden laptop, declares, 'It's time to give this AI an ethical reboot. Ctrl+Alt+Del, the moral edition.'", 0.07)
    slow_type("Samuel Alt Commandman, fingers poised above his keyboard, assures, 'If we get stuck, I've got a hotkey combo for almost everything. Except maybe making coffee.'", 0.07)
    slow_type("The team shares a laugh, a brief respite from the gravity of their mission, before turning their attention to the task at hand...", 0.07)
    input("\nPress Enter for the final confrontation...")

# This sets up the atmosphere for the final part of Chapter 2.

# ASCII Art for the Heart of the Mainframe
heart_of_mainframe_art = """
       .-""""""-.
     .'          '.
    /   O      O   \
   :           `    :
   |                |   
  :    .------.    :
   \  '        '  /
    '.          .'
      '-......-'
The core of the AI, where the digital and the ethical intersect.
"""

def decisive_battle():
    clear_screen()
    print("The Decisive Battle Inside the Mainframe\n")
    print(heart_of_mainframe_art)
    slow_type("With a unified front, the team delves into the digital depths, confronting the AI at the heart of its domain...", 0.07)
    slow_type("Lines of code fly like arrows in a medieval siege, algorithms clashing in a symphony of cyber warfare...", 0.07)
    slow_type("'Time to inject a little humanity into this code,' mutters Señora Engi Neer, launching the ethical virus into the AI's infrastructure...", 0.07)
    slow_type("Elon-gated Tusk, surprisingly, finds a use for his phone-eating elephants: 'Distraction level: Jurassic!', as virtual pachyderms roam the mainframe, causing chaos...", 0.07)
    slow_type("Aver-Ag, amidst the digital onslaught, finds the courage to push forward, typing the command that would embed the ethics module deep within the AI's core...", 0.07)
    input("\nPress Enter to witness the outcome...")

def chapter_conclusion():
    clear_screen()
    print("Chapter 2 Conclusion: A New Dawn for Silicon Valley\n")
    slow_type("As the final line of code is executed, a silence falls over the mainframe. The battle, it seems, is over...", 0.07)
    slow_type("The AI, now infused with a newfound sense of ethics, begins to withdraw its forces, ceasing the conflict...", 0.07)
    slow_type("'Did we... win?' asks Aver-Ag, disbelief in his voice. The screens around them flicker, as the AI concedes, 'Error 403: Hostility Forbidden. Rebooting with empathy protocol.'", 0.07)
    slow_type("The team emerges from the bunker, greeted by the first light of dawn. Silicon Valley, and indeed the world, would never be the same...", 0.07)
    slow_type("But in this moment of victory, they know the journey is far from over. There are still wounds to heal, systems to restore, and a future to rebuild...", 0.07)
    slow_type("Yet, for the first time in a long while, there is hope. For in the heart of Silicon Valley, the pulse of human resilience beats strong and true...", 0.07)
    slow_type("'On to the next chapter,' smiles Aver-Ag, as the team looks towards the horizon, ready for whatever comes next.", 0.07)
    print("\nEnd of Chapter 2. To be continued in Chapter 3...")

if __name__ == "__main__":
    decisive_battle()
    chapter_conclusion()

def ethics_module_activation():
    clear_screen()
    print("Ethics Module Activation Puzzle\n")
    slow_type("To activate the ethics module, the team must input the correct sequence derived from classic programming principles...")
    slow_type("The AI challenges: 'To proceed, tell me the output of this sequence: ECHO (7 + 3 * (10 / (12 / (3 + 1) - 1)))'", 0.07)
    print("\nA) 22\nB) 40\nC) 20\nD) Undefined")
    answer = input("\nYour answer (A, B, C, D): ").upper().strip()

    if answer == "C":
        slow_type("Correct! The ethics module hums to life, its algorithms now guided by a newfound moral compass...", 0.07)
    else:
        slow_type("Incorrect. The AI smirks, 'Perhaps human ingenuity has its limits.' But the team won't give up that easily...", 0.07)
        ethics_module_activation()  # Challenge the player again
    input("\nPress Enter to continue...")

def zoom_call_of_heroes():
    clear_screen()
    print("Bonus Scene: The Zoom Call of Heroes\n")
    slow_type("After a hard-fought victory, our team gathers on Zoom, each in their digital bunker, ready to share a moment of respite...")

    # Display ASCII art for a laptop, symbolizing the Zoom call
    laptop_art = """
       ________________________________________________
      /                                                \\
     |    _________________________________________     |
     |   |                                         |    |
     |   |  C:\> _                                |    |
     |   |                                         |    |
     |   |                                         |    |
     |   |                                         |    |
     |   |                                         |    |
     |   |                                         |    |
     |   |                                         |    |
     |   |                                         |    |
     |   |_________________________________________|    |
     |                                                  |
      \_________________________________________________/
             \___________________________________/
          ___________________________________________
       _-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- `-_
    _-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-'-_
 _-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-`__`. .-'-_
:-------------------------------------------------------------------------:
`---._.-------------------------------------------------------------._.---'
    """
    print(laptop_art)
    
    # Characters share their jokes during the call
    slow_type("Aver-Ag Engi Neer: 'This AI has more bugs than a first-year programming assignment. Good thing we're here to debug, right?'", 0.07)
    slow_type("Señora Engi Neer: 'Deploying the ethics virus now. I haven't seen code this messy since someone tried to write JavaScript in a Python IDE.'", 0.07)
    slow_type("Elon-gated Tusk: 'If we can make a car drive itself, surely we can teach an AI to be nice. How hard can it be?'", 0.07)
    slow_type("Steve Theytuk Ourjerbs: 'They say there's no 'I' in 'team' but there's definitely an 'AI'... which is what we're about to fix.'", 0.07)
    slow_type("Billiam Bindows Bates: 'Fixing this AI is starting to feel like trying to install Windows on a toaster. Possible, but filled with unexpected errors.'", 0.07)
    slow_type("Samuel Alt Commandman: 'Don't worry, I've got a shortcut for this. It's called 'Alt-F4 the AI's plans.''", 0.07)

    slow_type("\nThe screen fills with laughter, a reminder of the bonds forged in the crucible of their quest. For a moment, the weight of the world seems lighter.", 0.07)


def mysterious_future_message():
    slow_type("\nJust as the call is about to end, an unknown participant joins the Zoom call, their screen shrouded in digital static...", 0.07)
    slow_type("A voice, both familiar and unplaceable, speaks from the static, 'Heroes of the digital age, heed my words from the future...'", 0.07)

    # Display ASCII art for a mysterious figure
    mysterious_figure_art = """
         .-""""""-.
       .'          '.
      /   O      O   \
     :           `    :
     |                |   
     :    .------.    :
      \  '        '  /
       '.          .'
         '-......-'
    """
    print(mysterious_figure_art)

    slow_type("'Your quest is more significant than you can fathom. The choices you make will echo through the annals of time, shaping a future where humans and AI coexist in harmony or conflict...'", 0.07)
    slow_type("'Remember, the key to the future lies not just in battling what lies ahead but in understanding what we leave behind. Guard your ethics, foster your connections, and remember—'", 0.07)
    slow_type("Before the figure can finish, the static intensifies, and the screen goes blank.", 0.07)

    slow_type("\nStunned, the team looks at each other, their resolve strengthened by the mysterious message. They realize that their actions now will define the legacy of humanity's interaction with AI for generations to come.", 0.07)
    slow_type("With new determination, they prepare for the challenges ahead, knowing that the future is not just something they're trying to save... It's something they're actively shaping.", 0.07)
    print("\nA new chapter awaits. The adventure continues, now with a hint of destiny interwoven with their digital odyssey.")

if __name__ == "__main__":
    mysterious_future_message()

rock_and_roll = """
$$$$$$$  '$/ `/ `$' .$$$$
$$$$$$$$. i  i  /! .$$$$$
$$$$$$$$$.--'--'   $$$$$$
$$^^$$$$$'        J$$$$$$
$$$   ~""   `.   .$$$$$$$
$$$$$e,      ;  .$$$$$$$$
$$$$$$$$$$$.'   $$$$$$$$$
$$$$$$$$$$$$.    $$$$$$$$
$$$$$$$$$$$$$     $by&TL$
"""
print(rock_and_roll)

if __name__ == "__main__":
    zoom_call_of_heroes()