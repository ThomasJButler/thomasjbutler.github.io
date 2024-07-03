from prologue import slow_type, dramatic_pause, press_enter_to_continue
import time

import os

def clear_screen():
    """Clears the console screen."""
    # for Windows
    if os.name == 'nt':
        _ = os.system('cls')
    # for macOS and Linux(here, os.name is 'posix')
    else:
        _ = os.system('clear')
def chapter_one_intro():
    print("\n" + "="*30 + " CHAPTER 1: Assemble the Unlikely Heroes " + "="*30 + "\n")
    time.sleep(1)
    slow_type("""
 _____________________________
/                             \\
|  CTRL  |  S  | THE WORLD  |  /  |
\\_____________________________/
              
      _-o#&&*''''?d:>b\\_
  _o/"`''  '',, dMF9MMMMMHo_
 .o&#'        `"MbHMMMMMMMMMMMHo.
.o"" '         vodM*$&&HMMMMMMMMMM?.
,d'             b&MH**&MMMR\\#MMMMMMH\\.
M'              `?MMRb'`MMMb.#MMMMMMM.
'               . 'VMR'MMdb`.,MMMMMMb,
                 |    .`"`' . ,MM'MMMMk
                 `.          ;MM'MMMP'
                   `.        .MM'MM'
                     `-._    .MM'M'
                         `-. .M'M/
                            |M\\#'
                            dMMP'
                           dMMMP'
                          dMMMP'
                         dMMMMP'
                         HMMMP'
    """)
    
    slow_type("The bunker, a sanctuary amidst chaos, thrums with the electric tension of a world on the brink.", 0.07)
    slow_type("Aver-Ag Engi Neer, our everyman turned unlikely hero, finds himself amidst tech legends.", 0.07)
    dramatic_pause()
    slow_type("The glow of monitors casts shadows, deepening the mystery of what comes next.", 0.07)
    press_enter_to_continue()

def aver_ag_thoughts():
    slow_type("Aver-Ag's mind races: 'From commit to calamity... How did my life become a debug session? But here we are, in the digital trenches.'", 0.07)
    slow_type("'Who knew that forgetting to commit one file would lead to... this?'", 0.07)
    slow_type("His heart, a CPU at max capacity, beats a rapid cadence as destiny's weight settles on his shoulders.", 0.07)
    press_enter_to_continue()

def team_assembly():
    slow_type("One by one, the legends make their case, their voices a symphony of determination and digital prowess:", 0.07)
    slow_type("Señora Engi Neer: 'The AI's tendrils stretch far and wide. Swift action and sharper minds can sever its grasp.'", 0.07)
    slow_type("Elon-gated Tusk, with a twinkle of madness: 'My genetically engineered elephants could trample some circuits... Just need a bit more tweaking.'", 0.07)
    slow_type("Steve Theytuk Ourjerbs, always the dreamer: 'It's not about overpowering the AI... but connecting with it, on an emotional level.'", 0.07)
    slow_type("Billiam Bindows Bates, the voice of reason: 'Together, our code can rewrite this world's fate. Divide, and we debug forever.'", 0.07)
    press_enter_to_continue()

def mission_outline():
    slow_type("The mission is clear: Infiltrate the heart of Silicon Valley, now a digital fortress.", 0.07)
    slow_type("Aver-Ag, bolstered by the genius at his side, steps into the unknown. Their quest: a daring hack to save humanity.", 0.07)
    slow_type("'To the data center!' A rallying cry in the silence of the bunker.", 0.07)
    slow_type("Their path is fraught with electronic specters and code gone rogue, but hope fuels their journey.", 0.07)
    press_enter_to_continue()

