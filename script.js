const body = document.body;
const homePage = document.getElementById('homePage');
const content = document.getElementById('content');
const tableContainer = document.getElementById('tableContainer');
const backBtn = document.getElementById('backBtn');
const title = document.getElementById('title');

// Ảnh nền trang tổng
const homeBackground = 'https://symbols.vn/wp-content/uploads/2022/01/Hinh-Nen-Songoku-4k-manh-me-nhat.jpg';

// Dữ liệu từng mục
const data = {
  temp: {
    background: 'https://img4.thuthuatphanmem.vn/uploads/2019/10/30/hinh-anh-mat-troi-dep-nhat_105126148.jpg',
    title: 'Nhiệt độ hiện tại',
    table: `
      <table>
        <tr><th>Loại</th><th>Giá trị</th></tr>
        <tr><td>Nhiệt độ</td><td>24°C</td></tr>
      </table>
    `
  },
  humidity: {
    background: 'https://maydochuyendung.com/img/uploads/images/may-do-do-am-khong-khi/do-am-min.jpg',
    title: 'Độ ẩm hiện tại',
    table: `
      <table>
        <tr><th>Loại</th><th>Giá trị</th></tr>
        <tr><td>Độ ẩm</td><td>21%</td></tr>
      </table>
    `
  },
  history: {
    background: 'https://viettelinternet24h.com/wp-content/uploads/2022/08/img_630afc915a2d0.jpg',
    title: 'Lịch sử đo',
    table: `
      <table>
        <tr><th>Ngày</th><th>Giờ</th></tr>
        <tr><td>02/06/2025</td><td>14:30</td></tr>
      </table>
    `
  }
};

// Khởi tạo nền trang tổng
body.style.backgroundImage = `url('${homeBackground}')`;

// Bắt event cho nút trong trang tổng
homePage.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (!data[target]) return;

    // Thay đổi ảnh nền, tiêu đề, nội dung
    body.style.backgroundImage = `url('${data[target].background}')`;
    title.textContent = data[target].title;
    tableContainer.innerHTML = data[target].table;

    // Ẩn trang tổng, hiện nội dung chi tiết
    homePage.style.display = 'none';
    content.style.display = 'block';
  });
});

// Nút quay lại
backBtn.addEventListener('click', () => {
  // Về lại trang tổng
  body.style.backgroundImage = `url('${homeBackground}')`;
  title.textContent = 'Trang tổng - Thông tin môi trường';
  content.style.display = 'none';
  homePage.style.display = 'block';
  tableContainer.innerHTML = '';
});
