import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About Spoko.help - Free EMDR Tool",
  description:
    "Spoko.help was created to make bilateral stimulation simple and accessible for everyone, absolutely for free",
};

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-4">About Spoko.help</h1>
      <p className="mb-6">
        Spoko.help was created to make <strong>bilateral stimulation</strong>{" "}
        simple and accessible — whether you’re curious about its calming effect
        or want to use it as part of your self-care routine. The idea comes from
        modern neuroscience and psychology, where rhythmic, alternating
        movements or sounds are used to help the brain relax and process
        emotions more smoothly.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        What Is Bilateral Stimulation?
      </h2>
      <p className="mb-4">
        Bilateral stimulation (often shortened to <strong>BLS</strong>) means
        gently activating both sides of the brain in an alternating pattern —
        for example, moving your eyes left and right, or hearing soft sounds
        that switch between your left and right ear. It’s a core part of{" "}
        <strong>EMDR therapy</strong> (Eye Movement Desensitization and
        Reprocessing), developed by psychologist{" "}
        <strong>Francine Shapiro</strong> in the late 1980s.
      </p>
      <p className="mb-4">
        Shapiro noticed that when people recalled upsetting memories while their
        eyes moved rapidly from side to side, the memories felt less distressing
        afterward. Over time, research confirmed that this kind of alternating
        stimulation can help the brain reprocess difficult emotions and restore
        a sense of calm.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">
        Why Does the Brain Respond to It?
      </h2>
      <p className="mb-4">
        Our brain naturally uses left–right coordination when processing daily
        experiences — even during sleep, when{" "}
        <strong>REM (rapid eye movement)</strong> helps organize memories.
        Bilateral stimulation seems to mimic that rhythm, allowing emotional and
        logical parts of the brain to communicate more efficiently.
      </p>
      <p className="mb-4">
        The exact mechanism isn’t fully understood yet, but studies suggest it
        helps reduce overactivation in stress-related areas of the brain and
        promotes a sense of balance and groundedness. In short: when your
        attention moves rhythmically from one side to the other, your nervous
        system tends to shift from “fight or flight” mode into a calmer state.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Our Mission</h2>
      <p className="mb-4">
        Spoko.help isn’t therapy — it’s a small digital space for mental rest.
        Our goal is to let you experience gentle bilateral stimulation without
        distractions, data tracking, or complicated setups. Use it to focus,
        relax, or simply give your mind a short break.
      </p>

      <p className="text-sm text-gray-600 mt-10">
        Note: Spoko.help is not a medical or therapeutic service. If you’re
        dealing with trauma, anxiety, or mental health issues, consider reaching
        out to a licensed professional trained in EMDR or other evidence-based
        therapies.
      </p>
    </main>
  );
}