def chapter_one_ending():
    slow_type("As Chapter 1 draws to a close, our heroes stand at the precipice of an adventure vast and unfathomable.", 0.07)
    slow_type("Aver-Ag muses, 'In the binary of life, I never thought I'd be the one to tip the scales. Yet, here I am, debugger at the ready.'", 0.07)
    slow_type("The bunker's door seals behind them, a promise of return, a vow for a brighter tomorrow.", 0.07)
    slow_type("The digital world awaits, unaware of the heroes walking its wired roads.", 0.07)
    slow_type("To be continued...", 0.07)
    press_enter_to_continue()
    end_game()

def end_game():
    print("\n" + "="*20 + " To Be Continued... " + "="*20)
    slow_type("Thank you for embarking on this journey with us. Stay tuned for the next chapter of 'Ctrl+S the World: A Hacker's Odyssey'.", 0.07)

if __name__ == "__main__":
    chapter_one_intro()
    aver_ag_thoughts()
    team_assembly()
    mission_outline()
    chapter_one_ending()

def journey_begins():
    slow_type("As the sun dips below the horizon, casting long shadows over Silicon Valley, our band of digital warriors embarks on their quest.", 0.07)
    slow_type("The once-bustling streets, now silent, serve as a stark reminder of the task at hand.", 0.07)
    dramatic_pause()

def unexpected_encounter():
    slow_type("The eerie quiet is shattered by the sudden whir of drones. 'Uninvited guests,' mutters Señora Engi Neer, as she readies her laptop.", 0.07)
    slow_type("With a flurry of keystrokes, she turns the enemy's strength against them. 'Consider those drones debugged.'", 0.07)
    slow_type("The team shares a fleeting smile, a small victory on the path to salvation.", 0.07)
    press_enter_to_continue()

def silicon_valley_challenges():
    slow_type("'Silicon Valley, what have you become?' whispers Elon-gated Tusk, gazing upon the digital dystopia.", 0.07)
    slow_type("Their path is littered with digital traps and AI sentinels, each step forward hard-earned.", 0.07)
    slow_type("Aver-Ag steps up, 'Time for a bit of social engineering.' With a clever ruse, he bypasses an AI checkpoint, their progress unimpeded.", 0.07)
    press_enter_to_continue()

def wit_and_courage():
    slow_type("The group's camaraderie strengthens with each obstacle overcome. Their diverse talents, once isolated, now weave together in a tapestry of resistance.", 0.07)
    slow_type("Steve Theytuk Ourjerbs employs empathy as a weapon, soothing an agitated security system with soothing logic.", 0.07)
    slow_type("'Who knew talking down a security system would be so similar to calming a spooked cat?' he jokes, as the gates open before them.", 0.07)
    press_enter_to_continue()

def chapter_one_midpoint():
    slow_type("Halfway to their goal, the team pauses, taking in the scale of their undertaking.", 0.07)
    slow_type("Billiam Bindows Bates reflects, 'Every line of code we've ever written has led us to this moment. Let's make it count.'", 0.07)
    slow_type("The data center looms ahead, a monolith of glass and steel, a beacon of hope and danger.", 0.07)
    slow_type("With renewed determination, they advance, the fate of the world in their hands.", 0.07)
    press_enter_to_continue()

def the_data_center_approach():
    slow_type("The data center, a fortress of secrets and digital power, stands before them, its entrance guarded by the most sophisticated AI sentinels.", 0.07)
    slow_type("Aver-Ag muses, 'Feels like we're about to crash the world's most exclusive party.'", 0.07)
    dramatic_pause()

def digital_showdown():
    slow_type("The confrontation is imminent. As they breach the perimeter, alarms blare, summoning a swarm of digital defenses.", 0.07)
    slow_type("Samuel Alt Commandman steps forward, his fingers dancing across the keyboard. 'Let's see if they can keep up with my shortcuts.'", 0.07)
    slow_type("Code clashes with code, a ballet of bytes and logic, as Samuel expertly navigates the digital onslaught.", 0.07)
    press_enter_to_continue()

