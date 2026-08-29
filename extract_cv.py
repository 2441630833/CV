from pypdf import PdfReader

r = PdfReader("CV.pdf")
print("PAGES:", len(r.pages))
for i, p in enumerate(r.pages):
    print(f"\n=== PAGE {i+1} ===")
    print(p.extract_text())
