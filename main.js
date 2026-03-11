import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';

const pages = ['Home', 'Workout Tracker', 'Progress Dashboard', 'Login / Signup'];
const workoutTypes = ['Push', 'Pull', 'Legs', 'Cardio', 'Core'];

const initialForm = {
  workout: workoutTypes[0],
  duration: 45,
  intensity: 7,
  date: new Date().toISOString().slice(0, 10)
};

function App() {
  const [activePage, setActivePage] = useState('Home');
  const [user, setUser] = useState(() => localStorage.getItem('gymflow-user') || '');
  const [workouts, setWorkouts] = useState(() => {
    const saved = localStorage.getItem('gymflow-workouts');
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState(initialForm);
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    localStorage.setItem('gymflow-workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('gymflow-user', user);
    } else {
      localStorage.removeItem('gymflow-user');
    }
  }, [user]);

  const weeklyData = useMemo(() => {
    const last7 = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const key = d.toISOString().slice(0, 10);
      const total = workouts
        .filter((w) => w.date === key)
        .reduce((sum, w) => sum + Number(w.duration), 0);
      return { label: key.slice(5), minutes: total };
    });
    return last7;
  }, [workouts]);

  const totalMinutes = workouts.reduce((sum, w) => sum + Number(w.duration), 0);
  const avgIntensity = workouts.length
    ? (workouts.reduce((sum, w) => sum + Number(w.intensity), 0) / workouts.length).toFixed(1)
    : '0.0';

  const saveWorkout = (event) => {
    event.preventDefault();
    if (!user) {
      setActivePage('Login / Signup');
      return;
    }

    setWorkouts((prev) => [{ id: crypto.randomUUID(), ...form }, ...prev]);
    setForm({ ...initialForm, date: new Date().toISOString().slice(0, 10) });
    setActivePage('Progress Dashboard');
  };

  const handleAuth = (event) => {
    event.preventDefault();
    const identifier = authMode === 'login' ? authForm.email : authForm.name;
    setUser(identifier || 'Athlete');
    setAuthForm({ name: '', email: '', password: '' });
    setActivePage('Workout Tracker');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
      <header className="sticky top-3 z-20 mb-6 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-glow backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">GymFlow</h1>
            <p className="text-sm text-slate-400">Track workouts. Build consistency.</p>
          </div>
          <div className="text-sm text-slate-300">{user ? `Logged in as ${user}` : 'Guest mode'}</div>
        </div>
        <nav className="mt-4 flex flex-wrap gap-2">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`rounded-lg px-3 py-2 text-sm transition ${
                activePage === page
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 animate-fadeInUp">
        {activePage === 'Home' && (
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-3xl font-semibold text-white">Modern fitness tracking for real progress.</h2>
              <p className="mt-4 text-slate-300">
                GymFlow helps you log workouts, visualize trends, and stay accountable across every training day.
              </p>
              <button
                onClick={() => setActivePage(user ? 'Workout Tracker' : 'Login / Signup')}
                className="mt-6 rounded-lg bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-400"
              >
                {user ? 'Log Today\'s Workout' : 'Get Started'}
              </button>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-lg font-medium text-white">What you get</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>• Fast workout saving with smart defaults</li>
                <li>• Weekly progress graph and summary stats</li>
                <li>• Mobile-first responsive design</li>
                <li>• Clean, distraction-free dark interface</li>
              </ul>
            </div>
          </section>
        )}

        {activePage === 'Workout Tracker' && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold text-white">Workout Tracker</h2>
            <p className="mt-2 text-slate-400">Save each session to keep your streak alive.</p>

            <form onSubmit={saveWorkout} className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                <span className="mb-1 block text-slate-300">Workout Type</span>
                <select
                  value={form.workout}
                  onChange={(e) => setForm((f) => ({ ...f, workout: e.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {workoutTypes.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-slate-300">Date</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500"
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-slate-300">Duration (minutes)</span>
                <input
                  type="number"
                  min="5"
                  max="240"
                  value={form.duration}
                  onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500"
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block text-slate-300">Intensity (1-10)</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={form.intensity}
                  onChange={(e) => setForm((f) => ({ ...f, intensity: e.target.value }))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500"
                />
              </label>

              <button className="rounded-lg bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-400 sm:col-span-2">
                Save Workout
              </button>
            </form>
          </section>
        )}

        {activePage === 'Progress Dashboard' && (
          <section className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard label="Total Workouts" value={workouts.length} />
              <StatCard label="Total Minutes" value={totalMinutes} />
              <StatCard label="Avg Intensity" value={avgIntensity} />
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="text-2xl font-semibold text-white">Weekly Progress</h2>
              <div className="mt-6 grid h-56 grid-cols-7 items-end gap-3">
                {weeklyData.map((d) => {
                  const height = Math.max(8, Math.min(100, (d.minutes / 120) * 100));
                  return (
                    <div key={d.label} className="flex flex-col items-center gap-2">
                      <div className="text-xs text-slate-400">{d.minutes}m</div>
                      <div className="relative h-40 w-full overflow-hidden rounded-md bg-slate-800">
                        <div
                          style={{ height: `${height}%` }}
                          className="absolute bottom-0 w-full bg-gradient-to-t from-brand-500 to-cyan-300 transition-all duration-500"
                        ></div>
                      </div>
                      <div className="text-xs text-slate-500">{d.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {activePage === 'Login / Signup' && (
          <section className="mx-auto w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 flex gap-2 rounded-lg bg-slate-800 p-1">
              {['login', 'signup'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAuthMode(mode)}
                  className={`flex-1 rounded-md px-3 py-2 text-sm capitalize transition ${
                    authMode === mode ? 'bg-brand-500 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <form onSubmit={handleAuth} className="space-y-4">
              {authMode === 'signup' && (
                <input
                  required
                  value={authForm.name}
                  onChange={(e) => setAuthForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500"
                />
              )}
              <input
                required
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Email"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                required
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button className="w-full rounded-lg bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-400">
                {authMode === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
