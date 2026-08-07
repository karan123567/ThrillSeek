"use client";

import { useState } from "react";
import { PlusCircle, Loader2, Trash2, CalendarPlus } from "lucide-react";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { doc, setDoc, serverTimestamp, getFirestore } from "firebase/firestore";

type ScheduleSlot = { date: string; time: string; capacity: number; booked: number };

export default function ListingsPage() {
  const { showToast } = useToast();
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "", category: "trekking", difficulty: "moderate", location: "",
    duration: "", groupSize: 10, price: 0, currency: "INR",
    description: "", inclusions: "", exclusions: "", requirements: "",
    cancellationPolicy: "moderate", status: "draft"
  });

  const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
  const [slotDraft, setSlotDraft] = useState({ date: "", time: "" });

  const updateField = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const addSlot = () => {
    if (!slotDraft.date || !slotDraft.time) {
      showToast("Pick a date and time before adding the slot.", "error");
      return;
    }
    setSchedule(prev => [
      ...prev,
      { date: slotDraft.date, time: slotDraft.time, capacity: Number(form.groupSize) || 1, booked: 0 }
    ]);
    setSlotDraft({ date: "", time: "" });
  };

  const removeSlot = (index: number) => {
    setSchedule(prev => prev.filter((_, i) => i !== index));
  };

  const updateSlotCapacity = (index: number, capacity: number) => {
    setSchedule(prev => prev.map((s, i) => (i === index ? { ...s, capacity } : s)));
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.location || form.price <= 0) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    if (schedule.length === 0) {
      showToast("Add at least one date/time slot — customers need something to book.", "error");
      return;
    }
    if (!user?.uid) {
      showToast("You must be signed in as a provider to create a listing.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const db = getFirestore();
      const listId = `adv_${Date.now()}`;

      await setDoc(doc(db, "provider_listings", listId), {
        ...form,
        providerId: user.uid,
        price: Number(form.price),
        groupSize: Number(form.groupSize),
        gallery: [],
        schedule,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      showToast("Listing created successfully!", "success");
      setForm({ name: "", category: "trekking", difficulty: "moderate", location: "", duration: "", groupSize: 10, price: 0, currency: "INR", description: "", inclusions: "", exclusions: "", requirements: "", cancellationPolicy: "moderate", status: "draft" });
      setSchedule([]);
      setIsCreating(false);
    } catch (error) {
      console.error(error);
      showToast("Failed to create listing.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-th-text tracking-tight">Adventure Listings</h1>
          <p className="text-sm text-th-text-muted mt-1">Manage your experiences</p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary px-4 py-2.5 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add New
          </button>
        )}
      </div>

      {isCreating && (
        <form onSubmit={handleCreateListing} className="bg-th-card border border-th-border-subtle rounded-2xl p-6 space-y-6">
          <h3 className="text-lg font-medium text-th-text border-b border-th-border pb-4">Create New Adventure</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Adventure Name *</label>
              <input type="text" required value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Everest Base Camp Trek" className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Location *</label>
              <input type="text" required value={form.location} onChange={(e) => updateField('location', e.target.value)} placeholder="Nepal" className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Category</label>
              <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50">
                <option value="trekking">Trekking</option>
                <option value="water">Water Sports</option>
                <option value="aerial">Aerial</option>
                <option value="winter">Winter Sports</option>
                <option value="wildlife">Wildlife</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => updateField('difficulty', e.target.value)} className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50">
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="hard">Hard</option>
                <option value="extreme">Extreme</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Cancellation Policy</label>
              <select value={form.cancellationPolicy} onChange={(e) => updateField('cancellationPolicy', e.target.value)} className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50">
                <option value="flexible">Flexible</option>
                <option value="moderate">Moderate</option>
                <option value="strict">Strict</option>
                <option value="super-strict">Super Strict</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Price (₹) *</label>
              <input type="number" required min="0" value={form.price} onChange={(e) => updateField('price', e.target.value)} className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Duration</label>
              <input type="text" value={form.duration} onChange={(e) => updateField('duration', e.target.value)} placeholder="14 days" className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50" />
            </div>
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Max Group Size</label>
              <input type="number" min="1" value={form.groupSize} onChange={(e) => updateField('groupSize', e.target.value)} className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Full description..." className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50 resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Inclusions (comma separated)</label>
              <textarea rows={3} value={form.inclusions} onChange={(e) => updateField('inclusions', e.target.value)} placeholder="Meals, equipment, transport..." className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50 resize-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Exclusions (comma separated)</label>
              <textarea rows={3} value={form.exclusions} onChange={(e) => updateField('exclusions', e.target.value)} placeholder="Personal expenses, insurance..." className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50 resize-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-th-text-muted mb-1.5 block">Requirements</label>
            <textarea rows={2} value={form.requirements} onChange={(e) => updateField('requirements', e.target.value)} placeholder="Physical fitness, age 18+..." className="w-full bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500/50 resize-none" />
          </div>

          {/* Schedule / Availability editor — this is the new piece */}
          <div className="border-t border-th-border pt-6">
            <div className="flex items-center gap-2 mb-3">
              <CalendarPlus className="w-4 h-4 text-brand-500" />
              <label className="text-sm font-medium text-th-text">Available Dates & Slots *</label>
            </div>
            <p className="text-xs text-th-text-muted mb-4">Customers can only book dates you add here. Capacity defaults to Max Group Size — adjust per slot if needed.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <input type="date" value={slotDraft.date} onChange={(e) => setSlotDraft(prev => ({ ...prev, date: e.target.value }))} className="bg-th-input border border-th-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500/50" />
              <input type="time" value={slotDraft.time} onChange={(e) => setSlotDraft(prev => ({ ...prev, time: e.target.value }))} className="bg-th-input border border-th-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500/50" />
              <button type="button" onClick={addSlot} className="px-4 py-2.5 rounded-xl text-sm font-medium border border-th-border hover:bg-th-input transition-colors">
                Add Slot
              </button>
            </div>

            {schedule.length > 0 && (
              <div className="space-y-2">
                {schedule.map((slot, i) => (
                  <div key={i} className="flex items-center gap-3 bg-th-input rounded-xl px-4 py-2.5">
                    <span className="text-sm text-th-text flex-1">{slot.date} · {slot.time}</span>
                    <label className="text-xs text-th-text-muted">Capacity</label>
                    <input
                      type="number"
                      min="1"
                      value={slot.capacity}
                      onChange={(e) => updateSlotCapacity(i, Number(e.target.value))}
                      className="w-16 bg-th-card border border-th-border rounded-lg px-2 py-1 text-sm"
                    />
                    <button type="button" onClick={() => removeSlot(i)} className="text-th-text-muted hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-th-border">
            <button type="button" onClick={() => setIsCreating(false)} className="px-6 py-2.5 rounded-xl text-sm font-medium text-th-text-sub border border-th-border hover:bg-th-input transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="btn-primary px-6 py-2.5 rounded-xl text-sm font-medium text-white inline-flex items-center gap-2 disabled:opacity-60">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save as Draft"}
            </button>
          </div>
        </form>
      )}

      {!isCreating && (
         <div className="bg-th-card border border-th-border-subtle rounded-2xl p-12 text-center text-th-text-muted">
            <p>No listings yet.</p>
         </div>
      )}
    </div>
  );
}