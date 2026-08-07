import re

with open("src/pages/Home.tsx", "r") as f:
    content = f.read()

# Find indices
hero_end = content.find("      {/* 2nd Section: Packages — Sticky Stacked Cards */}")
acc_start = content.find("      {/* 3rd Section: Luxury Accommodation Redesign (Tab System) */}")
gallery_start = content.find("      {/* 6th Section: Photo Gallery Showcase */}")
testimonials_start = content.find("      {/* 7th Section: Guest Reviews (Immersive Marquee Layout) */}")

if -1 in [hero_end, acc_start, gallery_start, testimonials_start]:
    print("Could not find one of the sections!")
    exit(1)

packages_str = content[hero_end:acc_start]
gallery_str = content[gallery_start:testimonials_start]

# We want to remove gallery, remove packages from its current place, and put packages before testimonials
# Currently: hero -> packages -> acc -> timeline -> meet -> gallery -> testimonials

# Remove packages:
new_content = content[:hero_end] + content[acc_start:]

# Recalculate gallery and testimonials in new_content
gallery_start = new_content.find("      {/* 6th Section: Photo Gallery Showcase */}")
testimonials_start = new_content.find("      {/* 7th Section: Guest Reviews (Immersive Marquee Layout) */}")

# Remove gallery and insert packages before testimonials
final_content = new_content[:gallery_start] + packages_str + new_content[testimonials_start:]

with open("src/pages/Home.tsx", "w") as f:
    f.write(final_content)

print("Successfully reordered!")
