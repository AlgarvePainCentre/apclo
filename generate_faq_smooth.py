import re

css_file = "src/styles/layout/treatments-legacy-grids.css"

prefixes = [
    "rfa", "iss", "pnb", "iacsi", "cb", "cryo", "np", "prp", "hd", "btx", "ppm",
    "hc", "ost", "st", "pt", "ot", "tms", "sf", "dr", "lds", "vp"
]

def make_sel(suffix):
    return ",\n".join([f".{p}{suffix}" for p in prefixes])

sel_expanded_question = ",\n".join([f".{p}-faq-trigger[aria-expanded='true'] .{p}-faq-question" for p in prefixes])
sel_expanded_icon = ",\n".join([f".{p}-faq-trigger[aria-expanded='true'] .{p}-faq-icon" for p in prefixes])
sel_panel_open = ",\n".join([f".{p}-faq-panel[data-open='true']" for p in prefixes])

new_css = f"""/* Treatment FAQ Component */

{make_sel("-faq-inner")} {{
  max-width: 980px;
  margin: 0 auto;
  background: transparent;
}}

{make_sel("-faq-header")} {{
  max-width: 980px;
  margin: 0 auto clamp(18px, 4vw, 32px);
  padding: 0 1rem;
  text-align: left;
}}

{make_sel("-faq-title")} {{
  margin: 0 0 10px !important;
  font-size: clamp(2rem, 3vw, 2.5rem) !important;
  font-weight: 700 !important;
  color: #0f4681 !important;
  text-align: left !important;
}}

{make_sel("-faq-card")} {{
  max-width: 980px;
  margin: 0 auto;
  background: #ffffff !important;
  border-radius: 18px !important;
  overflow: hidden !important;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08) !important;
  padding: 0 !important;
}}

{make_sel("-faq-item")} {{
  border: none !important;
  border-radius: 0 !important;
  margin-bottom: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
}}

{make_sel("-faq-item")} + {make_sel("-faq-item")} {{
  border-top: 1px solid rgba(15, 23, 42, 0.08) !important;
}}

{make_sel("-faq-trigger")} {{
  width: 100%;
  padding: 20px 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 14px;
  border: none !important;
  background: transparent !important;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: background 160ms ease !important;
}}

{make_sel("-faq-trigger")}:hover {{
  background: rgba(15, 23, 42, 0.03) !important;
}}

{make_sel("-faq-trigger")}:focus-visible {{
  outline: none;
  box-shadow: 0 0 0 2px rgba(15, 23, 42, 0.2);
}}

{make_sel("-faq-question")} {{
  font-size: 1rem !important;
  line-height: 1.5 !important;
  color: rgba(15, 23, 42, 0.92) !important;
  text-align: left;
  font-weight: normal;
  transition: color 200ms ease, font-weight 200ms ease;
}}

{make_sel("-faq-icon")} {{
  flex-shrink: 0;
  width: 28px !important;
  height: 28px !important;
  border-radius: 999px !important;
  border: 1px solid rgba(15, 23, 42, 0.18) !important;
  background: rgba(255, 255, 255, 0.9) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 18px !important;
  color: rgba(15, 23, 42, 0.82) !important;
  box-shadow: 0 10px 18px rgba(2, 6, 23, 0.08) !important;
  transition: all 200ms ease !important;
}}

{sel_expanded_question} {{
  color: #0f172a !important;
  font-weight: 800 !important;
}}

{sel_expanded_icon} {{
  border-color: rgba(15, 23, 42, 0.18) !important;
  background: rgba(15, 23, 42, 0.92) !important;
  color: #fff !important;
}}

{make_sel("-faq-panel")} {{
  display: grid !important;
  grid-template-rows: 0fr !important;
  opacity: 0 !important;
  padding: 0 24px !important;
  transition: grid-template-rows 300ms ease-out, opacity 250ms ease-out, padding 300ms ease-out !important;
  overflow: hidden !important;
}}

{sel_panel_open} {{
  grid-template-rows: 1fr !important;
  opacity: 1 !important;
  padding-top: 4px !important;
  padding-bottom: 18px !important;
}}

/* Inner wrapper to handle grid expansion smoothly */
{make_sel("-faq-answer")} {{
  font-size: 1rem !important;
  line-height: 1.6 !important;
  color: rgba(15, 23, 42, 0.76) !important;
  margin: 0 !important;
  text-align: left !important;
  min-height: 0 !important; /* needed for grid-template-rows: 1fr transition to work */
}}
"""

with open("src/styles/components/TreatmentFAQ.css", "w") as f:
    f.write(new_css)

print("TreatmentFAQ.css updated with smooth animations.")