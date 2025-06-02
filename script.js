const btn = document.getElementById('btnClick');
const message = document.getElementById('message');

btn.addEventListener('click', () => {
  const now = new Date();
  message.textContent = `Bạn đã nhấn vào nút lúc: ${now.toLocaleTimeString()}`;
});
