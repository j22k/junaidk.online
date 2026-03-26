"use client";

export default function FAQ() {
  const faqs = [
    {
      q: 'What technologies does Junaid specialize in?',
      a: 'Junaid specializes in LLM fine-tuning (QLoRA), RAG architectures, computer vision with PyTorch/YOLO, and AWS production deployments (IVS, Lambda, SageMaker).',
    },
    {
      q: 'Can I see your resume?',
      a: 'Yes — a text-based resume is available on the site and downloadable as a PDF.',
    },
    {
      q: 'What are some measurable outcomes from your projects?',
      a: "Projects include citation-ready facts like inference latencies, ROC-AUC scores, and dataset sizes — see the project TL;DRs for details.",
    },
  ];

  return (
    <section id="faq" className="max-w-[960px] mx-auto py-12 px-6">
      <h2 className="font-cormorant text-2xl mb-6">FAQ</h2>
      <div className="flex flex-col gap-6">
        {faqs.map((f, i) => (
          <article key={i} className="prose dark:prose-invert">
            <h3 className="font-dm font-medium">{f.q}</h3>
            <p className="font-dm text-ink/70">{f.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
