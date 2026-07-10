"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, AlertTriangle, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { API_BASE } from "@/lib/config";

interface ReviewComment {
  file: string;
  line: number;
  severity: "error" | "warning" | "suggestion";
  comment: string;
}

interface Review {
  id: number;
  repoFullName: string;
  pullNumber: number;
  pullTitle: string;
  author: string;
  commentsCount: number;
  summary: string; // JSON string or raw fallback text
  status: string;
  createdAt: string;
}

function ReviewDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!id) {
      setError("No review ID provided");
      setLoading(false);
      return;
    }

    async function fetchReview() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/api/reviews/${id}`);
        if (!res.ok) throw new Error("Could not find the requested review");
        const data = await res.json();
        setReview(data);
      } catch (err: any) {
        console.error("Error fetching review detail:", err);
        setError(err.message || "Failed to load review details");
      } finally {
        setLoading(false);
      }
    }

    fetchReview();
  }, [id]);

  const toggleComment = (commentId: string) => {
    setOpenComments((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  if (loading) {
    return (
      <div className="page-section">
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-12 text-center animate-pulse">
          <div className="h-[20px] bg-[var(--border2)] rounded w-[120px] mx-auto mb-4" />
          <div className="h-[32px] bg-[var(--border2)] rounded w-[250px] mx-auto mb-2" />
          <div className="h-[14px] bg-[var(--border2)] rounded w-[180px] mx-auto" />
        </div>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="page-section">
        <div className="bg-[var(--redbg)] border border-[var(--redbr)] rounded-[var(--r)] p-[20px] text-center">
          <AlertTriangle className="text-[var(--red)] mx-auto mb-3" size={28} />
          <h3 className="text-[14px] font-medium text-[var(--t1)] mb-1">Error</h3>
          <p className="text-[12px] text-[var(--t4)] mb-4">{error || "Review not found"}</p>
          <Link
            href="/dashboard/reviews"
            className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] p-[7px_13px] rounded-[var(--rs)] border border-[var(--border2)] bg-transparent text-[var(--t4)] hover:text-[var(--t2)]"
          >
            <ArrowLeft size={13} /> Back to reviews
          </Link>
        </div>
      </div>
    );
  }

  // Parse summary column
  let displaySummary = "";
  let comments: ReviewComment[] = [];

  try {
    const parsed = JSON.parse(review.summary);
    displaySummary = parsed.summary || "";
    comments = parsed.reviews || parsed.comments || [];
  } catch {
    // If it's not a JSON string, treat it as raw text and parse empty comments list
    displaySummary = review.summary;
    comments = [];
  }

  // Calculate severity breakdown count for UI
  const errorCount = comments.filter(c => c.severity === "error").length;
  const warningCount = comments.filter(c => c.severity === "warning").length;
  const suggestionCount = comments.filter(c => c.severity === "suggestion").length;

  return (
    <div className="page-section" style={{ animation: "fadeIn 0.35s ease both" }}>
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/dashboard/reviews"
          className="inline-flex items-center gap-[6px] text-[12px] font-[family-name:var(--font-b)] text-[var(--t4)] hover:text-[var(--t2)] transition-colors"
        >
          <ArrowLeft size={14} /> Back to reviews
        </Link>
      </div>

      <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-[18px_20px] mb-[14px]">
        <div className="flex items-center gap-[8px] mb-[12px] flex-wrap">
          {comments.length > 0 ? (
            <>
              {errorCount > 0 && (
                <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[var(--redbg)] text-[#fca5a5] border border-[var(--redbr)]">
                  {errorCount} {errorCount === 1 ? "error" : "errors"}
                </span>
              )}
              {warningCount > 0 && (
                <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[var(--yellbg)] text-[#fcd34d] border border-[var(--yellbr)]">
                  {warningCount} {warningCount === 1 ? "warning" : "warnings"}
                </span>
              )}
              {suggestionCount > 0 && (
                <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[rgba(34,197,94,0.1)] text-[var(--em3)] border border-[rgba(34,197,94,0.18)]">
                  {suggestionCount} {suggestionCount === 1 ? "suggestion" : "suggestions"}
                </span>
              )}
            </>
          ) : (
            <span className="inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap bg-[rgba(107,114,128,0.1)] text-[#9ca3af] border border-[rgba(107,114,128,0.18)]">
              {review.commentsCount} comments
            </span>
          )}

          <span className="ml-auto text-[11px] text-[var(--t4)]">
            PR #{review.pullNumber} · reviewed on {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <div className="font-[family-name:var(--font-d)] text-[22px] text-[var(--t1)] mb-[6px] leading-snug">
          {review.pullTitle}
        </div>
        
        <div className="flex items-center justify-between mt-[10px] flex-wrap gap-[10px]">
          <span className="text-[12px] text-[var(--t4)]">
            Repository: <span className="font-[family-name:var(--font-m)] text-[var(--t2)]">{review.repoFullName}</span>
          </span>
          <a
            href={`https://github.com/${review.repoFullName}/pull/${review.pullNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[6px] text-[11px] font-semibold text-[var(--em3)] hover:text-[var(--em4)] transition-colors"
          >
            View on GitHub <ExternalLink size={12} />
          </a>
        </div>
        
        <div className="h-[1px] bg-[var(--border)] my-[14px]"></div>
        
        <div className="text-[12px] text-[var(--t4)] mb-[6px] font-medium tracking-[.04em] uppercase">
          AI Summary
        </div>
        <div className="text-[13px] text-[var(--t3)] leading-[1.75] font-light">
          {displaySummary || "No summary text was generated for this review."}
        </div>
      </div>

      <div className="text-[12px] text-[var(--t4)] mb-[10px] font-medium tracking-[.04em] uppercase mt-6">
        Detailed Comments
      </div>

      {comments.length > 0 ? (
        <div className="space-y-[8px]">
          {comments.map((comment, index) => {
            const commentId = `comment-${index}`;
            const isOpen = openComments[commentId] !== false; // Default open
            
            let badgeClass = "bg-[rgba(34,197,94,0.1)] text-[#86efac] border border-[rgba(34,197,94,0.15)]";
            if (comment.severity === "error") {
              badgeClass = "bg-[var(--redbg)] text-[#fca5a5] border border-[var(--redbr)]";
            } else if (comment.severity === "warning") {
              badgeClass = "bg-[var(--yellbg)] text-[#fcd34d] border border-[var(--yellbr)]";
            }

            return (
              <div key={commentId} className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] overflow-hidden">
                <button
                  type="button"
                  className="w-full bg-transparent text-left flex items-center gap-[10px] p-[10px_14px] cursor-pointer transition-colors duration-150 hover:bg-[rgba(255,255,255,0.02)] select-none"
                  onClick={() => toggleComment(commentId)}
                >
                  <span className={`inline-flex items-center gap-[3px] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px] tracking-[.04em] uppercase whitespace-nowrap ${badgeClass}`}>
                    {comment.severity}
                  </span>
                  <span className="font-[family-name:var(--font-m)] text-[11px] text-[var(--t4)] truncate max-w-[250px] md:max-w-none">
                    {comment.file}
                  </span>
                  <span className="inline-flex items-center p-[2px_8px] rounded-[4px] text-[10px] font-medium bg-[var(--g4)] border border-[var(--border2)] text-[var(--t4)]">
                    line {comment.line}
                  </span>
                  <span className="ml-auto text-[10px] text-[var(--t5)] mr-1 hidden md:inline">
                    {isOpen ? "Click to collapse" : "Click to expand"}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`text-[var(--t5)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                
                {isOpen && (
                  <div className="p-[12px_14px] border-t border-[var(--border)] bg-[rgba(7,12,7,0.35)]">
                    <div className="text-[13px] text-[var(--t3)] leading-[1.7] font-light">
                      {comment.comment}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-12 text-center">
          <AlertTriangle size={24} className="text-[var(--t5)] mx-auto mb-2" />
          <h4 className="text-[13px] font-medium text-[var(--t2)] mb-1">No inline comments</h4>
          <p className="text-[12px] text-[var(--t4)] m-0">
            This review did not post any inline code comments, or comments were created before dynamic tracking was enabled.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ReviewDetailPage() {
  return (
    <Suspense fallback={
      <div className="page-section">
        <div className="bg-[var(--g3)] border border-[var(--border)] rounded-[var(--r)] p-12 text-center animate-pulse">
          <div className="h-[20px] bg-[var(--border2)] rounded w-[120px] mx-auto mb-4" />
          <div className="h-[32px] bg-[var(--border2)] rounded w-[250px] mx-auto mb-2" />
        </div>
      </div>
    }>
      <ReviewDetailContent />
    </Suspense>
  );
}
