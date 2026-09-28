// The caption box under a diagram: shows the hovered node, or the idle text.

export interface Panel {
  show(title: string, body: string): void;
  reset(): void;
}

export function createPanel(el: HTMLElement): Panel {
  const { idleTitle = '', idleBody = '' } = el.dataset;

  const show = (title: string, body: string) => {
    const heading = document.createElement('p');
    heading.className = 'font-medium text-text-primary';
    heading.textContent = title;
    const text = document.createElement('p');
    text.className = 'text-[14px] text-text-tertiary';
    text.textContent = body;
    el.replaceChildren(heading, text);
    // Restart the text-in animation: remove the class, force a reflow, add it back.
    el.classList.remove('text-in');
    void el.offsetWidth;
    el.classList.add('text-in');
  };

  return { show, reset: () => show(idleTitle, idleBody) };
}
