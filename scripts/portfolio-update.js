#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

// Matrix theme colors
const colors = {
  green: '\x1b[32m',
  bright: '\x1b[92m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  dim: '\x1b[2m'
};

// Update types configuration
const updateTypes = {
  '1': { type: 'feature', emoji: '🎉', text: 'New Feature - "Look what I built!"' },
  '2': { type: 'achievement', emoji: '🏆', text: 'Achievement - "I did the thing!"' },
  '3': { type: 'learning', emoji: '📚', text: 'Learning - "My brain grew today"' },
  '4': { type: 'milestone', emoji: '🚀', text: 'Milestone - "Major moment alert!"' },
  '5': { type: 'thought', emoji: '💭', text: 'Thought - "Something worth sharing"' }
};

// Mood configurations
const moods = {
  celebrating: { text: '🎉 High Energy', prefix: "GUESS WHAT?!" },
  reflecting: { text: '😌 Reflective', prefix: "Been thinking..." },
  building: { text: '🔨 Building Mode', prefix: "Just shipped:" },
  conquering: { text: '👑 Conquering', prefix: "Achievement unlocked:" }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

function printHeader() {
  console.clear();
  console.log(colors.green + `
${colors.bright}💚 PORTFOLIO UPDATE STATION 💚${colors.reset}${colors.green}

G'day Tommy! Ready to share your brilliance?
Today's vibe check: [████████░░] 85% LEGENDARY
${colors.reset}`);
}

function printUpdateTypes() {
  console.log(`${colors.cyan}What are we celebrating today?${colors.reset}`);
  Object.entries(updateTypes).forEach(([key, value]) => {
    console.log(`${colors.green}[${key}]${colors.reset} ${value.emoji} ${value.text}`);
  });
  console.log();
}

function formatDate() {
  const date = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function generateUpdateId() {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0];
  const count = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'updates.json'), 'utf8'))
    .updates.filter(u => u.date === dateStr).length + 1;
  return `${dateStr}-${String(count).padStart(3, '0')}`;
}

