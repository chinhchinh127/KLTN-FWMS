import api from "./api";

export const getAllDishes = async () => {
    const res = await api.get("/dishes/get-all-dishes");
    return res.data;
};

export const getAllDishesFalse = async () => {
    const res = await api.get("/dishes/get-all-dishes-false");
    return res.data;
};

export const createDish = async (brandId, branchId, data) => {
    const res = await api.post(
        `/dishes/create-dishes/${brandId}/${branchId}`,
        data
    );
    return res.data;
};

export const updateDish = async (dishId, data) => {
    const res = await api.put(
        `/dishes/update-dishes/${dishId}`,
        data
    );
    return res.data;
};

export const deleteDish = async (dishId) => {
    const res = await api.delete(
        `/dishes/delete-dishes/${dishId}`
    );
    return res.data;
};

export const approveDish = async (dishId) => {
    const res = await api.put(
        `/dishes/approve-dishes/${dishId}`,
        {}
    );
    return res.data;
};

export const getDishCategories = async () => {
    const res = await api.get("/category-dishes");
    return res.data;
};

export const getIngredientsByBrand = async (brandId) => {
    const res = await api.get(`/ingredients/get-ingredients-by-brand?brand_id=${brandId}`);
    return res.data?.data || [];   
};