import { useState } from "react";


const INITIAL_INGREDIENTS = [
    { id: 1, name: "Thịt ức gà tươi", category: "Thịt & Cá", unit: "kg", stock: 24.5 },
    { id: 2, name: "Hành tây Đà Lạt", category: "Rau củ", unit: "kg", stock: 5.2 },
    { id: 3, name: "Dầu ăn thực vật", category: "Gia vị", unit: "lít", stock: 12.0 },
];

const INITIAL_HISTORY = [
    { id: 1, date: "24/05/2024 14:30", name: "Thịt ức gà tươi", unit: "kg", reason: "Chế biến món ăn", person: "Tú" },
    { id: 2, date: "24/05/2024 10:15", name: "Hành tây Đà Lạt", unit: "kg", reason: "Nguyên liệu hỏng (Loại bỏ)", person: "Minh" },
    { id: 3, date: "23/05/2024 18:00", name: "Dầu ăn thực vật", unit: "lít", reason: "Chế biến món ăn", person: "Lan" },
];

const CATEGORIES = ["Thịt & Cá", "Rau củ", "Gia vị", "Đồ khô", "Sữa & Trứng"];
const UNITS = ["kg", "lít", "gói", "hộp", "cái", "túi"];

const CATEGORY_BADGE = {
    "Thịt & Cá": "bg-blue-100 text-blue-700",
    "Rau củ": "bg-emerald-100 text-emerald-700",
    "Gia vị": "bg-amber-100 text-amber-700",
    "Đồ khô": "bg-orange-100 text-orange-700",
    "Sữa & Trứng": "bg-purple-100 text-purple-700",
};


function Modal({ title, onClose, children }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
                style={{ animation: "fadeIn 0.2s cubic-bezier(.4,0,.2,1)" }}
            >
                <div className="p-6 text-white" style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)" }}>
                    <div className="flex items-center justify-between">
                        <h2 style={{ fontFamily: "'Arimo', sans-serif", fontSize: 18, fontWeight: 700, margin: 0 }}>{title}</h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                        </button>
                    </div>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

