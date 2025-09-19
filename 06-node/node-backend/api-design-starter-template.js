// 📚 Users
const users = [
  { id: 1, name: "Alice Andersson", email: "alice@example.com" },
  { id: 2, name: "Björn Berg", email: "bjorn@example.com" },
  { id: 3, name: "Clara Carlsson", email: "clara@example.com" },
];

// 📘 Books
const books = [
  {
    id: 101,
    title: "Node.js för nybörjare",
    author: "N. Dev",
    available: true,
  },
  { id: 102, title: "Avancerad Java", author: "J. Virtanen", available: true },
  { id: 103, title: "Databaser 101", author: "D. Anders", available: false },
];

// 🔗 Loans (kopplar ihop userId och bookId)
const loans = [
  {
    id: 1001,
    userId: 1,
    bookId: 103,
    loanDate: "2025-09-01",
    returnDate: null,
  },
  {
    id: 1002,
    userId: 2,
    bookId: 101,
    loanDate: "2025-09-10",
    returnDate: "2025-09-17",
  },
];
