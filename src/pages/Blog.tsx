import React, { useState, useEffect } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { BLOG_POSTS, BlogPost } from "../data/blog";
import { ArrowRight, Clock, User, Calendar, AlertCircle, BookOpen } from "lucide-react";

export default function Blog() {
  const { setInquiryForm, handleNavClick } = useOutletContext<any>();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const location = useLocation();

  // Check router state for postId to auto-open
  useEffect(() => {
    if (location.state && location.state.postId) {
      const post = BLOG_POSTS.find(p => p.id === location.state.postId);
      if (post) setSelectedPost(post);
    }
  }, [location]);

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [selectedPost]);

  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
        
        {/* Full-width Immersive Hero Header */}
        <div className="relative min-h-[60vh] md:h-[65vh] w-full flex flex-col justify-end overflow-hidden flex-none z-10">
          {/* Backdrop Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={selectedPost.featuredImage}
              alt={selectedPost.title}
              className="w-full h-full object-cover brightness-[0.4] scale-105 origin-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/60 via-transparent to-transparent pointer-events-none z-10" />
          </div>

          {/* Title & Metadata Overlay */}
          <div className="relative z-30 max-w-4xl w-full mx-auto px-6 md:px-12 pb-10 text-left space-y-4">
            <span className="inline-block bg-amber-400 text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
              {selectedPost.category}
            </span>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
              {selectedPost.title}
            </h1>
            
            {/* Meta strip */}
            <div className="py-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-300 font-light border-t border-white/10 pt-4">
              <span className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-amber-400/80" /> <strong className="text-white">{selectedPost.author}</strong> &mdash; {selectedPost.authorRole}</span>
              <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-amber-400/80" /> {selectedPost.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-400/80" /> {selectedPost.readTime}</span>
            </div>
          </div>
        </div>

        {/* Article Body Container */}
        <div className="max-w-4xl w-full px-6 md:px-12 py-12 space-y-8 text-left z-20">
          
          {/* Back button */}
          <div>
            <button
              onClick={() => setSelectedPost(null)}
              className="group inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to all stories
            </button>
          </div>

          {/* Body content */}
          <div className="space-y-6 pt-4">
            {selectedPost.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-stone-300 text-sm sm:text-base leading-[1.9] font-light">
                {para}
              </p>
            ))}
          </div>

          {/* Related Species callout */}
          {selectedPost.relatedSpecies?.length > 0 && (
            <div className="bg-amber-500/[0.03] border border-amber-500/15 rounded-xl p-5 flex gap-4 mt-8">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white block mb-1">Related Species</span>
                <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                  {selectedPost.relatedSpecies.join(" · ")}
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pb-10 flex flex-wrap gap-2 border-t border-white/10 pt-6 mt-8">
            {selectedPost.tags.map(tag => (
              <span key={tag} className="text-[10px] text-stone-400 bg-white/5 px-3 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer CTA Box */}
          <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-3.5 text-left">
              <BookOpen className="w-6 h-6 text-amber-400 shrink-0" />
              <div className="space-y-1">
                <h4 className="text-xs uppercase font-bold tracking-wider text-white">Experience This Safari Firsthand</h4>
                <p className="text-[11px] sm:text-xs text-stone-400 font-light leading-relaxed">Let's configure a custom hunting package built around your checklist.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedPost(null);
                setInquiryForm({
                  name: "",
                  email: "",
                  package: "Custom Bespoke Hunt",
                  lodge: "Kikuyu Lodge",
                  message: `Inquiring after reading: "${selectedPost.title}".`
                });
                handleNavClick("cta-section");
              }}
              className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 text-black text-[10px] font-bold tracking-widest uppercase px-6 py-3.5 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0"
            >
              Inquire Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-8 text-center">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-stone-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Back to all stories
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0906]">

      {/* ── Immersive Hero Header (Natural Landscape backdrop) ── */}
      <div className="relative min-h-screen md:h-[75vh] w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/deon_scoping.png"
            alt="Savanna Magazine"
            className="w-full h-full object-cover brightness-[0.45] scale-105 origin-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/60 via-transparent to-transparent pointer-events-none z-10" />
        </div>

        {/* Main Content Block */}
        <main className="relative z-30 max-w-8xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4"
          >
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Savanna Magazine
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              Hunting Stalks & Stories
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Field journals, tracking wisdom, and conservation dispatches straight from the Eastern Cape bushveld — authored by Andre and Jenna Crous.
            </p>
            <div className="flex items-center justify-center gap-6 mt-4 text-stone-500 text-xs font-light">
              <span>{BLOG_POSTS.length} Logs Published</span>
              <div className="h-3 w-px bg-white/15" />
              <span>Updated July 2026</span>
            </div>
          </motion.div>
        </main>
      </div>

      {/* ── Featured Article (first post, full-width) ── */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold">Featured Log</span>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => setSelectedPost(featured)}
          className="group cursor-pointer grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/20 transition-all duration-500 shadow-2xl shadow-black/60 bg-[#1c130e]/20"
        >
          {/* Image */}
          <div className="relative h-72 lg:h-[420px] overflow-hidden">
            <img
              src={featured.featuredImage}
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1c130e]/40 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1c130e]/60 lg:hidden" />
            <span className="absolute top-5 left-5 bg-amber-400 text-black text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
              {featured.category}
            </span>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] text-stone-500 font-mono uppercase tracking-wider">
                <span>{featured.date}</span>
                <span>·</span>
                <span>{featured.readTime}</span>
              </div>
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-white uppercase leading-tight group-hover:text-amber-100 transition-colors">
                {featured.title}
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed font-light line-clamp-4">
                {featured.summary}
              </p>
              {featured.relatedSpecies && featured.relatedSpecies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {featured.relatedSpecies.map(s => (
                    <span key={s} className="text-[9px] text-amber-300/70 bg-amber-500/10 border border-amber-500/15 px-2.5 py-1 rounded uppercase font-mono tracking-wide">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-xs text-stone-300 font-medium">By {featured.author}</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1.5">
                Read Full Log <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── All Stories Grid ── */}
      {rest.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-32">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-bold">More From the Field</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer bg-[#1c130e]/20 border border-white/5 rounded-xl overflow-hidden hover:border-amber-500/20 transition-all duration-400 shadow-xl flex flex-col"
              >
                {/* Card image */}
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0906]/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-black/70 border border-amber-500/20 text-amber-300 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-stone-500 font-mono">{post.date} · {post.readTime}</span>
                    <h3 className="font-sans text-base font-bold text-white uppercase leading-snug group-hover:text-amber-100 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed font-light line-clamp-3">
                      {post.summary}
                    </p>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">By {post.author}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Log <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Amber accent on hover */}
                <div className="h-px w-0 group-hover:w-full bg-amber-400 transition-all duration-500 ease-out" />
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
