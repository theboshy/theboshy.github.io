const FEEDBACK_MS = 1800;

/** Copies the email to the clipboard with inline feedback; falls back to mailto: if blocked. */
export function initCopyEmail() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) =>
    button.addEventListener('click', async () => {
      const email = button.dataset.copy!;
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        location.href = `mailto:${email}`;
        return;
      }
      const label = button.querySelector('[data-label]')!;
      const original = label.textContent;
      label.textContent = button.dataset.copied!;
      label.classList.add('text-in');
      setTimeout(() => (label.textContent = original), FEEDBACK_MS);
    }),
  );
}
