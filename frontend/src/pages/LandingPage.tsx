import { useEffect, useRef, useState, type RefObject } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Circle,
  ClipboardCheck,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  ImageOff,
  MapPin,
  Play,
  Video,
  type LucideIcon,
} from "lucide-react";

import PropertyCard from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROPERTIES } from "@/data/properties";
import { cn } from "@/lib/utils";

const PAIN_POINTS: Array<{ icon: LucideIcon; text: string }> = [
  { icon: MapPin, text: "매물 한 번 보러 왕복 4시간" },
  { icon: ImageOff, text: "사진과 다른 실물" },
  { icon: HelpCircle, text: "뭘 확인해야 할지 모르는 첫 계약" },
];

const FLOW_STEPS: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: CalendarCheck,
    title: "예약",
    description: "원하는 매물의 화상 투어 일정을 잡아요",
  },
  {
    icon: Video,
    title: "라이브 투어",
    description: "중개사와 실시간 영상으로 매물을 확인해요",
  },
  {
    icon: ClipboardCheck,
    title: "체크리스트",
    description: "점검 항목을 하나씩 확인하며 기록해요",
  },
  {
    icon: FileText,
    title: "리포트",
    description: "캡처와 요약이 담긴 리포트를 받아요",
  },
];

// 히어로 데모 카드에 쓰는 블루 틴티드 섀도우 (검정 대신 primary 색조)
const TINTED_SHADOW = "shadow-[0_16px_40px_-8px_rgba(22,93,252,0.25)]";

// 라이브 투어 영상 목업 — Bento 와이드 카드 우측
function LiveMockup() {
  return (
    <div className="relative hidden h-42.5 w-65 shrink-0 overflow-hidden rounded-lg bg-slate-900 sm:block dark:bg-slate-950">
      <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-destructive px-2 py-0.5">
        <span className="size-1.5 rounded-full bg-white" />
        <span className="text-xs font-semibold text-white">LIVE</span>
      </span>
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-11 place-items-center rounded-full bg-white/20">
          <Play className="size-4 fill-white text-white" />
        </span>
      </span>
      <span className="absolute bottom-3 left-3 text-xs text-white/80">
        강남구 역삼동 · 시청 3명
      </span>
    </div>
  );
}

