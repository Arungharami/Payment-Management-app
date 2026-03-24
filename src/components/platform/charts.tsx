'use client';

import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Bar, BarChart } from 'recharts';

import { cn } from '@/lib/utils';

const pieColors = ['#0f766e', '#0f172a', '#2563eb', '#f59e0b'];

export function SpendTrendChart({
  data,
}: {
  data: Array<{ month: string; spend: number; paid: number }>;
}) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="spend" stroke="#0f172a" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="paid" stroke="#0f766e" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MethodDistributionChart({
  data,
}: {
  data: Array<{ method: string; value: number }>;
}) {
  return (
    <div className="flex items-center gap-6">
      <div className="h-56 w-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="method" innerRadius={52} outerRadius={80} paddingAngle={2}>
              {data.map((entry, index) => (
                <Cell key={entry.method} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.method} className="flex items-center gap-3 text-sm">
            <span className={cn('h-3 w-3 rounded-full', index === 0 && 'bg-teal-700', index === 1 && 'bg-slate-900', index === 2 && 'bg-blue-600', index === 3 && 'bg-amber-500')} />
            <span className="font-medium text-slate-800">{item.method}</span>
            <span className="text-slate-500">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OverdueTrendChart({
  data,
}: {
  data: Array<{ week: string; overdue: number }>;
}) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="overdue" fill="#f97316" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
