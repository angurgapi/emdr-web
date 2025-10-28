import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy | Spoko.help",
  description:
    "This Privacy Policy explains how spoko.help handles your data when you use our website and our free BLS (Bilateral Stimulation) tool",
};
export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm mb-6">Last updated: 27 October 2025</p>
      <p>
        This Privacy Policy explains how <strong>spoko.help</strong> (“we”,
        “our”, or “us”) handles your data when you use our website and BLS
        (Bilateral Stimulation) tool.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. What Information We Collect
      </h2>
      <p>
        Currently, we do not collect personal data. We only store your theme
        preference (light or dark) locally in your browser.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Cookies and Local Storage
      </h2>
      <p>
        No tracking or analytics cookies are used at this time. Only functional
        storage for UI preferences is active.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Future Changes</h2>
      <p>
        When we add authentication or analytics, this policy will be updated
        accordingly.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Contact</h2>
      <p>
        Questions? Email us at{" "}
        <a href="mailto:contact@spoko.help" className="text-blue-600 underline">
          contact@spoko.help
        </a>
      </p>
    </main>
  );
}