function AddIngredientModal({ onClose, onSave }) {
    const [form, setForm] = useState({ category: "", name: "", unit: "", stock: "", alertThreshold: "" });
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleSave = () => {
        if (!form.name || !form.category || !form.unit) return;
        onSave({ ...form, id: Date.now(), stock: parseFloat(form.stock) || 0 });
        onClose();
    };

    const inputClass =
        "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all";
    const labelClass = "block text-xs font-bold uppercase tracking-wider mb-1.5";

    return (
        <Modal title="Thêm nguyên liệu mới" onClose={onClose}>
            <div className="space-y-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <div>
                    <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Danh mục nguyên liệu <span className="text-red-400">*</span></label>
                    <select value={form.category} onChange={set("category")} className={inputClass} style={{ color: "var(--color-text-1)" }}>
                        <option value="">Chọn danh mục...</option>
                        {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Tên nguyên liệu <span className="text-red-400">*</span></label>
                    <input type="text" value={form.name} onChange={set("name")} placeholder="VD: Thịt ức gà tươi" className={inputClass} style={{ color: "var(--color-text-1)" }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Đơn vị <span className="text-red-400">*</span></label>
                        <select value={form.unit} onChange={set("unit")} className={inputClass} style={{ color: "var(--color-text-1)" }}>
                            <option value="">Chọn đơn vị...</option>
                            {UNITS.map((u) => <option key={u}>{u}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Tồn kho hiện tại</label>
                        <input type="number" min="0" value={form.stock} onChange={set("stock")} placeholder="0" className={inputClass} style={{ color: "var(--color-text-1)" }} />
                    </div>
                </div>
                <div>
                    <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Số lượng báo cáo khẩn cấp sắp hết</label>
                    <input type="number" min="0" value={form.alertThreshold} onChange={set("alertThreshold")} placeholder="VD: 2 (kg/lít/...)" className={inputClass} style={{ color: "var(--color-text-1)" }} />
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-3)" }}>Hệ thống sẽ cảnh báo khi tồn kho xuống dưới ngưỡng này</p>
                </div>
                <div className="flex gap-3 pt-2">
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all hover:opacity-80" style={{ borderColor: "var(--color-text-4)", color: "var(--color-text-2)" }}>
                        Hủy
                    </button>
                    <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)" }}>
                        Thêm nguyên liệu
                    </button>
                </div>
            </div>
        </Modal>
    );
}

function UpdateStockModal({ ingredient, onClose, onSave }) {
    const [form, setForm] = useState({ name: ingredient.name, unit: ingredient.unit, stock: ingredient.stock });
    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleSave = () => {
        onSave({ ...ingredient, ...form, stock: parseFloat(form.stock) || 0 });
        onClose();
    };

    const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none transition-all";
    const labelClass = "block text-xs font-bold uppercase tracking-wider mb-1.5";

    return (
        <Modal title="Cập nhật nguyên liệu" onClose={onClose}>
            <div className="space-y-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <div>
                    <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Tên nguyên liệu</label>
                    <input type="text" value={form.name} onChange={set("name")} className={inputClass} style={{ color: "var(--color-text-1)" }} />
                </div>
                <div>
                    <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Đơn vị</label>
                    <select value={form.unit} onChange={set("unit")} className={inputClass} style={{ color: "var(--color-text-1)" }}>
                        {UNITS.map((u) => <option key={u}>{u}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelClass} style={{ color: "var(--color-text-3)" }}>Nhập số lượng</label>
                    <input type="number" min="0" step="0.1" value={form.stock} onChange={set("stock")} className={inputClass} style={{ color: "var(--color-text-1)" }} />
                </div>
                <div className="flex gap-3 pt-2">
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all hover:opacity-80" style={{ borderColor: "var(--color-text-4)", color: "var(--color-text-2)" }}>
                        Hủy
                    </button>
                    <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95" style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)" }}>
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default function IngredientsPage() {
    const [ingredients, setIngredients] = useState(INITIAL_INGREDIENTS);
    const [history] = useState(INITIAL_HISTORY);
    const [modal, setModal] = useState(null); // 'add' | { type: 'update', item }
    const [search, setSearch] = useState("");
    const [filterCat, setFilterCat] = useState("");

    const filtered = ingredients.filter((i) => {
        const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = !filterCat || i.category === filterCat;
        return matchSearch && matchCat;
    });

    const handleAdd = (item) => setIngredients((prev) => [...prev, item]);
    const handleUpdate = (updated) => setIngredients((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    const handleDelete = (id) => setIngredients((prev) => prev.filter((i) => i.id !== id));

    const thClass = "px-6 py-4 text-xs font-bold uppercase tracking-wider text-left";
    const tdClass = "px-6 py-4 text-sm";

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        select { appearance: auto; }
      `}</style>

            <div className="min-h-screen" style={{ background: "#f6f8f7", fontFamily: "'Nunito', sans-serif" }}>

                {/* ── Header ── */}
                <header className="bg-white border-b border-slate-200 px-8 h-20 flex items-center justify-between  top-0 z-10">
                    <h2 style={{ fontFamily: "'Arimo', sans-serif", fontSize: 22, fontWeight: 700, color: "var(--color-text-1)", margin: 0 }}>
                        Quản lý nguyên liệu
                    </h2>
                    <button
                        onClick={() => setModal("add")}
                        className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
                        style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)", boxShadow: "0 4px 12px rgba(16,188,93,0.25)" }}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>add</span>
                        Thêm nguyên liệu mới
                    </button>
                </header>

                <div className="p-8 space-y-8 max-w-6xl mx-auto">

                    {/* ── Search & Filter ── */}
                    <section className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap gap-4 items-center">
                        <div className="flex-1 min-w-64 relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--color-text-3)" }}>search</span>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm tên nguyên liệu..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm focus:outline-none border border-transparent focus:border-green-300 transition-all"
                                style={{ color: "var(--color-text-1)" }}
                            />
                        </div>
                        <select
                            value={filterCat}
                            onChange={(e) => setFilterCat(e.target.value)}
                            className="bg-slate-50 border border-transparent focus:border-green-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none transition-all"
                            style={{ color: "var(--color-text-2)" }}
                        >
                            <option value="">Tất cả danh mục</option>
                            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                    </section>

                    {/* ── Ingredients Table ── */}
                    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 style={{ fontFamily: "'Arimo', sans-serif", fontWeight: 700, color: "var(--color-text-1)", margin: 0 }}>
                                Danh sách nguyên liệu
                            </h3>
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "rgba(16,188,93,0.1)", color: "var(--color-primary)" }}>
                                {filtered.length} mục
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead style={{ background: "#f8faf9" }}>
                                    <tr>
                                        {["Tên nguyên liệu", "Danh mục", "Đơn vị", "Tồn kho", "Hành động"].map((h, i) => (
                                            <th key={h} className={thClass} style={{ color: "var(--color-text-3)", textAlign: i >= 3 ? "right" : "left" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((item, idx) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-slate-50/60 transition-colors"
                                            style={{ borderTop: "1px solid #f1f5f2" }}
                                        >
                                            <td className={tdClass}>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,188,93,0.1)" }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "var(--color-primary)" }}>nutrition</span>
                                                    </div>
                                                    <span className="font-semibold" style={{ color: "var(--color-text-1)" }}>{item.name}</span>
                                                </div>
                                            </td>
                                            <td className={tdClass}>
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${CATEGORY_BADGE[item.category] || "bg-gray-100 text-gray-600"}`}>
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className={tdClass} style={{ color: "var(--color-text-2)", textAlign: "center" }}>{item.unit}</td>
                                            <td className={tdClass} style={{ textAlign: "right" }}>
                                                <span className="font-bold" style={{ color: item.stock < 3 ? "#f97316" : "var(--color-primary)" }}>
                                                    {item.stock}
                                                </span>
                                            </td>
                                            <td className={tdClass} style={{ textAlign: "right" }}>
                                                <div className="flex justify-end gap-1.5">
                                                    <button
                                                        onClick={() => setModal({ type: "update", item })}
                                                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                                                        title="Cập nhật"
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--color-text-3)" }}>edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                        title="Xóa"
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f87171" }}>delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-sm" style={{ color: "var(--color-text-3)" }}>
                                                Không tìm thấy nguyên liệu nào
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* ── Export History ── */}
                    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 style={{ fontFamily: "'Arimo', sans-serif", fontWeight: 700, color: "var(--color-text-1)", margin: 0 }}>
                                Lịch sử xuất nguyên liệu
                            </h3>
                            <button className="text-sm font-bold hover:underline" style={{ color: "var(--color-primary)" }}>Xem tất cả</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead style={{ background: "#f8faf9" }}>
                                    <tr>
                                        {["Ngày / Giờ", "Tên nguyên liệu", "Đơn vị", "Lý do", "Người xuất"].map((h) => (
                                            <th key={h} className={thClass} style={{ color: "var(--color-text-3)" }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((row, idx) => (
                                        <tr key={row.id} className="hover:bg-slate-50/50 transition-colors" style={{ borderTop: "1px solid #f1f5f2" }}>
                                            <td className={tdClass} style={{ color: "var(--color-text-3)", fontSize: 12 }}>{row.date}</td>
                                            <td className={tdClass} style={{ color: "var(--color-text-1)", fontWeight: 600 }}>{row.name}</td>
                                            <td className={tdClass} style={{ color: "var(--color-text-2)" }}>{row.unit}</td>
                                            <td className={tdClass}>
                                                <span
                                                    className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                                                    style={
                                                        row.reason.includes("hỏng") || row.reason.includes("Loại")
                                                            ? { background: "#fef2f2", color: "#dc2626" }
                                                            : { background: "#f1f5f2", color: "var(--color-text-2)" }
                                                    }
                                                >
                                                    {row.reason}
                                                </span>
                                            </td>
                                            <td className={tdClass}>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "var(--color-primary)" }}>
                                                        {row.person[0]}
                                                    </div>
                                                    <span className="text-sm font-semibold" style={{ color: "var(--color-text-1)" }}>{row.person}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>
            </div>

            {/* ── Modals ── */}
            {modal === "add" && <AddIngredientModal onClose={() => setModal(null)} onSave={handleAdd} />}
            {modal?.type === "update" && (
                <UpdateStockModal ingredient={modal.item} onClose={() => setModal(null)} onSave={handleUpdate} />
            )}
        </>
    );
}