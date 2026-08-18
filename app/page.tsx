"use client";

import { useEffect, useMemo, useState } from "react";
import { modules, quickCards, radioScenarios, sourceDocuments, type LearningModule } from "./content";

type View = "start" | "lab" | "snabbkort" | "kallor";
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
        completed={progress.completed.includes(activeModule.id)}
      />
    );
  }

  return (
    <main id="top">
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
              <p>Utforska direktval på en förenklad SC21 och träna vilket trafikuttryck som avslutar nästa sändning.</p>
              <button className="lime-action" onClick={() => setView("lab")}>Starta labbet <span>→</span></button>
            </div>
            <MiniTerminal />
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

      {view === "lab" && <PracticeLab />}
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
        <button className={view === "lab" ? "active" : ""} onClick={() => navigate("lab")}>Övningslabb</button>
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
  module, lessonIndex, setLessonIndex, answers, setAnswers, quizScore, submitQuiz, restartModule, onClose, completed,
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
        <p>Förenklad träning – inget här påverkar en riktig terminal eller skickar någon signal.</p>
      </div>
      <div className="lab-layout">
        <article className="terminal-lab">
          <div className="lab-heading"><span>01</span><div><h2>Direktval på SC21</h2><p>Klicka motsvarar ett långt tryck i den här simulatorn.</p></div></div>
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
          <div className="lab-heading"><span>02</span><div><h2>Vem äger samtalet?</h2><p>Välj trafikuttrycket som passar bäst.</p></div></div>
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
