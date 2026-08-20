"use client";

import { useEffect, useMemo, useState } from "react";
import { modules, quickCards, radioScenarios, sourceDocuments, type LearningModule } from "./content";
import {
  callsignParts,
  communicationToolSources,
  indexExercises,
  internationalAlphabet,
  internationalDigits,
  nationalAlphabet,
  nationalDigits,
  reportChecklist,
  spellingRules,
} from "./communication-tools";
import { imageSupportUnits, type ImageSupportUnit } from "./image-support";
import { folderPath, navigationExercises, rootFolderIds, siblingIds, talkgroupFolders } from "./talkgroup-lab";

type View = "start" | "bilder" | "lab" | "verktyg" | "snabbkort" | "kallor";
type ProgressState = { completed: string[]; scores: Record<string, number> };

const STORAGE_KEY = "sambandslabbet-progress-v1";

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ProgressState>;
  return (
    Array.isArray(candidate.completed)
    && candidate.completed.every((item) => typeof item === "string")
    && Boolean(candidate.scores)
    && typeof candidate.scores === "object"
    && !Array.isArray(candidate.scores)
    && Object.values(candidate.scores).every((score) => typeof score === "number")
  );
}

export default function Home() {
  const [view, setView] = useState<View>("start");
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [progress, setProgress] = useState<ProgressState>({ completed: [], scores: {} });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let savedProgress: ProgressState | null = null;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : null;
      if (isProgressState(parsed)) savedProgress = parsed;
    } catch {
      // Local progress is helpful, never required for the course to work.
    }
    const timer = window.setTimeout(() => {
      if (savedProgress) setProgress(savedProgress);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const saveProgress = (next: ProgressState) => {
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Keep the in-memory result if storage is unavailable.
    }
  };

  const openModule = (module: LearningModule) => {
    setActiveModule(module);
    setLessonIndex(0);
    setAnswers({});
    setQuizScore(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeModule = () => {
    setActiveModule(null);
    setAnswers({});
    setQuizScore(null);
    setView("start");
  };

  const submitQuiz = () => {
    if (!activeModule || Object.keys(answers).length !== activeModule.quiz.length) return;
    const correct = activeModule.quiz.reduce(
      (sum, item, index) => sum + (answers[index] === item.answer ? 1 : 0),
      0,
    );
    const score = clampPercent((correct / activeModule.quiz.length) * 100);
    setQuizScore(score);
    const passed = score >= 67;
    const completed = passed
      ? Array.from(new Set([...progress.completed, activeModule.id]))
      : progress.completed;
    saveProgress({ completed, scores: { ...progress.scores, [activeModule.id]: score } });
  };

  const resetProgress = () => {
    if (!window.confirm("Nollställa alla avklarade moduler och resultat på den här enheten?")) return;
    saveProgress({ completed: [], scores: {} });
  };

  const progressPercent = clampPercent((progress.completed.length / modules.length) * 100);

  if (activeModule) {
    return (
      <ModuleWorkspace
        module={activeModule}
        lessonIndex={lessonIndex}
        setLessonIndex={setLessonIndex}
        answers={answers}
        setAnswers={setAnswers}
        quizScore={quizScore}
        submitQuiz={submitQuiz}
        restartModule={() => {
          setAnswers({});
          setQuizScore(null);
          setLessonIndex(0);
        }}
        onClose={closeModule}
        onOpenLab={() => {
          setActiveModule(null);
          setView("lab");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenImages={() => {
          setActiveModule(null);
          setView("bilder");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        completed={progress.completed.includes(activeModule.id)}
      />
    );
  }

  return (
    <main id="top" data-version="3.0.0">
      <SiteHeader view={view} setView={setView} progressPercent={progressPercent} />

      {view === "start" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <span className="eyebrow">Interaktiv träning i sambandstjänst</span>
              <h1>Från terminal till <em>tydligt samband.</em></h1>
              <p>
                Korta lärpass, beslutsträning och felsökning byggda från hela
                kursens dokumentbank. Träna tills handgreppen och språket sitter.
              </p>
              <div className="hero-actions">
                <button className="primary-action" onClick={() => document.querySelector("#moduler")?.scrollIntoView({ behavior: "smooth" })}>
                  Börja med modul 1 <span aria-hidden="true">→</span>
                </button>
                <button className="text-action" onClick={() => setView("lab")}>Öppna övningslabbet</button>
                <button className="text-action" onClick={() => setView("bilder")}>Utforska bildstödet</button>
                <button className="text-action" onClick={() => setView("verktyg")}>Öppna sambandsverktygen</button>
              </div>
              <div className="trust-row" aria-label="Plattformens innehåll">
                <span><b>10</b> moduler</span>
                <span><b>30</b> kunskapsfrågor</span>
                <span><b>63</b> källdokument</span>
              </div>
            </div>

            <aside className="signal-card" aria-label="Din studieresa">
              <div className="signal-head">
                <span>Din studieresa</span>
                <strong>{ready ? progressPercent : 0}%</strong>
              </div>
              <div className="progress-arc" style={{ "--progress": `${progressPercent * 3.6}deg` } as React.CSSProperties}>
                <div><b>{progress.completed.length}</b><small>av 10 klara</small></div>
              </div>
              <div className="signal-meta">
                <p>{progress.completed.length ? "Fortsätt där du slutade." : "Börja med grunden – gå sedan vidare i egen takt."}</p>
                <small>Framsteg sparas endast på den här enheten.</small>
              </div>
            </aside>
          </section>

          <section className="safety-strip" aria-label="Viktig avgränsning">
            <b>Övningsstöd</b>
            <p>Aktuell sambandstablå, lokala beslut och terminalens programmering gäller alltid före detta repetitionsstöd.</p>
          </section>

          <section className="module-section" id="moduler">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Lärstig</span>
                <h2>Bygg säkerhet steg för steg</h2>
              </div>
              <p>Varje modul avslutas med tre frågor. Två rätt krävs för att markera modulen som klar.</p>
            </div>
            <div className="module-grid">
              {modules.map((module) => {
                const isDone = progress.completed.includes(module.id);
                return (
                  <button className={`module-card accent-${module.accent}`} key={module.id} onClick={() => openModule(module)}>
                    <span className="module-number">{module.number}</span>
                    <span className={`module-state ${isDone ? "done" : ""}`}>{isDone ? "Klar" : module.duration}</span>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                    <span className="module-outcome">{module.outcome}</span>
                    <span className="card-arrow" aria-hidden="true">↗</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="lab-teaser">
            <div>
              <span className="eyebrow light">Övningslabb</span>
              <h2>Tryck, välj, lyssna.</h2>
              <p>Navigera i talgruppsträdet, prova direktval på en förenklad SC21 och träna vilket trafikuttryck som avslutar nästa sändning.</p>
              <button className="lime-action" onClick={() => setView("lab")}>Starta labbet <span>→</span></button>
            </div>
            <MiniTerminal />
          </section>

          <section className="visual-teaser">
            <div className="visual-teaser-copy">
              <span className="eyebrow">Nytt bildstöd</span>
              <h2>Se reglaget. Förstå funktionen.</h2>
              <p>Arbeta med originalbilder av SC21 och Polman. Visa etiketter, zooma, klicka på markeringarna och lös praktiska bildfrågor.</p>
              <button className="primary-action" onClick={() => setView("bilder")}>Öppna bildstödet <span>→</span></button>
            </div>
            <div className="visual-teaser-stack" aria-hidden="true">
              {/* Static GitHub Pages build: native images avoid an unavailable optimization server. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="source-images/sc21-overview.jpg" alt="" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="source-images/polman-rakel.jpg" alt="" />
            </div>
          </section>

          <section className="tools-teaser">
            <div>
              <span className="eyebrow light">Sambandsverktyg</span>
              <h2>Läs. Bokstavera. Avrapportera.</h2>
              <p>Bygg upp anropssignalen, slå upp båda alfabeten, träna index och använd checklistan inför avrapportering.</p>
              <button className="lime-action" onClick={() => setView("verktyg")}>Öppna verktygen <span>→</span></button>
            </div>
            <div className="tools-teaser-code" aria-hidden="true"><span>(1)</span><b>65</b><i>–</i><strong>1110</strong></div>
          </section>

          <section className="source-teaser">
            <div>
              <span className="eyebrow">Spårbart innehåll</span>
              <h2>Från omfattande dokument till träningsbara beslut.</h2>
            </div>
            <div className="source-summary">
              <p>61 PDF:er och två kunskapsbanker har sorterats, lästs och vävts in i modulerna. Originalfilerna ligger orörda i mappen <b>källmaterial</b>.</p>
              <button className="outline-action" onClick={() => setView("kallor")}>Visa källförteckning</button>
            </div>
          </section>
        </>
      )}

      {view === "bilder" && <ImageSupportLibrary />}
      {view === "lab" && <PracticeLab />}
      {view === "verktyg" && <CommunicationTools />}
      {view === "snabbkort" && <Flashcards />}
      {view === "kallor" && <SourceLibrary />}

      <footer>
        <div className="brand"><span className="brand-mark">SL</span><span>Sambandslabbet</span></div>
        <p>Lokalt utbildningsstöd · inga uppgifter skickas vidare</p>
        {view === "start" && progress.completed.length > 0 && <button onClick={resetProgress}>Nollställ mina framsteg</button>}
      </footer>
    </main>
  );
}

function SiteHeader({ view, setView, progressPercent }: { view: View; setView: (view: View) => void; progressPercent: number }) {
  const navigate = (next: View) => {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="topbar">
      <button className="brand brand-button" onClick={() => navigate("start")} aria-label="Sambandslabbet, startsida">
        <span className="brand-mark">SL</span><span>Sambandslabbet</span>
      </button>
      <nav aria-label="Huvudmeny">
        <button className={view === "start" ? "active" : ""} onClick={() => navigate("start")}>Moduler</button>
        <button className={view === "bilder" ? "active" : ""} onClick={() => navigate("bilder")}>Bildstöd</button>
        <button className={view === "lab" ? "active" : ""} onClick={() => navigate("lab")}>Övningslabb</button>
        <button className={view === "verktyg" ? "active" : ""} onClick={() => navigate("verktyg")}>Sambandsverktyg</button>
        <button className={view === "snabbkort" ? "active" : ""} onClick={() => navigate("snabbkort")}>Snabbkort</button>
        <button className={view === "kallor" ? "active" : ""} onClick={() => navigate("kallor")}>Källor</button>
      </nav>
      <div className="header-progress" title={`${progressPercent}% av lärstigen klar`}>
        <span style={{ width: `${progressPercent}%` }} /><b>{progressPercent}%</b>
      </div>
    </header>
  );
}

function ModuleWorkspace({
  module, lessonIndex, setLessonIndex, answers, setAnswers, quizScore, submitQuiz, restartModule, onClose, onOpenLab, onOpenImages, completed,
}: {
  module: LearningModule;
  lessonIndex: number;
  setLessonIndex: (index: number) => void;
  answers: Record<number, number>;
  setAnswers: (answers: Record<number, number>) => void;
  quizScore: number | null;
  submitQuiz: () => void;
  restartModule: () => void;
  onClose: () => void;
  onOpenLab: () => void;
  onOpenImages: () => void;
  completed: boolean;
}) {
  const isQuiz = lessonIndex === module.lessons.length;
  const lesson = module.lessons[lessonIndex];
  const localPercent = clampPercent((lessonIndex / module.lessons.length) * 100);
  const go = (index: number) => {
    setLessonIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="workspace-shell">
      <header className="workspace-top">
        <button className="back-button" onClick={onClose}>← Alla moduler</button>
        <div className="workspace-progress"><span style={{ width: `${isQuiz ? 100 : localPercent}%` }} /></div>
        <span>{module.number} · {module.short}</span>
      </header>
      <div className="workspace-grid">
        <aside className="lesson-nav">
          <span className={`module-kicker accent-text-${module.accent}`}>Modul {module.number}</span>
          <h1>{module.title}</h1>
          <p>{module.outcome}</p>
          <ol>
            {module.lessons.map((item, index) => (
              <li key={item.title}>
                <button className={lessonIndex === index ? "active" : lessonIndex > index || completed ? "visited" : ""} onClick={() => go(index)}>
                  <span>{lessonIndex > index || completed ? "✓" : index + 1}</span>{item.title}
                </button>
              </li>
            ))}
            <li><button className={isQuiz ? "active" : ""} onClick={() => go(module.lessons.length)}><span>Q</span>Kunskapskontroll</button></li>
          </ol>
          <div className="module-source-mini">
            <b>Huvudkällor</b>
            {module.sources.slice(0, 3).map((source) => <span key={source}>{source}</span>)}
          </div>
        </aside>

        <section className="lesson-stage">
          {!isQuiz && lesson ? (
            <article className="lesson-content">
              <div className="lesson-label">Lärpass {lessonIndex + 1} av {module.lessons.length}</div>
              <h2>{lesson.title}</h2>
              <p className="lesson-intro">{lesson.intro}</p>
              <ul className="learning-points">
                {lesson.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><p>{point}</p></li>)}
              </ul>
              {lesson.memory && <div className="memory-card"><small>Minnesregel</small><strong>{lesson.memory}</strong></div>}
              {lesson.caution && <div className="caution-card"><small>Viktigt</small><p>{lesson.caution}</p></div>}
              {module.id === "talgrupper" && lessonIndex === 1 && (
                <div className="lab-callout">
                  <div><small>Praktisk träning</small><strong>Prova fem källkontrollerade rutter i Talgruppslabbet.</strong></div>
                  <button className="lime-action" onClick={onOpenLab}>Öppna Talgruppslabbet <span>→</span></button>
                </div>
              )}
              {module.id === "terminalen" && lessonIndex <= 1 && (
                <div className="lab-callout image-callout">
                  <div><small>Bildträning</small><strong>Hitta display, PTT, vred och symboler på riktiga källbilder.</strong></div>
                  <button className="lime-action" onClick={onOpenImages}>Öppna bildstödet <span>→</span></button>
                </div>
              )}
              <div className="lesson-actions">
                <button className="outline-action" disabled={lessonIndex === 0} onClick={() => go(lessonIndex - 1)}>← Föregående</button>
                <button className="primary-action" onClick={() => go(lessonIndex + 1)}>{lessonIndex === module.lessons.length - 1 ? "Till kontrollen" : "Nästa lärpass"} <span>→</span></button>
              </div>
            </article>
          ) : (
            <article className="quiz-panel">
              <div className="lesson-label">Kunskapskontroll</div>
              <h2>Tre beslut innan du går vidare</h2>
              <p className="lesson-intro">Svara på alla frågor. Två rätt markerar modulen som klar på den här enheten.</p>
              <div className="quiz-list">
                {module.quiz.map((item, questionIndex) => (
                  <fieldset key={item.question}>
                    <legend><span>{questionIndex + 1}</span>{item.question}</legend>
                    <div className="option-grid">
                      {item.options.map((option, optionIndex) => {
                        const chosen = answers[questionIndex] === optionIndex;
                        const reveal = quizScore !== null;
                        const correct = reveal && optionIndex === item.answer;
                        const wrong = reveal && chosen && optionIndex !== item.answer;
                        return (
                          <button
                            key={option}
                            className={`${chosen ? "chosen" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}`}
                            onClick={() => quizScore === null && setAnswers({ ...answers, [questionIndex]: optionIndex })}
                            disabled={quizScore !== null}
                          >
                            <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
                          </button>
                        );
                      })}
                    </div>
                    {quizScore !== null && <p className="quiz-explanation">{item.explanation}</p>}
                  </fieldset>
                ))}
              </div>
              {quizScore === null ? (
                <button className="primary-action quiz-submit" disabled={Object.keys(answers).length !== module.quiz.length} onClick={submitQuiz}>Rätta mina svar <span>→</span></button>
              ) : (
                <div className={`result-card ${quizScore >= 67 ? "passed" : "retry"}`}>
                  <div><small>Resultat</small><strong>{quizScore}%</strong></div>
                  <div>
                    <h3>{quizScore >= 67 ? "Modulen är klar" : "Ett varv till"}</h3>
                    <p>{quizScore >= 67 ? "Bra. Resultatet är sparat lokalt och du kan fortsätta till nästa modul." : "Läs förklaringarna och försök igen. Du behöver två rätt."}</p>
                  </div>
                  <button className="outline-action" onClick={restartModule}>Repetera modulen</button>
                  <button className="primary-action" onClick={onClose}>{quizScore >= 67 ? "Välj nästa modul" : "Till lärstigen"} <span>→</span></button>
                </div>
              )}
            </article>
          )}
        </section>
      </div>
    </main>
  );
}

function MiniTerminal() {
  return (
    <div className="mini-terminal" aria-hidden="true">
      <div className="mini-antenna" />
      <div className="mini-screen"><small>SKAN · TMO</small><strong>IGV PO1</strong><span>⌁ nät · ◉ skanning</span></div>
      <div className="mini-pad">{[1,2,3,4,5,6,7,8,9,"*",0,"#"].map((key) => <i key={key}>{key}</i>)}</div>
      <b>PTT</b>
    </div>
  );
}

function ImageSupportLibrary() {
  const [activeUnitId, setActiveUnitId] = useState(imageSupportUnits[0].id);
  const activeUnit = imageSupportUnits.find((unit) => unit.id === activeUnitId) ?? imageSupportUnits[0];

  return (
    <section className="subpage image-support-page">
      <div className="subpage-hero image-support-hero">
        <span className="eyebrow">Bildstöd från originalfilerna</span>
        <h1>Se. Klicka. <em>Förstå.</em></h1>
        <p>Fyra visuella träningsstationer för SC21, displayen, Polman och stegvis navigering. Inga original-PDF:er publiceras.</p>
        <div className="image-safety-note"><b>Källskydd</b><span>Utsnitt med telefon- eller terminalnummer används inte. Talgruppsnamn och index som behövs för övningarna är utbildningsexempel från källmaterialet.</span></div>
      </div>

      <div className="image-library-shell">
        <div className="image-unit-tabs" role="tablist" aria-label="Bildserier">
          {imageSupportUnits.map((unit) => (
            <button
              key={unit.id}
              role="tab"
              aria-selected={unit.id === activeUnit.id}
              className={unit.id === activeUnit.id ? "active" : ""}
              onClick={() => setActiveUnitId(unit.id)}
            >
              <span>{unit.number}</span>{unit.tab}
            </button>
          ))}
        </div>
        <ImageSupportPanel key={activeUnit.id} unit={activeUnit} />
      </div>
    </section>
  );
}

function ImageSupportPanel({ unit }: { unit: ImageSupportUnit }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [challengeActive, setChallengeActive] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const frame = unit.frames[frameIndex];
  const question = unit.questions[questionIndex];
  const selected = frame.hotspots.find((hotspot) => hotspot.id === selectedHotspot);

  const chooseFrame = (index: number) => {
    setFrameIndex(index);
    setSelectedHotspot(null);
    setChallengeActive(false);
    setFeedback(null);
  };

  const startQuestion = () => {
    const targetFrameIndex = unit.frames.findIndex((item) => item.id === question.frameId);
    setFrameIndex(Math.max(0, targetFrameIndex));
    setSelectedHotspot(null);
    setFeedback(null);
    setShowLabels(false);
    setChallengeActive(true);
  };

  const chooseHotspot = (hotspotId: string) => {
    setSelectedHotspot(hotspotId);
    if (!challengeActive) return;
    const correct = hotspotId === question.answerHotspot;
    setFeedback({ correct, text: correct ? question.correct : question.retry });
    if (correct) setChallengeActive(false);
  };

  const nextQuestion = () => {
    setQuestionIndex((current) => (current + 1) % unit.questions.length);
    setFeedback(null);
    setSelectedHotspot(null);
    setChallengeActive(false);
  };

  return (
    <article className="image-support-panel">
      <header className="image-panel-heading">
        <div>
          <span className="lesson-label">Bildserie {unit.number}</span>
          <h2>{unit.title}</h2>
          <p>{unit.intro}</p>
        </div>
        <div className="image-source-stamp"><small>Källa</small><b>{unit.source}</b></div>
      </header>

      {unit.frames.length > 1 && (
        <div className="image-frame-tabs" role="tablist" aria-label="Navigeringssteg">
          {unit.frames.map((item, index) => (
            <button key={item.id} role="tab" aria-selected={index === frameIndex} className={index === frameIndex ? "active" : ""} onClick={() => chooseFrame(index)}>
              <span>{index + 1}</span>Steg {index + 1}
            </button>
          ))}
        </div>
      )}

      <div className="image-workbench">
        <section className="image-stage-column">
          <div className="image-tools" aria-label="Bildverktyg">
            <button className={showLabels ? "active" : ""} onClick={() => setShowLabels((value) => !value)}>{showLabels ? "Dölj etiketter" : "Visa etiketter"}</button>
            <label>Zoom <input type="range" min="1" max="2" step="0.1" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /></label>
            <output>{Math.round(zoom * 100)}%</output>
            <button aria-label="Zooma ut" onClick={() => setZoom((value) => Math.max(1, Number((value - 0.1).toFixed(1))))} disabled={zoom === 1}>−</button>
            <button aria-label="Zooma in" onClick={() => setZoom((value) => Math.min(2, Number((value + 0.1).toFixed(1))))} disabled={zoom === 2}>+</button>
            <button onClick={() => setZoom(1)} disabled={zoom === 1}>Återställ</button>
          </div>
          <div className="image-viewport">
            <div className="image-canvas" style={{ width: `${zoom * 100}%` }}>
              {/* Static GitHub Pages build: native image paths work with the repository base path. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={frame.image} alt={frame.alt} />
              {frame.hotspots.map((hotspot) => {
                const isSelected = hotspot.id === selectedHotspot;
                const answerState = isSelected && feedback ? (feedback.correct ? "correct" : "wrong") : "";
                return (
                  <button
                    key={hotspot.id}
                    className={`image-hotspot ${hotspot.x > 82 ? "edge-right" : ""} ${isSelected ? "selected" : ""} ${answerState}`}
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    onClick={() => chooseHotspot(hotspot.id)}
                    aria-label={`${hotspot.label}. ${hotspot.explanation}`}
                  >
                    <i aria-hidden="true" />
                    {(showLabels || isSelected) && <span>{hotspot.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="image-caption">{frame.caption}</p>
        </section>

        <aside className="image-guide">
          <div className="image-explanation" aria-live="polite">
            <small>Markerad del</small>
            {selected ? <><h3>{selected.label}</h3><p>{selected.explanation}</p></> : <><h3>Utforska bilden</h3><p>Klicka på en markering för en kort funktionsförklaring.</p></>}
          </div>

          <div className={`image-challenge ${feedback ? (feedback.correct ? "correct" : "wrong") : ""}`}>
            <span className="scenario-count">Bildfråga {questionIndex + 1} / {unit.questions.length}</span>
            <h3>{question.prompt}</h3>
            {!challengeActive && !feedback && <button className="lime-action" onClick={startQuestion}>Starta frågan <span>→</span></button>}
            {challengeActive && !feedback && <p className="challenge-prompt">Etiketterna är dolda. Klicka på rätt markering i bilden.</p>}
            {feedback && <div className="challenge-feedback" aria-live="polite"><b>{feedback.correct ? "Rätt markerat." : "Försök igen."}</b><p>{feedback.text}</p></div>}
            {feedback && !feedback.correct && <button className="outline-action" onClick={() => { setFeedback(null); setSelectedHotspot(null); }}>Försök igen</button>}
            {feedback?.correct && <button className="outline-action" onClick={nextQuestion}>{unit.questions.length > 1 ? "Nästa bildfråga" : "Gör om frågan"}</button>}
          </div>

          <div className="image-source-note">
            <b>Så är bilden använd</b>
            <p>Originalbilden är frilagd ur källfilen. Etiketter, klickytor och frågelogik ligger separat i appen.</p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function CommunicationTools() {
  const [activeCallsignPart, setActiveCallsignPart] = useState(0);
  const [alphabetMode, setAlphabetMode] = useState<"nationellt" | "internationellt">("nationellt");
  const [alphabetQuery, setAlphabetQuery] = useState("");
  const [reportChecks, setReportChecks] = useState<boolean[]>(() => reportChecklist.map(() => false));
  const [indexExercise, setIndexExercise] = useState(0);
  const [indexAnswers, setIndexAnswers] = useState<Record<number, number>>({});

  const alphabet = alphabetMode === "nationellt" ? nationalAlphabet : internationalAlphabet;
  const digits = alphabetMode === "nationellt" ? nationalDigits : internationalDigits;
  const normalizedQuery = alphabetQuery.trim().toLocaleLowerCase("sv");
  const filteredAlphabet = [...alphabet, ...digits].filter((entry) => (
    !normalizedQuery
    || entry.character.toLocaleLowerCase("sv").includes(normalizedQuery)
    || entry.word.toLocaleLowerCase("sv").includes(normalizedQuery)
  ));
  const currentIndexExercise = indexExercises[indexExercise];
  const currentIndexAnswer = indexAnswers[indexExercise];
  const reportDone = reportChecks.filter(Boolean).length;
  const indexCorrect = indexExercises.reduce((sum, exercise, index) => sum + (indexAnswers[index] === exercise.answer ? 1 : 0), 0);

  return (
    <section className="subpage tools-page">
      <div className="subpage-hero tools-hero">
        <span className="eyebrow">Sambandsverktyg</span>
        <h1>Från uppslag till säkert svar.</h1>
        <p>Fyra källkontrollerade stationer för anropssignal, bokstavering, avrapportering och index. Allt fungerar direkt i webbläsaren och inga uppgifter sparas.</p>
        <div className="image-safety-note"><b>Övningsstöd</b><span>Aktuell sambandstablå, lokala beslut och terminalens programmering gäller alltid före repetitionsstödet.</span></div>
      </div>

      <div className="tools-layout">
        <article className="tool-station callsign-station" id="anropssignal">
          <div className="lab-heading"><span>01</span><div><h2>Bygg anropssignalen</h2><p>Klicka på en del för att se vad positionen betyder.</p></div></div>
          <div className="callsign-workbench">
            <div className="callsign-code" aria-label="Exempel på anropssignal 1 65 1110">
              {callsignParts.map((part, index) => (
                <button key={`${part.label}-${index}`} className={activeCallsignPart === index ? "active" : ""} onClick={() => setActiveCallsignPart(index)}>
                  {index === 0 ? `(${part.value})` : index === 3 ? `–${part.value}` : part.value}
                </button>
              ))}
            </div>
            <aside className="callsign-explanation" aria-live="polite">
              <small>Position {activeCallsignPart + 1}</small>
              <h3>{callsignParts[activeCallsignPart].label}</h3>
              <p>{callsignParts[activeCallsignPart].explanation}</p>
            </aside>
          </div>
          <p className="tool-source">Källa: Anropssignaler, nummerplan.pdf</p>
        </article>

        <article className="tool-station alphabet-station" id="bokstavering">
          <div className="lab-heading"><span>02</span><div><h2>Bokstavera utan att blanda</h2><p>Välj alfabet och sök på bokstav, siffra eller kodord.</p></div></div>
          <div className="spelling-rules">
            {spellingRules.map((rule, index) => <div key={rule}><span>{String(index + 1).padStart(2, "0")}</span><p>{rule}</p></div>)}
          </div>
          <div className="alphabet-toolbar">
            <div role="tablist" aria-label="Välj bokstaveringsalfabet">
              <button role="tab" aria-selected={alphabetMode === "nationellt"} className={alphabetMode === "nationellt" ? "active" : ""} onClick={() => setAlphabetMode("nationellt")}>Nationellt</button>
              <button role="tab" aria-selected={alphabetMode === "internationellt"} className={alphabetMode === "internationellt" ? "active" : ""} onClick={() => setAlphabetMode("internationellt")}>Internationellt</button>
            </div>
            <label>Sök i alfabetet<input value={alphabetQuery} onChange={(event) => setAlphabetQuery(event.target.value)} placeholder="Exempel: K, Kalle, 7" /></label>
          </div>
          <div className="alphabet-grid" aria-live="polite">
            {filteredAlphabet.map((entry) => <div key={`${alphabetMode}-${entry.character}`}><b>{entry.character}</b><span>{entry.word}</span></div>)}
          </div>
          {alphabetMode === "internationellt" && <p className="alphabet-note">Den internationella tabellen visar de engelska sifferorden som referens. I svensk radiotrafik sägs siffror på svenska.</p>}
          <p className="tool-source">Källa: Bokstavering.pdf</p>
        </article>

        <article className="tool-station report-station" id="avrapportering">
          <div className="lab-heading"><span>03</span><div><h2>Avrapportera till RLC</h2><p>Bocka av vad som behöver framgå. Skriv aldrig person- eller ärendeuppgifter i verktyget.</p></div></div>
          <div className="report-progress"><span style={{ width: `${(reportDone / reportChecklist.length) * 100}%` }} /><b>{reportDone} / {reportChecklist.length}</b></div>
          <div className="report-checklist">
            {reportChecklist.map((item, index) => (
              <button
                key={item}
                className={reportChecks[index] ? "checked" : ""}
                aria-pressed={reportChecks[index]}
                onClick={() => setReportChecks((current) => current.map((checked, itemIndex) => itemIndex === index ? !checked : checked))}
              >
                <span>{reportChecks[index] ? "✓" : String(index + 1).padStart(2, "0")}</span><p>{item}</p>
              </button>
            ))}
          </div>
          {reportDone === reportChecklist.length && <div className="report-complete" role="status"><b>Checklistan genomgången.</b><span>Kontrollera att händelserapporten också innehåller uppgifter från andra kanaler som behövs för fortsatt utredning.</span></div>}
          <button className="outline-action report-reset" disabled={reportDone === 0} onClick={() => setReportChecks(reportChecklist.map(() => false))}>Nollställ checklistan</button>
          <p className="tool-source">Källa: Avrapportering kort.pdf</p>
        </article>

        <article className="tool-station index-station" id="indextraning">
          <div className="lab-heading"><span>04</span><div><h2>Indexträning</h2><p>Sex exempel från det kontrollerade utbildningsmaterialet.</p></div></div>
          <div className="index-progress" aria-label={`${Object.keys(indexAnswers).length} av ${indexExercises.length} besvarade`}>
            {indexExercises.map((exercise, index) => <button key={exercise.prompt} className={`${index === indexExercise ? "active" : ""} ${indexAnswers[index] === exercise.answer ? "correct" : indexAnswers[index] !== undefined ? "wrong" : ""}`} onClick={() => setIndexExercise(index)}>{indexAnswers[index] === exercise.answer ? "✓" : index + 1}</button>)}
          </div>
          <div className="index-card">
            <span className="scenario-count">Fråga {indexExercise + 1} / {indexExercises.length}</span>
            <h3>{currentIndexExercise.prompt}</h3>
            <div className="index-options">
              {currentIndexExercise.options.map((option, optionIndex) => (
                <button
                  key={option}
                  className={currentIndexAnswer === optionIndex ? (optionIndex === currentIndexExercise.answer ? "correct" : "wrong") : currentIndexAnswer !== undefined && optionIndex === currentIndexExercise.answer ? "correct" : ""}
                  onClick={() => setIndexAnswers((current) => ({ ...current, [indexExercise]: optionIndex }))}
                >{option}</button>
              ))}
            </div>
            {currentIndexAnswer !== undefined && <div className="index-feedback"><b>{currentIndexAnswer === currentIndexExercise.answer ? "Rätt." : "Inte riktigt."}</b> {currentIndexExercise.explanation}</div>}
            <div className="index-actions">
              <button disabled={indexExercise === 0} onClick={() => setIndexExercise(indexExercise - 1)}>← Föregående</button>
              <span>{indexCorrect} rätt</span>
              <button disabled={indexExercise === indexExercises.length - 1} onClick={() => setIndexExercise(indexExercise + 1)}>Nästa →</button>
            </div>
          </div>
          <p className="tool-source">Källa: Indexering 22.pdf</p>
        </article>

        <aside className="tools-sources"><b>Källspårning</b>{communicationToolSources.map((source) => <span key={source}>{source}</span>)}</aside>
      </div>
    </section>
  );
}

function PracticeLab() {
  const [mode, setMode] = useState<"TMO" | "DMO">("TMO");
  const [screen, setScreen] = useState("SKAN IGV · normalpassning");
  const [status, setStatus] = useState("Skanning aktiv · nätkontakt");
  const [locked, setLocked] = useState(false);
  const [audioInner, setAudioInner] = useState(false);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [scenarioAnswer, setScenarioAnswer] = useState<number | null>(null);

  const press = (key: string) => {
    const actions: Record<string, () => void> = {
      "1": () => { setMode("TMO"); setScreen("SKAN IGV · normalpassning"); setStatus("DV1 · skanning aktiv"); },
      "2": () => setStatus("Anropsbegäran → hemma-RLC"),
      "3": () => { setScreen("INSATS 1 · region"); setStatus("Enskild talgrupp · skanning av"); },
      "4": () => { setScreen("INSATS X1 · polisområde"); setStatus("Anmäl dig med hela anropssignalen"); },
      "5": () => { setScreen("INSATS X2 · polisområde"); setStatus("Tilldelning styrs av RLC"); },
      "6": () => setStatus("Togglade till föregående talgrupp"),
      "7": () => { setScreen("SAMV POL"); setStatus("Programmerbart direktval"); },
      "8": () => { const next = mode === "TMO" ? "DMO" : "TMO"; setMode(next); setScreen(next === "DMO" ? "POL 1 DMO" : "SKAN IGV · normalpassning"); setStatus(next === "DMO" ? "Direktläge · lokal räckvidd" : "Nätläge · skanning aktiv"); },
      "9": () => { setScreen("RAPS"); setStatus("Samverkan · presentera organisation"); },
      "*": () => { setLocked(!locked); setStatus(!locked ? "Knapplås aktivt" : "Knapplås av"); },
      "0": () => { setAudioInner(!audioInner); setStatus(!audioInner ? "Ljudväg → inre högtalare" : "Ljudväg → yttre högtalare"); },
      "#": () => { setScreen("SMARTMENY"); setStatus("Info · status · skannade grupper"); },
    };
    if (locked && key !== "*") { setStatus("Knapplås aktivt · lås upp med *"); return; }
    actions[key]?.();
  };

  const scenario = radioScenarios[scenarioIndex];
  return (
    <section className="subpage lab-page">
      <div className="subpage-hero dark">
        <span className="eyebrow light">Övningslabb</span>
        <h1>Gör valet. Se följden.</h1>
        <p>Fem navigeringsövningar i utbildningsstrukturen, följt av direktval och trafikuttryck. Inget här påverkar en riktig terminal eller skickar någon signal.</p>
      </div>
      <div className="lab-layout">
        <TalkgroupLab />
        <article className="terminal-lab">
          <div className="lab-heading"><span>02</span><div><h2>Direktval på SC21</h2><p>Klicka motsvarar ett långt tryck i den här simulatorn.</p></div></div>
          <div className="terminal-wrap">
            <div className="terminal-device">
              <div className="terminal-top"><i /><i /><i /></div>
              <div className="terminal-screen">
                <div className="screen-icons"><span>{mode}</span><span>{mode === "TMO" ? "⌁" : "◇"}</span><span>{locked ? "🔒" : "◉"}</span></div>
                <strong>{screen}</strong><small>{status}</small>
              </div>
              <div className="softkeys"><i /><b>MODE</b><i /></div>
              <div className="number-pad">
                {["1","2","3","4","5","6","7","8","9","*","0","#"].map((key) => <button key={key} onClick={() => press(key)} aria-label={`Direktval ${key}`}>{key}</button>)}
              </div>
              <div className="terminal-note">SC21 · utbildningssimulator</div>
            </div>
            <div className="dv-legend">
              <h3>Direktvalsnyckel</h3>
              <dl>
                <div><dt>1</dt><dd>Normalpassning</dd></div><div><dt>2</dt><dd>Anropsbegäran</dd></div>
                <div><dt>3</dt><dd>Regional insats</dd></div><div><dt>4–5</dt><dd>PO-insats</dd></div>
                <div><dt>6</dt><dd>Toggla talgrupp</dd></div><div><dt>7</dt><dd>SAMV Pol</dd></div>
                <div><dt>8</dt><dd>TMO / DMO</dd></div><div><dt>9</dt><dd>RAPS</dd></div>
                <div><dt>*</dt><dd>Knapplås</dd></div><div><dt>0</dt><dd>Ljudväg</dd></div>
                <div><dt>#</dt><dd>Smartmeny</dd></div>
              </dl>
              <p>Fordonsterminalens DV8 kan även erbjuda Gateway och Repeater beroende på utrustning och behörighet.</p>
            </div>
          </div>
        </article>

        <article className="radio-lab">
          <div className="lab-heading"><span>03</span><div><h2>Vem äger samtalet?</h2><p>Välj trafikuttrycket som passar bäst.</p></div></div>
          <div className="radio-console">
            <div className="waveform" aria-hidden="true">{Array.from({ length: 26 }).map((_, index) => <i key={index} style={{ height: `${22 + ((index * 37) % 68)}%` }} />)}</div>
            <span className="scenario-count">Scenario {scenarioIndex + 1} / {radioScenarios.length}</span>
            <p>{scenario.prompt}</p>
            <div className="radio-options">
              {scenario.options.map((option, index) => (
                <button key={option} className={scenarioAnswer === index ? (index === scenario.answer ? "correct" : "wrong") : scenarioAnswer !== null && index === scenario.answer ? "correct" : ""} onClick={() => setScenarioAnswer(index)}>{option}</button>
              ))}
            </div>
            {scenarioAnswer !== null && <div className="radio-feedback"><b>{scenarioAnswer === scenario.answer ? "Rätt val." : "Inte riktigt."}</b> {scenario.note}</div>}
            <button className="lime-action" disabled={scenarioAnswer === null} onClick={() => { setScenarioIndex((scenarioIndex + 1) % radioScenarios.length); setScenarioAnswer(null); }}>{scenarioIndex === radioScenarios.length - 1 ? "Börja om" : "Nästa scenario"} <span>→</span></button>
          </div>
        </article>
      </div>
    </section>
  );
}

function TalkgroupLab() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const exercise = navigationExercises[exerciseIndex];
  const initialGroupIndex = (folderId: string, group?: string) => {
    const groups = talkgroupFolders[folderId]?.groups ?? [];
    const index = group ? groups.indexOf(group) : 0;
    return Math.max(0, index);
  };
  const [folderId, setFolderId] = useState(exercise.startFolder);
  const [groupIndex, setGroupIndex] = useState(() => initialGroupIndex(exercise.startFolder, exercise.startGroup));
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState("Börja med att läsa startläge och mål.");
  const [completed, setCompleted] = useState<string[]>([]);
  const [confirmationMethod, setConfirmationMethod] = useState<string | null>(null);
  const folder = talkgroupFolders[folderId];
  const groups = folder.groups ?? [];
  const selectedGroup = groups[groupIndex];
  const targetReady = folderId === exercise.targetFolder && selectedGroup === exercise.targetGroup;
  const isDone = targetReady && confirmationMethod !== null;
  const mode = folderId === "dmo" && selectedGroup ? "DMO" : "TMO";

  const loadExercise = (index: number) => {
    const next = navigationExercises[index];
    setExerciseIndex(index);
    setFolderId(next.startFolder);
    setGroupIndex(initialGroupIndex(next.startFolder, next.startGroup));
    setMoves(0);
    setConfirmationMethod(null);
    setMessage("Nytt startläge laddat. Hitta målet utan direktval.");
  };

  const checkCompletion = (nextFolderId: string, nextGroupIndex: number, nextMoves: number) => {
    const nextFolder = talkgroupFolders[nextFolderId];
    const nextGroup = nextFolder.groups?.[nextGroupIndex];
    if (nextFolderId === exercise.targetFolder && nextGroup === exercise.targetGroup) {
      setMessage(`Rätt talgrupp visas efter ${nextMoves} handgrepp. Bekräfta valet för att göra bytet klart.`);
      return true;
    }
    return false;
  };

  const confirmSelection = (method: string) => {
    if (!targetReady || isDone) return;
    setConfirmationMethod(method);
    setCompleted((current) => current.includes(exercise.id) ? current : [...current, exercise.id]);
    setMessage(`Valet bekräftades med ${method}. Övningen är klar.`);
  };

  const moveFolder = (direction: "left" | "right" | "up" | "down") => {
    if (isDone) return;
    setConfirmationMethod(null);
    let nextFolderId = folderId;
    if (direction === "up") {
      if (!folder.parent) {
        setMessage("Du är redan på huvudraden. Använd vänster eller höger.");
        return;
      }
      nextFolderId = folder.parent;
    } else if (direction === "down") {
      if (!folder.children?.length) {
        setMessage(groups.length ? "Här finns talgrupper. Använd vredet." : "Den här mappen har ingen undermapp i övningsmodellen.");
        return;
      }
      nextFolderId = folder.children[0];
    } else {
      const siblings = siblingIds(folderId);
      const currentIndex = siblings.indexOf(folderId);
      const delta = direction === "left" ? -1 : 1;
      const nextIndex = currentIndex + delta;
      if (nextIndex < 0 || nextIndex >= siblings.length) {
        setMessage(`Det finns ingen mapp längre åt ${direction === "left" ? "vänster" : "höger"} på den här nivån.`);
        return;
      }
      nextFolderId = siblings[nextIndex];
    }
    const nextMoves = moves + 1;
    setFolderId(nextFolderId);
    setGroupIndex(-1);
    setMoves(nextMoves);
    const nextFolder = talkgroupFolders[nextFolderId];
    if (!checkCompletion(nextFolderId, -1, nextMoves)) {
      setMessage(nextFolder.groups?.length ? "Rätt mappnivå. Använd vredet för att välja talgrupp." : "Mappen vald. Fortsätt med pilarna.");
    }
  };

  const turnKnob = (direction: -1 | 1) => {
    if (isDone) return;
    setConfirmationMethod(null);
    if (!groups.length) {
      setMessage(folder.children?.length ? "Mappen innehåller undermappar. Använd pil ned." : "Här finns ingen valbar talgrupp i övningsmodellen.");
      return;
    }
    const nextIndex = groupIndex < 0
      ? (direction === 1 ? 0 : groups.length - 1)
      : (groupIndex + direction + groups.length) % groups.length;
    const nextMoves = moves + 1;
    setGroupIndex(nextIndex);
    setMoves(nextMoves);
    if (!checkCompletion(folderId, nextIndex, nextMoves)) {
      setMessage("Vredet bytte talgrupp i den valda mappen.");
    }
  };

  const showHint = () => {
    const targetPath = folderPath(exercise.targetFolder).map((item) => item.id);
    const currentPath = folderPath(folderId).map((item) => item.id);
    if (folderId === exercise.targetFolder) {
      setMessage(selectedGroup === exercise.targetGroup ? "Rätt talgrupp visas. Bekräfta med grön lur, PTT eller genom att vänta några sekunder." : `Du är i rätt mapp. Vrid till ${exercise.targetGroup}.`);
      return;
    }
    if (targetPath.includes(folderId)) {
      setMessage("Du är på rätt gren. Använd pil ned.");
      return;
    }
    if (currentPath.length > 1) {
      setMessage("Gå uppåt tills du når den gemensamma mappnivån.");
      return;
    }
    const currentRootIndex = rootFolderIds.indexOf(folderId as (typeof rootFolderIds)[number]);
    const targetRootIndex = rootFolderIds.indexOf(targetPath[0] as (typeof rootFolderIds)[number]);
    setMessage(`På huvudraden: använd pil ${targetRootIndex < currentRootIndex ? "vänster" : "höger"} mot ${talkgroupFolders[targetPath[0]].label}.`);
  };

  return (
    <article className="talkgroup-lab" aria-labelledby="talkgroup-lab-title">
      <div className="lab-heading"><span>01</span><div><h2 id="talkgroup-lab-title">Talgruppslabbet</h2><p>Pilar väljer mapp. Vred väljer talgrupp.</p></div></div>
      <div className="talkgroup-meta">
        <span>Utbildningsstruktur HT2025</span>
        <b>{completed.length} av {navigationExercises.length} klara</b>
      </div>
      <div className="exercise-tabs" role="tablist" aria-label="Navigeringsövningar">
        {navigationExercises.map((item, index) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={exerciseIndex === index}
            className={`${exerciseIndex === index ? "active" : ""} ${completed.includes(item.id) ? "done" : ""}`}
            onClick={() => loadExercise(index)}
          >
            <span>{completed.includes(item.id) ? "✓" : index + 1}</span>{item.title}
          </button>
        ))}
      </div>
      <div className="talkgroup-workbench">
        <section className="exercise-brief" aria-label="Aktuell övning">
          <span className="scenario-count">Övning {exerciseIndex + 1} / {navigationExercises.length}</span>
          <h3>{exercise.title}</h3>
          <p>{exercise.briefing}</p>
          <dl>
            <div><dt>Start</dt><dd>{talkgroupFolders[exercise.startFolder].label}{exercise.startGroup ? ` · ${exercise.startGroup}` : ""}</dd></div>
            <div><dt>Mål</dt><dd>{talkgroupFolders[exercise.targetFolder].label} · {exercise.targetGroup}</dd></div>
          </dl>
          <small>Källa: {exercise.sourceNote}</small>
        </section>

        <section className={`tree-terminal ${isDone ? "success" : ""}`} aria-label="Simulerad terminalnavigering">
          <div className="tree-screen" aria-live="polite">
            <div className="screen-icons"><span>{mode}</span><span>{mode === "TMO" ? "⌁ NÄT" : "◇ DIREKT"}</span><span>{moves} steg</span></div>
            <small>MAPP</small>
            <strong>{folder.label}</strong>
            <span className="screen-group">{selectedGroup ?? (folder.children?.length ? "↳ undermappar" : "—")}</span>
            <div className="breadcrumb">{folderPath(folderId).map((item) => item.label).join(" › ")}</div>
          </div>
          <div className="navigation-controls">
            <div className="arrow-pad" aria-label="Pilknappar för mappar">
              <button onClick={() => moveFolder("up")} aria-label="Mapp upp">↑</button>
              <button onClick={() => moveFolder("left")} aria-label="Mapp vänster">←</button>
              <span>MAP</span>
              <button onClick={() => moveFolder("right")} aria-label="Mapp höger">→</button>
              <button onClick={() => moveFolder("down")} aria-label="Mapp ned">↓</button>
            </div>
            <div className="knob-control" aria-label="Vred för talgrupper">
              <button onClick={() => turnKnob(-1)} aria-label="Föregående talgrupp">−</button>
              <div><b>VRED</b><span>TALGRUPP</span></div>
              <button onClick={() => turnKnob(1)} aria-label="Nästa talgrupp">+</button>
            </div>
          </div>
        </section>

        <aside className={`navigation-feedback ${isDone ? "success" : ""}`} aria-live="polite">
          <small>{isDone ? "Övningen klar" : targetReady ? "Bekräfta talgruppen" : "Navigeringsstöd"}</small>
          <p>{message}</p>
          {targetReady && !isDone && (
            <div className="group-confirmation" aria-label="Bekräfta talgruppsval">
              <button onClick={() => confirmSelection("grön lur")}>Grön lur</button>
              <button onClick={() => confirmSelection("PTT")}>PTT</button>
              <button onClick={() => confirmSelection("några sekunders väntan")}>Vänta</button>
            </div>
          )}
          {isDone ? <p className="why-correct">{exercise.reason} Valet bekräftades med {confirmationMethod}.</p> : !targetReady && <button onClick={showHint}>Visa nästa ledtråd</button>}
          <div className="exercise-actions">
            <button onClick={() => loadExercise(exerciseIndex)}>Börja om</button>
            {isDone && exerciseIndex < navigationExercises.length - 1 && <button className="next-exercise" onClick={() => loadExercise(exerciseIndex + 1)}>Nästa övning →</button>}
          </div>
        </aside>
      </div>
      <p className="lab-disclaimer">Övningsmodell för studentterminaler MPU. Aktuell sambandstablå, lokala beslut och terminalens faktiska programmering gäller alltid.</p>
    </article>
  );
}

function Flashcards() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const next = (direction: number) => {
    setIndex((index + direction + quickCards.length) % quickCards.length);
    setFlipped(false);
  };
  return (
    <section className="subpage flash-page">
      <div className="subpage-hero"><span className="eyebrow">Snabbrepetition</span><h1>Tolv kort. Fem minuter.</h1><p>Vänd kortet, säg svaret högt och gå vidare.</p></div>
      <div className="flash-shell">
        <span>{String(index + 1).padStart(2, "0")} / {quickCards.length}</span>
        <button className={`flash-card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)} aria-label={flipped ? "Visa begreppet" : "Visa förklaringen"}>
          <small>{flipped ? "Förklaring" : "Begrepp"}</small>
          <strong>{flipped ? quickCards[index][1] : quickCards[index][0]}</strong>
          <em>{flipped ? "Klicka för begrepp" : "Klicka för svar"}</em>
        </button>
        <div className="flash-controls"><button onClick={() => next(-1)}>← Föregående</button><button onClick={() => next(1)}>Nästa →</button></div>
      </div>
    </section>
  );
}

function SourceLibrary() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => sourceDocuments.filter((name) => name.toLocaleLowerCase("sv").includes(query.toLocaleLowerCase("sv"))), [query]);
  return (
    <section className="subpage sources-page">
      <div className="subpage-hero"><span className="eyebrow">Källförteckning</span><h1>63 original. En lärstig.</h1><p>Originalen är lokalt bevarade i mappen <b>källmaterial</b> och ingår inte i den publika webbappen.</p></div>
      <div className="source-library">
        <label>Sök dokument<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Exempel: skanning, RLC, trafik…" /></label>
        <div className="source-result-head"><span>{filtered.length} dokument</span><span>61 PDF · 2 PPTX</span></div>
        <ol>
          {filtered.map((name, index) => <li key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{name}</b><small>{name.endsWith(".pptx") ? "PowerPoint · kunskapsbank" : "PDF · kurskälla"}</small></div></li>)}
        </ol>
      </div>
    </section>
  );
}
