const fs = require('fs');

const cssVars = fs.readFileSync('scratch/cssvars.txt', 'utf8');

const customClasses = `
/* Landing Page Custom Classes */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}
.academic-glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(229, 231, 235, 0.5);
}
.brand-shadow {
  box-shadow: 0px 4px 12px rgba(0,0,0,0.05);
}
.active-nav-underline {
  position: relative;
}
.active-nav-underline::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-ld-primary);
}
`;

fs.appendFileSync('frontend/app/globals.css', '\n' + cssVars + '\n' + customClasses);
console.log('Appended CSS vars and custom classes to globals.css');
