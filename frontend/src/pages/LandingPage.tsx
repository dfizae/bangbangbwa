import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MapPin,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PROPERTIES } from "@/data/properties";

const FEATURES = [
  {
    icon: Video,
    title: "1:1 라이브 투어",
    description:
      "중개사가 현장에서 비추는 화면을 보며 궁금한 곳을 바로 요청하세요.",
  },
  {
    icon: ClipboardCheck,
    title: "스마트 체크리스트",
    description: "수압, 채광, 소음처럼 놓치기 쉬운 항목까지 순서대로 확인해요.",
  },
  {
    icon: Sparkles,
    title: "AI 검수 리포트",
    description:
      "투어가 끝나면 캡처, 하자 기록, 핵심 요약을 한눈에 받아보세요.",
  },
];

const STEPS = [
  [Search, "매물 찾기", "조건에 맞는 매물을 골라요"],
  [CalendarCheck, "일정 예약", "가능한 투어 시간을 선택해요"],
  [Video, "라이브 투어", "중개사와 실시간으로 둘러봐요"],
  [FileText, "리포트 확인", "기록을 비교하고 결정해요"],
] as const;

function LandingPage() {
  return (
    <main className="overflow-x-clip bg-background">
      <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative mx-auto min-h-[640px] max-w-[1400px] overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl shadow-emerald-950/15 lg:min-h-[720px]">
          <img
            src="/hero-poster.webp"
            alt="화상 투어로 확인하는 밝은 집 내부"
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,.98)_0%,rgba(2,6,23,.86)_45%,rgba(2,6,23,.25)_100%)]" />

          <div className="relative z-10 grid min-h-[640px] items-center gap-12 p-7 sm:p-12 lg:min-h-[720px] lg:grid-cols-[1.15fr_.85fr] lg:p-20">
            <div className="max-w-2xl text-white">
              <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                세입자와 중개사를 잇는 1:1 라이브 투어
              </p>
              <h1 className="text-4xl leading-[1.12] font-bold tracking-[-0.04em] sm:text-5xl lg:text-7xl">
                발품 팔지 말고,
                <br />
                방에서 끝내는
                <br />
                <span className="text-emerald-400">실시간 임장</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-xl">
                중개사가 현장에서 비춰주는 화면을 보며 체크리스트로 꼼꼼하게
                비교하고 결정하세요.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="h-13 rounded-full px-7 text-base"
                  asChild
                >
                  <Link to="/properties">
                    <MapPin /> 매물 둘러보기 <ArrowRight />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-full border-white/20 bg-white/10 px-7 text-base text-white hover:bg-white/20 hover:text-white"
                  asChild
                >
                  <a href="#how">이용 방법 알아보기</a>
                </Button>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md space-y-4">
              <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-2 backdrop-blur-xl">
                <div className="flex items-center gap-3 rounded-[1.1rem] bg-white p-3 text-slate-900">
                  <Search className="ml-1 size-5 text-slate-400" />
                  <span className="flex-1 text-sm text-slate-500">
                    원하는 지역이나 역 이름 검색
                  </span>
                  <Button size="sm" className="rounded-xl">
                    검색
                  </Button>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-2 backdrop-blur-xl">
                <div className="rounded-[1.1rem] bg-slate-900/95 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-emerald-400 px-2 py-1 text-xs font-bold text-emerald-950">
                      예약 확정
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      TODAY 14:00
                    </span>
                  </div>
                  <p className="mt-5 text-lg leading-snug font-semibold">
                    서초구 래미안 투룸
                    <br />
                    화상 투어
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-slate-400">
                      SESSION · BBV-9421
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-emerald-300">
                      입장 대기실 <ArrowRight className="size-4" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 text-xs text-slate-300">
                {["#역세권투룸", "#신축오피스텔", "#전세자금대출"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-slate-900/60 px-3 py-1.5"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wider text-primary">
            WHY BANGBANGBWA
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            집 보는 방식이 달라집니다
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            사진만으로 판단하지 않아도, 먼 거리를 여러 번 오가지 않아도
            괜찮아요.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <article
              key={title}
              className={`rounded-2xl border p-7 ${index === 0 ? "bg-slate-950 text-white md:col-span-2" : "bg-card"}`}
            >
              <div className="grid size-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <Icon />
              </div>
              <h3 className="mt-8 text-xl font-semibold">{title}</h3>
              <p
                className={`mt-3 leading-relaxed ${index === 0 ? "text-slate-300" : "text-muted-foreground"}`}
              >
                {description}
              </p>
              {index === 0 && (
                <div className="mt-8 flex items-center gap-3 rounded-xl bg-white/5 p-4 text-sm text-slate-300">
                  <span className="grid size-9 place-items-center rounded-full bg-emerald-500 text-white">
                    <Play className="size-4 fill-current" />
                  </span>
                  강남구 역삼동 · 라이브 투어 진행 중
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-wider text-primary">
                HOW IT WORKS
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                네 단계면 충분해요
              </h2>
              <p className="mt-5 text-muted-foreground">
                예약부터 기록까지 한 흐름으로 이어집니다.
              </p>
              <div className="mt-9 rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <strong>AI 투어 리포트</strong>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    자동 생성
                  </span>
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  {[
                    "거실 채광 및 창호 상태",
                    "욕실 수압과 배수",
                    "확인 필요 하자 2건",
                  ].map((text) => (
                    <p key={text} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {STEPS.map(([Icon, title, description], index) => (
                <li key={title} className="rounded-2xl border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
          <ShieldCheck className="mx-auto size-10" />
          <h2 className="mt-5 text-3xl font-bold tracking-tight">
            오늘 올라온 매물 {PROPERTIES.length}건,
            <br className="sm:hidden" /> 방송으로 확인하세요
          </h2>
          <p className="mt-4 text-primary-foreground/75">
            시간과 거리에 상관없이, 더 확실하게 보고 결정하세요.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 rounded-full px-7"
            asChild
          >
            <Link to="/properties">
              매물 둘러보기 <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <img
              src="/logo-symbol.png"
              alt=""
              className="size-7 rounded-md bg-white"
            />
            방방봐
          </p>
          <p>© 2026 BANGBANGBWA. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Check className="size-4 text-primary" /> 방을 방송으로 봐
          </p>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
