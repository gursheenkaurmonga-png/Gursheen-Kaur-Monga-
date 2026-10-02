import React, { useState } from 'react';
import { WebsiteConfig, LoveReason } from '../config';
import {
  X,
  Save,
  RotateCcw,
  Copy,
  Check,
  Code,
  BookOpen,
  Heart,
  Sliders,
  Sparkles,
  Share2,
  Download,
  Send,
  Image,
  Music,
  Plus,
  Trash2,
  Upload,
  AlertCircle,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { readFileAsDataUrl, cleanImageUrl, validateMediaUrl } from '../utils/urlHelper';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WebsiteConfig;
  onSaveConfig: (newConfig: WebsiteConfig) => void;
  onResetConfig: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetConfig,
}) => {
  const [formData, setFormData] = useState<WebsiteConfig>(config);
  const [activeTab, setActiveTab] = useState<'share' | 'quick' | 'reasons' | 'chapters' | 'media' | 'letter' | 'download' | 'code'>('share');
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  if (!isOpen) return null;

  const handleHeroPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadLoading(true);
      const dataUrl = await readFileAsDataUrl(file);
      setFormData((prev) => ({ ...prev, heroPhotoUrl: dataUrl }));
      romanticAudio.playPop();
    } catch (err) {
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleChapterPhotoUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadLoading(true);
      const dataUrl = await readFileAsDataUrl(file);
      setFormData((prev) => {
        const nextTimeline = [...prev.timeline];
        nextTimeline[index] = { ...nextTimeline[index], photoUrl: dataUrl };
        return { ...prev, timeline: nextTimeline };
      });
      romanticAudio.playPop();
    } catch (err) {
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handlePolaroidUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadLoading(true);
      const dataUrl = await readFileAsDataUrl(file);
      setFormData((prev) => {
        const nextPolaroids = [...prev.polaroids];
        nextPolaroids[index] = { ...nextPolaroids[index], photoUrl: dataUrl };
        return { ...prev, polaroids: nextPolaroids };
      });
      romanticAudio.playPop();
    } catch (err) {
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSongUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadLoading(true);
      const dataUrl = await readFileAsDataUrl(file);
      setFormData((prev) => ({ ...prev, customSongUrl: dataUrl }));
      romanticAudio.playPop();
    } catch (err) {
      console.error(err);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSave = () => {
    romanticAudio.playChime();
    onSaveConfig(formData);
    onClose();
  };

  const generateShareUrl = () => {
    try {
      const serialized = btoa(unescape(encodeURIComponent(JSON.stringify(formData))));
      const baseUrl = window.location.origin + window.location.pathname;
      return `${baseUrl}?gift=${serialized}`;
    } catch {
      return window.location.href;
    }
  };

  const handleCopyShareLink = () => {
    const url = generateShareUrl();
    navigator.clipboard.writeText(url);
    setLinkCopied(true);
    romanticAudio.playPop();
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const handleCopyCode = () => {
    const codeSnippet = `// Paste this directly into /src/config.ts to permanently save your changes!
export const INITIAL_CONFIG = ${JSON.stringify(formData, null, 2)};
`;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    romanticAudio.playPop();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddReason = () => {
    const nextId = formData.reasons.length > 0 ? Math.max(...formData.reasons.map((r) => r.id)) + 1 : 1;
    const newReason: LoveReason = {
      id: nextId,
      note: "Another sweet reason I adore you...",
      category: "sweet",
    };
    setFormData({
      ...formData,
      reasons: [...formData.reasons, newReason],
    });
  };

  const handleDeleteReason = (id: number) => {
    setFormData({
      ...formData,
      reasons: formData.reasons.filter((r) => r.id !== id),
    });
  };

  const shareUrl = generateShareUrl();
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Happy 3 Years & Happy Boyfriend's Day, ${formData.boyfriendName}! 💖 I made something special for you: ${shareUrl}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-rose-100">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900">
                Customize & Send Your Anniversary Gift
              </h3>
              <p className="text-xs text-stone-500">
                Easily change names, photos, music, the 36 love notes, and dates
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 flex gap-2 overflow-x-auto border-b border-stone-100 bg-[#FFFDF9] text-xs font-semibold scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('share')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'share'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Send to Partner</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'quick'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Names & Date</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('reasons')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reasons'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>36 Reasons Jar ({formData.reasons.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'chapters'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Chapters of Us ({formData.timeline.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'media'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Photos & Song</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('letter')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'letter'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Love Letter</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('download')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'download'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Guide</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`pb-3 px-2 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: SEND TO PARTNER DIRECTLY */}
          {activeTab === 'share' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-5 text-center">
                <span className="text-3xl block mb-2">💌</span>
                <h4 className="font-serif-display text-xl font-bold text-stone-900 mb-1">
                  Send This Website Directly to {formData.boyfriendName}!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
                  Your customized anniversary website is hosted live online! When your boyfriend opens this link on his phone or laptop, all your personalized notes, dates, and love letter will be loaded automatically with music and floating hearts.
                </p>
              </div>

              {/* Shareable Link Box */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-stone-700">
                  Your Personalized Shareable Link:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 px-3 py-2 text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl text-stone-600 select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopyShareLink}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
                {linkCopied && (
                  <p className="text-xs text-rose-600 font-medium">
                    ✓ Link copied to clipboard! Paste it into WhatsApp, iMessage, or Instagram to surprise him.
                  </p>
                )}
              </div>

              {/* Quick Messaging Actions */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: QUICK EDIT NAMES & DATES */}
          {activeTab === 'quick' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Boyfriend's Name / Nickname
                  </label>
                  <input
                    type="text"
                    value={formData.boyfriendName}
                    onChange={(e) =>
                      setFormData({ ...formData, boyfriendName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name / Signature
                  </label>
                  <input
                    type="text"
                    value={formData.yourName}
                    onChange={(e) =>
                      setFormData({ ...formData, yourName: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Anniversary Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.anniversaryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, anniversaryDate: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Anniversary Years
                  </label>
                  <input
                    type="number"
                    value={formData.anniversaryYears}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        anniversaryYears: parseInt(e.target.value) || 3,
                      })
                    }
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) =>
                    setFormData({ ...formData, heroHeadline: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hero Love Message
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubheadline}
                  onChange={(e) =>
                    setFormData({ ...formData, heroSubheadline: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                />
              </div>
            </div>
          )}

          {/* TAB 3: EDIT 36 REASONS WHY I LOVE YOU */}
          {activeTab === 'reasons' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm">
                    {formData.jarTitle}
                  </h4>
                  <p className="text-xs text-stone-500">
                    Currently has {formData.reasons.length} love notes (one for each of the 36 months of 3 years)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAddReason}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Note</span>
                </button>
              </div>

              {/* Reasons List */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {formData.reasons.map((reason, idx) => (
                  <div
                    key={reason.id}
                    className="p-3 bg-stone-50/80 rounded-xl border border-stone-200/80 flex items-start gap-2.5"
                  >
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>

                    <div className="flex-1 space-y-1.5">
                      <textarea
                        rows={2}
                        value={reason.note}
                        onChange={(e) => {
                          const updated = [...formData.reasons];
                          updated[idx] = { ...updated[idx], note: e.target.value };
                          setFormData({ ...formData, reasons: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg focus:outline-rose-500 bg-white"
                      />

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-stone-400 font-semibold uppercase">Category:</span>
                        <select
                          value={reason.category}
                          onChange={(e) => {
                            const updated = [...formData.reasons];
                            updated[idx] = {
                              ...updated[idx],
                              category: e.target.value as "sweet" | "funny" | "romantic" | "cozy",
                            };
                            setFormData({ ...formData, reasons: updated });
                          }}
                          className="text-[11px] px-2 py-0.5 rounded border border-stone-200 bg-white text-stone-700 capitalize"
                        >
                          <option value="sweet">Sweet</option>
                          <option value="romantic">Romantic</option>
                          <option value="funny">Funny</option>
                          <option value="cozy">Cozy</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteReason(reason.id)}
                      className="p-1.5 text-stone-300 hover:text-rose-600 transition-colors"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3.5: EDIT CHAPTERS OF US (TIMELINE MILESTONES & PHOTOS) */}
          {activeTab === 'chapters' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm">
                    {formData.timelineTitle}
                  </h4>
                  <p className="text-xs text-stone-500">
                    Edit photos, titles, and stories for all 3 chapters of your relationship
                  </p>
                </div>
              </div>

              {/* Chapters List */}
              <div className="space-y-6">
                {formData.timeline.map((milestone, idx) => (
                  <div
                    key={milestone.id}
                    className="p-4 bg-stone-50/80 rounded-2xl border border-stone-200/80 space-y-4"
                  >
                    {/* Chapter Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                          Chapter {idx + 1} · {milestone.yearLabel}
                        </span>
                      </div>

                      {/* Direct Upload Button for this Chapter */}
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-200 hover:border-rose-300 text-stone-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors">
                        <Upload className="w-3.5 h-3.5 text-rose-500" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleChapterPhotoUpload(idx, e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Chapter Photo Preview & URL input */}
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-14 rounded-xl overflow-hidden bg-rose-100 border border-stone-200 shrink-0">
                        <img
                          src={cleanImageUrl(milestone.photoUrl)}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                          Chapter Photo Link or Uploaded File:
                        </label>
                        <input
                          type="text"
                          value={milestone.photoUrl}
                          onChange={(e) => {
                            const updated = [...formData.timeline];
                            updated[idx] = { ...updated[idx], photoUrl: e.target.value };
                            setFormData({ ...formData, timeline: updated });
                          }}
                          className="w-full px-2.5 py-1 text-xs font-mono border border-stone-200 rounded-lg bg-white focus:outline-rose-500"
                          placeholder="Image URL or upload from device"
                        />
                      </div>
                    </div>

                    {/* Chapter Metadata: Year Label & Date/Theme */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Year Header Label:
                        </label>
                        <input
                          type="text"
                          value={milestone.yearLabel}
                          onChange={(e) => {
                            const updated = [...formData.timeline];
                            updated[idx] = { ...updated[idx], yearLabel: e.target.value };
                            setFormData({ ...formData, timeline: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg bg-white focus:outline-rose-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                          Date / Milestone Subtitle:
                        </label>
                        <input
                          type="text"
                          value={milestone.date}
                          onChange={(e) => {
                            const updated = [...formData.timeline];
                            updated[idx] = { ...updated[idx], date: e.target.value };
                            setFormData({ ...formData, timeline: updated });
                          }}
                          className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg bg-white focus:outline-rose-500"
                        />
                      </div>
                    </div>

                    {/* Chapter Title */}
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Chapter Title:
                      </label>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => {
                          const updated = [...formData.timeline];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          setFormData({ ...formData, timeline: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs font-semibold border border-stone-200 rounded-lg bg-white focus:outline-rose-500"
                      />
                    </div>

                    {/* Story / Description */}
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Story / Memory Paragraph:
                      </label>
                      <textarea
                        rows={3}
                        value={milestone.description}
                        onChange={(e) => {
                          const updated = [...formData.timeline];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setFormData({ ...formData, timeline: updated });
                        }}
                        className="w-full px-2.5 py-1.5 text-xs border border-stone-200 rounded-lg bg-white focus:outline-rose-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PHOTOS & SONG */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              {/* Song Section */}
              <div className="p-4 bg-rose-50/70 border border-rose-200/80 rounded-2xl space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-900 font-semibold text-sm">
                    <Music className="w-4 h-4 text-rose-500" />
                    <span>Background Music / Custom Song</span>
                  </div>

                  {/* Device Audio Upload Button */}
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Song (.mp3)</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleSongUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  By default, the website loops 3 soothing romantic instrumental themes (Golden Hour Piano, Music Box Keepsake, Starlit Love). If you have your own song, upload the MP3 from your phone/computer or paste a direct audio link below:
                </p>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Custom Song URL or Uploaded Audio:
                  </label>
                  <input
                    type="text"
                    placeholder="Paste a direct .mp3 link or upload your song file"
                    value={formData.customSongUrl || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, customSongUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs font-mono border border-stone-200 rounded-xl focus:outline-rose-500 bg-white"
                  />

                  {/* YouTube or Spotify Warning Alert */}
                  {formData.customSongUrl && validateMediaUrl(formData.customSongUrl, 'audio').warning && (
                    <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-xs text-amber-800">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p>{validateMediaUrl(formData.customSongUrl, 'audio').warning}</p>
                    </div>
                  )}

                  {formData.customSongUrl && !validateMediaUrl(formData.customSongUrl, 'audio').warning && (
                    <p className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Custom audio source is active!</span>
                    </p>
                  )}

                  <span className="text-[11px] text-stone-400 mt-1 block">
                    Tip: If left blank, the website plays the soft relaxing romantic piano melody.
                  </span>
                </div>
              </div>

              {/* Photos Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                    <Image className="w-4 h-4 text-rose-500" />
                    <span>Couple Photos (Hero & Polaroids)</span>
                  </div>
                  <span className="text-[11px] text-stone-400">
                    Upload from device or paste image links
                  </span>
                </div>

                {/* Hero Photo with Preview & Upload */}
                <div className="p-3.5 bg-stone-50/80 rounded-2xl border border-stone-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-800">
                      Hero Section Main Couple Photo:
                    </label>

                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-200 hover:border-rose-300 text-stone-700 rounded-lg text-xs font-semibold shadow-2xs transition-colors">
                      <Upload className="w-3.5 h-3.5 text-rose-500" />
                      <span>Choose From Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-rose-100 border border-stone-200 shrink-0">
                      <img
                        src={cleanImageUrl(formData.heroPhotoUrl)}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <input
                        type="text"
                        value={formData.heroPhotoUrl}
                        onChange={(e) =>
                          setFormData({ ...formData, heroPhotoUrl: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 text-xs font-mono border border-stone-200 rounded-lg bg-white focus:outline-rose-500"
                        placeholder="Image URL or upload from device"
                      />
                      <span className="text-[10px] text-stone-400 mt-1 block">
                        Auto-converts Google Drive, Dropbox, and Imgur links to direct images.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chapters of Us Photos List */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-stone-800">
                    The Chapters of Us Story Photos (3 Photos):
                  </label>

                  {formData.timeline.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-stone-50/80 rounded-xl border border-stone-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                        <span>Chapter #{idx + 1}: {item.title}</span>

                        <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-stone-200 hover:border-rose-300 text-stone-600 rounded text-[11px] font-medium shadow-2xs transition-colors">
                          <Upload className="w-3 h-3 text-rose-500" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChapterPhotoUpload(idx, e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-12 h-10 rounded-lg overflow-hidden bg-rose-100 border border-stone-200 shrink-0">
                          <img
                            src={cleanImageUrl(item.photoUrl)}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>

                        <input
                          type="text"
                          value={item.photoUrl}
                          onChange={(e) => {
                            const updated = [...formData.timeline];
                            updated[idx] = { ...updated[idx], photoUrl: e.target.value };
                            setFormData({ ...formData, timeline: updated });
                          }}
                          className="flex-1 px-2.5 py-1.5 text-xs font-mono border border-stone-200 rounded-lg bg-white focus:outline-rose-500"
                          placeholder="Image URL or upload file"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Polaroid Photos List */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-stone-800">
                    Polaroid Memory Lane Photos (4 Photos):
                  </label>

                  {formData.polaroids.map((p, idx) => (
                    <div key={p.id} className="p-3 bg-stone-50/80 rounded-xl border border-stone-200/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                        <span>Polaroid #{idx + 1}: {p.caption}</span>

                        <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-stone-200 hover:border-rose-300 text-stone-600 rounded text-[11px] font-medium shadow-2xs transition-colors">
                          <Upload className="w-3 h-3 text-rose-500" />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePolaroidUpload(idx, e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-rose-100 border border-stone-200 shrink-0">
                          <img
                            src={cleanImageUrl(p.photoUrl)}
                            alt={p.caption}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>

                        <input
                          type="text"
                          value={p.photoUrl}
                          onChange={(e) => {
                            const updated = [...formData.polaroids];
                            updated[idx] = { ...updated[idx], photoUrl: e.target.value };
                            setFormData({ ...formData, polaroids: updated });
                          }}
                          className="flex-1 px-2.5 py-1.5 text-xs font-mono border border-stone-200 rounded-lg bg-white focus:outline-rose-500"
                          placeholder="Image URL or upload file"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Why links don't work help guide */}
                <div className="p-3.5 bg-stone-100/70 border border-stone-200 rounded-xl text-xs text-stone-600 space-y-1">
                  <strong className="text-stone-900 block font-semibold">
                    💡 Why some image and song links don't work:
                  </strong>
                  <p>
                    • <strong>Google Drive:</strong> Ensure the file's sharing permission is set to <em>"Anyone with the link can view"</em>. Our app automatically converts it to a direct loadable image!
                  </p>
                  <p>
                    • <strong>YouTube & Spotify:</strong> These are streaming web apps, not audio files. Use the <em>"Upload Song (.mp3)"</em> button above to upload your song file directly from your phone/computer.
                  </p>
                  <p>
                    • <strong>Direct Device Upload:</strong> The fastest and most reliable option is clicking <em>"Choose From Device"</em> or <em>"Upload"</em> to pick any picture or song right from your gallery.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LOVE LETTER */}
          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Letter Greeting
                </label>
                <input
                  type="text"
                  value={formData.letterGreeting}
                  onChange={(e) =>
                    setFormData({ ...formData, letterGreeting: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                />
              </div>

              {formData.letterBody.map((paragraph, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Paragraph {idx + 1}
                  </label>
                  <textarea
                    rows={3}
                    value={paragraph}
                    onChange={(e) => {
                      const newBody = [...formData.letterBody];
                      newBody[idx] = e.target.value;
                      setFormData({ ...formData, letterBody: newBody });
                    }}
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                  />
                </div>
              ))}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Letter Sign-Off
                  </label>
                  <input
                    type="text"
                    value={formData.letterClosing}
                    onChange={(e) =>
                      setFormData({ ...formData, letterClosing: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Signature
                  </label>
                  <input
                    type="text"
                    value={formData.letterSignature}
                    onChange={(e) =>
                      setFormData({ ...formData, letterSignature: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm border border-stone-200 rounded-xl focus:outline-rose-500 bg-stone-50/50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: HOW TO DOWNLOAD & HOST */}
          {activeTab === 'download' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
                <h4 className="font-serif-display font-semibold text-rose-950 text-base mb-1">
                  How to Download & Run or Host Independently
                </h4>
                <p className="text-xs text-rose-800">
                  Follow these 3 simple steps if you want to run this website on your own laptop or host it on your own custom domain.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-stone-200 bg-white">
                  <h5 className="font-semibold text-stone-900 mb-1 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    Download the Code from AI Studio
                  </h5>
                  <p className="text-xs text-stone-600">
                    In the Google AI Studio top bar or menu, click <strong>Export / Download</strong> (or push to a GitHub repository). This gives you the full React + Vite + Tailwind source code.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white">
                  <h5 className="font-semibold text-stone-900 mb-1 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    Edit Photos & Text in <code>src/config.ts</code>
                  </h5>
                  <p className="text-xs text-stone-600 mb-2">
                    Open <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-rose-600">src/config.ts</code> in VS Code or any text editor. You can replace the text, dates, or photo files in <code className="font-mono">src/assets/images</code> with your real photos together!
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 bg-white">
                  <h5 className="font-semibold text-stone-900 mb-1 text-xs flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    Host for Free on Vercel or Netlify (Takes 2 minutes)
                  </h5>
                  <p className="text-xs text-stone-600">
                    Connect your GitHub repo to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-rose-600 underline font-medium">Vercel.com</a> or <a href="https://netlify.com" target="_blank" rel="noreferrer" className="text-rose-600 underline font-medium">Netlify.com</a> (both 100% free). You can even attach a cute custom domain like <code className="font-mono">preetiii-and-me.love</code>!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: EXPORT CODE */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700">
                  Ready-to-Paste Code for <code>src/config.ts</code>:
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Config</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-stone-900 text-stone-200 rounded-xl text-xs font-mono overflow-x-auto max-h-72">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-stone-200 bg-[#FFFDF9] flex items-center justify-between">
          <button
            type="button"
            onClick={onResetConfig}
            className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-rose-600 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 rounded-full shadow-xs transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply Live</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
