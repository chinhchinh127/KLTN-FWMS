const wasteHistory = [
  {
    id: 1,
    date: "2026-03-13",
    name: "Bông cải xanh",
    weight: 5.0,
    reason: "Hết hạn",
  },
  {
    id: 2,
    date: "2026-03-13",
    name: "Cơm trắng",
    weight: 12.5,
    reason: "Chế biến dư",
  },
  {
    id: 3,
    date: "2026-02-10",
    name: "Thịt bò thăn",
    weight: 2.2,
    reason: "Sơ chế lỗi",
  },
  {
    id: 4,
    date: "2026-01-05",
    name: "Cá hồi tươi",
    weight: 0.8,
    reason: "Hỏng hóc",
  },
];

// API
export const getWasteHistory = ({ date, month } = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = [...wasteHistory];

      // filter theo ngày
      if (date) {
        data = data.filter((item) => item.date === date);
      }

      // filter theo tháng (YYYY-MM)
      if (month) {
        data = data.filter((item) =>
          item.date.startsWith(month)
        );
      }

      resolve({
        data,
        total: data.length,
      });
    }, 500);
  });
};