import { useState } from "react";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const INITIAL_FOODS = [
  { id: 1, name: "Phở Bò Đặc Biệt", category: "Món chính", price: "85.000", status: "active", icon: "restaurant" },
  { id: 2, name: "Cà Phê Sữa Đá", category: "Đồ uống", price: "25.000", status: "active", icon: "local_cafe" },
  { id: 3, name: "Chè Thái", category: "Tráng miệng", price: "35.000", status: "paused", icon: "icecream" },
];

const INITIAL_PENDING = [
  { id: 1, name: "Bánh Mì Hội An (Mới)", proposedBy: "Bếp trưởng Minh", time: "14:30 Hôm nay", price: "45.000", category: "Khai vị", icon: "bakery_dining" },
  { id: 2, name: "Súp Bào Ngư (Mới)", proposedBy: "Bếp trưởng Minh", time: "Hôm qua", price: "120.000", category: "Đặc biệt", icon: "soup_kitchen" },
];

const CATEGORIES = ["Món chính", "Đồ uống", "Tráng miệng", "Khai vị", "Đặc biệt", "Ăn sáng", "Ăn nhẹ"];

// ─── Modal ─────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        style={{ animation: "fadeIn 0.2s cubic-bezier(.4,0,.2,1)" }}>
        <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)" }}>
          <div className="flex items-center justify-between">
            <h2 style={{ fontFamily: "'Arimo', sans-serif", fontSize: 18, fontWeight: 700, margin: 0 }}>{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Food Form Modal ───────────────────────────────────────────────────────────
function FoodFormModal({ initial, onClose, onSave, isEdit }) {
  const [form, setForm] = useState(
    initial || { category: "", name: "", price: "", status: "active" }
  );
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.name || !form.category || !form.price) return;
    onSave({ ...form, id: initial?.id || Date.now(), icon: initial?.icon || "restaurant" });
    onClose();
  };

  const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400 transition-all";
  const labelClass = "block text-xs font-bold uppercase tracking-wider mb-1.5";

  return (
    <Modal title={isEdit ? "Cập nhật món ăn" : "Thêm món ăn mới"} onClose={onClose}>
      <div className="space-y-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <div>
          <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Danh mục món ăn <span className="text-red-400">*</span></label>
          <select value={form.category} onChange={set("category")} className={inputClass} style={{ color: "var(--color-text-1)" }}>
            <option value="">Chọn danh mục...</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Tên món ăn <span className="text-red-400">*</span></label>
          <input type="text" value={form.name} onChange={set("name")} placeholder="VD: Phở Bò Đặc Biệt" className={inputClass} style={{ color: "var(--color-text-1)" }} />
        </div>
        <div>
          <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Đơn giá (đ) <span className="text-red-400">*</span></label>
          <input type="text" value={form.price} onChange={set("price")} placeholder="VD: 85.000" className={inputClass} style={{ color: "var(--color-text-1)" }} />
        </div>
        <div>
          <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Trạng thái</label>
          <div className="flex gap-3">
            {[{ value: "active", label: "Hoạt động" }, { value: "paused", label: "Tạm dừng" }].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setForm((f) => ({ ...f, status: opt.value }))}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all"
                style={
                  form.status === opt.value
                    ? { borderColor: "var(--color-primary)", background: "rgba(16,188,93,0.08)", color: "var(--color-primary)" }
                    : { borderColor: "#e5e7eb", color: "var(--color-text-3)" }
                }
              >
                <span className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ background: form.status === opt.value ? "var(--color-primary)" : "#d1d5db" }} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all hover:opacity-80"
            style={{ borderColor: "var(--color-text-4)", color: "var(--color-text-2)" }}>
            Hủy
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)" }}>
            {isEdit ? "Lưu thay đổi" : "Thêm món ăn"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function FoodsPage() {
  const [foods, setFoods] = useState(INITIAL_FOODS);
  const [pending, setPending] = useState(INITIAL_PENDING);
  const [activeTab, setActiveTab] = useState("list"); // 'list' | 'pending'
  const [modal, setModal] = useState(null); // 'add' | { type:'edit', item }

  const handleSave = (item) => {
    setFoods((prev) =>
      prev.find((f) => f.id === item.id) ? prev.map((f) => (f.id === item.id ? item : f)) : [...prev, item]
    );
  };
  const handleDelete = (id) => setFoods((prev) => prev.filter((f) => f.id !== id));
  const handleApprove = (id) => {
    const item = pending.find((p) => p.id === id);
    if (item) {
      setFoods((prev) => [...prev, { id: Date.now(), name: item.name, category: item.category, price: item.price, status: "active", icon: item.icon }]);
      setPending((prev) => prev.filter((p) => p.id !== id));
    }
  };
  const handleReject = (id) => setPending((prev) => prev.filter((p) => p.id !== id));

  const thClass = "px-6 py-4 text-xs font-bold uppercase tracking-wider";

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:scale(0.97) translateY(6px); } to { opacity:1; transform:scale(1) translateY(0); } }
        select { appearance: auto; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#f6f8f7", fontFamily: "'Nunito', sans-serif" }}>

        {/* ── Header ── */}
        <header className="bg-white border-b border-slate-200 px-8  top-0 z-10 ">
          <div className="flex justify-between items-center pt-6 pb-4">
            <h2 style={{ fontFamily: "'Arimo', sans-serif", fontSize: 24, fontWeight: 700, color: "var(--color-text-1)", margin: 0 }}>
              Quản lý Món ăn
            </h2>
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
              style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)", boxShadow: "0 4px 12px rgba(16,188,93,0.25)" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
              Thêm món ăn mới
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6">
            {[
              { key: "list", label: "Danh sách món ăn" },
              { key: "pending", label: "Danh sách chờ duyệt", badge: pending.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="pb-3 px-1 text-sm font-bold border-b-2 transition-all flex items-center gap-2"
                style={activeTab === tab.key
                  ? { borderColor: "var(--color-primary)", color: "var(--color-text-1)" }
                  : { borderColor: "transparent", color: "var(--color-text-3)" }
                }
              >
                {tab.label}
                {tab.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{tab.badge}</span>
                )}
              </button>
            ))}
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">

          {/* ── Tab: Danh sách món ăn ── */}
          {activeTab === "list" && (
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 style={{ fontFamily: "'Arimo', sans-serif", fontWeight: 700, color: "var(--color-text-1)", margin: 0 }}>
                  Danh sách món ăn
                </h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(16,188,93,0.1)", color: "var(--color-primary)" }}>
                  {foods.length} món
                </span>
              </div>
              <table className="w-full text-left">
                <thead style={{ background: "#f8faf9" }}>
                  <tr>
                    {["Tên món ăn", "Danh mục", "Đơn giá", "Trạng thái", "Thao tác"].map((h, i) => (
                      <th key={h} className={thClass}
                        style={{ color: "var(--color-text-3)", textAlign: i === 4 ? "right" : "left" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {foods.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors"
                      style={{ borderTop: "1px solid #f1f5f2" }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(16,188,93,0.08)" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 20, color: "var(--color-primary)" }}>{item.icon}</span>
                          </div>
                          <span className="text-sm font-semibold" style={{ color: "var(--color-text-1)" }}>{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-3 py-1 rounded-full font-semibold"
                          style={{ background: "#f1f5f4", color: "var(--color-text-2)" }}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold" style={{ color: "var(--color-text-1)" }}>
                        {item.price}đ
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-sm font-semibold w-fit">
                          <span className="w-2 h-2 rounded-full"
                            style={{ background: item.status === "active" ? "var(--color-primary)" : "#9ca3af" }} />
                          <span style={{ color: item.status === "active" ? "var(--color-primary)" : "var(--color-text-3)" }}>
                            {item.status === "active" ? "Hoạt động" : "Tạm dừng"}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4" style={{ textAlign: "right" }}>
                        <div className="flex justify-end gap-1.5">
                          <button onClick={() => setModal({ type: "edit", item })}
                            className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                            title="Cập nhật">
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--color-text-3)" }}>edit</span>
                          </button>
                          <button onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Xóa">
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f87171" }}>delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {foods.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: "var(--color-text-3)" }}>
                        Chưa có món ăn nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          )}

          {/* ── Tab: Chờ duyệt ── */}
          {activeTab === "pending" && (
            <section className="space-y-4">
              <h3 style={{ fontFamily: "'Arimo', sans-serif", fontSize: 20, fontWeight: 700, color: "var(--color-text-1)", margin: 0 }}>
                Danh sách chờ duyệt
              </h3>
              {pending.length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm"
                  style={{ color: "var(--color-text-3)" }}>
                  Không có món nào chờ duyệt
                </div>
              )}
              {pending.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex justify-between items-center gap-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(16,188,93,0.06)" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 36, color: "var(--color-primary)" }}>{item.icon}</span>
                    </div>
                    <div>
                      <h5 style={{ fontFamily: "'Arimo', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--color-text-1)", margin: 0 }}>
                        {item.name}
                      </h5>
                      <p className="text-xs mt-1" style={{ color: "var(--color-text-3)" }}>
                        Đề xuất bởi: {item.proposedBy} • {item.time}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                          style={{ background: "rgba(16,188,93,0.1)", color: "var(--color-primary)" }}>
                          Giá dự kiến: {item.price}đ
                        </span>
                        <span className="text-xs" style={{ color: "var(--color-text-2)" }}>
                          Danh mục: {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <button onClick={() => handleReject(item.id)}
                      className="px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all hover:bg-red-50"
                      style={{ borderColor: "#ef4444", color: "#ef4444" }}>
                      Từ chối
                    </button>
                    <button onClick={() => handleApprove(item.id)}
                      className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                      style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)" }}>
                      Duyệt món
                    </button>
                  </div>
                </div>
              ))}
            </section>
          )}

        </div>
      </div>

      {/* ── Modals ── */}
      {modal === "add" && (
        <FoodFormModal onClose={() => setModal(null)} onSave={handleSave} isEdit={false} />
      )}
      {modal?.type === "edit" && (
        <FoodFormModal initial={modal.item} onClose={() => setModal(null)} onSave={handleSave} isEdit={true} />
      )}
    </>
  );
}