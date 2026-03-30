import api from "./api";

export const getIngredients = async () => {
    const res = await api.get("/ingredients/get-ingredients-by-brand");
    return res.data;
};

export const createIngredient = async (brandId, data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    const res = await api.post(`/ingredients/create-ingredient/${brandId}`, formData);
    return res.data;
};

export const updateIngredient = async (id, data) => {
    const res = await api.put(`/ingredients/update-ingredient/${id}`, data);
    return res.data;
};

export const deleteIngredient = async (id) => {
    const res = await api.delete(`/ingredients/delete-ingredient/${id}`);
    return res.data;
};

export const addIngredientTransaction = async (branchId, data) => {
    const res = await api.post(`/ingredients/add-ingredient-transaction/${branchId}`, data);
    return res.data;
};

export const getIngredientById = async (id) => {
    const res = await api.get(`/ingredients/get-ingredient/${id}`);
    return res.data;
};
export const getIngredientCategories = async () => {
    const res = await api.get("/ingredients/category-ingredients");
    return res.data;
};