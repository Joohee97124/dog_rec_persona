// src/components/survey/ProgressBar.jsx
export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-amber-900">
          🐕 Step {current}
        </span>
        <span className="text-xs font-medium text-amber-700/70">
          {current} / {total}
        </span>
      </div>
      <div className="relative w-full h-3 bg-yellow-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-300 to-amber-400 
                     transition-all duration-700 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
