import { BrainCircuit, Sparkles } from 'lucide-react';

import { Header } from '@/components/layout/header';
import { InsightCard, SectionIntro } from '@/components/platform/shared';
import { Button } from '@/components/ui/button';
import { chatMessages, aiQuickPrompts } from '@/lib/platform-data';

export default function AssistantPage() {
  return (
    <>
      <Header title="AI Assistant" />
      <main className="flex-1 space-y-8 px-4 py-6 md:px-8">
        <SectionIntro
          eyebrow="AI support"
          title="Ask operational AP questions and get actionable vendor payment guidance."
          description="The assistant is designed for finance teams, store operators, and admins who need overdue analysis, approval summaries, payment prioritization, and expense insight."
        />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <InsightCard title="Conversation" description="Business-oriented responses with contextual cards and reusable prompts.">
            <div className="space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={message.role === 'assistant' ? 'rounded-[1.5rem] bg-slate-950 p-5 text-white' : 'rounded-[1.5rem] bg-slate-100 p-5 text-slate-900'}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium uppercase tracking-[0.16em]">
                      {message.role === 'assistant' ? 'LedgerFlow AI' : 'You'}
                    </p>
                    <p className={message.role === 'assistant' ? 'text-xs text-slate-400' : 'text-xs text-slate-500'}>{message.timestamp}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7">{message.content}</p>
                </div>
              ))}
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-900">Chat input placeholder</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  The product structure is ready for API-backed AI responses, contextual invoice retrieval, and prompt history persistence.
                </p>
              </div>
            </div>
          </InsightCard>

          <div className="grid gap-6">
            <InsightCard title="Quick prompts" description="Prebuilt questions for common AP decisions.">
              <div className="space-y-3">
                {aiQuickPrompts.map((prompt) => (
                  <Button key={prompt} variant="outline" className="h-auto w-full justify-start rounded-2xl border-slate-200 px-4 py-4 text-left">
                    <Sparkles className="h-4 w-4" />
                    <span className="whitespace-normal">{prompt}</span>
                  </Button>
                ))}
              </div>
            </InsightCard>

            <InsightCard title="Context cards" description="Responses can surface linked insights without leaving the chat.">
              <div className="space-y-4">
                {[
                  ['Overdue exposure', '$27,610', 'High priority vendor: McKesson Medical-Surgical'],
                  ['Approval blockers', '5 items', '2 are older than 48 hours'],
                  ['Upcoming outflow', '$63,550', '58% inventory-related spend'],
                ].map(([label, value, helper]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                        <BrainCircuit className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">{label}</p>
                        <p className="text-xl font-semibold text-slate-950">{value}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{helper}</p>
                  </div>
                ))}
              </div>
            </InsightCard>
          </div>
        </div>
      </main>
    </>
  );
}
