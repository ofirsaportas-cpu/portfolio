(function () {
  if (window.innerWidth >= 768) return;
  if (sessionStorage.getItem('popup-dismissed')) return;

  var triggered = false;
  window.addEventListener('scroll', function () {
    if (triggered) return;
    if (window.scrollY < 150) return;
    triggered = true;
    showPopup();
  }, { passive: true });

  function showPopup() {

  const overlay = document.createElement('div');
  overlay.id = 'mobile-popup-overlay';
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    background: rgba(0,0,0,0.55);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    backdrop-filter: blur(4px);
    animation: popupFadeIn 0.35s ease;
  `;

  overlay.innerHTML = `
    <div style="
      width: 100%; max-width: 340px;
      background: radial-gradient(ellipse at 50% 50%, #dfd5cc 43%, #aca49d 72%, #79746f 100%);
      border-radius: 24px;
      overflow: hidden;
      display: flex; flex-direction: column; align-items: center;
      box-shadow: 0 32px 80px rgba(0,0,0,0.45);
      animation: popupSlideUp 0.4s cubic-bezier(0.22,1,0.36,1);
      position: relative;
    ">
      <button id="popup-close" style="
        position: absolute; top: 14px; right: 16px;
        background: rgba(0,0,0,0.12); border: none; cursor: pointer;
        width: 30px; height: 30px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; color: #333; line-height: 1;
      ">✕</button>

      <img src="/images/popup-illustration.png"
        style="width: 75%; margin-top: 40px; margin-bottom: 0;" />

      <div style="
        padding: 16px 28px 32px;
        text-align: center;
        font-family: 'Poppins', sans-serif;
      ">
        <h2 style="
          font-size: 22px; font-weight: 800;
          color: #1a1a1a; margin: 0 0 10px; line-height: 1.2;
        ">More fun on desktop!</h2>
        <p style="
          font-size: 14px; font-weight: 400;
          color: #3a3a3a; margin: 0; line-height: 1.6;
        ">The portfolio is available on mobile too,<br/>but the web version is even better.</p>
      </div>
    </div>
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes popupFadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes popupSlideUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);

  function dismiss() {
    sessionStorage.setItem('popup-dismissed', '1');
    overlay.style.animation = 'popupFadeIn 0.25s ease reverse forwards';
    setTimeout(() => overlay.remove(), 250);
  }

  document.getElementById('popup-close').addEventListener('click', dismiss);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) dismiss();
  });
  }
})();
