<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the main brand website as a continuous scrolling index with section anchors, because the supplied brief explicitly requires one continuous experience.
- Keep catalogue and QR choice as standalone file-based routes, because printed QR links must open directly and reliably.
- Import supplied media directly from the local asset folders with exact case-sensitive paths and use ?url for PDFs, because the downloadable client must not depend on Lovable-only asset URLs.
- Enquiries use user-initiated email links rather than submission storage, because this project is frontend-only.
- Render the original catalogue with browser-loaded PDF.js and keep a direct PDF link, because native embedded PDF support varies between browsers.

- Share one transparent emblem across all page headers and derive the favicon from it, because the brand identity must remain consistent at every entry point.
- Use a shared viewport-aware forward-slider hook with cloned slides and transition-end resets, because both carousels must wait for viewing and loop without reversing.
- Keep desktop and tablet section links unchanged and use an accessible modal menu only below 641px, because the mobile header must stay on one row.
- Keep news slides and contact details outside opacity-gated reveal wrappers, because tall sections must never remain hidden on shorter viewports.

- Target the Nitro Vercel preset without an index.html catch-all rewrite, because TanStack Start requires its generated server routing for direct page visits.