// AI 검수 리포트 미리보기 목업 — 흐름 섹션 우측
function ReportMockup() {
  return (
    <div
      className={cn(
        "hidden rounded-xl border bg-card p-6 lg:block",
        TINTED_SHADOW,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">
          AI 검수 리포트 — 역삼 래미안
        </span>
        <Badge variant="secondary">자동 생성</Badge>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["거실", "주방", "욕실"].map((room) => (
          <div
            key={room}
            aria-label={`${room} 캡처`}
            className="grid h-18 place-items-center rounded-md bg-muted"
          >
            <ImageIcon className="size-4 text-muted-foreground" />
          </div>
        ))}
      </div>
      <div aria-hidden className="mt-4 space-y-2">
        <div className="h-2.5 w-full rounded-full bg-muted" />
        <div className="h-2.5 w-full rounded-full bg-muted" />
        <div className="h-2.5 w-3/5 rounded-full bg-muted" />
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm font-medium">
        <CheckCircle2 className="size-4 text-primary" />
        하자 2건 · 확인 요청 5건 기록됨
      </p>
    </div>
  );
}

// 히어로 쇼케이스 — 초기엔 PropertyCard 데모, 스크롤 30% 지점에서
// 카드가 페이드아웃되고 같은 자리에서 투어 영상(0~6초)이 루프 재생됨
function HeroShowcase({
  scrollRootRef,
}: {
  scrollRootRef: RefObject<HTMLElement | null>;
}) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [demoProperty, setDemoProperty] = useState(PROPERTIES[0]);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const root = scrollRootRef.current;
      if (!root) {
        return;
      }
      const rect = root.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        return;
      }
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setShowVideo(progress > 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollRootRef]);

  // 영상 표시 시 처음부터 재생, 카드로 복귀 시 정지·리셋
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (showVideo && !reduced) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [showVideo]);

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div
        className={cn(
          "aspect-video w-full overflow-hidden rounded-xl transition-opacity duration-500 ease-out",
          TINTED_SHADOW,
          showVideo ? "opacity-100" : "opacity-0",
        )}
      >
        <video
          ref={videoRef}
          src="/hero-tour.mp4"
          poster="/hero-poster.webp"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="라이브 투어 미리보기 영상"
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className={cn(
          "absolute inset-0 grid place-items-center transition-all duration-500 ease-out",
          showVideo
            ? "pointer-events-none -translate-y-2 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100",
        )}
      >
        <div
          className={cn(
            "w-full max-w-sm rotate-2 rounded-xl transition-transform hover:rotate-0",
            TINTED_SHADOW,
          )}
        >
          <PropertyCard
            property={demoProperty}
            onToggleSave={() =>
              setDemoProperty((p) => ({ ...p, saved: !p.saved }))
            }
            onOpen={(id) => navigate(`/properties/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}

// 서비스 소개 랜딩 — 히어로 / 문제 공감 / 핵심 기능(Bento) / 이용 흐름(타임라인) / 하단 CTA
function LandingPage() {
  // 히어로 쇼케이스 구간(160vh) — 이 영역을 지나는 동안 카드 -> 영상 전환
  const heroScrollRef = useRef<HTMLElement>(null);

  const scrollToFeatures = () =>
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-svh overflow-x-clip bg-background">
      {/* 1. 히어로 — 좌: 카피·CTA / 우: 카드 -> 영상 쇼케이스 (GNB 아래 sticky 고정) */}
      <section ref={heroScrollRef} className="relative h-[160vh]">
        <div className="sticky top-14 mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold text-primary">
              방을 방송으로 봐, 방방봐
            </p>
            <h1 className="mt-3 text-4xl leading-tight font-bold tracking-tight md:text-[3.5rem]">
              가보지 않고도,
              <br />
              제대로 봅니다
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
              공인중개사와 실시간 화상으로 매물을 확인하고, 체크리스트와 AI
              리포트로 기록을 남기세요
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="h-12 px-7 text-base hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <Link to="/properties">
                  매물 둘러보기
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base hover:scale-[1.02] active:scale-[0.98]"
                onClick={scrollToFeatures}
              >
                서비스 알아보기
              </Button>
            </div>
          </div>

          <HeroShowcase scrollRootRef={heroScrollRef} />
        </div>
      </section>

      {/* 2. 문제 공감 스트립 — 서비스 개설 이유 리드 문구 + 한 줄 인라인 */}
      <section id="why" className="scroll-mt-14 border-y bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <p className="text-sm font-semibold text-primary">
            방방봐는 이 세 가지 불편에서 시작했습니다
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {PAIN_POINTS.map(({ icon: Icon, text }, i) => (
              <div key={text} className="flex items-center gap-5">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="hidden text-muted-foreground sm:inline"
                  >
                    ·
                  </span>
                )}
                <p className="flex items-center gap-2 text-base font-medium">
                  <Icon className="size-4 shrink-0 text-muted-foreground" />
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 핵심 기능 — Bento 그리드 (와이드 라이브 카드 + 우측 스택) */}
      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-8 px-4 py-24"
      >
        <p className="text-sm font-semibold tracking-wide text-primary">
          핵심 기능
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          집 보는 방식이 달라집니다
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="justify-center md:col-span-2">
            <CardContent className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
                  <Video className="size-5 text-accent-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  실시간 라이브 투어
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  중개사가 현장에서 직접 비추는 실시간 영상. 보고 싶은 곳을 바로
                  요청하세요
                </p>
              </div>
              <LiveMockup />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="flex-1 justify-center gap-3 py-5">
              <CardContent className="px-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <ClipboardCheck className="size-4 text-primary" />
                  스마트 체크리스트
                </h3>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    곰팡이·누수 흔적 확인
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Circle className="size-4 shrink-0" />
                    수압·배수 상태 확인
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="flex-1 justify-center gap-3 py-5">
              <CardContent className="px-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <FileText className="size-4 text-primary" />
                  AI 검수 리포트
                </h3>
                <div className="mt-3 flex gap-1.5">
                  <Badge variant="secondary">캡처 12장</Badge>
                  <Badge variant="secondary">하자 2건</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  통화가 끝나면 캡처·요약·하자 기록이 자동으로
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. 서비스 흐름 — 좌: 세로 타임라인 / 우: 리포트 목업 */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-sm font-semibold tracking-wide text-primary">
            이용 흐름
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
            네 단계면 충분해요
          </h2>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_420px]">
            <ol>
              {FLOW_STEPS.map(({ icon: Icon, title, description }, i) => (
                <li key={title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                    {i < FLOW_STEPS.length - 1 && (
                      <span aria-hidden className="w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className={cn(i < FLOW_STEPS.length - 1 && "pb-8")}>
                    <h3 className="flex items-center gap-2 pt-1 font-semibold">
                      <Icon className="size-4 text-primary" />
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <ReportMockup />
          </div>
        </div>
      </section>

      {/* 5. 하단 CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl bg-primary px-6 py-14 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground md:text-3xl">
            오늘 올라온 매물 {PROPERTIES.length}건, 방송으로 확인하세요
          </h2>
          <Button
            size="lg"
            variant="secondary"
            className="mt-6 h-12 px-7 text-base hover:scale-[1.02] active:scale-[0.98]"
            asChild
          >
            <Link to="/properties">
              매물 둘러보기
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted-foreground">
          방방봐 — 방을 방송으로 봐
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