async function updateDevlog(update) {
  const devlogPath = path.join(__dirname, '..', 'devlog.md');
  const devlog = fs.readFileSync(devlogPath, 'utf8');
  
  let newEntry = `\n### ${formatDate()} - ${update.title} ${update.emoji}\n\n`;
  
  switch(update.type) {
    case 'feature':
      newEntry += `**What I Built:** ${update.description}\n\n`;
      newEntry += `**The Cool Bit:** ${update.coolBit}\n\n`;
      newEntry += `**Tech Used:** ${update.tech.join(', ')}\n\n`;
      newEntry += `**Impact:** ${update.impact}\n\n`;
      break;
    case 'achievement':
      newEntry += `${update.description}\n\n`;
      newEntry += `**Why it matters:** ${update.significance}\n\n`;
      newEntry += `**Next up:** ${update.nextSteps}\n\n`;
      break;
    case 'learning':
      newEntry += `**Today's brain expansion:** ${update.description}\n\n`;
      newEntry += `**The "aha!" moment:** ${update.insight}\n\n`;
      newEntry += `**How I'll use this:** ${update.application}\n\n`;
      break;
    case 'milestone':
      newEntry += `${update.description}\n\n`;
      newEntry += `**The journey:** ${update.journey}\n\n`;
      newEntry += `**The feeling:** ${update.feeling}\n\n`;
      newEntry += `**What's next:** ${update.future}\n\n`;
      break;
    case 'thought':
      newEntry += `${update.description}\n\n`;
      break;
  }
  
  newEntry += `*${update.closingThought}* ${update.closingEmoji}\n\n---`;
  
  // Insert after the year header
  const yearMatch = devlog.match(/## 2025\n/);
  if (yearMatch) {
    const insertPos = yearMatch.index + yearMatch[0].length;
    const updatedDevlog = devlog.slice(0, insertPos) + newEntry + devlog.slice(insertPos);
    fs.writeFileSync(devlogPath, updatedDevlog);
  }
}

async function updateJSON(update) {
  const jsonPath = path.join(__dirname, '..', 'updates.json');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  
  const newUpdate = {
    id: update.id,
    date: new Date().toISOString().split('T')[0],
    type: update.type,
    mood: update.mood,
    title: update.title,
    description: update.description,
    content: update.fullContent,
    tech: update.tech || [],
    impact: update.impact,
    links: update.links || {},
    featured: update.featured || false
  };
  
  data.updates.unshift(newUpdate);
  data.stats.totalUpdates++;
  data.stats.lastUpdated = newUpdate.date;
  
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}

async function gitCommit(message) {
  try {
    execSync('git add .', { cwd: path.join(__dirname, '..') });
    execSync(`git commit -m "Portfolio: ${message}"`, { cwd: path.join(__dirname, '..') });
    console.log(`${colors.green}✓ Changes committed!${colors.reset}`);
  } catch (error) {
    console.log(`${colors.yellow}⚠ Git commit skipped (no changes or not a git repo)${colors.reset}`);
  }
}

async function main() {
  printHeader();
  printUpdateTypes();
  
  const typeChoice = await question(`${colors.green}> ${colors.reset}`);
  const updateType = updateTypes[typeChoice];
  
  if (!updateType) {
    console.log(`${colors.yellow}Invalid choice. Exiting...${colors.reset}`);
    rl.close();
    return;
  }
  
  console.log(`\n${colors.cyan}What's your mood today?${colors.reset}`);
  const moodOptions = Object.entries(moods);
  moodOptions.forEach(([key, value], index) => {
    console.log(`${colors.green}[${index + 1}]${colors.reset} ${value.text}`);
  });
  
  const moodChoice = await question(`\n${colors.green}> ${colors.reset}`);
  const mood = moodOptions[parseInt(moodChoice) - 1]?.[0] || 'building';
  
  console.log(`\n${colors.bright}${moods[mood].prefix}${colors.reset}`);
  
  const update = {
    id: generateUpdateId(),
    type: updateType.type,
    emoji: updateType.emoji,
    mood: mood
  };
  
  // Collect update details based on type
  update.title = await question(`\n${colors.cyan}Title your update:${colors.reset}\n> `);
  update.description = await question(`\n${colors.cyan}Describe it (one line):${colors.reset}\n> `);
  
  if (updateType.type === 'feature') {
    update.coolBit = await question(`\n${colors.cyan}What makes it special?${colors.reset}\n> `);
    const techInput = await question(`\n${colors.cyan}Tech used (comma separated):${colors.reset}\n> `);
    update.tech = techInput.split(',').map(t => t.trim());
    update.impact = await question(`\n${colors.cyan}Who does it help?${colors.reset}\n> `);
  } else if (updateType.type === 'achievement') {
    update.significance = await question(`\n${colors.cyan}Why does it matter?${colors.reset}\n> `);
    update.nextSteps = await question(`\n${colors.cyan}What's next?${colors.reset}\n> `);
  } else if (updateType.type === 'learning') {
    update.insight = await question(`\n${colors.cyan}Key insight?${colors.reset}\n> `);
    update.application = await question(`\n${colors.cyan}How will you use it?${colors.reset}\n> `);
  } else if (updateType.type === 'milestone') {
    update.journey = await question(`\n${colors.cyan}How did you get here?${colors.reset}\n> `);
    update.feeling = await question(`\n${colors.cyan}How does it feel?${colors.reset}\n> `);
    update.future = await question(`\n${colors.cyan}What's next?${colors.reset}\n> `);
  }
  
  // Common fields
  const closingThoughts = [
    'Building the future, one feature at a time.',
    'Every victory counts.',
    'Never stop learning, never stop growing.',
    'From Liverpool with love.',
    'Just Tommy being Tommy.',
    'The journey continues...',
    'Code is poetry in motion.'
  ];
  
  update.closingThought = closingThoughts[Math.floor(Math.random() * closingThoughts.length)];
  update.closingEmoji = '💚';
  
  // Matrix celebration
  console.log(`\n${colors.bright}${colors.green}`);
  console.log('╔═══════════════════════════════════════╗');
  console.log('║     UPDATE SUCCESSFULLY CAPTURED!     ║');
  console.log('║         THE MATRIX HAS YOU...         ║');
  console.log('╚═══════════════════════════════════════╝');
  console.log(colors.reset);
  
  // Update files
  console.log(`\n${colors.cyan}Updating your portfolio...${colors.reset}`);
  
  await updateDevlog(update);
  console.log(`${colors.green}✓ devlog.md updated${colors.reset}`);
  
  await updateJSON(update);
  console.log(`${colors.green}✓ updates.json updated${colors.reset}`);
  
  // Ask about git commit
  const shouldCommit = await question(`\n${colors.cyan}Commit changes? (Y/n)${colors.reset} `);
  if (shouldCommit.toLowerCase() !== 'n') {
    await gitCommit(`${update.title} ${update.emoji}`);
  }
  
  console.log(`\n${colors.bright}${colors.green}Mission accomplished! Your legacy grows stronger. 👑${colors.reset}\n`);
  
  rl.close();
}

main().catch(console.error);