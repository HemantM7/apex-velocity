import { newsArticles } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = newsArticles.find((a) => a.id === id);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const article = newsArticles.find((a) => a.id === id);
  if (!article) notFound();

  const related = newsArticles.filter((a) => a.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen pt-24" style={{ background: "#02040A" }}>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-[#02040A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/news"
          className="flex items-center gap-2 text-[#7B7F87] hover:text-white transition-colors text-sm mb-8"
        >
          <ArrowLeft size={14} />
          Back to News
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className="px-3 py-1 text-[10px] tracking-widest text-[#FF5A1F]"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "rgba(255, 90, 31, 0.15)",
              border: "1px solid rgba(255, 90, 31, 0.4)",
            }}
          >
            {article.category.toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5 text-[#7B7F87] text-xs">
            <Calendar size={11} />
            <span style={{ fontFamily: "'Space Mono', monospace" }}>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#7B7F87] text-xs">
            <Clock size={11} />
            <span style={{ fontFamily: "'Space Mono', monospace" }}>{article.readTime}</span>
          </div>
        </div>

        <h1
          className="font-bebas text-white leading-tight mb-6"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "0.05em",
          }}
        >
          {article.title}
        </h1>

        <p className="text-[#C0C0D0] text-lg leading-relaxed mb-8 border-l-2 border-[#FF5A1F] pl-6">
          {article.excerpt}
        </p>

        <div className="prose prose-invert max-w-none">
          <p className="text-[#7B7F87] leading-relaxed mb-6">
            The automotive world has witnessed countless milestones, but few have captured the imagination quite like this. Our engineers have spent years pushing the boundaries of what is physically possible, and the results speak for themselves.
          </p>
          <p className="text-[#7B7F87] leading-relaxed mb-6">
            At the heart of this achievement lies our proprietary carbon fiber monocoque chassis — a structure so rigid and lightweight that it redefines the relationship between power and handling. Every component has been optimized through thousands of hours of computational fluid dynamics simulation and real-world testing.
          </p>
          <p className="text-[#7B7F87] leading-relaxed mb-6">
            The powertrain represents the culmination of our hybrid technology program. By combining a quad-turbocharged V16 with our latest generation electric motor system, we've achieved a power output that was previously the exclusive domain of purpose-built racing machines.
          </p>
          <p className="text-[#7B7F87] leading-relaxed">
            This is not just a car. It is a statement about human potential — about what becomes possible when obsession meets engineering excellence. The future of performance has arrived, and it wears the Apex Velocity badge.
          </p>
        </div>
      </div>

      {/* Related articles */}
      <div
        className="border-t py-16"
        style={{ borderColor: "rgba(192, 192, 208, 0.1)", background: "#0B0F18" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
          <h2
            className="font-bebas text-white text-3xl mb-8"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            RELATED ARTICLES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link key={rel.id} href={`/news/${rel.id}`} className="group">
                <div className="card-dark rounded-lg overflow-hidden">
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${rel.image}')` }}
                    />
                  </div>
                  <div className="p-4">
                    <p
                      className="text-[10px] tracking-widest text-[#FF5A1F] mb-2"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {rel.category.toUpperCase()}
                    </p>
                    <h3 className="text-white text-sm font-medium group-hover:text-[#FF5A1F] transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
