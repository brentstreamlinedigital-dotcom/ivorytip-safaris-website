export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: "Conservation" | "Tracking Tips" | "Lodge Recipes" | "Safari Life";
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  dateISO: string;
  featuredImage: string;
  tags: string[];
  relatedSpecies: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Eastern Cape Wind Patterns: The Secret to Stalking Kudu",
    slug: "understanding-eastern-cape-wind-patterns-kudu",
    summary: "Professional Hunter Andre Crous details how thermal drafts inside Eastern Cape valleys can make or break your walk-and-stalk kudu hunt.",
    content: "Walk-and-stalk hunting in the Eastern Cape of South Africa is widely considered one of the ultimate tests of a hunter's skill. The terrain is characterized by deep, brush-choked valleys and high, wind-swept ridges. Among all the species that inhabit this rugged landscape, the Southern Greater Kudu—the 'Grey Ghost of the Bush'—is perhaps the most challenging to approach. Kudu possess phenomenal hearing and eyesight, but their primary defense mechanism is their sense of smell. To successfully stalk a kudu within rifle range, you must gain a absolute understanding of local wind behavior and valley thermals.\n\nIn the Eastern Cape, wind is not a static element. It changes direction predictably based on the sun's position and the time of day. Early in the morning, as the sun begins to warm the high peaks, the cool air inside the valleys begins to rise. This creates what trackers call 'updrafts' or upward thermals. If you are positioned below a herd of kudu at dawn, the wind will carry your scent up and away from them. Therefore, our dawn strategy is always to hunt from the valley bottoms, moving slowly uphill.\n\nConversely, as the sun sets and the ridges cool down, the air densifies and falls, creating 'downdrafts' or sinking thermals. If you stalk in the late afternoon, you must adapt your approach and hunt from the ridges downward, ensuring the falling air keeps your scent behind you. Andre Crous advises keeping a constant eye on local vegetation and using a wind indicator bottle filled with fine dust to track micro-currents. Sticking strictly to these wind-stalk principles is the difference between a golden harvest and watching a pair of spiral horns disappear into the acacia.",
    category: "Tracking Tips",
    readTime: "5 min read",
    author: "Andre Crous",
    authorRole: "Professional Hunter & Guide",
    date: "July 24, 2026",
    dateISO: "2026-07-24T08:00:00Z",
    featuredImage: "/assets/Kudu.jpg",
    tags: ["Kudu", "Tracking", "Ballistics", "Eastern Cape"],
    relatedSpecies: ["Kudu Bull under 50’", "Kudu Bull under 55’", "Kudu Bull over 55’"]
  },
  {
    id: "2",
    title: "Stewardship of the Bushveld: How Ethical Hunting Funds Habitat Protection",
    slug: "stewardship-ethical-hunting-funds-habitat",
    summary: "How Ivorytip Safaris leverages sustainable hunting fees to fund anti-poaching canine units and restore natural water wells.",
    content: "The preservation of Africa's wilderness requires active, well-funded conservation. While photographic safaris contribute, it is the regulated, sustainable hunting sector that provides the core financial engine protecting millions of hectares of wild habitat. At Ivorytip Safaris, conservation is not a marketing term—it is our primary mission.\n\nManaging 80,000 hectares of unfenced land in the Eastern Cape comes with significant overhead. Wildlife must be protected from organized poaching syndicates, water access must be maintained through drought cycles, and local communities must see a direct benefit to deter illegal bushmeat snaring. A fixed portion (15%) of every hunter's package fee is directed to our anti-poaching security patrols. These funds keep armed canine handler units in the field 24/7, sweeping boundaries and removing wire traps.\n\nAdditionally, these resources maintain our solar-powered deep borehole water wells. During dry seasons, these wells pump mineral-rich water into natural pools, keeping kudu, giraffes, buffaloes, and predators hydrated. Sustainable hunting ensures that wild spaces remain wild, providing an economic value to wildlife that prevents land from being converted into sheep or cattle farms. By choosing Ivorytip, our guests directly secure the future of the South African bushveld.",
    category: "Conservation",
    readTime: "7 min read",
    author: "Jenna Crous",
    authorRole: "Hospitality & Conservation Trustee",
    date: "June 18, 2026",
    dateISO: "2026-06-18T09:00:00Z",
    featuredImage: "/assets/gallery_client_safari.jpg",
    tags: ["Conservation", "Anti-Poaching", "Community", "Water Wells"],
    relatedSpecies: ["Buffalo Bulls under 40’", "Buffalo Bulls under 45’", "Buffalo Bulls over 45’"]
  },
  {
    id: "3",
    title: "Gourmet Savanna: Slow-Roasted Wildebeest Shank over Ironwood Embers",
    slug: "gourmet-savanna-recipe-roasted-wildebeest-shank",
    summary: "Jenna Crous shares her legendary campfire boma recipe for wildebeest shanks braised in local Pinotage reserve wines.",
    content: "After a long day tracking across the ridges, there is nothing quite like returning to the circular stone boma at Kikuyo Lodge. As the ironwood logs collapse into red hot embers, the air is filled with the scent of woodsmoke and slow-cooking wild game. This week, Jenna Crous sharing her most requested campfire recipe: Slow-Roasted Wildebeest Shank braised in Eastern Cape Pinotage.\n\nWild game meat is exceptionally lean and packed with organic flavor, meaning it benefits from slow braising to tenderize the muscle fibers. We start by browning the shanks in a heavy cast-iron potjie pot directly on the embers. Once seared, we add native root vegetables, wild garlic, and a full bottle of local Pinotage red wine. The pot is then covered and buried in glowing ash, allowing it to simmer gently for four to five hours.\n\nWhen served, the meat falls clean off the bone, rich with the glaze of reduced wine and marrow. We pair this dish with creamy maize pap and a fresh selection of garden vegetables. It is the ultimate campfire meal, offering a physical taste of the savanna that our guests remember long after returning home.",
    category: "Lodge Recipes",
    readTime: "4 min read",
    author: "Jenna Crous",
    authorRole: "Hospitality Director",
    date: "May 12, 2026",
    dateISO: "2026-05-12T10:00:00Z",
    featuredImage: "/assets/Dinner.jpg",
    tags: ["Boma Dining", "Chef Recipe", "Wine Pairing", "Wildebeest"],
    relatedSpecies: ["Wildebeest blue", "Wildebeest golden", "Wildebeest black"]
  }
];
