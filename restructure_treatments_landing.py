import os
import re

components_dir = "/Volumes/ExternoSSD/pastas/apc-react-main 3/src/pages/treatments/components"
treatments_jsx = "/Volumes/ExternoSSD/pastas/apc-react-main 3/src/pages/treatments/Treatments.jsx"
css_file = os.path.join(components_dir, "SurgicalProceduresStack.css")

# 1. Update CSS
new_css = """
/* Treatment Categories Landing Layout */
.treatment-category-section {
  width: 100%;
  padding: clamp(64px, 8vw, 100px) 20px;
  position: relative;
}

/* Subtle visual separators using background variations and top borders */
.treatment-category-section.bg-white {
  background-color: #ffffff;
}

.treatment-category-section.bg-alt {
  background-color: #f8fafc;
  border-top: 1px solid rgba(15, 23, 42, 0.05);
  border-bottom: 1px solid rgba(15, 23, 42, 0.05);
}

.treatment-category-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.treatment-category-header {
  text-align: center;
  margin-bottom: clamp(40px, 6vw, 64px);
  max-width: 800px;
  margin-inline: auto;
}

.treatment-category-title {
  margin: 0 0 16px;
  font-size: clamp(2.4rem, 5vw, 3.2rem);
  font-weight: 800;
  color: #0f4681;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.treatment-category-desc {
  font-size: clamp(1.05rem, 2vw, 1.15rem);
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
}

/* Grid Layout */
.treatment-category-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(20px, 3vw, 32px);
  align-items: stretch;
}

@media (min-width: 640px) {
  .treatment-category-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .treatment-category-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* Standardized Card Styling */
.treatment-item-card {
  border-radius: 18px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
  height: 100%;
}

.treatment-item-card:hover,
.treatment-item-card:focus-within {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
  border-color: rgba(15, 70, 129, 0.15);
  outline: none;
}

.treatment-item-media {
  background: #f0f7fa;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 16 / 11;
  position: relative;
  overflow: hidden;
}

.treatment-item-icon {
  width: min(180px, 70%);
  height: auto;
  object-fit: contain;
  transition: transform 300ms ease;
}

.treatment-item-card:hover .treatment-item-icon {
  transform: scale(1.05);
}

.treatment-item-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.treatment-item-title {
  margin: 0 0 12px;
  font-size: 1.3rem;
  font-weight: 700;
  color: #003366;
  line-height: 1.3;
}

.treatment-item-divider {
  width: 48px;
  height: 3px;
  background: #ffc166;
  border-radius: 4px;
  margin: 0 0 16px;
  border: none;
}

.treatment-item-desc {
  margin: 0 0 24px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4b5563;
  flex: 1;
}

.treatment-item-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0f4681;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  align-self: flex-start;
  padding: 8px 16px;
  background: rgba(15, 70, 129, 0.05);
  border-radius: 99px;
  transition: background 200ms ease, color 200ms ease;
}

.treatment-item-link:hover {
  background: #0f4681;
  color: #ffffff;
}

.treatment-item-arrow {
  font-size: 1.2rem;
  line-height: 1;
  transition: transform 200ms ease;
}

.treatment-item-link:hover .treatment-item-arrow {
  transform: translateX(4px);
}
"""
with open(css_file, "w") as f:
    f.write(new_css)
print("Updated SurgicalProceduresStack.css")

# 2. Update Components
def update_component(filepath, title, desc, bg_class):
    with open(filepath, "r") as f:
        content = f.read()
    
    # Extract the procedures array safely
    proc_match = re.search(r'(const procedures = \[\s*\{.*\}\s*\];)', content, re.DOTALL)
    if not proc_match:
        return
    procedures = proc_match.group(1)
    
    # Generate new component
    new_comp = f"""import {{ Link }} from 'react-router-dom';
import './SurgicalProceduresStack.css';

{procedures}

export default function {os.path.basename(filepath).replace('.jsx', '')}() {{
  return (
    <section className="treatment-category-section {bg_class}">
      <div className="treatment-category-inner">
        <header className="treatment-category-header">
          <h2 className="treatment-category-title">{title}</h2>
          {f'<p className="treatment-category-desc">{desc}</p>' if desc else ''}
        </header>
        <div className="treatment-category-grid">
          {{procedures.map((proc) => (
            <article key={{proc.id}} className="treatment-item-card">
              <div className="treatment-item-media" aria-hidden="true">
                {{proc.icon}}
              </div>
              <div className="treatment-item-content">
                <h3 className="treatment-item-title">{{proc.title}}</h3>
                <div className="treatment-item-divider" aria-hidden="true" />
                <p className="treatment-item-desc">{{proc.description}}</p>
                <Link to={{proc.link}} className="treatment-item-link" aria-label={{`Learn more about ${{proc.title}}`}}>
                  <span>Learn more</span>
                  <span className="treatment-item-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}}
        </div>
      </div>
    </section>
  );
}}
"""
    # Replace class sp-stack-card-icon-image with treatment-item-icon in procedures
    new_comp = new_comp.replace("sp-stack-card-icon-image", "treatment-item-icon")
    
    with open(filepath, "w") as f:
        f.write(new_comp)
    print(f"Updated {os.path.basename(filepath)}")

update_component(
    os.path.join(components_dir, "SurgicalProceduresStack.jsx"),
    "Surgical Treatments",
    "Advanced surgical interventions designed for long-term stability and pain relief.",
    "bg-white"
)

update_component(
    os.path.join(components_dir, "MinimallyInvasiveProceduresList.jsx"),
    "Minimally Invasive Treatments",
    "State-of-the-art techniques requiring only small incisions, reducing recovery time and discomfort.",
    "bg-alt"
)

update_component(
    os.path.join(components_dir, "NonInvasiveProceduresList.jsx"),
    "Non-Invasive Treatments",
    "Comprehensive therapies and conservative care plans without breaking the skin.",
    "bg-white"
)

# 3. Clean up Treatments.jsx
with open(treatments_jsx, "r") as f:
    content = f.read()

# Remove empty <section className="page-section treatments-overview"></section>
content = re.sub(r'<section[^>]*class(?:Name)?="page-section treatments-overview"[^>]*>\s*</section>', '', content)
# Remove the Minimally Invasive Concept section, we'll rely on the new header
content = re.sub(r'<section className="page-section treatments-minimally-invasive-concept">.*?</section>', '', content, flags=re.DOTALL)
# Remove the Non-Invasive feature section
content = re.sub(r'\{isTreatmentsLandingPage && \(\s*<section id="treatments-non-invasive".*?</section>\s*\)\}', '', content, flags=re.DOTALL)

with open(treatments_jsx, "w") as f:
    f.write(content)
print("Updated Treatments.jsx")
