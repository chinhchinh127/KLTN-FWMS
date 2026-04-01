import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import {
  getAllDishes,
  getAllDishesFalse,
  createDish,
  updateDish,
  deleteDish,
  approveDish,
  getDishCategories,
  getIngredientsByBrand,        // ← Hàm mới
} from "../../../services/dishService";

// ─── Modal Component ───────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        style={{ animation: "fadeIn 0.2s cubic-bezier(.4,0,.2,1)" }}
      >
        <div
          className="p-6 text-white"
          style={{ background: "linear-gradient(135deg, var(--color-primary), #0da04f)" }}
        >
          <div className="flex items-center justify-between">
            <h2
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: 18,
                fontWeight: 700,
                margin: 0,
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                close
              </span>
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Food Form Modal ───────────────────────────────────────────────────────
function FoodFormModal({ initial, onClose, onSave, isEdit, brandId, branchId }) {
  const [form, setForm] = useState({
    category: initial
      ? String(initial.dish_category_id || initial.category?.id || initial.dish_category?.id || "")
      : "",
    name: initial?.name || "",
    price: initial?.price ? String(initial.price) : "",
    des: initial?.des || "",
    status: initial && (initial.status === true || initial.status === "active")
      ? "active"
      : "paused",
  });

  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);   // Danh sách nguyên liệu
  const [dishRecipes, setDishRecipes] = useState([]);           // Nguyên liệu của món ăn

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories + ingredients theo brand
  useEffect(() => {
    const fetchData = async () => {
      if (!brandId) return;

      try {
        const [catData, ingData] = await Promise.all([
          getDishCategories(),
          getIngredientsByBrand(brandId),
        ]);

        setCategories(Array.isArray(catData) ? catData : []);
        setIngredientsList(Array.isArray(ingData) ? ingData : []);
      } catch (err) {
        console.error("Lỗi tải dữ liệu:", err);
      }
    };

    fetchData();
  }, [brandId]);

  // Load dish_recipes khi chỉnh sửa
  useEffect(() => {
    if (isEdit && initial?.dish_recipes && Array.isArray(initial.dish_recipes)) {
      setDishRecipes(
        initial.dish_recipes.map((item) => ({
          ingredient_id: item.ingredient_id || "",
          quantity: item.quantity ? String(item.quantity) : "",
        }))
      );
    } else {
      setDishRecipes([]);
    }
  }, [initial, isEdit]);

  const handleInputChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleAddIngredient = () => {
    setDishRecipes((prev) => [...prev, { ingredient_id: "", quantity: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    setDishRecipes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRecipeChange = (index, field, value) => {
    setDishRecipes((prev) => {
      const newRecipes = [...prev];
      newRecipes[index] = { ...newRecipes[index], [field]: value };
      return newRecipes;
    });
  };

  const handleSave = async () => {
    if (!form.name?.trim() || !form.category || !form.price) {
      setError("Vui lòng nhập đầy đủ tên món, danh mục và giá");
      return;
    }

    const validRecipes = dishRecipes
      .filter((r) => r.ingredient_id && r.quantity)
      .map((r) => ({
        ingredient_id: r.ingredient_id,
        quantity: Number(r.quantity),
      }));

    const payload = {
      dish_category_id: form.category,
      name: form.name.trim(),
      price: Number(form.price),
      des: form.des.trim(),
      status: form.status === "active",
      dish_recipes: validRecipes,
    };

    try {
      setLoading(true);
      setError("");

      if (isEdit && initial?.id) {
        await updateDish(initial.id, payload);
      } else {
        if (!brandId || !branchId) {
          setError("Thiếu thông tin brand hoặc branch");
          return;
        }
        await createDish(brandId, branchId, payload);
      }

      onSave();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Có lỗi xảy ra khi lưu món ăn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={isEdit ? "Cập nhật món ăn" : "Thêm món ăn mới"} onClose={onClose}>
      <div className="space-y-6">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          value={form.name}
          onChange={handleInputChange("name")}
          placeholder="Tên món ăn"
          className="w-full border p-3 rounded-xl focus:outline-none focus:border-green-500"
        />

        <select
          value={form.category}
          onChange={handleInputChange("category")}
          className="w-full border p-3 rounded-xl focus:outline-none focus:border-green-500"
        >
          <option value="">Chọn danh mục</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={form.price}
          onChange={handleInputChange("price")}
          placeholder="Giá món ăn (VND)"
          className="w-full border p-3 rounded-xl focus:outline-none focus:border-green-500"
        />

        <textarea
          value={form.des}
          onChange={handleInputChange("des")}
          placeholder="Mô tả món ăn (tùy chọn)"
          rows={3}
          className="w-full border p-3 rounded-xl focus:outline-none focus:border-green-500 resize-y"
        />

        <select
          value={form.status}
          onChange={handleInputChange("status")}
          className="w-full border p-3 rounded-xl focus:outline-none focus:border-green-500"
        >
          <option value="active">Hoạt động</option>
          <option value="paused">Tạm dừng</option>
        </select>

        {/* Phần Nguyên liệu */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold text-sm">Nguyên liệu cho món ăn</label>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
            >
              <span className="material-symbols-outlined">add</span>
              Thêm nguyên liệu
            </button>
          </div>

          <div className="space-y-3">
            {dishRecipes.map((recipe, index) => (
              <div key={index} className="flex gap-3 items-center">
                <select
                  value={recipe.ingredient_id}
                  onChange={(e) => handleRecipeChange(index, "ingredient_id", e.target.value)}
                  className="flex-1 border p-3 rounded-xl focus:outline-none focus:border-green-500"
                >
                  <option value="">Chọn nguyên liệu</option>
                  {ingredientsList.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.unit})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  step="0.01"
                  value={recipe.quantity}
                  onChange={(e) => handleRecipeChange(index, "quantity", e.target.value)}
                  placeholder="Số lượng"
                  className="w-32 border p-3 rounded-xl focus:outline-none focus:border-green-500"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}

            {dishRecipes.length === 0 && (
              <p className="text-sm text-slate-400 italic text-center py-6 border border-dashed rounded-xl">
                Chưa có nguyên liệu nào. Nhấn "+ Thêm nguyên liệu" để bắt đầu.
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 py-3 text-white rounded-xl font-bold disabled:opacity-70 transition-all"
            style={{
              background: "linear-gradient(135deg, var(--color-primary), #0da04f)",
            }}
          >
            {loading ? "Đang xử lý..." : isEdit ? "Cập nhật" : "Thêm món ăn"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Main FoodsPage ────────────────────────────────────────────────────────
export default function Manager_Dish_Kitchen() {
  const { brandId, branchId } = useParams();

  const [foods, setFoods] = useState([]);
  const [pending, setPending] = useState([]);
  const [activeTab, setActiveTab] = useState("list");
  const [modal, setModal] = useState(null);

  const fetchFoods = useCallback(async () => {
    try {
      const [activeData, pendingData] = await Promise.all([
        getAllDishes(),
        getAllDishesFalse(),
      ]);

      setFoods(Array.isArray(activeData) ? activeData : []);
      setPending(Array.isArray(pendingData) ? pendingData : []);
    } catch (err) {
      console.error("Lỗi tải danh sách món ăn:", err);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleSave = () => {
    fetchFoods();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa món ăn này không?")) return;
    try {
      await deleteDish(id);
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Không thể xóa món ăn");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveDish(id);
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Duyệt món ăn thất bại");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Bạn có chắc muốn từ chối món ăn này?")) return;
    try {
      await deleteDish(id);
      fetchFoods();
    } catch (err) {
      console.error(err);
      alert("Từ chối thất bại");
    }
  };

  const thClass = "px-6 py-4 text-xs font-bold uppercase tracking-wider";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeIn { 
          from { opacity:0; transform:scale(0.97) translateY(6px); } 
          to { opacity:1; transform:scale(1) translateY(0); } 
        }
        select { appearance: auto; }
      `}</style>

      <div className="min-h-screen" style={{ background: "#f6f8f7", fontFamily: "'Nunito', sans-serif" }}>
        <header className="bg-white border-b border-slate-200 px-8 sticky top-0 z-10">
          <div className="flex justify-between items-center pt-6 pb-4">
            <h2
              style={{
                fontFamily: "'Arimo', sans-serif",
                fontSize: 24,
                fontWeight: 700,
                color: "var(--color-text-1)",
                margin: 0,
              }}
            >
              Quản lý Món ăn
            </h2>
            <button
              onClick={() => setModal("add")}
              className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
              style={{
                background: "linear-gradient(135deg, var(--color-primary), #0da04f)",
                boxShadow: "0 4px 12px rgba(16,188,93,0.25)",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                add
              </span>
              Thêm món ăn mới
            </button>
          </div>

          <div className="flex gap-6">
            {[
              { key: "list", label: "Danh sách món ăn" },
              { key: "pending", label: "Danh sách chờ duyệt", badge: pending.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="pb-3 px-1 text-sm font-bold border-b-2 transition-all flex items-center gap-2"
                style={
                  activeTab === tab.key
                    ? { borderColor: "var(--color-primary)", color: "var(--color-text-1)" }
                    : { borderColor: "transparent", color: "var(--color-text-3)" }
                }
              >
                {tab.label}
                {tab.badge > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {/* Tab Danh sách món ăn */}
          {activeTab === "list" && (
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3
                  style={{
                    fontFamily: "'Arimo', sans-serif",
                    fontWeight: 700,
                    color: "var(--color-text-1)",
                    margin: 0,
                  }}
                >
                  Danh sách món ăn
                </h3>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(16,188,93,0.1)", color: "var(--color-primary)" }}
                >
                  {foods.length} món
                </span>
              </div>

              <table className="w-full text-left">
                <thead style={{ background: "#f8faf9" }}>
                  <tr>
                    {["Tên món ăn", "Danh mục", "Đơn giá", "Trạng thái", "Thao tác"].map((header, idx) => (
                      <th
                        key={header}
                        className={thClass}
                        style={{ color: "var(--color-text-3)", textAlign: idx === 4 ? "right" : "left" }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {foods.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      style={{ borderTop: "1px solid #f1f5f2" }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "rgba(16,188,93,0.08)" }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ fontSize: 20, color: "var(--color-primary)" }}
                            >
                              {item.icon || "restaurant"}
                            </span>
                          </div>
                          <span className="text-sm font-semibold" style={{ color: "var(--color-text-1)" }}>
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="text-xs px-3 py-1 rounded-full font-semibold"
                          style={{ background: "#f1f5f4", color: "var(--color-text-2)" }}
                        >
                          {item.category?.name || item.dish_category?.name || "Chưa có"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold" style={{ color: "var(--color-text-1)" }}>
                        {Number(item.price).toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-sm font-semibold w-fit">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              background:
                                item.status === true || item.status === "active"
                                  ? "var(--color-primary)"
                                  : "#9ca3af",
                            }}
                          />
                          <span
                            style={{
                              color:
                                item.status === true || item.status === "active"
                                  ? "var(--color-primary)"
                                  : "var(--color-text-3)",
                            }}
                          >
                            {item.status === true || item.status === "active" ? "Hoạt động" : "Tạm dừng"}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setModal({ type: "edit", item })}
                            className="p-2 rounded-lg hover:bg-green-50 transition-colors"
                            title="Cập nhật"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--color-text-3)" }}>
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Xóa"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f87171" }}>
                              delete
                            </span>
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

          {/* Tab Chờ duyệt */}
          {activeTab === "pending" && (
            <section className="space-y-4">
              <h3
                style={{
                  fontFamily: "'Arimo', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--color-text-1)",
                  margin: 0,
                }}
              >
                Danh sách chờ duyệt
              </h3>

              {pending.length === 0 ? (
                <div
                  className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm"
                  style={{ color: "var(--color-text-3)" }}
                >
                  Không có món nào chờ duyệt
                </div>
              ) : (
                pending.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex justify-between items-center gap-4"
                  >
                    <div className="flex gap-4 items-center">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(16,188,93,0.06)" }}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: 36, color: "var(--color-primary)" }}
                        >
                          {item.icon || "restaurant"}
                        </span>
                      </div>
                      <div>
                        <h5
                          style={{
                            fontFamily: "'Arimo', sans-serif",
                            fontSize: 18,
                            fontWeight: 600,
                            color: "var(--color-text-1)",
                            margin: 0,
                          }}
                        >
                          {item.name}
                        </h5>
                        <p className="text-xs mt-1" style={{ color: "var(--color-text-3)" }}>
                          Đề xuất bởi: {item.proposedBy || "—"} • {item.time || "—"}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-lg"
                            style={{ background: "rgba(16,188,93,0.1)", color: "var(--color-primary)" }}
                          >
                            Giá: {Number(item.price).toLocaleString()}đ
                          </span>
                          <span className="text-xs" style={{ color: "var(--color-text-2)" }}>
                            Danh mục: {item.category?.name || item.dish_category?.name || "Chưa có"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-shrink-0">
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-5 py-2 rounded-xl text-sm font-bold border-2 transition-all hover:bg-red-50"
                        style={{ borderColor: "#ef4444", color: "#ef4444" }}
                      >
                        Từ chối
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                        style={{
                          background: "linear-gradient(135deg, var(--color-primary), #0da04f)",
                        }}
                      >
                        Duyệt món
                      </button>
                    </div>
                  </div>
                ))
              )}
            </section>
          )}
        </div>
      </div>

      {/* Modals */}
      {modal === "add" && (
        <FoodFormModal
          onClose={() => setModal(null)}
          onSave={handleSave}
          isEdit={false}
          brandId={brandId}
          branchId={branchId}
        />
      )}

      {modal?.type === "edit" && modal.item && (
        <FoodFormModal
          initial={modal.item}
          onClose={() => setModal(null)}
          onSave={handleSave}
          isEdit={true}
          brandId={brandId}
          branchId={branchId}
        />
      )}
    </>
  );
}