"use client";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
export default function InquiryForm({
  deliveryConfigured = false,
}: {
  deliveryConfigured?: boolean;
}) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [interest, setInterest] = useState("General inquiry");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const v = q.get("product") || q.get("service");
    if (v) setInterest(v);
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const form = e.currentTarget;
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      setStatus(data.message);
      if (res.ok) form.reset();
    } catch {
      setStatus(
        "Your inquiry could not be sent. Please email info@kbenggepc.in or contact us on WhatsApp.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <h2>Tell us what you need.</h2>
      <p>Share a few details about your project or equipment requirements.</p>
      <div className="form-grid">
        <label>
          Your name *
          <input name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          Company
          <input name="company" autoComplete="organization" maxLength={180} />
        </label>
        <label>
          Email address *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label>
          Phone number
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
        </label>
        <label className="full-width">
          I’m interested in
          <select
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            {[
              "General inquiry",
              "Engineering",
              "Procurement",
              "Fabrication",
              ...products.map((p) => p.name),
            ].map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </label>
        <label className="full-width">
          Your requirements *
          <textarea
            name="message"
            required
            minLength={15}
            maxLength={5000}
            placeholder="Application, equipment, specifications or project scope…"
          />
        </label>
      </div>
      <button className="button" disabled={busy} type="submit">
        {busy ? "Sending…" : "Send Inquiry"}
        <ArrowRight size={17} />
      </button>
      {!deliveryConfigured && (
        <p className="form-note">
          Email delivery is being configured. You can reach us directly by
          email, phone or WhatsApp.
        </p>
      )}
      <div role="status" aria-live="polite">
        {status && <p className="form-status">{status}</p>}
      </div>
    </form>
  );
}
