import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Blog } from "../types/blogTypes";

import { createBlog } from "../service/blog.service";
import RecaptchaV2, { RecaptchaV2Handle } from "../Components/RecaptchaV2";

const Form = ()  => {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const recaptchaRef = useRef<RecaptchaV2Handle | null>(null);

  const [data,setData] = useState<Blog>(
    {
      title : "",
      content : "",
      author : "",
      createdAt : ""
    }
  );
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaMessage, setCaptchaMessage] = useState("");

  const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setData((prev)=>{
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      if (!recaptchaSiteKey) {
        alert("Missing VITE_RECAPTCHA_SITE_KEY. Add it to your frontend environment.");
        return;
      }

      if (!captchaToken) {
        setCaptchaMessage("Please complete the reCAPTCHA before submitting.");
        return;
      }
      try {
        setIsSubmitting(true);
        const res = await createBlog({
          ...data,
          captchaToken,
        });
        if(res){
          alert("Data submitted successfully");
          setData({
            title: "",
            content: "",
            author: "",
            createdAt: "",
          });
          setCaptchaToken("");
          setCaptchaMessage("");
          recaptchaRef.current?.reset();
        }
      } catch (error: any) {
        console.log(error);
        alert(error.response?.data?.message || error.message || "An error occurred while submitting");
        setCaptchaToken("");
        recaptchaRef.current?.reset();
      } finally {
        setIsSubmitting(false);
      }
  } 
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_28%),linear-gradient(135deg,#fff8eb_0%,#fef3c7_38%,#fde68a_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="flex flex-col justify-between rounded-[2rem] border border-amber-200/70 bg-slate-900 px-8 py-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
          <div className="space-y-6">
            <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Blog Studio
            </span>

            <div className="space-y-4">
              <h1 className="max-w-md text-4xl font-black leading-tight sm:text-5xl">
                Craft a clean blog post form with a warm editorial feel.
              </h1>
              <p className="max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                This layout is designed around your current blog fields and keeps the
                interface focused, readable, and ready for wiring up later.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_rgba(120,53,15,0.12)] backdrop-blur sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">
                Create Blog
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                New Post Details
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill in the blog information below. This is a design-only form for your
                frontend page.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-amber-100 px-4 py-3 text-right sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Draft Mode
              </p>
              <p className="mt-1 text-sm text-amber-900">Not submitted yet</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={data.title}
                placeholder="Enter blog title"
                className="w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="authoer"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600"
                >
                  Author
                </label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  value={data.author}
                  placeholder="Enter author name"
                  className="w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="createdAt"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600"
                >
                  Created At
                </label>
                <input
                  id="createdAt"
                  type="date"
                  name="createdAt"
                  value={data.createdAt}
                  className="w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-600"
              >
                Content
              </label>
              <textarea
                id="content"
                rows={8}
                name="content"
                value={data.content}
                placeholder="Write your blog content here..."
                className="w-full resize-none rounded-[1.5rem] border border-amber-200 bg-white px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                onChange={handleChange}
              />
            </div>

            {recaptchaSiteKey ? (
              <>
                <RecaptchaV2
                  ref={recaptchaRef}
                  siteKey={recaptchaSiteKey}
                  onVerify={(token) => {
                    setCaptchaToken(token);
                    setCaptchaMessage("");
                  }}
                  onExpired={() => {
                    setCaptchaToken("");
                    setCaptchaMessage("reCAPTCHA expired. Please verify again.");
                  }}
                  onError={() => {
                    setCaptchaToken("");
                    setCaptchaMessage("reCAPTCHA could not load. Please refresh and try again.");
                  }}
                />
                {captchaMessage ? (
                  <p className="text-sm text-rose-600">{captchaMessage}</p>
                ) : null}
              </>
            ) : (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                reCAPTCHA is not configured yet. Add `VITE_RECAPTCHA_SITE_KEY` to the
                frontend environment.
              </p>
            )}

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Review your details before saving the blog post.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !recaptchaSiteKey}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  {isSubmitting ? "Submitting..." : "Publish Post"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}

export default Form