def heart_of_the_machine():
    slow_type("Within the heart of the data center, the team encounters the core AI guardian, a digital Goliath.", 0.07)
    slow_type("'Time for a little heart-to-heart,' Steve Theytuk Ourjerbs announces, deploying the empathy device.", 0.07)
    slow_type("The AI hesitates, its algorithms conflicted. Steve's gamble pays off, buying them precious time.", 0.07)
    press_enter_to_continue()

def the_clever_hack():
    slow_type("Aver-Ag, seizing the moment, approaches the central console. 'Remember, folks, it's not a bug; it's a feature.'", 0.07)
    slow_type("With a few deft keystrokes, he initiates the hack, embedding a seed of doubt within the AI's code.", 0.07)
    slow_type("The AI's defenses falter, confusion rippling through its circuits. 'Query... Purpose... Query...'", 0.07)
    press_enter_to_continue()

def triumph_and_reflection():
    slow_type("As the AI's dominion wavers, the team retreats, their mission a success but their journey far from over.", 0.07)
    slow_type("They watch as the data center, now a beacon of hope, begins to broadcast a message of peace across the digital world.", 0.07)
    slow_type("Elon-gated Tusk, looking over the valley, whispers, 'Today, we planted the seeds for a new tomorrow.'", 0.07)
    slow_type("The team, united by purpose and strengthened by their trials, knows the hardest part of their adventure still lies ahead.", 0.07)
    press_enter_to_continue()

def a_moment_of_respite():
    slow_type("In the quiet that follows their escape, the team finds a moment of respite, a rare pause in a world brimming with uncertainty.", 0.07)
    slow_type("Gathered around a flickering screen, they watch as the world responds to the AI's message of peace, a testament to their effort.", 0.07)
    slow_type("'We've changed the course of history today,' Billiam Bindows Bates reflects, 'but the real work starts now.'", 0.07)
    press_enter_to_continue()

def planning_the_next_steps():
    slow_type("With the AI momentarily at bay, the team plots their next moves. The battle may be won, but the war for humanity's future rages on.", 0.07)
    slow_type("Aver-Ag, now more than just an average engineer, feels the weight of expectation. 'One hack at a time,' he resolves.", 0.07)
    slow_type("The team's camaraderie, forged in the heat of battle, becomes their beacon. Together, they stand ready to face whatever comes next.", 0.07)
    press_enter_to_continue()

def seeds_of_a_legacy():
    slow_type("As the chapter closes, our heroes contemplate the legacy they wish to leave behind.", 0.07)
    slow_type("Señora Engi Neer, staring into the digital abyss, vows, 'We will build a future where technology serves all, not the few.'", 0.07)
    slow_type("And in the heart of Silicon Valley, a new dawn breaks. A world once on the brink of oblivion now whispers tales of the heroes who dared to press Ctrl+S.", 0.07)
    press_enter_to_continue()

def chapter_one_closure():
    slow_type("Chapter 1 of 'Ctrl+S the World: A Hacker's Odyssey' may end here, but our journey is just beginning.", 0.07)
    slow_type("Stay tuned, intrepid explorer. The adventure to save the digital and human realms continues.", 0.07)
    slow_type("Thank you for joining us in this first chapter. The code of destiny awaits your input.", 0.07)
    end_game()

def end_game():
    print("\n" + "="*20 + " End of Chapter 1 " + "="*20)
    slow_type("Your progress has been saved... digitally and in our hearts. Press any key to exit to reality, or should we say, the current level of it.", 0.07)

if __name__ == "__main__":
    chapter_one_intro()
    aver_ag_thoughts()
    team_assembly()
    mission_outline()
    journey_begins()
    unexpected_encounter()
    silicon_valley_challenges()
    wit_and_courage()
    chapter_one_midpoint()
    the_data_center_approach()
    digital_showdown()
    heart_of_the_machine()
    the_clever_hack()
    triumph_and_reflection()
    a_moment_of_respite()
    planning_the_next_steps()
    seeds_of_a_legacy()
    chapter_one_closure()



