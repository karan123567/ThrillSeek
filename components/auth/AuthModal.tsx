"use client";

import { useState, useRef, useCallback } from "react";
import {
  X,
  Phone,
  Mail,
  Loader2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  auth,
  googleProvider,
  facebookProvider,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import { useToast } from "@/components/Toast";
import ModalShell from "@/components/ModalShell";
import OtpInput from "./OtpInput";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "phone" | "google" | "facebook";
}

type Tab = "phone" | "google" | "facebook";
type PhoneStep = "number" | "otp" | "success";

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = "phone",
}: AuthModalProps) {
  const { user } = useAuth();
  const { showToast } = useToast();

  /* ---- state ---- */
  const [tab, setTab] = useState<Tab>(initialTab);
  const [phone, setPhone] = useState("");
  const [phoneStep, setPhoneStep] = useState<PhoneStep>("number");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  /* ---- already logged in ---- */
  if (user && isOpen) {
    onClose();
    return null;
  }

  /* ---- reset on close ---- */
  const handleClose = () => {
    setPhoneStep("number");
    setPhone("");
    setConfirmationResult(null);
    setLoading(false);
    setOtpLoading(false);
    setResendTimer(0);
    onClose();
  };

  /* ---- resend timer ---- */
  const startResendTimer = useCallback(() => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  /* ==============================
     GOOGLE LOGIN
     ============================== */
  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      showToast("Welcome to ThrillSeek!", "success");
      handleClose();
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "auth/popup-closed-by-user") {
        showToast("Sign-in popup was closed", "info");
      } else {
        showToast("Failed to sign in with Google", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     FACEBOOK LOGIN
     ============================== */
  const handleFacebook = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, facebookProvider);
      showToast("Welcome to ThrillSeek!", "success");
      handleClose();
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "auth/popup-closed-by-user") {
        showToast("Sign-in popup was closed", "info");
      } else {
        showToast("Failed to sign in with Facebook", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     PHONE LOGIN
     ============================== */

  /* Step 1: Send OTP */
  const handleSendOtp = async () => {
    if (phone.length < 10) {
      showToast("Enter a valid phone number", "error");
      return;
    }

    if (!recaptchaContainerRef.current) return;

    setLoading(true);
    try {
      const formatted = phone.startsWith("+") ? phone : `+${phone}`;

      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {},
      });

      const result = await signInWithPhoneNumber(
        auth,
        formatted,
        recaptchaVerifier
      );

      setConfirmationResult(result);
      setPhoneStep("otp");
      startResendTimer();
      showToast("OTP sent to your phone", "success");
    } catch (err: unknown) {
      const error = err as { code?: string };
      switch (error.code) {
        case "auth/invalid-phone-number":
          showToast("Invalid phone number format", "error");
          break;
        case "auth/too-many-requests":
          showToast("Too many attempts. Try again later.", "error");
          break;
        default:
          showToast("Failed to send OTP. Try again.", "error");
      }
      // Clear recaptcha for retry
      if (recaptchaContainerRef.current) {
        recaptchaContainerRef.current.innerHTML = "";
      }
    } finally {
      setLoading(false);
    }
  };

  /* Step 2: Verify OTP */
  const handleVerifyOtp = async (otp: string) => {
    if (!confirmationResult) return;

    setOtpLoading(true);
    try {
      await confirmationResult.confirm(otp);
      setPhoneStep("success");
      showToast("Phone number verified! Welcome!", "success");
      setTimeout(() => handleClose(), 1500);
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "auth/invalid-verification-code") {
        showToast("Invalid OTP. Please try again.", "error");
      } else {
        showToast("Verification failed. Try again.", "error");
      }
    } finally {
      setOtpLoading(false);
    }
  };

  /* Step 3: Resend OTP */
  const handleResend = async () => {
    if (resendTimer > 0 || !recaptchaContainerRef.current) return;

    setLoading(true);
    try {
      const formatted = phone.startsWith("+") ? phone : `+${phone}`;
      const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {},
      });
      const result = await signInWithPhoneNumber(auth, formatted, recaptchaVerifier);
      setConfirmationResult(result);
      startResendTimer();
      showToast("New OTP sent", "success");
    } catch {
      showToast("Failed to resend OTP", "error");
      if (recaptchaContainerRef.current) {
        recaptchaContainerRef.current.innerHTML = "";
      }
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     TABS CONFIG
     ============================== */
  const tabs: { key: Tab; label: string; icon: typeof Phone }[] = [
    { key: "phone", label: "Phone", icon: Phone },
    { key: "google", label: "Google", icon: Mail },
    { key: "facebook", label: "Facebook", icon: Mail },
  ];

  if (!isOpen) return null;

  return (
    <ModalShell onClose={handleClose} size="md">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-medium text-th-text">
              {phoneStep === "success"
                ? "Verified!"
                : "Sign in to ThrillSeek"}
            </h3>
            <p className="text-sm text-th-text-muted mt-1">
              {phoneStep === "success"
                ? "Your phone number has been verified"
                : "Choose your preferred sign-in method"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-th-input flex items-center justify-center hover:bg-th-card-hover transition-all border border-th-border"
          >
            <X className="w-4 h-4 text-th-text-sub" />
          </button>
        </div>

        {/* Success State */}
        {phoneStep === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-th-text font-medium">Welcome aboard!</p>
            <p className="text-sm text-th-text-muted mt-1">
              Redirecting you...
            </p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-th-surface-alt mb-6">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    tab === t.key
                      ? "bg-th-surface text-th-text shadow-sm"
                      : "text-th-text-muted hover:text-th-text-sub"
                  }`}
                >
                  <t.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Phone Auth */}
            {tab === "phone" && (
              <div className="space-y-5">
                {phoneStep === "number" && (
                  <>
                    <div>
                      <label className="text-xs font-medium text-th-text-muted mb-1.5 block">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <select className="w-24 bg-th-input border border-th-border rounded-xl px-3 py-3 text-sm text-th-text appearance-none cursor-pointer focus:outline-none focus:border-brand-500/50">
                          <option value="+91" className="bg-th-surface">🇮🇳 +91</option>
                          <option value="+1" className="bg-th-surface">🇺🇸 +1</option>
                          <option value="+44" className="bg-th-surface">🇬🇧 +44</option>
                          <option value="+61" className="bg-th-surface">🇦🇺 +61</option>
                          <option value="+81" className="bg-th-surface">🇯🇵 +81</option>
                          <option value="+49" className="bg-th-surface">🇩🇪 +49</option>
                          <option value="+33" className="bg-th-surface">🇫🇷 +33</option>
                          <option value="+971" className="bg-th-surface">🇦🇪 +971</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value.replace(/\D/g, ""))
                          }
                          className="flex-1 bg-th-input border border-th-border rounded-xl px-4 py-3 text-sm text-th-text placeholder-th-text-faint focus:outline-none focus:border-brand-500/50 transition-colors"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendOtp();
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleSendOtp}
                      disabled={loading || phone.length < 10}
                      className="btn-primary w-full py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Send OTP"
                      )}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-th-text-muted">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                      Your number is secure and never shared
                    </div>
                  </>
                )}

                {phoneStep === "otp" && (
                  <>
                    <div className="text-center mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-7 h-7 text-brand-400" />
                      </div>
                      <p className="text-sm text-th-text">
                        Enter the 6-digit code sent to
                      </p>
                      <p className="text-sm font-medium text-th-text mt-1">
                        {phone.startsWith("+") ? phone : `+91 ${phone}`}
                      </p>
                    </div>

                    <OtpInput
                      length={6}
                      onComplete={handleVerifyOtp}
                      disabled={otpLoading}
                    />

                    <div className="flex items-center justify-center gap-2 mt-4">
                      <button
                        onClick={handleResend}
                        disabled={resendTimer > 0 || loading}
                        className="text-sm text-brand-400 hover:text-brand-500 disabled:text-th-text-faint disabled:cursor-not-allowed transition-colors"
                      >
                        {resendTimer > 0
                          ? `Resend in ${resendTimer}s`
                          : "Resend OTP"}
                      </button>
                      <span className="text-th-text-faint">·</span>
                      <button
                        onClick={() => {
                          setPhoneStep("number");
                          setConfirmationResult(null);
                        }}
                        className="text-sm text-th-text-muted hover:text-th-text transition-colors"
                      >
                        Change number
                      </button>
                    </div>

                    {otpLoading && (
                      <div className="flex items-center justify-center gap-2 mt-4 text-sm text-th-text-muted">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Verifying...
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Google Auth */}
            {tab === "google" && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#4285F4]/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-th-text">
                    Continue with Google
                  </p>
                  <p className="text-xs text-th-text-muted mt-1">
                    Sign in using your Google account
                  </p>
                </div>

                <button
                  onClick={handleGoogle}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  style={{ background: "#4285F4" }}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Continue with Google"
                  )}
                </button>
              </div>
            )}

            {/* Facebook Auth */}
            {tab === "facebook" && (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#1877F2]/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-7 h-7" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-th-text">
                    Continue with Facebook
                  </p>
                  <p className="text-xs text-th-text-muted mt-1">
                    Sign in using your Facebook account
                  </p>
                </div>

                <button
                  onClick={handleFacebook}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-medium text-white inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  style={{ background: "#1877F2" }}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Continue with Facebook"
                  )}
                </button>

                {/* ✅ FIXED: Changed `class="note"` to `className="..."` and converted inline styles to Tailwind */}
                <div className="text-[11px] p-3.5 rounded-r-lg rounded-bl-none bg-th-card border border-th-border border-l-[3px] border-l-[#1877F2] text-th-text-muted leading-relaxed">
                  <strong className="text-[#1877F2]">Note:</strong> Facebook Login requires your Facebook App to be in &quot;Development Mode&quot; or approved for &quot;Live&quot;. Make sure you&apos;ve added your app&apos;s App ID and App Secret in the Firebase Console.
                </div>
              </div>
            )}

            {/* Hidden reCAPTCHA container */}
            <div id="recaptcha-container" ref={recaptchaContainerRef} />
          </>
        )}
      </div>
    </ModalShell>
  );
}