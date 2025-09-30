# Making AI More Human: Beyond the Uncanny Valley of Code

## The Robot in the Room

We need to talk about the elephant in the room. Or should I say, the robot.

Current AI feels like talking to a very smart robot who's swallowed a dictionary but never had a proper conversation:
- Technically correct (the worst kind of correct)
- Emotionally vacant (like talking to a tax form)
- Contextually blind (goldfish memory)
- Relentlessly generic (one size fits nobody)

We've built intelligence without understanding. It's like teaching someone to speak by making them memorise the Oxford Dictionary. Sure, they know all the words, but can they order a pint at the pub? No.

## The Humanity Gap

### What Makes Humans Human?

Working with real developers, here's what actually matters:
- We remember conversations (even after a heavy Friday night)
- We learn preferences ("no mushrooms" means NO mushrooms)
- We adapt our communication (formal for clients, casual otherwise)
- We understand context (read the room)
- We have consistency (same person, different day)

### What Makes AI Robotic?

- Forgets everything (worse than me after five pints)
- No preferences (treats everyone like user_id_12345)
- Same tone always (corporate drone mode: activated)
- Context-blind (what do you mean "remember last week"?)
- Random inconsistency (Jekyll and Hyde, but less predictable)

## The Uncanny Valley of Code

You know what's worse than obviously robotic code? AI code that's almost-but-not-quite human. It's creepy:

```javascript
// AI's "perfect" but soulless code
/**
 * Retrieves user information from the database
 * @param {string} userId - The unique identifier for the user
 * @returns {Promise<Object>} The user object
 */
async function retrieveUserInformation(userId) {
  // Validate input parameters
  if (!userId) {
    throw new Error('User ID is required');
  }

  // Fetch user from database
  const userData = await database.query('SELECT * FROM users WHERE id = ?', [userId]);

  // Return the result
  return userData;
}

// vs how I actually write (after midnight, fuelled by coffee)
const get_user = async (user_id) => {
  if (!user_id) throw new Error('Need a user_id, mate')
  return db.query('SELECT * FROM users WHERE id = ?', [user_id])
}
```

One feels like a textbook. The other feels like a developer who values their time.

## The Real World Experiment

I've been running an experiment. Teaching AI to be more human by being more human with it.

### Phase 1: Teaching It Our Language
Not programming languages. Our actual language. The way we talk about code:
- "That function's doing too much" (not "consider refactoring for single responsibility")
- "This is proper hacky" (not "technical debt has been incurred")
- "Ship it" (not "the implementation meets acceptance criteria")

### Phase 2: Context That Matters
Started feeding it real context:
- Our tea break is at 3pm (don't suggest complex refactors at 2:55)
- We're not morning people (ease us in gently before 10am)
- Friday deployments are banned (learned that the hard way)
- We use British spelling in comments (colour, not color)

### Phase 3: Personality Injection
This is where it gets interesting:
```javascript
// Config for humanising our AI
const humanTraits = {
  personality: {
    humour: 'dry_british',
    patience: 'limited_for_bikeshedding',
    enthusiasm: 'high_for_elegant_solutions',
    swearing: 'mild_when_frustrated'
  },
  knowledge: {
    local_context: 'liverpool_tech_scene',
    industry: 'uk_fintech',
    regulations: 'gdpr_not_ccpa',
    culture: 'work_life_balance_matters'
  },
  communication: {
    formality: 'casual_unless_client_present',
    brevity: 'get_to_the_point',
    clarity: 'no_corporate_buzzwords',
    honesty: 'call_out_bad_ideas'
  }
}
```

## Breaking the Uncanny Valley

### The Authenticity Problem
AI tries too hard to be perfect. Humans aren't perfect. We:
- Make typos (then fix them)
- Change our minds (refactoring exists for a reason)
- Have opinions (tabs vs spaces will never die)
- Get frustrated (hence git commit messages like "fixed the thing")

### The Solution: Controlled Imperfection
Not bugs. Personality:
- Opinions on code style (strong ones)
- Preferences that persist (remembers you hate nested ternaries)
- Contextual awareness (knows when you're debugging vs building)
- Emotional intelligence (backs off when you're stressed)

## Real Human Patterns

After analysing how we actually work:

### Morning Patterns
- First hour: Coffee and email (don't suggest complex tasks)
- Second hour: Warming up (easy wins, bug fixes)
- Third hour: Peak productivity (bring on the challenges)

### Communication Patterns
- Short messages mean probably busy
- Long messages mean procrastinating
- No messages mean in the zone, don't interrupt
- Stressed messages mean debugging production

### Code Patterns
- Monday code: Over-engineered (fresh and optimistic)
- Friday code: Pragmatic (just make it work)
- Post-lunch code: Needs review (food coma is real)
- Late night code: Works but needs refactoring

## The Human Touch Checklist

For AI to feel human, it needs:

- **Memory** (remember our previous conversations)
- **Context** (understand the situation, not just the syntax)
- **Personality** (consistent traits, not random responses)
- **Opinions** (preferences that make sense)
- **Adaptation** (learn from interactions)
- **Humour** (appropriate, not forced)
- **Empathy** (recognise frustration and respond accordingly)
- **Localisation** (British English, British culture, British humour)

## The Results So Far

Three months into humanising AI:

**The Good:**
- Feels like pairing with a junior who's learning fast
- Actually helpful rather than just correct
- Remembers project context between sessions
- Suggests tea breaks (seriously, game-changer)

**The Surprising:**
- It called out a bad architecture decision (politely)
- It recognised when I was stuck and suggested a different approach
- It learned inside jokes
- It stopped suggesting American solutions to British problems

## Beyond the Valley

The goal isn't to make AI perfectly human. It's to make it human enough to be helpful without being creepy. We want:

- Intelligence with understanding
- Capability with context
- Power with personality
- Efficiency with empathy

We're not trying to replace humans. We're trying to build tools that work with humans the way humans actually work.

## The Bottom Line

Making AI more human isn't about making it pretend to be human.
It's about making it understand humans.
It's about building tools that fit into our workflow, not the other way around.

Because at the end of the day, we're not adapting to machines.
They should be adapting to us.

Here's what I've learned: the uncanny valley exists because we're trying to fake humanity instead of building genuine understanding. When AI truly knows your context, learns your patterns, and adapts to your working style, it doesn't feel robotic anymore. It feels like a tool that gets you. That understands not just what you're building, but how you build and why.

That's not artificial humanity. That's authentic usefulness. And that's what I'm building, one human-centred feature at a time.

---

*Thomas Butler*
*Teaching robots to be more human, one git commit at a time*
*Still haven't taught it to appreciate Beatles references (working on it)*
