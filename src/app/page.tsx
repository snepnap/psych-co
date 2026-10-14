"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Laptop,
  Lock,
  Heart,
  Target,
  Eye,
  AlertTriangle,
  Search,
  ChevronDown,
  Mail,
  Phone,
  Send,
  Calendar,
  FileText,
  BadgeCheck,
  Video,
  Languages,
  Check,
  ExternalLink,
  ChevronRight,
  UserCheck,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplyModal } from "@/components/shared/ApplyModal";
import { CourseModal, CourseDetail } from "@/components/shared/CourseModal";
import { ProgramDecisionMatrix } from "@/components/shared/ProgramDecisionMatrix";
import {
  validateEmail,
  validatePhone,
  validateFullName,
  validateMessage,
  sanitizeText,
} from "@/lib/validation";

export default function AllInOnePage() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("Online Internship (30 days)");
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<CourseDetail | null>(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [enrolCourseTitle, setEnrolCourseTitle] = useState("");

  // Course Filter state
  const [courseCategory, setCourseCategory] = useState("all");

  // FAQ state
  const [faqCategory, setFaqCategory] = useState("all");
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Form state & validation
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "Bachelor's student",
    interest: "Online Internship (30 days)",
    course: "Case History and MSE",
    message: "",
    consent: false,
  });
  const [contactHoneypot, setContactHoneypot] = useState("");
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleOpenApply = (program: string, courseTitle: string = "") => {
    setSelectedProgram(program);
    setEnrolCourseTitle(courseTitle);
    setApplyModalOpen(true);
  };

  const handleOpenCourseModal = (course: CourseDetail) => {
    setSelectedCourseForModal(course);
    setCourseModalOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Silent anti-bot honeypot check
    if (contactHoneypot) {
      setContactSubmitted(true);
      return;
    }

    // 2. Strict validation suite
    const errors: Record<string, string> = {};

    const nameCheck = validateFullName(contactForm.fullName);
    if (!nameCheck.isValid && nameCheck.error) {
      errors.fullName = nameCheck.error;
    }

    const emailCheck = validateEmail(contactForm.email);
    if (!emailCheck.isValid && emailCheck.error) {
      errors.email = emailCheck.error;
    }

    const phoneCheck = validatePhone(contactForm.phone);
    if (!phoneCheck.isValid && phoneCheck.error) {
      errors.phone = phoneCheck.error;
    }

    const messageCheck = validateMessage(contactForm.message);
    if (!messageCheck.isValid && messageCheck.error) {
      errors.message = messageCheck.error;
    }

    if (!contactForm.consent) {
      errors.consent = "Please agree to the contact consent before submitting.";
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactErrors({});
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSubmitted(true);
    }, 600);
  };

  // Audience Diagnostic Matrix
  const audienceRoadmap = [
    {
      stage: "Class 11–12 Students",
      intent: "Curious about psychology as a career?",
      outcome: "Get an early look at what the field really involves before entering university.",
      practicalFocus: "Foundational clinical orientation & ethics",
      timeline: "30-Day Cohort",
    },
    {
      stage: "Bachelor's Students",
      intent: "Bridging textbook theory & practice",
      outcome: "Build practical skills like case history taking and MSE that your syllabus rarely covers.",
      practicalFocus: "Structured history taking & behavioral observation",
      timeline: "30 or 60-Day Cohort",
    },
    {
      stage: "Master's Students",
      intent: "Preparing for placements & clinical work",
      outcome: "Prepare for clinical placements, psychological assessments and case work with confidence.",
      practicalFocus: "Standardized psychometrics & report writing",
      timeline: "60-Day Residency",
    },
    {
      stage: "Working Professionals",
      intent: "Upskilling and continuing education",
      outcome: "Upskill, refresh and add structured clinical training and report writing to your practice.",
      practicalFocus: "Advanced formulation & supervisory review",
      timeline: "Specialized Modules",
    },
  ];

  // Clinician's Values
  const values = [
    {
      title: "Ethics first",
      desc: "Confidentiality, consent and professional boundaries guide everything we do.",
      quote: "Ethical boundaries are not paperwork; they are the foundation of all clinical trust.",
    },
    {
      title: "Learning by doing",
      desc: "Practice, feedback and supervision matter more than slides.",
      quote: "You cannot learn to conduct a Mental Status Examination by memorizing a textbook.",
    },
    {
      title: "Accessible to all",
      desc: "Programs designed for school students through to working professionals.",
      quote: "High-standard clinical training belongs in the hands of every aspiring student.",
    },
    {
      title: "Compassion",
      desc: "Mental health work starts with care for people.",
      quote: "Behind every clinical test score and case formulation is an individual seeking understanding.",
    },
  ];

  // Internship Modules
  const curriculum = [
    {
      num: "01",
      code: "MOD-MSE",
      title: "Case History Taking and Mental Status Examination (MSE)",
      desc: "How to gather a structured history and assess a client's mental state in clinical practice.",
      competency: "Eliciting clinical milestones, evaluating orientation, affect, thought process, and insight.",
    },
    {
      num: "02",
      code: "MOD-PSY",
      title: "Psychological Assessment",
      desc: "Understanding, scoring and interpreting commonly used psychological tests.",
      competency: "Test administration rules, standardized norms, objective scoring, and cautious clinical inference.",
    },
    {
      num: "03",
      code: "MOD-REP",
      title: "Report Writing",
      desc: "How to turn assessment findings into a clear, professional, clinically sound report.",
      competency: "Formulating referral questions, behavioral summaries, diagnostic integration, and recommendations.",
    },
    {
      num: "04",
      code: "MOD-CAS",
      title: "Case Discussions",
      desc: "Work through real-style cases with an experienced clinician and learn how decisions are made.",
      competency: "Differential diagnosis reasoning, hypothesis generation, and clinical debriefing.",
    },
    {
      num: "05",
      code: "MOD-ROL",
      title: "Role Plays",
      desc: "Practise clinical conversations and therapeutic questions in a safe, guided setting.",
      competency: "Simulated client encounters, therapeutic empathy, managing resistance, and verbal pacing.",
    },
    {
      num: "06",
      code: "MOD-SKL",
      title: "Clinical Skills Training",
      desc: "Build core competencies and ethical boundaries used in everyday clinical practice.",
      competency: "Informed consent protocols, therapeutic frame management, and dual-relationship ethics.",
    },
    {
      num: "07",
      code: "MOD-MCK",
      title: "Mock Sessions",
      desc: "Rehearse full sessions and receive constructive clinician feedback.",
      competency: "Conducting an entire intake interview from beginning to end under supervisor observation.",
    },
    {
      num: "08",
      code: "MOD-ENH",
      title: "Skills Enhancement Training",
      desc: "Strengthen and refine your existing skills with advanced techniques and supervisory insights.",
      competency: "Refining diagnostic precision, handling complex presentations, and supervised clinical writing.",
    },
  ];

  // Courses
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

  // Therapy Concerns
  const therapyConcerns = [
    { title: "Stress & Anxiety", desc: "Constant worry, panic sensations, feeling overwhelmed or unable to rest." },
    { title: "Low Mood & Exhaustion", desc: "Loss of motivation, persistent heaviness, or emotional burnout." },
    { title: "Academic & Career Pressure", desc: "Exam anxiety, placement stress, imposter feelings, or career crossroads." },
    { title: "Interpersonal & Family Strain", desc: "Communication barriers, boundary setting, relationship ruptures, and loneliness." },
    { title: "Emotional Regulation", desc: "Difficulty managing anger, mood swings, or emotional reactivity." },
    { title: "Grief, Loss & Major Shifts", desc: "Navigating bereavement, relocations, breakups, or life transitions." },
    { title: "Self-Worth & Imposter Doubt", desc: "Chronic harsh inner criticism, perfectionism, and deep-seated self-doubt." },
    { title: "A Safe Room to Unpack", desc: "Simply needing an objective, confidential, and compassionate listener." },
  ];

  // Differentiators
  const differentiators = [
    {
      title: "Led by an RCI-registered Clinical Psychologist",
      desc: "You learn from, and are supported by, a clinician registered with the Rehabilitation Council of India (CRR: A111440), not from recorded theory alone.",
      highlight: "Direct Clinician Mentorship",
    },
    {
      title: "Learn by doing",
      desc: "Case history taking, assessment, scoring, report writing, role plays and mock sessions. You practise the real work and get feedback.",
      highlight: "Hands-On Clinical Drill",
    },
    {
      title: "Flexible and online",
      desc: "Thirty and sixty day internships and short courses that fit comfortably around your school, college or clinical work.",
      highlight: "1 Hour / Day Live Cohorts",
    },
    {
      title: "Programs for every stage",
      desc: "From Class 11-12 students exploring psychology to professionals sharpening their skills, there is a clear starting point for everyone.",
      highlight: "Tailored Academic Levels",
    },
    {
      title: "Training and therapy under one roof",
      desc: "Our clinical experience in therapy shapes how we teach, so what you learn directly reflects active, real-world practice.",
      highlight: "Active Clinical Bedrock",
    },
    {
      title: "Ethical, confidential practice",
      desc: "We follow strict professional ethics in every session, role play, and conversation with you.",
      highlight: "Zero Outcome Promises · True Ethics",
    },
  ];

  // FAQ
  const faqs = [
    {
      category: "internships",
      q: "Who can join the internship?",
      a: "Students in Class 11-12, bachelor's and master's students of psychology, and working professionals who want to improve their clinical skills.",
    },
    {
      category: "internships",
      q: "Do I need prior experience?",
      a: "No. Programs are designed for different levels, and we guide you from where you are.",
    },
    {
      category: "internships",
      q: "What is the difference between the 30 and 60 day programs?",
      a: "The 30 day program is a focused introduction to core clinical skills. The 60 day program gives more time for depth, practice and feedback, including more case discussions, role plays and mock sessions.",
    },
    {
      category: "internships",
      q: "Is the internship fully online?",
      a: "Yes. All sessions are held online, so you can join from anywhere with a stable internet connection.",
    },
    {
      category: "internships",
      q: "Will I receive a certificate?",
      a: "Yes. A verifiable certificate of completion detailing your training hours and clinical competencies is awarded upon successful completion.",
    },
    {
      category: "courses",
      q: "Can I take just one course?",
      a: "Yes. Each certification course stands on its own, and you can also combine several to fit your learning goals.",
    },
    {
      category: "courses",
      q: "Which course should I start with?",
      a: "If you are new to clinical work, Case History and MSE is a good starting point. Not sure? Write to us and we will suggest one based on your level and goals.",
    },
    {
      category: "therapy",
      q: "Who conducts the sessions?",
      a: "All sessions are conducted by an RCI-registered Clinical Psychologist (CRR: A111440).",
    },
    {
      category: "therapy",
      q: "Is what I share confidential?",
      a: "Yes. Your information is kept strictly confidential, within the limits of the law and professional ethics.",
    },
    {
      category: "therapy",
      q: "Are sessions online?",
      a: "Yes. Sessions are conducted online via encrypted video or audio, allowing you to speak comfortably from your own space.",
    },
    {
      category: "therapy",
      q: "Is therapy suitable for school students?",
      a: "Students can access counselling. For those under 18, parent or guardian consent is required prior to commencing sessions.",
    },
    {
      category: "therapy",
      q: "Is this an emergency service?",
      a: "No. In an acute crisis or emergency, please call 112 or Tele-MANAS at 14416, or go directly to the nearest hospital.",
    },
    {
      category: "general",
      q: "How do I enrol or book?",
      a: "Fill in the form on the Contact section or message us on WhatsApp or email. We will reply within 24 hours.",
    },
    {
      category: "general",
      q: "What are the payment options?",
      a: "We support UPI, bank transfers, and major debit/credit cards with secure digital invoicing.",
    },
  ];

  const filteredCourses = courses.filter((c) => {
    if (courseCategory === "all") return true;
    return c.category === courseCategory;
  });

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = faqCategory === "all" || item.category === faqCategory;
    const matchesQ =
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <div className="relative w-full text-foreground selection:bg-[#114B43]/15 selection:text-[#114B43]">
      {/* ══════════════════════════════════════════════════════
          1. HERO & CLINICAL MASTHEAD (#home)
      ══════════════════════════════════════════════════════ */}
      <section id="home" className="pt-8 pb-20 sm:pt-14 sm:pb-28 bg-[#FAF8F5] dark:bg-[#0B1917] border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Masthead Folio Top Rule */}
          <div className="border-b border-[#114B43]/15 dark:border-emerald-900/40 pb-4 mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground tracking-wider uppercase">The Psych Co.</span>
              <span className="text-muted-foreground/40">/</span>
              <span>Clinical Psychology & Supervised Practice</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-[#114B43] dark:text-emerald-300 font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#114B43] dark:bg-emerald-400" />
                RCI Registration: CRR A111440
              </span>
              <span className="hidden md:inline text-muted-foreground/40">|</span>
              <span className="hidden md:inline">Online Cohorts · Mon–Fri, 1 hr/day</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            {/* Left Narrative Manifesto */}
            <div className="lg:col-span-7 space-y-7">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-outfit font-bold tracking-tight text-foreground leading-[1.08]">
                  Learn Psychology{" "}
                  <span className="font-serif italic font-normal text-[#114B43] dark:text-emerald-300 block sm:inline">
                    the practical way.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-2xl font-open-sans">
                  Online internships, certification courses and psychotherapy, led by an RCI-registered Clinical Psychologist.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="#internships"
                  className="inline-flex items-center justify-center gap-2 bg-[#114B43] hover:bg-[#0c3933] text-white font-medium rounded-full px-7 py-3.5 text-sm transition-all shadow-xs"
                >
                  Explore Programs
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#therapy"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium border border-border bg-card hover:bg-muted/60 transition-colors"
                >
                  Book a Session
                </a>
              </div>

              {/* Editorial Quality Ledger */}
              <div className="pt-6 border-t border-[#114B43]/15 dark:border-emerald-900/40 grid sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-semibold text-foreground block">Clinical Supervision</span>
                  <span className="text-muted-foreground leading-relaxed">Direct mentorship by Rishabh Jain (CRR: A111440).</span>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-foreground block">Zero Outcome Promises</span>
                  <span className="text-muted-foreground leading-relaxed">Rigorous, ethical training grounded in real client realities.</span>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-foreground block">Verifiable Credentials</span>
                  <span className="text-muted-foreground leading-relaxed">Documented training hours and practical competency records.</span>
                </div>
              </div>
            </div>

            {/* Right Academic Docket / Institutional Practice Plate */}
            <div className="lg:col-span-5 bg-card border border-[#E5DFD5] rounded-2xl p-7 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-border/80">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C2613B] block">
                    Institutional Docket
                  </span>
                  <h3 className="font-outfit font-bold text-lg text-foreground mt-0.5">
                    Clinical Practice & Training
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#E8F3F1] dark:bg-[#133D36] text-[#114B43] dark:text-emerald-300 font-semibold border border-[#114B43]/20">
                  CRR: A111440
                </span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-4 py-1 border-b border-border/40">
                  <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    Supervised By
                  </span>
                  <span className="font-medium text-foreground text-right">
                    Rishabh Jain (Clinical Psychologist)
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 py-1 border-b border-border/40">
                  <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    Accreditation
                  </span>
                  <span className="font-medium text-foreground text-right">
                    Rehabilitation Council of India (RCI)
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 py-1 border-b border-border/40">
                  <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    Schedule
                  </span>
                  <span className="font-medium text-foreground text-right">
                    Monday to Friday · 1 hr / day (Online)
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 py-1 border-b border-border/40">
                  <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    Core Cohorts
                  </span>
                  <span className="font-medium text-foreground text-right">
                    30-Day Foundation & 60-Day Residency
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 py-1">
                  <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    Specializations
                  </span>
                  <span className="font-medium text-foreground text-right">
                    MSE, DAPT, CBT, Rorschach & Crisis
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => handleOpenApply("Online Internship (30 days)")}
                  className="w-full bg-[#C2613B] hover:bg-[#a74f2d] text-white rounded-full py-3 text-xs font-semibold shadow-xs"
                >
                  Apply for Upcoming Batch
                </Button>
                <p className="text-[11px] text-center text-muted-foreground mt-2">
                  Admissions reviewed individually. Response within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Program Navigator & Decision Matrix ──── */}
      <section id="pathfinder" className="py-12 sm:py-16 bg-[#FAF8F5] dark:bg-[#0B1917]/70 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ProgramDecisionMatrix
            onSelectProgram={(program, courseTitle) => handleOpenApply(program, courseTitle)}
            onOpenCourseModal={(courseId) => {
              const found = courses.find((c) => c.id === courseId);
              if (found) handleOpenCourseModal(found);
            }}
          />
        </div>
      </section>

      {/* ── Director's Open Letter & Clinical Rationale ──────── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <span>§ Perspective</span>
              <span className="text-border">/</span>
              <span>Why We Built This</span>
            </div>

            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[2.25rem] text-foreground font-normal leading-snug">
              &ldquo;Textbooks teach theory. Clinical work asks for more: taking a case history, scoring a test, writing a report, sitting across from a client.&rdquo;
            </blockquote>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-open-sans">
              <strong className="text-foreground font-semibold">The Psych Co.</strong> was established to bridge this reality gap. We help students and professionals build practical clinical competencies through hands-on, supervised online training. We also provide confidential psychotherapy for individuals who need support.
            </p>

            <div className="pt-4 border-t border-[#114B43]/15 flex items-center justify-between text-xs text-muted-foreground">
              <div className="space-y-0.5">
                <span className="font-outfit font-bold text-foreground block text-sm">
                  Rishabh Jain
                </span>
                <span>RCI-registered Clinical Psychologist · CRR: A111440</span>
              </div>
              <span className="font-serif italic text-sm text-[#114B43] dark:text-emerald-300">
                The Psych Co.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Offer: The 4 Clinical Pillars ───────────── */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              Curriculum & Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              What we offer
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Four distinct pathways designed to take you from textbook knowledge to confident clinical practice.
            </p>
          </div>

          {/* Asymmetric Editorial Grid (Breaks the generic 4-card soup) */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Featured Left Card: Internships */}
            <div className="lg:col-span-7 bg-card border-2 border-[#114B43]/20 rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xs">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#114B43] dark:text-emerald-400 uppercase tracking-wider">
                    Core Clinical Fellowship
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#E8F3F1] dark:bg-[#133D36] text-[#0E443C] dark:text-emerald-300 font-medium">
                    30 & 60 Days · Mon–Fri, 1 hr/day
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-foreground">
                    Online Internships
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Flexible 30 and 60 day programs in clinical skills, assessment and report writing. Work through actual simulated cases, conduct structured interviews, and receive candid supervisor debriefs.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 py-4 border-y border-border/80 text-xs">
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground block">30-Day Foundation</span>
                    <span className="text-muted-foreground">Structured history taking, Mental Status Examination, and introductory scoring.</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-foreground block">60-Day Comprehensive</span>
                    <span className="text-muted-foreground">In-depth case formulation, simulated role plays, mock sessions, and report drafts.</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground font-mono">
                  Online Google Meet · Supervised by Rishabh Jain
                </span>
                <a
                  href="#internships"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#114B43] dark:text-emerald-300 hover:text-[#C2613B] transition-colors"
                >
                  View Internship Tracks
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Companion Pillars Right Side: 3 Stacked Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {/* Certification Courses */}
              <div className="bg-card border border-[#E5DFD5] rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-[#114B43]/40 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#C2613B] font-semibold uppercase tracking-wider">
                    Masterclass Series
                  </span>
                  <span className="text-muted-foreground">6 Skill Modules</span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-foreground">
                  Certification Courses
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Focused courses in CBT, Rorschach, DAPT, counselling techniques, MSE and emergency support.
                </p>
                <div className="pt-2">
                  <a
                    href="#courses"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-[#C2613B] transition-colors"
                  >
                    Explore Courses
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Skills Enhancement */}
              <div className="bg-card border border-[#E5DFD5] rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-[#114B43]/40 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#114B43] dark:text-emerald-300 font-semibold uppercase tracking-wider">
                    Continuing Education
                  </span>
                  <span className="text-muted-foreground">Supervised Case Work</span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-foreground">
                  Skills Enhancement
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Training for working professionals who want to sharpen their clinical practice, assessment scoring, and ethical boundaries.
                </p>
                <div className="pt-2">
                  <a
                    href="#internships"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-[#C2613B] transition-colors"
                  >
                    Upskill Practice
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Psychotherapy */}
              <div className="bg-card border border-[#E5DFD5] rounded-2xl p-6 sm:p-7 space-y-3 shadow-xs hover:border-[#114B43]/40 transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[#C2613B] font-semibold uppercase tracking-wider">
                    Confidential Care
                  </span>
                  <span className="text-muted-foreground">Online · 50–60 Min</span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-foreground">
                  Psychotherapy & Counselling
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Confidential sessions with an RCI-registered Clinical Psychologist for anxiety, mood, life transitions, and self-doubt.
                </p>
                <div className="pt-2">
                  <a
                    href="#therapy"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-[#C2613B] transition-colors"
                  >
                    Book a Consultation
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Diagnostic Roadmap: Find Your Starting Point ───── */}
      <section className="py-20 sm:py-24 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Academic & Career Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-foreground">
              Find your starting point
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Every level of training has specific clinical blind spots. Choose where you currently stand.
            </p>
          </div>

          <div className="divide-y divide-[#E5DFD5] border-y border-[#E5DFD5]">
            {audienceRoadmap.map((aud, i) => (
              <div
                key={i}
                className="py-7 sm:py-8 grid lg:grid-cols-12 gap-5 lg:gap-8 items-start hover:bg-[#FAF8F5]/80 dark:hover:bg-[#122522]/40 px-3 sm:px-5 rounded-xl transition-colors"
              >
                <div className="lg:col-span-3">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                    Level 0{i + 1} · {aud.timeline}
                  </span>
                  <h3 className="font-outfit font-bold text-xl text-foreground">
                    {aud.stage}
                  </h3>
                </div>

                <div className="lg:col-span-6 space-y-1.5">
                  <h4 className="font-medium text-sm text-[#114B43] dark:text-emerald-300">
                    {aud.intent}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {aud.outcome}
                  </p>
                  <p className="text-xs text-foreground/80 font-mono pt-1">
                    Practical Focus: {aud.practicalFocus}
                  </p>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end items-center pt-2 lg:pt-0">
                  <button
                    onClick={() => handleOpenApply(aud.stage)}
                    className="text-xs font-semibold text-foreground hover:text-[#C2613B] inline-flex items-center gap-1.5 group px-4 py-2 rounded-full border border-border hover:bg-muted/60 transition-colors"
                  >
                    Apply for this level
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          2. ABOUT US SECTION (#about)
      ══════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 sm:py-28 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              About The Practice
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight">
              About The Psych Co.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Bridging textbook theory with the human, ethical, and clinical craft of psychotherapy and assessment.
            </p>
          </div>

          {/* Story Narrative & Leadership Plate */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            <div className="lg:col-span-7 space-y-6 text-base sm:text-lg leading-relaxed text-foreground/85 font-open-sans">
              <div className="space-y-4">
                <h3 className="font-outfit font-bold text-2xl text-foreground">
                  Our story
                </h3>
                <p>
                  Many psychology students finish their degrees knowing the theory but having little chance to practise it. Clinical skills like case history taking, psychological assessment and report writing are often learnt late, or only on the job.
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">The Psych Co.</strong> was started to close that gap by offering structured, practical, expert-led training that students can access online, at their own pace and at their own level.
                </p>
              </div>

              {/* Mission & Vision Manifesto Plate */}
              <div className="pt-4 grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card border border-[#E5DFD5] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#114B43] dark:text-emerald-300">
                    Mandate
                  </span>
                  <h4 className="font-outfit font-bold text-base text-foreground">
                    Our mission
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-open-sans">
                    To make quality clinical psychology training and mental health care accessible, practical and ethical.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-[#E5DFD5] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C2613B]">
                    Horizon
                  </span>
                  <h4 className="font-outfit font-bold text-base text-foreground">
                    Our vision
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-open-sans">
                    To build a generation of confident, skilled and compassionate psychology professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* Clinician Profile Plate */}
            <div className="lg:col-span-5 bg-card border-2 border-[#114B43]/20 rounded-2xl p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-border/70">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Clinical Director
                </span>
                <span className="text-xs font-mono font-semibold text-[#114B43] dark:text-emerald-300 bg-[#E8F3F1] dark:bg-[#133D36] px-2.5 py-0.5 rounded">
                  CRR: A111440
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-outfit font-bold text-foreground">
                  Rishabh Jain
                </h3>
                <p className="text-sm font-medium text-[#114B43] dark:text-emerald-300 mt-0.5">
                  RCI-registered Clinical Psychologist
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Rehabilitation Council of India Registry
                </p>
              </div>

              <blockquote className="text-xs sm:text-sm text-foreground/80 leading-relaxed border-l-2 border-[#114B43] pl-4 py-1 italic font-serif">
                &ldquo;Clinical training requires mentorship in a room, not recorded videos. We ensure students work through actual cases, practice structured interviews, and receive candid clinical feedback.&rdquo;
              </blockquote>

              <div className="space-y-2.5 text-xs text-muted-foreground pt-1 border-t border-border/70">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-300 shrink-0" />
                  <span>Supervises 30 & 60 day internship cohorts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-300 shrink-0" />
                  <span>Leads all clinical certification modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#114B43] dark:text-emerald-300 shrink-0" />
                  <span>Conducts one-on-one confidential psychotherapy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ethical Charter (Our Values) */}
          <div className="space-y-6 pt-4 border-t border-[#114B43]/15">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2613B] block">
                  Foundational Principles
                </span>
                <h3 className="font-outfit font-bold text-2xl text-foreground mt-0.5">
                  Our values
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-[#E5DFD5] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-muted-foreground block">
                      Rule 0{i + 1}
                    </span>
                    <h4 className="font-outfit font-bold text-lg text-foreground">
                      {v.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                  <p className="text-[11px] font-serif italic text-foreground/70 pt-3 border-t border-border/50">
                    &ldquo;{v.quote}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          3. INTERNSHIPS SECTION (#internships)
      ══════════════════════════════════════════════════════ */}
      <section id="internships" className="py-24 sm:py-28 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Supervised Clinical Cohorts
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight">
              Psychology Online Internship
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Gain practical clinical exposure, directly from an RCI-registered Clinical Psychologist.
            </p>
          </div>

          {/* 30 vs 60 Day Side-by-Side Residency Prospectus */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 30-Day */}
            <div className="bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] rounded-2xl p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Foundation Fellowship
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-card border border-border font-medium font-mono">
                    Mon–Fri, 1 hr/day
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-outfit font-bold text-foreground">
                    30-Day Program
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    A focused introduction to core clinical skills.
                  </p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm border-t border-b border-border/70 py-4 text-foreground/85">
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span className="font-medium">Monday to Friday, 1 hr/day</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">Online, interactive group cohort</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Credential:</span>
                    <span className="font-medium">Certificate of Completion</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Best for:</strong> Students seeking a strong, high-impact grounding in case history taking, Mental Status Examination protocol, and introductory psychometric evaluation.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/60">
                <Button
                  onClick={() => handleOpenApply("Online Internship (30 days)")}
                  className="w-full bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full py-3 text-xs font-semibold shadow-xs"
                >
                  Apply for 30-Day Program
                </Button>
              </div>
            </div>

            {/* 60-Day */}
            <div className="bg-[#FAF8F5] dark:bg-[#122522] border-2 border-[#114B43]/30 rounded-2xl p-8 flex flex-col justify-between relative">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C2613B]">
                    Advanced Clinical Residency
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-[#FDF2EC] dark:bg-[#381c13] text-[#8C3A19] font-medium border border-[#C2613B]/20 font-mono">
                    Mon–Fri, 1 hr/day
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-outfit font-bold text-foreground">
                    60-Day Program
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    A deeper, more extensive training experience.
                  </p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm border-t border-b border-border/70 py-4 text-foreground/85">
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span className="font-medium">Monday to Friday, 1 hr/day</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/40">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">Online, extensive case work & mock sessions</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Credential:</span>
                    <span className="font-medium">Advanced Clinical Certificate</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Best for:</strong> Comprehensive preparation featuring multiple real-style case studies, rehearsal role plays, full mock sessions, and tailored clinical report feedback.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/60">
                <Button
                  onClick={() => handleOpenApply("Online Internship (60 days)")}
                  className="w-full bg-[#C2613B] hover:bg-[#a74f2d] text-white rounded-full py-3 text-xs font-semibold shadow-xs"
                >
                  Apply for 60-Day Program
                </Button>
              </div>
            </div>
          </div>

          {/* Curriculum Syllabus Index */}
          <div className="space-y-8 pt-6 border-t border-[#114B43]/15">
            <div className="max-w-2xl space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
                Academic Curriculum
              </span>
              <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-foreground">
                What you will learn
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Eight practical competencies taught sequentially across simulated encounters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {curriculum.map((m, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>Module {m.num}</span>
                      <span className="text-[10px] text-[#114B43] dark:text-emerald-300 font-bold">{m.code}</span>
                    </div>
                    <h4 className="font-outfit font-bold text-base text-foreground leading-snug">
                      {m.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 text-[11px] text-foreground/75">
                    <span className="font-semibold block mb-0.5">Competency:</span>
                    <span>{m.competency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works & Hardware Reqs */}
          <div className="p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h4 className="font-outfit font-bold text-base text-foreground">
                How it works
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                1. Apply online → 2. Batch & schedule confirmation → 3. Attend sessions & practice → 4. Receive completion certificate.
              </p>
              <p className="text-xs text-muted-foreground pt-1">
                <strong>What you need:</strong> A laptop or phone, a stable internet connection and a genuine interest in learning.
              </p>
            </div>
            <Button
              onClick={() => handleOpenApply("Online Internship (30 days)")}
              className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-6 py-2.5 text-xs font-semibold shrink-0"
            >
              Apply for Internship
            </Button>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          4. CERTIFICATION COURSES SECTION (#courses)
      ══════════════════════════════════════════════════════ */}
      <section id="courses" className="py-24 sm:py-28 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
                Targeted Skill Modules
              </span>
              <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight">
                Certification Courses
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Short, focused courses to build one clinical skill at a time.
              </p>
              <p className="text-xs sm:text-sm text-foreground/80 pt-1">
                Not ready for a full internship, or want to go deep on one topic? Our certification courses are designed to give you specific, job-relevant skills, taught by an RCI-registered Clinical Psychologist.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Courses" },
                { id: "assessment", label: "Assessment & Testing" },
                { id: "therapy", label: "Counselling & Therapy" },
                { id: "crisis", label: "Crisis Support" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCourseCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    courseCategory === cat.id
                      ? "bg-[#114B43] text-white"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Course Directory Grid */}
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

                  <h3 className="text-lg font-outfit font-bold text-foreground leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {course.shortDesc}
                  </p>

                  <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#122522] border border-border/70 text-xs">
                    <span className="font-semibold text-foreground block mb-0.5">
                      Ideal for:
                    </span>
                    <span className="text-muted-foreground">{course.idealFor}</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/70 flex items-center gap-2.5">
                  <button
                    onClick={() => handleOpenCourseModal(course)}
                    className="flex-1 text-center py-2 text-xs font-semibold rounded-full border border-border hover:bg-muted transition-colors"
                  >
                    Know More
                  </button>
                  <Button
                    onClick={() => handleOpenApply("Certification Course", course.title)}
                    className="flex-1 bg-[#114B43] hover:bg-[#0c3933] text-white text-xs font-semibold rounded-full py-2 shadow-xs"
                  >
                    Enrol Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Note */}
          <div className="p-6 rounded-2xl bg-card border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="space-y-1">
              <strong className="text-foreground block">Why take a course with us?</strong>
              <span>Taught by an RCI-registered clinician · Practical skill-based learning · Flexible online delivery · Useful for academics and placements.</span>
            </div>
            <a href="#contact" className="text-xs font-semibold text-[#114B43] dark:text-emerald-400 hover:underline shrink-0">
              Not sure which one? Talk to Us →
            </a>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          5. PSYCHOTHERAPY & COUNSELLING SECTION (#therapy)
      ══════════════════════════════════════════════════════ */}
      <section id="therapy" className="py-24 sm:py-28 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Confidential Psychological Support
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight">
              Psychotherapy and Counselling
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-open-sans">
              A safe, confidential space to talk, with an RCI-registered Clinical Psychologist.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-base text-foreground/85 leading-relaxed font-open-sans">
                Everyone needs support at some point. Our sessions offer a calm, non-judgmental space where you can talk through what you are going through and learn practical ways to cope.
              </p>

              <div className="space-y-3">
                <h3 className="font-outfit font-bold text-base text-foreground">
                  You may find therapy helpful if you are experiencing:
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 pt-1">
                  {therapyConcerns.map((tc, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] text-xs space-y-1">
                      <span className="font-semibold text-foreground block">{tc.title}</span>
                      <p className="text-muted-foreground leading-relaxed">{tc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#FAF8F5] dark:bg-[#122522] border border-[#E5DFD5] rounded-2xl p-8 space-y-6">
              <h3 className="font-outfit font-bold text-lg text-foreground">
                What to expect
              </h3>
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-[#114B43] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                    1
                  </span>
                  <div>
                    <h4 className="font-bold text-foreground">Book a session</h4>
                    <p className="text-muted-foreground">Choose a time that suits you and share basic details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-[#114B43] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                    2
                  </span>
                  <div>
                    <h4 className="font-bold text-foreground">First session</h4>
                    <p className="text-muted-foreground">A relaxed conversation to understand your concerns and goals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-[#114B43] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                    3
                  </span>
                  <div>
                    <h4 className="font-bold text-foreground">Your plan</h4>
                    <p className="text-muted-foreground">Together you agree how to work and how often to meet.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-[#114B43] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                    4
                  </span>
                  <div>
                    <h4 className="font-bold text-foreground">Ongoing support</h4>
                    <p className="text-muted-foreground">Regular sessions with practical tools you can use in daily life.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground font-mono">
                  Online Video/Audio · 50–60 min · Confidential
                </span>
                <Button
                  onClick={() => handleOpenApply("Psychotherapy / Counselling")}
                  className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-6 py-2.5 text-xs font-semibold shrink-0"
                >
                  Book a Session
                </Button>
              </div>
            </div>
          </div>

          {/* Clinical Non-Emergency Alert */}
          <div className="p-6 rounded-2xl bg-[#FDF2EC] dark:bg-[#20130d] border border-[#C2613B]/20 text-xs sm:text-sm text-[#702F15] dark:text-amber-200 space-y-1">
            <strong>Emergency & Crisis Notice:</strong> Our sessions are not an emergency service. If you or someone you know is in immediate danger or acute crisis, please call{" "}
            <a href="tel:112" className="underline font-bold">112</a> or the Tele-MANAS helpline at{" "}
            <a href="tel:14416" className="underline font-bold">14416</a>, or go to the nearest hospital. For students under 18, parent or guardian consent is required.
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          6. WHY CHOOSE US SECTION (#why-us)
      ══════════════════════════════════════════════════════ */}
      <section id="why-us" className="py-24 sm:py-28 bg-[#FAF8F5] dark:bg-[#0B1917]/50 border-b border-[#E5DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              The Supervisory Model
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight">
              Why The Psych Co.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Practical training and care, led by a qualified clinician.
            </p>
          </div>

          {/* 6 Differentiators (Clean editorial cards without repetitive numbers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((diff, i) => (
              <div key={i} className="p-7 rounded-2xl bg-card border border-[#E5DFD5] space-y-3 shadow-xs">
                <span className="font-mono text-[11px] font-bold text-[#114B43] dark:text-emerald-300 uppercase tracking-wider block">
                  {diff.highlight}
                </span>
                <h3 className="font-outfit font-bold text-lg text-foreground leading-snug">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-open-sans">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>

          {/* 3-Step Pedagogical Methodology */}
          <div className="p-8 sm:p-10 rounded-2xl bg-card border border-[#E5DFD5] space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
                How We Teach
              </span>
              <h3 className="font-outfit font-bold text-xl text-foreground">
                Our approach
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-1.5 p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#122522] border border-border/60">
                <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">Phase 01</span>
                <h4 className="font-bold text-foreground">1. Understand</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Build the concepts and the reasoning behind clinical decisions.
                </p>
              </div>
              <div className="space-y-1.5 p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#122522] border border-border/60">
                <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">Phase 02</span>
                <h4 className="font-bold text-foreground">2. Practise</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Apply them through real-style cases, role plays and mock sessions.
                </p>
              </div>
              <div className="space-y-1.5 p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#122522] border border-border/60">
                <span className="font-mono text-xs font-bold text-[#114B43] dark:text-emerald-300">Phase 03</span>
                <h4 className="font-bold text-foreground">3. Reflect</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Receive feedback and refine your skills with clinician supervision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          7. FAQ SECTION (#faq)
      ══════════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 sm:py-28 bg-card border-b border-[#E5DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2613B] block">
              Clarifications & Guidance
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-muted-foreground">
              Everything you need to know about our internships, certification courses and psychotherapy.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Questions" },
              { id: "internships", label: "Internships" },
              { id: "courses", label: "Courses" },
              { id: "therapy", label: "Therapy" },
              { id: "general", label: "General" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFaqCategory(tab.id);
                  setOpenFaqIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  faqCategory === tab.id
                    ? "bg-[#114B43] text-white"
                    : "bg-[#FAF8F5] dark:bg-[#122522] text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="divide-y divide-[#E5DFD5] border-y border-[#E5DFD5]">
            {filteredFaqs.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-outfit font-semibold text-base text-foreground hover:text-[#114B43] dark:hover:text-emerald-300 py-1 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <p className="pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed font-open-sans">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          8. CONTACT & ADMISSIONS DESK (#contact)
      ══════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 sm:py-28 bg-[#FAF8F5] dark:bg-[#0B1917]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#114B43] dark:text-emerald-400 block">
              Admissions & Consultation
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-bold text-foreground tracking-tight">
              Let&apos;s Talk
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Questions about a program, a course or a session? Write to us and we will get back to you.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-card border border-[#E5DFD5] rounded-2xl p-8 sm:p-10 shadow-xs">
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="h-12 w-12 mx-auto rounded-full bg-[#E8F3F1] text-[#114B43] flex items-center justify-center">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-outfit font-bold text-foreground">
                    Thank you, {sanitizeText(contactForm.fullName) || "there"}.
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    We have received your enquiry and will reply within <strong>24 hours</strong>.
                  </p>
                  <Button
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactErrors({});
                      setContactForm({
                        fullName: "",
                        email: "",
                        phone: "",
                        role: "Bachelor's student",
                        interest: "Online Internship (30 days)",
                        course: "Case History and MSE",
                        message: "",
                        consent: false,
                      });
                    }}
                    className="bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full px-6 py-2 text-xs font-semibold shadow-xs"
                  >
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} noValidate className="space-y-4 text-xs sm:text-sm">
                  {/* Invisible Honeypot Anti-Bot Field */}
                  <input
                    type="text"
                    name="contact_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={contactHoneypot}
                    onChange={(e) => setContactHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={contactForm.fullName}
                      onChange={(e) => {
                        setContactForm({ ...contactForm, fullName: e.target.value });
                        if (contactErrors.fullName) setContactErrors({ ...contactErrors, fullName: "" });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                        contactErrors.fullName
                          ? "border-red-500 bg-red-50/20 text-red-900"
                          : "border-border bg-[#FAF8F5] dark:bg-muted text-foreground focus:ring-1 focus:ring-[#114B43]"
                      }`}
                    />
                    {contactErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 inline" /> {contactErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={contactForm.email}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, email: e.target.value });
                          if (contactErrors.email) setContactErrors({ ...contactErrors, email: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          contactErrors.email
                            ? "border-red-500 bg-red-50/20 text-red-900"
                            : "border-border bg-[#FAF8F5] dark:bg-muted text-foreground focus:ring-1 focus:ring-[#114B43]"
                        }`}
                      />
                      {contactErrors.email && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 inline" /> {contactErrors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                        Phone or WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 75870 30286"
                        value={contactForm.phone}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, phone: e.target.value });
                          if (contactErrors.phone) setContactErrors({ ...contactErrors, phone: "" });
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors ${
                          contactErrors.phone
                            ? "border-red-500 bg-red-50/20 text-red-900"
                            : "border-border bg-[#FAF8F5] dark:bg-muted text-foreground focus:ring-1 focus:ring-[#114B43]"
                        }`}
                      />
                      {contactErrors.phone && (
                        <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3 inline" /> {contactErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                      I am a *
                    </label>
                    <select
                      value={contactForm.role}
                      onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-[#FAF8F5] dark:bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                    >
                      <option value="Class 11-12 student">Class 11-12 student</option>
                      <option value="Bachelor's student">Bachelor's student</option>
                      <option value="Master's student">Master's student</option>
                      <option value="Working professional">Working professional</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                      I am interested in *
                    </label>
                    <select
                      value={contactForm.interest}
                      onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-[#FAF8F5] dark:bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                    >
                      <option value="Online Internship (30 days)">Online Internship (30 days)</option>
                      <option value="Online Internship (60 days)">Online Internship (60 days)</option>
                      <option value="Certification Course">Certification Course</option>
                      <option value="Psychotherapy / Counselling">Psychotherapy / Counselling</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  {contactForm.interest === "Certification Course" && (
                    <div>
                      <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                        If course, which one
                      </label>
                      <select
                        value={contactForm.course}
                        onChange={(e) => setContactForm({ ...contactForm, course: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-[#FAF8F5] dark:bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43]"
                      >
                        <option value="Case History and MSE">Case History and MSE</option>
                        <option value="DAPT">DAPT (Draw-A-Person Test)</option>
                        <option value="Supportive Counselling Techniques">Supportive Counselling Techniques</option>
                        <option value="Emergency Support and Resourcefulness Skills">Emergency Support and Resourcefulness Skills</option>
                        <option value="CBT">CBT (Cognitive Behavioral Therapy)</option>
                        <option value="Rorschach Test">Rorschach Test</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 font-mono">
                      Message (optional)
                    </label>
                    <textarea
                      rows={3}
                      maxLength={1000}
                      placeholder="Share your background or learning questions..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-border bg-[#FAF8F5] dark:bg-muted text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-[#114B43] resize-none"
                    />
                  </div>

                  <div className="pt-1">
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="human-consent"
                        checked={contactForm.consent}
                        onChange={(e) => {
                          setContactForm({ ...contactForm, consent: e.target.checked });
                          if (contactErrors.consent) setContactErrors({ ...contactErrors, consent: "" });
                        }}
                        className="mt-1 h-3.5 w-3.5 rounded border-border text-[#114B43] focus:ring-[#114B43]"
                      />
                      <label htmlFor="human-consent" className="text-xs text-muted-foreground leading-relaxed cursor-pointer font-open-sans">
                        I agree to be contacted about my enquiry. Information is held confidentially within clinical ethics.
                      </label>
                    </div>
                    {contactErrors.consent && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 inline" /> {contactErrors.consent}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full bg-[#114B43] hover:bg-[#0c3933] text-white rounded-full py-3 text-xs font-semibold shadow-xs flex items-center justify-center gap-2"
                    >
                      {contactSubmitting ? "Validating..." : "Send Enquiry"}
                      <Send className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Details Desk */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-7 rounded-2xl bg-card border border-[#E5DFD5] space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C2613B] block">
                  Office & Communications
                </span>
                <h3 className="font-outfit font-bold text-lg text-foreground">
                  Direct Contact
                </h3>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0" />
                    <a href="mailto:connect@psychco.in" className="hover:underline text-foreground">
                      connect@psychco.in
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0" />
                    <a href="tel:+917587030286" className="hover:underline text-foreground">
                      +91 7587030286 (Phone / WhatsApp)
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg className="h-4 w-4 text-[#114B43] dark:text-emerald-400 shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.05 1.53 1.53 0 0 0 0 3.05m1.4 10.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline text-foreground">
                      The Psych Co. on LinkedIn
                    </a>
                  </div>

                  <div className="pt-2 border-t border-border/70 text-xs text-muted-foreground font-mono">
                    <span className="font-semibold text-foreground block">Working hours:</span>
                    <span>9:00 AM – 7:00 PM IST · Monday to Saturday</span>
                  </div>
                </div>
              </div>

              {/* RCI Registry Plate */}
              <div className="p-6 rounded-2xl bg-card border border-[#E5DFD5] space-y-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#114B43] dark:text-emerald-400" />
                  Rehabilitation Council of India Registry
                </span>
                <p className="leading-relaxed">
                  Led by Rishabh Jain, Clinical Psychologist (CRR: A111440). Ethics, confidentiality and supervision in every program.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CourseModal
        course={selectedCourseForModal}
        isOpen={courseModalOpen}
        onClose={() => setCourseModalOpen(false)}
        onEnrol={(title) => handleOpenApply("Certification Course", title)}
      />

      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        defaultProgram={selectedProgram}
        defaultCourse={enrolCourseTitle}
      />
    </div>
  );
}