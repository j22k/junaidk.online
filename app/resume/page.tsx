import { PROFILE } from '@/lib/data';

export default function ResumePage() {
  return (
    <main className="bg-paper min-h-screen py-12">
      <div className="max-w-[720px] mx-auto bg-transparent px-6">
        <header className="mb-6">
          <h1 className="text-3xl font-cormorant">{PROFILE.name}</h1>
          <p className="text-ink/70 mt-1">{PROFILE.role} — {PROFILE.location}</p>
        </header>

        <section>
          <h2 className="font-dm font-medium">Summary</h2>
          <p className="mt-2 text-ink/80">{PROFILE.bio}</p>
        </section>

        <section className="mt-6">
          <h2 className="font-dm font-medium">Contact</h2>
          <ul className="mt-2">
            <li>Email: {PROFILE.email}</li>
            <li>GitHub: {PROFILE.github}</li>
            <li>LinkedIn: {PROFILE.linkedin}</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="font-dm font-medium">Highlights</h2>
          <ul className="mt-2 list-disc ml-6">
            <li>LLM fine-tuning and RAG deployments.</li>
            <li>Real-time video intelligence on AWS (IVS, Kinesis, Lambda).</li>
            <li>Production ML pipelines and model optimization.</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
