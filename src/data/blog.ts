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
    title: "Highland Pursuit: Stalking Red Hartebeest on Knife's Edge",
    slug: "highland-pursuit-stalking-red-hartebeest-knifes-edge",
    summary: "Professional Hunter Andre Crous details a thrilling walk-and-stalk hunt for a mature Red Hartebeest bull along the dramatic Knife's Edge ridge.",
    content: "The morning sun was just starting to warm the Eastern Cape peaks when we departed Kikuyu Lodge. Our destination was Knife's Edge—a narrow, dramatic ridge-top road with a steep descent on both sides that commands infinite sweeps of the savanna. Red Hartebeest are among the fastest plains game in South Africa, and their keen senses make approaching them on foot a true game of patience.\n\nAndre Crous led the way, scanning the brush-covered slopes below. The morning thermals were rising from the valley floor, carrying our scent up and away from the savanna. We spotted a herd of twelve Hartebeest grazing along a grassy ledge about 400 yards out. To close the distance, we had to crawl along the rocky ridge, using the sparse acacia scrub as visual cover.\n\nAfter a slow, 90-minute walk-and-stalk, we reached a stable slate outcrop just 180 yards from a mature bull. Steadying the rifle on the sticks, the client took a slow breath as the wind settled. With a single, clean shot, the bull was harvested. We celebrated the successful hunt with a hot cup of coffee and a scenic picnic right there on the ridge, looking down at the wild valley. It was a classic walk-and-stalk experience that defined the true spirit of hunting outfitters in South Africa.",
    category: "Safari Life",
    readTime: "5 min read",
    author: "Andre Crous",
    authorRole: "Professional Hunter & Guide",
    date: "August 3, 2026",
    dateISO: "2026-08-03T08:00:00Z",
    featuredImage: "/assets/story_1.jpg",
    tags: ["Hartebeest", "Walk and Stalk", "Knifes Edge", "Highlands"],
    relatedSpecies: ["Impala", "Blesbuck", "Blue Wildebeest"]
  },
  {
    id: "2",
    title: "Shadows in the Acacia: A Walk-and-Stalk Burchell's Zebra Hunt",
    slug: "shadows-acacia-walk-and-stalk-burchells-zebra",
    summary: "How tracking the savanna's natural alarm system through dense acacia woodland tested our tracking skills to the limit.",
    content: "Zebra hunting is widely underestimated. Burchell's Zebra have exceptional eyesight and are notoriously alert. They serve as the natural alarm system of the bushveld; if a zebra herd runs, every other animal in the valley follows. Tracking them on foot requires absolute silence, meticulous attention to wind direction, and a deep understanding of their herd dynamics.\n\nWe picked up fresh tracks near the Bushmans River valley in the late afternoon. The soil was damp, making the hoofprints easy to follow, but the thick acacia scrub meant our visibility was limited to under 80 yards. The wind was cooling down, creating a sinking thermal draft that forced us to adjust our route and stalk from the ridges downward.\n\nStep by step, we moved through the thorn bushes. Andre pointed out the flick of an ear through a gap in the branches. We froze. The stallion was standing guard while the rest of the herd grazed. We waited in absolute stillness for twenty minutes until the guard turned his head, allowing us to slide behind a large termite mound. At 75 yards, the client took the shot. The harvest was successful, and we shared a cold beer beside the bakkie under the fading African sky. It was an unforgettable encounter with one of Africa's most iconic species.",
    category: "Safari Life",
    readTime: "6 min read",
    author: "Andre Crous",
    authorRole: "Professional Hunter & Guide",
    date: "August 1, 2026",
    dateISO: "2026-08-01T09:00:00Z",
    featuredImage: "/assets/story_2.jpg",
    tags: ["Zebra", "Acacia Stalk", "Valley Waterways", "Bow Hunting"],
    relatedSpecies: ["Zebra Burchell's", "Wildebeest blue"]
  },
  {
    id: "3",
    title: "The Ridge Walker: Pursuing Gemsbuck on Rocky Valleys",
    slug: "ridge-walker-pursuing-gemsbuck-rocky-valleys",
    summary: "A high-elevation stalk for a majestic Gemsbuck bull, ending with a scenic lunch at the legendary God's Eye overlook.",
    content: "The Gemsbuck (Oryx) is a true desert specialist, but in the Eastern Cape, they thrive on the high, rocky ridges. Their long, rapier-like horns and striking black-and-white face markings make them one of the most sought-after trophies in South Africa. They are tough, resilient, and possess incredibly sharp eyes that can spot movement from miles away.\n\nOur stalk began near the base of the private valley coordinate and took us up a steep, rocky trail toward God's Eye—our signature lunch spot with a standout view of the entire 10,000-hectare property. We had spotted a mature Gemsbuck bull solitary on a high plateau, standing like a statue against the blue sky.\n\nWe spent two hours ascending the rocky spine of the mountain, fighting the shifting wind. Our boots clicked against the loose slate, and every step had to be carefully placed. Finally, we reached the lip of the plateau, keeping our profile below the skyline. The bull was grazing at 220 yards. The client set up on the shooting sticks, waited for the bull to turn broadside, and made a perfect shot. After securing the trophy, we sat at the God's Eye overlook, enjoying a gourmet lunch prepared by Jenna's kitchen, gazing across the vast landscape we had just climbed. It was the perfect culmination of a hard, rewarding stalk.",
    category: "Safari Life",
    readTime: "5 min read",
    author: "Andre Crous",
    authorRole: "Professional Hunter & Guide",
    date: "July 28, 2026",
    dateISO: "2026-07-28T10:00:00Z",
    featuredImage: "/assets/story_3.jpg",
    tags: ["Gemsbuck", "Gods Eye", "Mountain Stalk", "Eastern Cape"],
    relatedSpecies: ["Gemsbuck Oryx", "Kudu Bull over 55'"]
  }
];
