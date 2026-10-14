"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseModal, CourseDetail } from "@/components/shared/CourseModal";
import { ApplyModal } from "@/components/shared/ApplyModal";

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [enrolCourseTitle, setEnrolCourseTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const courses: (CourseDetail & { code: string; category: string; durationHours: string })[] = [
    {
      id: "mse",
      code: "PSY-101",
      category: "assessment",
      durationHours: "Structured Live Masterclass",
      title: "Case History and Mental Status Examination (MSE)",
      shortDesc: "Learn how to take a structured case history and conduct a Mental Status Examination, the foundation of every clinical interaction.",
      fullDesc: "Learn how to take a structured case history and conduct a Mental Status Examination, the foundation of every clinical interaction. You will understand what to ask, how to observe, and how to record findings clearly with clinical precision.",
      idealFor: "Students beginning clinical work, interns, trainees.",
      modules: [
        "Structured demographic & history elicitation",
        "Assessing appearance, behaviour & psychomotor activity",
        "Speech, mood, and affective assessment",
        "Thought process, thought content & perceptual abnormalities",
        "Cognitive functions, orientation & insight evaluation",
        "Formulating clear, professional MSE notes",
      ],
    },
    {
      id: "dapt",
      code: "PSY-102",
      category: "assessment",
      durationHours: "Focused Projective Technique",
      title: "Draw-A-Person Test (DAPT)",
      shortDesc: "Understand how the Draw-A-Person Test is administered, scored and interpreted in assessment.",
      fullDesc: "Understand how the Draw-A-Person Test is administered, scored and interpreted. This course covers the purpose of the test, its use in assessment and how to report findings responsibly without over-interpretation.",
      idealFor: "Psychology students and trainees interested in projective and developmental assessment.",
      modules: [
        "Theoretical foundations of projective drawing",
        "Standardized administration protocols & instructions",
        "Qualitative & structural scoring criteria",
        "Emotional indicators & developmental benchmarks",
        "Clinical hypothesis generation & limitations",
        "Ethical report integration and documentation",
      ],
    },
    {
      id: "counselling",
      code: "PSY-201",
      category: "therapy",
      durationHours: "Applied Therapeutic Skills",
      title: "Supportive Counselling Techniques",
      shortDesc: "Build essential counselling skills: active listening, empathy, rapport building, questioning and responding to distress.",
      fullDesc: "Build essential counselling skills: active listening, empathy, rapport building, questioning and responding to distress. A practical course for anyone who works directly with people facing life stressors.",
      idealFor: "Students, counsellors, teachers, health and social care workers.",
      modules: [
        "Establishing genuine therapeutic rapport",
        "Active listening, paraphrasing & reflection of feeling",
        "Effective, open-ended clinical questioning",
        "Non-verbal communication & emotional containment",
        "Managing resistance, silence, and emotional tears",
        "Ethical boundaries & self-care for practitioners",
      ],
    },
    {
      id: "emergency",
      code: "PSY-202",
      category: "crisis",
      durationHours: "Crisis Protocol Masterclass",
      title: "Emergency Support and Resourcefulness Skills",
      shortDesc: "Learn how to respond calmly and appropriately when someone is in acute distress, and connect them with resources.",
      fullDesc: "Learn how to respond calmly and appropriately when someone is in acute distress, and how to connect them with the right help and resources. Includes the basics of safe, ethical crisis response and referral pathways.",
      idealFor: "Students, counsellors, volunteers and professionals who may meet people in distress.",
      modules: [
        "Identifying acute distress & signs of immediate crisis",
        "Psychological First Aid (PFA) principles",
        "De-escalation and grounding techniques",
        "Safety planning & ethical boundaries",
        "Routing to emergency services (112, Tele-MANAS 14416)",
        "Documentation and practitioner debriefing",
      ],
    },
    {
      id: "cbt",
      code: "PSY-301",
      category: "therapy",
      durationHours: "Evidence-Based Intervention",
      title: "Cognitive Behavioral Therapy (CBT)",
      shortDesc: "An introduction to CBT: how thoughts, feelings and behaviours connect, and how structured techniques are used in therapy.",
      fullDesc: "An introduction to CBT: how thoughts, feelings and behaviours connect, and how structured CBT techniques are used in therapy. Learn the core concepts and see how they are applied in evidence-based practice.",
      idealFor: "Master's students, trainees and professionals.",
      modules: [
        "The cognitive model: automatic thoughts, schemas & core beliefs",
        "Collaborative empiricism and agenda setting",
        "Identifying cognitive distortions and thought records",
        "Behavioral experiments and activity scheduling",
        "Structured homework & relapse prevention basics",
        "Case conceptualization demos with real clinical examples",
      ],
    },
    {
      id: "rorschach",
      code: "PSY-302",
      category: "assessment",
      durationHours: "Advanced Psychodiagnostics",
      title: "Rorschach Test",
      shortDesc: "Learn about the Rorschach inkblot test: its background, administration, scoring and interpretation.",
      fullDesc: "Learn about the Rorschach inkblot test: its background, administration, scoring and interpretation. A specialised course for those moving into advanced psychological assessment and comprehensive personality evaluation.",
      idealFor: "Master's students and clinical trainees.",
      modules: [
        "Historical origins and psychometric status of inkblot testing",
        "Standardized administration & inquiry phase",
        "Location, determinants, and developmental quality scoring",
        "Form quality, popular responses, and content analysis",
        "Structural summary calculations & index interpretations",
        "Ethical, prudent clinical reporting guidelines",
      ],
    },
  ];

  const handleOpenDetail = (course: CourseDetail) => {
    setSelectedCourse(course);
    setCourseModalOpen(true);
  };

  const handleEnrol = (courseTitle: string) => {
    setEnrolCourseTitle(courseTitle);
    setApplyModalOpen(true);
  };

  const whyTakeCourse = [
    "Taught by an RCI-registered Clinical Psychologist",
    "Practical, skill-based learning",
    "Flexible online delivery",
    "Useful for academics, placements and professional practice",
  ];

  const filteredCourses = courses.filter((c) => {
    if (selectedCategory === "all") return true;
    return c.category === selectedCategory;
  });

  return (
    <div className="relative w-full text-foreground selection:bg-[#114B43]/15 selection:text-[#114B43]">
      {/* ── Page Masthead ───────────────────────────────────── */}
      <section className="pt-12 pb-20 sm:pt-16 sm:pb-24 bg-[#FAF8F5] dark:bg-[#0B1917] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-b border-[#114B43]/15 dark:border-emerald-900/40 pb-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground tracking-wider uppercase">The Psych Co.</span>
              <span className="text-muted-foreground/40">/</span>
              <span>Course Catalog · Skill-Specific Certifications</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#114B43] dark:text-emerald-300 font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#114B43] dark:bg-emerald-400" />
              <span>RCI Registration: CRR A111440</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight leading-[1.12]">
              Certification Courses
            </h1>
            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-open-sans">
              Short, focused courses to build one clinical skill at a time.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => handleEnrol("Certification Course")}
                className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-7 py-3 text-sm shadow-xs font-medium"
              >
                Enrol in a Course
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-7 py-3 text-sm border-border hover:bg-card"
              >
                <Link href="/#contact">Not sure which one? Talk to Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro Section ──────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed font-open-sans">
            Not ready for a full internship, or want to go deep on one topic? Our certification courses are designed to give you specific, job-relevant skills, taught by an RCI-registered Clinical Psychologist. Pick one course or combine several.
          </p>
        </div>
      </section>

      {/* ── Course Directory ───────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All 6 Courses" },
              { id: "assessment", label: "Assessment & Testing" },
              { id: "therapy", label: "Counselling & Therapy" },
              { id: "crisis", label: "Emergency & Crisis" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#114B43] text-white"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card border border-[#E5DFD5] rounded-2xl p-7 flex flex-col justify-between hover:border-[#114B43]/40 transition-colors shadow-xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">
                      {course.code}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {course.durationHours}
                    </span>
                  </div>

                  <h3 className="text-xl font-outfit font-bold text-foreground leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-open-sans">
                    {course.shortDesc}
                  </p>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#122522] border border-border/70 text-xs">
                    <strong className="text-foreground block mb-0.5">Ideal for:</strong>
                    <span className="text-muted-foreground">{course.idealFor}</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/70 flex items-center gap-2.5">
                  <Button
                    variant="outline"
                    onClick={() => handleOpenDetail(course)}
                    className="flex-1 rounded-full text-xs font-semibold border-border hover:bg-muted"
                  >
                    Know More
                  </Button>
                  <Button
                    onClick={() => handleEnrol(course.title)}
                    className="flex-1 rounded-full text-xs font-semibold bg-[#114B43] hover:bg-[#0c3933] text-white shadow-xs"
                  >
                    Enrol Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Take a Course With Us? ─────────────────────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Academic Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              Why take a course with us?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {whyTakeCourse.map((point, i) => (
              <div
                key={i}
                className="bg-[#FAF8F5] dark:bg-[#122522] p-5 rounded-2xl border border-[#E5DFD5] flex items-center gap-3.5"
              >
                <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-300 shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        onEnrol={(title) => handleEnrol(title)}
      />

      {/* Apply Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultProgram="Certification Course"
        defaultCourse={enrolCourseTitle}
      />
    </div>
  );
}
