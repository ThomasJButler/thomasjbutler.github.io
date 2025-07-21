`# V3.0 Content Update Plan - Phase 2: CSS Refactoring & Branch Management

## Overview
This plan outlines the comprehensive CSS refactoring and content improvements for the Thomas J Butler portfolio website. The focus is on aligning with the design system, implementing an artistic horizontal grid layout for projects, and enhancing the overall user experience while maintaining the signature Matrix aesthetic.

## Current Branch: v3.1-custom-css-and-styling
All CSS improvements will be made on this branch after merging current content updates.


## Phase 1: CSS Architecture Analysis & Refactoring
**Status: DONE!!**

### Objectives:
- Eliminate CSS duplicates across files
- Align all CSS with design_system.md standards
- Create proper component-based CSS organization
- Ensure consistent use of CSS variables

### Key Issues to Address:
double check all is done here!
1. **CSS Variable Misalignment**
   - `global.css` uses calc() based spacing: `--space-xs: calc(1rem / 4)`
   - `design_system.md` specifies rem values: `--space-xs: 0.25rem`
   - Need to standardize across all files

2. **File Organization**
   - Consolidate duplicate styles
   - Create clear separation between global and component styles
   - Implement proper CSS module structure for React components

### Tasks:
- [ ] Audit all CSS files for duplicates
- [ ] Update global.css to match design_system.md
- [ ] Refactor component-specific styles into modules
- [ ] Remove inline styles from HTML files
- [ ] Create CSS architecture documentation

## Phase 2: Projects Page Artistic Grid Implementation
**Status: COMPLETED ✓**
**Completed: January 2025**

### Achievements:
- ✓ Transformed projects page to use introduction-expertise-card pattern
- ✓ Implemented 2-column layout for better visibility
- ✓ Added image modal for project screenshots
- ✓ Updated navigation categories to: All Projects, Web Showcases, ML and Python, Games, Personal
- ✓ Added Premier League Oracle project
- ✓ Ensured all projects have exactly 6 tags
- ✓ Fixed tab filtering functionality
- ✓ Streamlined homepage latest updates to show only 4 featured projects

### Design Requirements:
- **Desktop**: Horizontal artistic grid with varying card sizes
- **Mobile**: Stack vertically with full-width cards
- **Interaction**: Modal system for detailed project information
- **Animation**: Smooth transitions and hover effects

### Technical Implementation:
1. **Grid Layout**
   ```css
   .projects-grid {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
     grid-auto-flow: dense;
     gap: 2rem;
   }
   
   .project-card:nth-child(3n+1) {
     grid-column: span 2;
   }
   ```

2. **Modal System**
   - Implement JavaScript modal functionality
   - Create overlay with project details
   - Add smooth open/close animations
   - Ensure keyboard navigation support

3. **Responsive Design**
   - Desktop: Multi-column horizontal grid
   - Tablet: 2-column layout
   - Mobile: Single column stack

### Tasks:
- [ ] Remove current vertical grid layout
- [ ] Implement new horizontal grid system
- [ ] Create modal component for project details
- [ ] Add JavaScript for modal interactions
- [ ] Test responsive behavior across devices
- [ ] Optimize performance for smooth animations


## Phase 3: Contact Page Structure & Styling
**Status: PENDING**
**Priority: MEDIUM**

### Current Issues:
- Form animations need refinement
- Video banner integration could be smoother
- Inline JavaScript should be externalized

### Enhancements:
1. **Form Improvements**
   - Fix animation timing and effects
   - Enhance validation feedback
   - Improve accessibility

2. **Structure Updates**
   - Better section organization
   - Cleaner CSS implementation
   - Remove inline styles and scripts

### Tasks:
- [ ] Externalize form JavaScript
- [ ] Fix form animation issues
- [ ] Enhance video banner integradtion
- [ ] Improve form validation UX
- [ ] Test across devices and browsers

## Implementation Timeline

### Week 1: CSS Architecture & Projects Grid
- Days 1-2: CSS audit and refactoring
- Days 3-5: Projects page grid implementation
- Days 6-7: Modal system and testing

### Week 2: Content Pages Enhancement
- Days 1-2: About page certification cleanup
- Days 3-4: Contact page improvements
- Days 5-7: Testing and refinements

## Success Criteria

### Technical Requirements
- [ ] All CSS aligns with design_system.md
- [ ] No duplicate CSS declarations
- [ ] Projects page uses horizontal grid layout
- [ ] Modal system fully functional
- [ ] All pages mobile responsive
- [ ] Performance scores maintained

### User Experience
- [ ] Smooth animations and transitions
- [ ] Intuitive navigation and interactions
- [ ] Consistent Matrix aesthetic throughout
- [ ] Accessible to keyboard and screen reader users
- [ ] Fast page load times

## Testing Checklist

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### Device Testing
- [ ] Desktop (1920x1080, 1440x900)
- [ ] Tablet (iPad, Android tablets)
- [ ] Mobile (iPhone, Android phones)

### Performance Testing
- [ ] Lighthouse scores > 90
- [ ] First contentful paint < 1.5s
- [ ] Time to interactive < 3s
- [ ] Cumulative layout shift < 0.1

## Notes

### Design System Compliance
The design_system.md file is the source of truth for:
- Color palette (Matrix green: #00FF00)
- Typography (VT323 font)
- Spacing system (rem-based values)
- Animation guidelines
- Component patterns

### Git Workflow
1. All work on v3.1-custom-css-and-styling branch
2. Regular commits with descriptive messages
3. Test thoroughly before merging
4. Create PR when ready for review

### Future Considerations
- React component migration (v3.5)
- TypeScript conversion
- Performance optimizations
- SEO enhancements
- Accessibility improvements

## Resources
- design_system.md - Design tokens and guidelines
- CLAUDE.md - Development instructions
- v3.5-migration-plan.md - Future React migration details