


    "use client";

    import { useEffect, useMemo, useRef, useState } from "react";
    import { useSession, signIn } from "next-auth/react";

    const NICHES = [
    "Fashion & Beauty",
    "Fitness & Health",
    "Food & Cooking",
    "Travel & Lifestyle",
    "Tech & Gaming",
    "Comedy & Entertainment",
    "Education & Finance",
    "Parenting & Family",
    "Other",
    ];

    const PLATFORMS = ["Instagram", "Facebook", "TikTok", "YouTube"];
    const OAUTH_PLATFORMS = ["Instagram", "Facebook", "YouTube"];

    function InstagramIcon() {
    return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
    );
    }
    function FacebookIcon() {
    return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
    </svg>
    );
    }
    function TikTokIcon() {
    return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
    </svg>
    );
    }
    function YouTubeIcon() {
    return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
    );
    }

    const PLATFORM_ICONS: Record<string, React.ReactNode> = {
    Instagram: <InstagramIcon />,
    Facebook: <FacebookIcon />,
    TikTok: <TikTokIcon />,
    YouTube: <YouTubeIcon />,
    };

    type Status = "idle" | "submitting" | "success" | "error";
    type VerifyStatus = "idle" | "verifying" | "verified" | "error";
    type PlatformValues = { handle: string; followers: string; profileUrl: string };

    const DRAFT_KEY = "collabo_form_draft";

    const EMPTY_VALUES: PlatformValues = { handle: "", followers: "", profileUrl: "" };

    function formatFollowers(value: string) {
    const num = Number(value.replace(/,/g, ""));
    if (!value || Number.isNaN(num)) return null;
    return new Intl.NumberFormat("en-US").format(num);
    }

    const fieldConfig: Record<
    string,
    {
    handleLabel: string;
    handlePlaceholder: string;
    showUrl: boolean;
    urlLabel?: string;
    urlPlaceholder?: string;
    followerLabel: string;
    }
    > = {
    Instagram: {
    handleLabel: "Instagram Username",
    handlePlaceholder: "janedoe",
    showUrl: false,
    followerLabel: "Follower count",
    },
    TikTok: {
    handleLabel: "TikTok Username",
    handlePlaceholder: "janedoe",
    showUrl: false,
    followerLabel: "Follower count",
    },
    Facebook: {
    handleLabel: "Facebook Page Name",
    handlePlaceholder: "Jane's Page",
    showUrl: true,
    urlLabel: "Facebook Page URL",
    urlPlaceholder: "https://facebook.com/janespage",
    followerLabel: "Follower count",
    },
    YouTube: {
    handleLabel: "YouTube Channel Name",
    handlePlaceholder: "Jane Doe Vlogs",
    showUrl: true,
    urlLabel: "YouTube Channel URL",
    urlPlaceholder: "https://youtube.com/@janedoe",
    followerLabel: "Subscriber count",
    },
    };

    export default function Page() {
    const { data: session, status: sessionStatus } = useSession();
    const formRef = useRef<HTMLFormElement>(null);
    const verificationAttempted = useRef(false);

    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const [openPlatform, setOpenPlatform] = useState<string | null>("Instagram");
    const [platform, setPlatform] = useState("Instagram");
    const [manualMode, setManualMode] = useState(true);

    const [values, setValues] = useState<Record<string, PlatformValues>>({
    Instagram: { ...EMPTY_VALUES },
    Facebook: { ...EMPTY_VALUES },
    TikTok: { ...EMPTY_VALUES },
    YouTube: { ...EMPTY_VALUES },
    });
    const [screenshots, setScreenshots] = useState<Record<string, File | null>>({
    Instagram: null,
    Facebook: null,
    TikTok: null,
    YouTube: null,
    });
    const [fileErrors, setFileErrors] = useState<Record<string, string>>({});

    const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");
    const [verifyError, setVerifyError] = useState("");
    const [verifiedHandle, setVerifiedHandle] = useState("");
    const [verifiedFollowers, setVerifiedFollowers] = useState("");

    const supportsOAuth = OAUTH_PLATFORMS.includes(platform);
    const isManual = manualMode || !supportsOAuth;

    const currentFollowers = isManual
    ? values[platform]?.followers ?? ""
    : verifiedFollowers;

    const formattedFollowers = useMemo(
    () => formatFollowers(currentFollowers),
    [currentFollowers]
    );

    useEffect(() => {
    setVerifyStatus("idle");
    setVerifyError("");
    setVerifiedHandle("");
    setVerifiedFollowers("");
    verificationAttempted.current = false;
    }, [platform]);

    useEffect(() => {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw || !formRef.current) return;
    try {
    const draft = JSON.parse(raw);
    const form = formRef.current;
    (form.elements.namedItem("name") as HTMLInputElement).value = draft.name ?? "";
    (form.elements.namedItem("phone") as HTMLInputElement).value = draft.phone ?? "";
    (form.elements.namedItem("email") as HTMLInputElement).value = draft.email ?? "";
    (form.elements.namedItem("niche") as HTMLSelectElement).value = draft.niche ?? "";
    (form.elements.namedItem("message") as HTMLTextAreaElement).value = draft.message ?? "";
    if (draft.platform) {
    setPlatform(draft.platform);
    setOpenPlatform(draft.platform);
    }
    } catch {
    }
    }, []);

    useEffect(() => {
    if (sessionStatus !== "authenticated" || !session?.accessToken) return;

    const cameFromVerifyClick = sessionStorage.getItem(DRAFT_KEY) !== null;
    const expectedProvider = platform === "YouTube" ? "google" : "facebook";

    if (!cameFromVerifyClick) return;
    if (session.provider !== expectedProvider) return;
    if (verificationAttempted.current) return;

    verificationAttempted.current = true;

    async function runVerification() {
    setVerifyStatus("verifying");
    setVerifyError("");
    try {
    if (session!.provider === "google") {
    const res = await fetch(
    "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true",
    { headers: { Authorization: `Bearer ${session!.accessToken}` } }
    );
    const data = await res.json();
    const channel = data.items?.[0];
    if (!channel) throw new Error("No YouTube channel found on this Google account.");
    setVerifiedHandle(channel.snippet.title);
    setVerifiedFollowers(channel.statistics.subscriberCount ?? "0");
    setVerifyStatus("verified");
    } else if (session!.provider === "facebook") {
    const pagesRes = await fetch(
    `https://graph.facebook.com/me/accounts?access_token=${session!.accessToken}`
    );
    const pagesData = await pagesRes.json();
    const page = pagesData.data?.[0];
    if (!page) {
    throw new Error(
    "No Facebook Page found for this account. You need to manage at least one Page."
    );
    }
    const detailRes = await fetch(
    `https://graph.facebook.com/${page.id}?fields=name,fan_count,instagram_business_account{username,followers_count}&access_token=${page.access_token}`
    );
    const detail = await detailRes.json();

    if (platform === "Instagram") {
    if (!detail.instagram_business_account) {
    throw new Error(
    "This Facebook Page has no linked Instagram Business account."
    );
    }
    setVerifiedHandle(detail.instagram_business_account.username);
    setVerifiedFollowers(String(detail.instagram_business_account.followers_count ?? 0));
    } else {
    setVerifiedHandle(detail.name);
    setVerifiedFollowers(String(detail.fan_count ?? 0));
    }
    setVerifyStatus("verified");
    }
    } catch (err) {
    setVerifyStatus("error");
    setVerifyError(err instanceof Error ? err.message : "Verification failed.");
    } finally {
    sessionStorage.removeItem(DRAFT_KEY);
    }
    }

    runVerification();
    }, [sessionStatus, session, platform]);

    function togglePanel(p: string) {
    if (openPlatform === p) {
    setOpenPlatform(null);
    } else {
    setOpenPlatform(p);
    setPlatform(p);
    }
    }

    function saveDraftAndSignIn(provider: "google" | "facebook") {
    if (!formRef.current) return;
    const form = formRef.current;
    const draft = {
    name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
    phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value,
    email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
    niche: (form.elements.namedItem("niche") as HTMLSelectElement)?.value,
    message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value,
    platform,
    };
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    signIn(provider, { callbackUrl: window.location.href });
    }

    function switchToManual() {
    setManualMode(true);
    setVerifyStatus("idle");
    setVerifyError("");
    setVerifiedHandle("");
    setVerifiedFollowers("");
    }

    function switchToVerified() {
    setManualMode(false);
    }

    function updateValue(p: string, field: keyof PlatformValues, val: string) {
    setValues((prev) => ({ ...prev, [p]: { ...prev[p], [field]: val } }));
    }

    function handleFileChange(p: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileErrors((prev) => ({ ...prev, [p]: "" }));
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
    setFileErrors((prev) => ({
    ...prev,
    [p]: "File is too large — please keep it under 5MB.",
    }));
    e.target.value = "";
    setScreenshots((prev) => ({ ...prev, [p]: null }));
    return;
    }
    setScreenshots((prev) => ({ ...prev, [p]: file }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Collect every platform that has actual data filled in
    const filledPlatforms = PLATFORMS.filter((p) => {
    const v = values[p];
    const cfg = fieldConfig[p];
    const hasBasics = v.handle && v.followers;
    const hasUrl = !cfg.showUrl || v.profileUrl;
    return hasBasics && hasUrl;
    });

    if (filledPlatforms.length === 0) {
    setErrorMsg("Please fill in at least one platform's details.");
    return;
    }

    const missingScreenshot = filledPlatforms.find((p) => !screenshots[p]);
    if (missingScreenshot) {
    setErrorMsg(`Please upload a screenshot for ${missingScreenshot}.`);
    return;
    }

    setErrorMsg("");
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const platformsPayload = filledPlatforms.map((p) => ({
    platform: p,
    handle: values[p].handle,
    followers: values[p].followers,
    profileUrl: values[p].profileUrl,
    }));
    formData.set("platforms", JSON.stringify(platformsPayload));

    filledPlatforms.forEach((p) => {
    const file = screenshots[p];
    if (file) formData.append(`screenshot_${p}`, file);
    });

    try {
    const res = await fetch("/api/submit", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");
    setStatus("success");
    } catch (err) {
    setStatus("error");
    setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
    }

    const providerForPlatform = platform === "YouTube" ? "google" : "facebook";
    const providerLabel = platform === "YouTube" ? "Google" : "Facebook";

    return (
    <>
    <section className="section pb-3 bg-ink blog-main"  style={{paddingTop:"10rem"}}>
    <div className="container">

    <span 
    className="eyebrow"
    style={{color:"var(--lime)",width:"100%",justifyContent:"center"}}
    >
    The COLLABO Creator Form
    </span>

    <h1 className="mt-3 text-center">
    Join Pakistan's Fastest-Growing Creator Community
    </h1>


    <p 
    className="fs-lead mt-3 text-center"
    style={{
    color:"#c9c6ba",
    maxWidth:"60ch",
    margin:"auto",

    }}
    >
    Apply to become a verified Collabo creator, connect with leading brands, unlock paid collaborations, and grow your influence with opportunities tailored to your niche.
    </p>


    </div>
    </section>
    <div className="py-5" style={{ maxWidth: "800px", margin: "auto" }}>
    <div className="mb-4">
    <h1 className="fw-bold mb-2 text-center">Creator Application</h1>
    <p className="text-muted text-center mb-0 mt-3">
    Tell us a bit about yourself and your audience. If it's a good fit,
    our team will reach out directly.
    </p>
    </div>

    <div className="card shadow-sm">
    <div className="card-body p-4">
    {status === "success" ? (
    <div className="text-center py-4">
    <h2 className="h4 fw-semibold mb-2">You're in! Thanks for applying.</h2>
    <p className="text-muted mb-0">
    We've received your details and a confirmation email is on its way to your inbox.
    </p>
    </div>
    ) : (
    <form ref={formRef} onSubmit={handleSubmit}>
    <div className="row g-3 mb-3">
    <div className="col-md-6">
    <label htmlFor="name" className="form-label fw-semibold">Full name</label>
    <input id="name" name="name" type="text" required placeholder="Jane Doe" className="form-control" />
    </div>
    <div className="col-md-6">
    <label htmlFor="phone" className="form-label fw-semibold">Phone number</label>
    <input id="phone" name="phone" type="tel" required placeholder="+92 300 1234567" className="form-control" />
    </div>
    </div>

    <div className="mb-3">
    <label htmlFor="email" className="form-label fw-semibold">Email address</label>
    <input id="email" name="email" type="email" required placeholder="jane@example.com" className="form-control" />
    </div>

    <div className="mb-3">
    <label className="form-label fw-semibold">Select Platform</label>
    <div className="border rounded overflow-hidden">
    {PLATFORMS.map((p, index) => {
    const isOpen = openPlatform === p;
    const pFields = fieldConfig[p];
    const pSupportsOAuth = OAUTH_PLATFORMS.includes(p);
    const pIsManual = manualMode || !pSupportsOAuth;
    const pValues = values[p];

    return (
    <div key={p} className={index !== PLATFORMS.length - 1 ? "border-bottom" : ""}>
    <button
    type="button"
    onClick={() => togglePanel(p)}
    disabled={verifyStatus === "verifying"}
    className={`w-100 d-flex align-items-center justify-content-between px-3 py-3 border-0 ${isOpen ? "bg-light" : "bg-white"}`}
    >
    <span className="d-flex align-items-center gap-2 fw-semibold">
    {PLATFORM_ICONS[p]}
    {p}
    </span>
    <span style={{ transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
    ▾
    </span>
    </button>

    {isOpen && (
    <div className="px-3 pb-4 pt-1 bg-light">
    {!pIsManual ? (
    <div className="mb-3 p-3 border rounded bg-white">
    {verifyStatus === "verified" ? (
    <div>
    <span className="text-success fw-semibold">✓ Verified</span> — @{verifiedHandle}
    {formattedFollowers && (
    <span className="text-muted"> · {formattedFollowers} followers</span>
    )}
    </div>
    ) : (
    <>
    <button
    type="button"
    onClick={() => saveDraftAndSignIn(providerForPlatform)}
    disabled={verifyStatus === "verifying"}
    className="btn btn-outline-primary"
    >
    {verifyStatus === "verifying" ? "Verifying…" : `Verify with ${providerLabel}`}
    </button>
    <div className="form-text mb-0 mt-2">
    We'll pull your real {p} username and follower count directly — no screenshot needed.
    </div>
    {verifyStatus === "error" && (
    <div className="text-danger small mt-2">{verifyError}</div>
    )}
    </>
    )}
    </div>
    ) : (
    <>
    <div className="row g-3 mb-2">
    <div className={pFields.showUrl ? "col-md-6" : "col-md-4"}>
    <label className="form-label fw-semibold">{pFields.handleLabel}</label>
    <input
    type="text"
    placeholder={pFields.handlePlaceholder}
    value={pValues.handle}
    onChange={(e) => updateValue(p, "handle", e.target.value)}
    className="form-control"
    />
    </div>

    {pFields.showUrl && (
    <div className="col-md-6">
    <label className="form-label fw-semibold">{pFields.urlLabel}</label>
    <input
    type="url"
    placeholder={pFields.urlPlaceholder}
    value={pValues.profileUrl}
    onChange={(e) => updateValue(p, "profileUrl", e.target.value)}
    className="form-control"
    />
    </div>
    )}

    <div className={pFields.showUrl ? "col-md-12" : "col-md-8"}>
    <label className="form-label fw-semibold">{pFields.followerLabel}</label>
    <input
    type="text"
    inputMode="numeric"
    placeholder="24000"
    value={pValues.followers}
    onChange={(e) => updateValue(p, "followers", e.target.value)}
    className="form-control"
    />
    </div>
    </div>

    {p === platform && formattedFollowers && (
    <div className="mb-3">
    <span className="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle">
    📈 Estimated reach: {formattedFollowers} followers
    </span>
    </div>
    )}

    <div className="mb-2">
    <label className="form-label fw-semibold">{p} followers screenshot</label>
    <div className="d-flex align-items-center gap-2 bg-white">
    <label
    htmlFor={`screenshot-${p}`}
    className="btn btn-outline-secondary btn-sm mb-0 choose-file"
    style={{ cursor: "pointer" }}
    >
    Choose File
    </label>
    <span className="text-muted small">
    {screenshots[p] ? screenshots[p]!.name : "No file chosen"}
    </span>
    </div>
    <input
    id={`screenshot-${p}`}
    type="file"
    accept="image/*"
    onChange={(e) => handleFileChange(p, e)}
    className="d-none "
    />
    <div className="form-text">
    A screenshot showing your follower count. PNG or JPG, under 5MB.
    </div>
    {fileErrors[p] && (
    <div className="text-danger small mt-1">{fileErrors[p]}</div>
    )}
    </div>
    </>
    )}

    {/* {pSupportsOAuth && (
    <div className="text-end">
    {!manualMode ? (
    <button type="button" onClick={switchToManual} className="btn btn-link btn-sm text-muted p-0">
    Having trouble? Switch to manual form
    </button>
    ) : (
    <button type="button" onClick={switchToVerified} className="btn btn-link btn-sm text-muted p-0">
    ← Back to verified sign-in
    </button>
    )}
    </div>
    )} */}
    </div>
    )}
    </div>
    );
    })}
    </div>
    </div>

    <div className="mb-3">
    <label htmlFor="niche" className="form-label fw-semibold">Content niche</label>
    <select id="niche" name="niche" required defaultValue="" className="form-select">
    <option value="" disabled>Select your primary niche</option>
    {NICHES.map((niche) => (
    <option key={niche} value={niche}>{niche}</option>
    ))}
    </select>
    </div>

    <div className="mb-3">
    <label htmlFor="message" className="form-label fw-semibold">
    Anything else you'd like us to know? (optional)
    </label>
    <textarea
    id="message"
    name="message"
    rows={3}
    placeholder="Past brand collaborations, audience demographics, rates, etc."
    className="form-control"
    />
    </div>

    {status === "error" && (
    <div className="alert alert-danger py-2">{errorMsg}</div>
    )}

    <button
    type="submit"
    disabled={status === "submitting" || (!isManual && verifyStatus !== "verified")}
    className="btn btn-primary w-100 fw-semibold py-2 custom-button"
    >
    {status === "submitting" ? "Submitting…" : "Submit application"}
    </button>
    </form>
    )}
    </div>
    </div>
    </div>
    </>
    );
    }